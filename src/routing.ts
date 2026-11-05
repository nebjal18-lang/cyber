import type { Language } from "./i18n";
export type SitePage = "home" | "solutions" | "resources" | "company";
export function readPage(): SitePage {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/solutions") return "solutions";
  if (path === "/ressources") return "resources";
  if (path === "/societe") return "company";
  const query = new URLSearchParams(window.location.search);
  if (path === "/" && (query.has("categorie") || query.has("fiche")))
    return "solutions";
  return "home";
}
export function localLink(
  path: string,
  language: Language,
  params: Record<string, string> = {},
  anchor = "",
) {
  const query = new URLSearchParams(params);
  if (language === "en") query.set("lang", "en");
  return (
    path +
    (query.size ? "?" + query.toString() : "") +
    (anchor ? "#" + anchor : "")
  );
}

/** Keep shared links from the earlier single-page site on the solution page. */
export function normalizeLegacyRoute() {
  const url = new URL(window.location.href);
  if (
    url.pathname === "/" &&
    (url.searchParams.has("categorie") || url.searchParams.has("fiche"))
  ) {
    url.pathname = "/solutions";
    history.replaceState(null, "", url);
  }
}
