import english from "./locales/en.json";
import { company } from "./config";
export type Language = "fr" | "en";
export function readLanguage(): Language {
  return new URLSearchParams(location.search).get("lang") === "en"
    ? "en"
    : "fr";
}
export function translator(language: Language) {
  return (source: string): string =>
    language === "en"
      ? ((english as Record<string, string>)[
          source.replace(/\s+/g, " ").trim()
        ] ?? source)
      : source;
}
export function updateMetadata(language: Language) {
  updateCompanyStructuredData();
  document.documentElement.lang = language;
  const en = language === "en";
  document.title = en
    ? `${company.name} | Cybersecurity, data centers & telecoms`
    : `${company.name} | Cybersécurité, data centers & télécoms`;
  const description = en
    ? "ALYAD-DEVELOPPEMENT in Dakar: cybersecurity planning and Cybersecurity, data centers & telecoms."
    : "ALYAD-DEVELOPPEMENT à Dakar : cybersécurité, infrastructures data center et télécommunications au Sénégal.";
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", description);
  document
    .querySelector('meta[property="og:title"]')
    ?.setAttribute("content", document.title);
  document
    .querySelector('meta[property="og:description"]')
    ?.setAttribute("content", description);
}

export function updateCompanyStructuredData() {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = "company-structured-data";
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    legalName: company.legalName,
    telephone: company.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.streetAddress,
      addressLocality: company.city,
      addressCountry: company.countryCode,
    },
    identifier: [
      {
        "@type": "PropertyValue",
        name: "Registre du commerce",
        value: company.registration,
      },
      { "@type": "PropertyValue", name: "NINEA", value: company.ninea },
    ],
  });
  document.getElementById(script.id)?.remove();
  document.head.appendChild(script);
}
