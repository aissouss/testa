import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes } from "react";

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn("min-h-24 w-full rounded-md border bg-background px-3 py-2 text-sm")} {...props} />;
}
