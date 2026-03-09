"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <AppShell>
      <Card className="space-y-2">
        <h3 className="text-lg font-semibold">Paramètres</h3>
        <p className="text-sm text-zinc-400">Sans configuration Supabase, les données sont sauvegardées localement dans le navigateur.</p>
        <p className="text-sm text-zinc-400">Avec Supabase + Auth activés, l'app synchronise vos données personnelles (RLS).</p>
      </Card>
    </AppShell>
  );
}
