import type { Language, Translations } from "./types";
import { en } from "./en";
import { fr } from "./fr";
import { de } from "./de";
import { it } from "./it";

export type { Language, Translations };

export const translations: Record<Language, Translations> = { en, fr, de, it };

export const languageLabels: Record<Language, string> = {
  en: "EN",
  fr: "FR",
  de: "DE",
  it: "IT",
};

export const languageNames: Record<Language, string> = {
  en: "English",
  fr: "Fran\u00e7ais",
  de: "Deutsch",
  it: "Italiano",
};
