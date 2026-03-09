import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HIZB } from "@/lib/data/hizb";

export default function HizbPage() {
  return (
    <AppShell>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {HIZB.map((h) => (
          <Card key={h.number}>
            <p className="mb-2 font-semibold">Hizb {h.number}</p>
            <Progress value={Math.round((h.number / 60) * 100)} />
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
