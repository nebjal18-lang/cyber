import catalogue from "./catalog.json";
import type { Language } from "./i18n";
export function getProducts(language: Language) {
  return catalogue.map(({ fr, en, ...product }) => ({
    ...product,
    ...(language === "en" ? en : fr),
  }));
}
export type Product = ReturnType<typeof getProducts>[number];
