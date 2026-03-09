"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HIZB } from "@/lib/data/hizb";
import { useQuran } from "@/components/shared/quran-provider";
import { computeHizbProgress } from "@/lib/utils";

export default function HizbPage() {
  const { rows } = useQuran();
  const list = computeHizbProgress(HIZB, rows);

  return (
    <AppShell>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {list.map((h) => (
          <Card key={h.number}>
            <p className="mb-2 font-semibold">Hizb {h.number}</p>
            <Progress value={h.percent} />
            <p className="mt-2 text-xs text-zinc-400">{h.percent}% · {h.memorized}/{h.ayahs || 0} ayahs · {h.surahCount} sourates</p>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
