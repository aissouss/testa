import { SURAHS } from "@/lib/data/surahs";
import { Juz } from "@/lib/types";

export const JUZ: Juz[] = Array.from({ length: 30 }, (_, i) => {
  const number = i + 1;
  return {
    number,
    name: `Juz ${number}`,
    surahNumbers: SURAHS.filter((s) => s.juzNumbers.includes(number)).map((s) => s.number)
  };
});
