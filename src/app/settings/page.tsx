import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <AppShell>
      <Card>
        <h3 className="text-lg font-semibold">Settings</h3>
        <p className="mt-2 text-sm text-zinc-400">Configurez Supabase avec NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY.</p>
      </Card>
    </AppShell>
  );
}
