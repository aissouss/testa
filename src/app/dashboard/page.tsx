import { AppShell } from "@/components/layout/app-shell";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { Card } from "@/components/ui/card";
import { getSurahs, getUserProgress } from "@/lib/supabase/queries";
import { computeDashboardStats, toSurahWithProgress } from "@/lib/utils";

export default async function DashboardPage() {
  const surahs = await getSurahs();
  const progress = await getUserProgress();
  const rows = toSurahWithProgress(surahs, progress);
  const stats = computeDashboardStats(rows);

  return (
    <AppShell>
      <StatsGrid stats={stats} />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <h3 className="mb-3 font-semibold">Cette semaine</h3>
          <p>{stats.revisionDueThisWeek} sourates à réviser.</p>
          <p>{stats.revisionDoneThisWeek} déjà révisées.</p>
        </Card>
        <Card>
          <h3 className="mb-3 font-semibold">Sourates en cours</h3>
          <ul className="space-y-2 text-sm">
            {rows.filter((r) => r.progress.status === "IN_PROGRESS").slice(0, 5).map((r) => (
              <li key={r.number}>{r.transliteration} - {r.percent}%</li>
            ))}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
