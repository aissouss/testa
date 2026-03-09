import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";

export default function AuthPage() {
  return (
    <AppShell>
      <Card>
        <h3 className="text-lg font-semibold">Connexion email (Supabase)</h3>
        <p className="text-sm text-zinc-400">Activez Supabase Auth Email OTP pour connecter chaque utilisateur à ses données.</p>
      </Card>
    </AppShell>
  );
}
