import { Hizb } from "@/lib/types";

export const HIZB: Hizb[] = Array.from({ length: 60 }, (_, i) => ({
  number: i + 1,
  surahNumbers: []
}));
