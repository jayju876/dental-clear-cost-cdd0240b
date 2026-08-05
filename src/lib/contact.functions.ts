import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SPREADSHEET_ID = "1Z_h3bya52dW9QlSo2EXGVzeg6_KXwxRJ6LwY8V49YFM";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets";

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().default(""),
  subject: z.string().trim().max(150).optional().default(""),
  message: z.string().trim().min(1).max(2000),
});

export const submitContactForm = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ContactSchema.parse(data))
  .handler(async ({ data }) => {
    // 1. Store the lead securely in the database (primary source of truth)
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error: dbError } = await supabaseAdmin.from("leads").insert({
      full_name: data.name,
      email: data.email,
      phone: data.phone || null,
      subject: data.subject || null,
      message: data.message,
      source: "contact_form",
    });
    if (dbError) {
      console.error("Lead insert failed:", dbError.message);
      throw new Error("Failed to save submission");
    }

    // 2. Best-effort mirror to Google Sheets
    const lovableKey = process.env['LOVABLE_API_KEY'];
    const connKey = process.env['GOOGLE_SHEETS_API_KEY'];
    if (lovableKey && connKey) {
      try {
        const url = `${GATEWAY_URL}/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1!A:E:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${lovableKey}`,
            "X-Connection-Api-Key": connKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            values: [[data.name, data.email, data.subject ?? "", data.message, data.phone ?? ""]],
          }),
        });
        if (!response.ok) {
          console.error(`Google Sheets append failed [${response.status}]: ${await response.text()}`);
        }
      } catch (err) {
        console.error("Google Sheets mirror failed", err);
      }
    }

    return { ok: true };
  });
