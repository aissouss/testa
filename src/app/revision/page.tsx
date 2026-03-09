import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { getSurahs, getUserProgress } from "@/lib/supabase/queries";
import { toSurahWithProgress } from "@/lib/utils";

export default async function RevisionPage() {
  const rows = toSurahWithProgress(await getSurahs(), await getUserProgress()).filter((r) => r.percent > 0);
  return (
    <AppShell>
      <Card>
        <h3 className="mb-4 text-lg font-semibold">Révision hebdomadaire</h3>
        <div className="space-y-2 text-sm">
          {rows.map((r) => (
            <div key={r.number} className="flex items-center justify-between border-b py-2">
              <span>{r.transliteration}</span>
              <span>{r.progress.revisedThisWeek ? "Révisée ✅" : r.progress.needsRevisionThisWeek ? "À réviser" : "Planifiée"}</span>
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
