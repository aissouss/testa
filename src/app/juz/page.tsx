import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { JUZ } from "@/lib/data/juz";

export default function JuzPage() {
  return (
    <AppShell>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {JUZ.map((j) => (
          <Card key={j.number}>
            <p className="text-sm text-zinc-400">{j.name}</p>
            <p className="mb-2 text-xl font-semibold">Juz {j.number}</p>
            <Progress value={Math.round((j.number / 30) * 100)} />
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
