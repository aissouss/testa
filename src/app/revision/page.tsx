"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuran } from "@/components/shared/quran-provider";

export default function RevisionPage() {
  const { rows, markRevised } = useQuran();
  const [filter, setFilter] = useState("due");

  const known = rows.filter((r) => r.progress.status !== "TO_MEMORIZE" && r.percent > 0);
  const due = known.filter((r) => r.progress.needsRevisionThisWeek);
  const done = due.filter((r) => r.progress.revisedThisWeek);
  const weeklyPercent = due.length ? Math.round((done.length / due.length) * 100) : 0;

  const list = useMemo(() => {
    if (filter === "done") return known.filter((r) => r.progress.revisedThisWeek);
    if (filter === "all") return known;
    return due;
  }, [known, due, filter]);

  return (
    <AppShell>
      <Card className="mb-4">
        <h3 className="font-semibold">Suivi hebdomadaire</h3>
        <p className="text-sm text-zinc-400">Connues: {known.length} · À réviser: {due.length} · Révisées: {done.length} · {weeklyPercent}%</p>
      </Card>
      <div className="mb-3">
        <select className="rounded border bg-card px-3 py-2" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="due">À réviser</option>
          <option value="done">Révisées cette semaine</option>
          <option value="all">Toutes connues</option>
        </select>
      </div>
      <Card>
        <div className="space-y-2 text-sm">
          {list.map((r) => (
            <div key={r.number} className="flex items-center justify-between border-b py-2">
              <div>
                <p>{r.number}. {r.transliteration}</p>
                <p className="text-xs text-zinc-400">Dernière révision: {r.progress.lastRevisionAt ? new Date(r.progress.lastRevisionAt).toLocaleDateString() : "jamais"}</p>
              </div>
              <Button size="sm" variant="outline" onClick={() => markRevised(r.number)}>Marquer révisée</Button>
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
