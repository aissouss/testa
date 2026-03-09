import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DashboardStats } from "@/lib/types";

export function StatsGrid({ stats }: { stats: DashboardStats }) {
  const items = [
    ["Coran mémorisé", `${stats.memorizedPercent}%`],
    ["Reste", `${stats.remainingPercent}%`],
    ["Sourates mémorisées", String(stats.memorizedSurahs)],
    ["Sourates en cours", String(stats.inProgressSurahs)],
    ["À démarrer", String(stats.notStartedSurahs)],
    ["Révision semaine", `${stats.revisionWeeklyPercent}%`]
  ];

  return (
    <div className="space-y-4">
      <Card>
        <div className="mb-3 flex items-center justify-between text-sm">
          <span>Progression globale ({stats.totalAyahsMemorized}/{stats.totalAyahs} ayahs)</span>
          <span>{stats.memorizedPercent}%</span>
        </div>
        <Progress value={stats.memorizedPercent} />
      </Card>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map(([label, value]) => (
          <Card key={label}>
            <p className="text-sm text-zinc-400">{label}</p>
            <p className="mt-2 text-2xl font-semibold">{value}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
