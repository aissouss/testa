"use client";

import { AppShell } from "@/components/layout/app-shell";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { Card } from "@/components/ui/card";
import { useQuran } from "@/components/shared/quran-provider";
import { computeDashboardStats } from "@/lib/utils";

export default function DashboardPage() {
  const { rows } = useQuran();
  const stats = computeDashboardStats(rows);
  const due = rows.filter((r) => r.progress.needsRevisionThisWeek).slice(0, 6);
  const inProgress = rows.filter((r) => r.progress.status === "IN_PROGRESS").sort((a, b) => b.percent - a.percent).slice(0, 6);

  return (
    <AppShell>
      <StatsGrid stats={stats} />
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="mb-3 font-semibold">Révisions à faire cette semaine</h3>
          <ul className="space-y-2 text-sm">
            {due.map((r) => <li key={r.number}>{r.number}. {r.transliteration} · dernière: {r.progress.lastRevisionAt ? new Date(r.progress.lastRevisionAt).toLocaleDateString() : "jamais"}</li>)}
            {due.length === 0 && <li className="text-zinc-400">Aucune révision due 🎉</li>}
          </ul>
        </Card>
        <Card>
          <h3 className="mb-3 font-semibold">Sourates en cours</h3>
          <ul className="space-y-2 text-sm">
            {inProgress.map((r) => <li key={r.number}>{r.transliteration} · ayah {r.progress.currentAyah}/{r.ayahCount} ({r.percent}%)</li>)}
            {inProgress.length === 0 && <li className="text-zinc-400">Commencez une sourate pour la voir ici.</li>}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
