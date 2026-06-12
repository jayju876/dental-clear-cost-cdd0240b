import { createFileRoute, Link, Outlet, useRouterState, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LayoutDashboard, Users, Image as ImageIcon, Search, Settings, Activity, LogOut, ShieldCheck, UserCog, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin · ImplantCost CMS" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AdminLayout,
});

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/posts", label: "Blogs", icon: FileText },
  { to: "/admin/seo", label: "Pages SEO", icon: Search },
  { to: "/admin/authors", label: "Authors", icon: UserCog },
  { to: "/admin/media", label: "Media Library", icon: ImageIcon },
  { to: "/admin/users", label: "Users", icon: Users, requireAdmin: true },
  { to: "/admin/settings", label: "Settings", icon: Settings, requireAdmin: true },
  { to: "/admin/activity", label: "Activity Log", icon: Activity, requireAdmin: true },
];


function AdminLayout() {
  const { user, loading, isCmsUser, hasAnyRole, signOut } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-muted/30">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) return <LoginGate />;

  if (!isCmsUser) {
    return (
      <div className="grid min-h-screen place-items-center bg-muted/30 p-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Access denied</CardTitle>
            <CardDescription>Your account ({user.email}) does not have CMS access. Contact a super admin.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => signOut()} className="w-full"><LogOut className="mr-2 h-4 w-4" />Sign out</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isAdmin = hasAnyRole(["super_admin", "admin"]);

  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-border px-5">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <span className="font-semibold tracking-tight">ImplantCost CMS</span>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {NAV.filter((n) => !n.requireAdmin || isAdmin).map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            return (
              <Link key={n.to} to={n.to} className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}>
                <n.icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border p-3 text-xs text-muted-foreground">
          <div className="mb-2 truncate font-medium text-foreground">{user.email}</div>
          <Button variant="ghost" size="sm" onClick={() => signOut()} className="w-full justify-start"><LogOut className="mr-2 h-3.5 w-3.5" />Sign out</Button>
        </div>
      </aside>
      <div className="flex-1 overflow-x-hidden">
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 md:hidden">
          <span className="font-semibold">ImplantCost CMS</span>
          <Button variant="ghost" size="sm" onClick={() => signOut()}><LogOut className="h-4 w-4" /></Button>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-border bg-card px-2 py-2 md:hidden">
          {NAV.filter((n) => !n.requireAdmin || isAdmin).map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            return (
              <Link key={n.to} to={n.to} className={`flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
                <n.icon className="h-3.5 w-3.5" />{n.label}
              </Link>
            );
          })}
        </nav>
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function LoginGate() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = mode === "signin" ? await signIn(email, password) : await signUp(email, password, fullName);
    setLoading(false);
    if (res.error) { toast.error(res.error); return; }
    if (mode === "signup") { toast.success("Account created. Check your email to verify, then sign in."); setMode("signin"); }
    else { toast.success("Signed in"); navigate({ to: "/admin" }); }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"><ShieldCheck className="h-6 w-6 text-primary" /></div>
          <CardTitle>ImplantCost CMS</CardTitle>
          <CardDescription>{mode === "signin" ? "Sign in to manage your site" : "Create an admin account"}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-1.5"><Label htmlFor="name">Full name</Label><Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} /></div>
            )}
            <div className="space-y-1.5"><Label htmlFor="email">Email</Label><Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <div className="space-y-1.5"><Label htmlFor="password">Password</Label><Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} /></div>
            <Button type="submit" className="w-full" disabled={loading}>{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{mode === "signin" ? "Sign in" : "Create account"}</Button>
            <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="w-full text-center text-xs text-muted-foreground hover:text-foreground">
              {mode === "signin" ? "No account? Sign up" : "Already have an account? Sign in"}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
