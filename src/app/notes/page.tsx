import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { getNotes } from "@/lib/supabase/queries";

export default async function NotesPage() {
  const notes = await getNotes();
  return (
    <AppShell>
      <div className="space-y-4">
        {notes.map((note) => (
          <Card key={note.id}>
            <h3 className="font-semibold">{note.title}</h3>
            <p className="mt-2 text-sm text-zinc-300">{note.content}</p>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
