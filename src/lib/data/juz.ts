import { Juz } from "@/lib/types";

export const JUZ: Juz[] = Array.from({ length: 30 }, (_, i) => ({
  number: i + 1,
  name: `Juz ${i + 1}`,
  surahNumbers: []
}));
