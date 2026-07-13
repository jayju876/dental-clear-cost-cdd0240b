import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SPREADSHEET_ID = "1Z_h3bya52dW9QlSo2EXGVzeg6_KXwxRJ6LwY8V49YFM";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets";

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().max(150).optional().default(""),
  message: z.string().trim().min(1).max(2000),
});

export const submitContactForm = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ContactSchema.parse(data))
  .handler(async ({ data }) => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const connKey = process.env.GOOGLE_SHEETS_API_KEY;
    if (!lovableKey || !connKey) {
      throw new Error("Google Sheets connection is not configured.");
    }

    const url = `${GATEWAY_URL}/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1!A:D:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": connKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [[data.name, data.email, data.subject ?? "", data.message]],
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Google Sheets append failed [${response.status}]: ${errorBody}`);
      throw new Error(`Failed to save submission [${response.status}]`);
    }

    return { ok: true };
  });
