import {
  ArrowUpRight,
  BriefcaseBusiness,
  Truck,
  Factory,
  Globe,
  Phone,
  MapPin,
  ShieldCheck,
  Server,
  Radio,
} from "lucide-react";
import { company } from "./config";
import type { Language } from "./i18n";

export function Brand({ language }: { language: Language }) {
  return (
    <a
      className="brand alyad-brand"
      href="#"
      aria-label={`${company.name}, ${language === "en" ? "home" : "accueil"}`}
    >
      <img
        className="brand-logo"
        src="/images/alyad-logo.webp"
        alt={company.name}
        width="1312"
        height="1199"
      />
    </a>
  );
}

export function CompanySection({ language }: { language: Language }) {
  const en = language === "en";
  const c = en
    ? {
        label: "Meet ALYAD-DEVELOPPEMENT",
        title: "A company based in Dakar. A perspective that reaches further.",
        intro:
          "ALYAD-DEVELOPPEMENT « AD » SUARL operates in Senegal and internationally. Its institutional presentation brings together trading and consulting with transport, logistics, technical assistance and support for industrial and extractive sectors.",
        connection:
          "ALYAD-DEVELOPPEMENT develops a digital solutions offering spanning cybersecurity, data centers and telecommunications. Our approach brings requirements, architecture choices and project coordination together under one business contact.",
        activityTitle: "Our wider business activities",
        activities: [
          [
            "Trade & business advisory",
            "Commercial intermediation, international trading, business brokerage, consulting and business representation.",
          ],
          [
            "Transport & logistics",
            "Transport operations, warehousing, handling, freight, consignment, technical assistance and logistics advisory.",
          ],
          [
            "Industry & extractive sectors",
            "Commercial and industrial services, equipment trading and activities involving mining, petroleum and hydrocarbons, subject to required authorizations.",
          ],
          [
            "Representation & international business",
            "Representation of international companies and support for business relationships in Senegal and abroad.",
          ],
        ],
        scopeNote:
          "The corporate purpose also covers logistics infrastructure, equipment, quarry operations, mining and petroleum activities, and real estate. Regulated activities remain subject to the necessary authorizations; this presentation does not assert that a particular permit has been granted.",
        teamTitle: "Governance & organization",
        teamIntro:
          "The organization described in the institutional presentation is led by the statutory manager and Chief Executive Officer, supported by four functional responsibilities.",
        factsTitle: "Company details",
        form: "Legal form",
        formValue: "Single-member limited liability company (SUARL)",
        office: "Registered office",
        registration: "Trade register",
        ninea: "NINEA",
        phone: "Phone",
        manager: "Statutory manager",
        contact: "Discuss your project",
        call: "Call the company",
        address: "No. 72, Ngor Virage, Dakar, Senegal",
      }
    : {
        label: "Découvrez ALYAD-DEVELOPPEMENT",
        title: "Une société ancrée à Dakar. Un horizon international.",
        intro:
          "ALYAD-DEVELOPPEMENT « AD » SUARL exerce ses activités au Sénégal et à l’international. Sa présentation institutionnelle associe le négoce et le conseil au transport, à la logistique, à l’assistance technique et à l’accompagnement des secteurs industriels et extractifs.",
        connection:
          "ALYAD-DEVELOPPEMENT développe une offre de solutions numériques en cybersécurité, data centers et télécommunications. Notre démarche relie les besoins, les choix d’architecture et la coordination du projet autour d’un interlocuteur commercial unique.",
        activityTitle: "Nos autres domaines d’activité",
        activities: [
          [
            "Négoce & conseil en affaires",
            "Intermédiation commerciale, négoce international, courtage en affaires, consulting, conseil et représentation d’entreprises.",
          ],
          [
            "Transport & logistique",
            "Opérations de transport, entreposage, manutention, fret, consignation, assistance technique et conseil en logistique.",
          ],
          [
            "Industrie & secteurs extractifs",
            "Prestations commerciales et industrielles, négoce d’équipements et activités liées aux mines, au pétrole et aux hydrocarbures, sous réserve des autorisations requises.",
          ],
          [
            "Représentation & international",
            "Représentation d’entreprises internationales et accompagnement des relations d’affaires au Sénégal et à l’étranger.",
          ],
        ],
        scopeNote:
          "L’objet social couvre également les infrastructures logistiques, les équipements, les activités de carrière, les opérations minières et pétrolières ainsi que l’immobilier. Les activités réglementées restent soumises aux autorisations nécessaires ; cette présentation ne vaut pas affirmation de détention d’un agrément particulier.",
        teamTitle: "Gouvernance & organisation",
        teamIntro:
          "L’organisation présentée dans le document institutionnel s’articule autour du Gérant statutaire et Directeur général, avec quatre fonctions de responsabilité.",
        factsTitle: "Repères administratifs",
        form: "Forme juridique",
        formValue: company.legalForm,
        office: "Siège social",
        registration: "Registre du commerce",
        ninea: "NINEA",
        phone: "Téléphone",
        manager: "Gérant statutaire",
        contact: "Parlons de votre projet",
        call: "Appeler la société",
        address: company.address,
      };
  const icons = [BriefcaseBusiness, Truck, Factory, Globe];
  return (
    <section id="societe" className="section company-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">{c.label}</span>
          <h2>{c.title}</h2>
        </div>
        <p>
          {en
            ? "Trade, advisory, logistics and international representation."
            : "Négoce, conseil, logistique et représentation internationale."}
        </p>
      </div>
      <div className="company-intro">
        <div>
          <p className="company-lead">{c.intro}</p>
          <p>{c.connection}</p>
          <a className="text-link" href="#contact">
            {c.contact}
            <ArrowUpRight size={17} />
          </a>
        </div>
        <aside className="company-facts">
          <h3>{c.factsTitle}</h3>
          <p className="company-legal-name" translate="no">
            {company.legalName}
          </p>
          <dl>
            <div>
              <dt>{c.form}</dt>
              <dd>{c.formValue}</dd>
            </div>
            <div>
              <dt>{c.office}</dt>
              <dd>{c.address}</dd>
            </div>
            <div>
              <dt>{c.registration}</dt>
              <dd>{company.registration}</dd>
            </div>
            <div>
              <dt>{c.ninea}</dt>
              <dd>{company.ninea}</dd>
            </div>
            <div>
              <dt>{c.manager}</dt>
              <dd>{company.manager}</dd>
            </div>
          </dl>
          <a
            className="company-call"
            href={`tel:${company.phoneHref}`}
            aria-label={`${c.call} : ${company.phone}`}
          >
            <Phone size={17} />
            {company.phone}
          </a>
        </aside>
      </div>
      <details className="company-disclosure">
        <summary>
          {en
            ? "Organization & other business activities"
            : "Organisation & autres activités"}
          <ArrowUpRight size={18} aria-hidden="true" />
        </summary>
        <h3 className="company-subtitle">{c.activityTitle}</h3>
        <div className="company-activities">
          {c.activities.map(([title, text], index) => {
            const Icon = icons[index];
            return (
              <article key={title}>
                <Icon size={25} aria-hidden="true" />
                <h4>{title}</h4>
                <p>{text}</p>
              </article>
            );
          })}
        </div>
        <p className="company-scope-note">{c.scopeNote}</p>
        <div className="company-team-heading">
          <h3>{c.teamTitle}</h3>
          <p>{c.teamIntro}</p>
        </div>
        <div className="company-team">
          {company.team.map((person) => (
            <article key={person.name}>
              <span className="team-initials" aria-hidden="true">
                {person.name
                  .split(" ")
                  .filter((word) => word.length > 0)
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 3)}
              </span>
              <h4 translate="no">{person.name}</h4>
              <p className="team-role">{en ? person.roleEn : person.roleFr}</p>
              <p>{en ? person.missionEn : person.missionFr}</p>
            </article>
          ))}
        </div>
      </details>
      <div className="company-address-line">
        <MapPin size={17} aria-hidden="true" />
        <span>{c.address}</span>
      </div>
    </section>
  );
}

export function CompanyLegal({ language }: { language: Language }) {
  const en = language === "en";
  return (
    <>
      <p>
        {en ? "Website publisher" : "Éditeur du site"} :{" "}
        <strong translate="no">{company.legalName}</strong>.
      </p>
      <dl className="legal-company-details">
        <div>
          <dt>{en ? "Legal form" : "Forme juridique"}</dt>
          <dd>
            {en
              ? "Single-member limited liability company (SUARL)"
              : company.legalForm}
          </dd>
        </div>
        <div>
          <dt>{en ? "Registered office" : "Siège social"}</dt>
          <dd>
            {en ? "No. 72, Ngor Virage, Dakar, Senegal" : company.address}
          </dd>
        </div>
        <div>
          <dt>{en ? "Trade register" : "Registre du commerce"}</dt>
          <dd>{company.registration}</dd>
        </div>
        <div>
          <dt>NINEA</dt>
          <dd>{company.ninea}</dd>
        </div>
        <div>
          <dt>{en ? "Statutory manager" : "Gérant statutaire"}</dt>
          <dd>{company.manager}</dd>
        </div>
        <div>
          <dt>{en ? "Phone" : "Téléphone"}</dt>
          <dd>{company.phone}</dd>
        </div>
      </dl>
      <p>
        {en
          ? "Company information transcribed from the institutional presentation supplied by the company."
          : "Informations de société reprises de la présentation institutionnelle fournie par l’entreprise."}
      </p>
      <p>
        {en
          ? "Intended hosting provider: Vercel. Services and commitments are specified in a quotation."
          : "Hébergement prévu : Vercel. Les prestations et les engagements sont précisés dans un devis."}
      </p>
    </>
  );
}

export function MultiExpertise({
  language,
  onSelect,
}: {
  language: Language;
  onSelect: (category: string) => void;
}) {
  const en = language === "en";
  const fields = en
    ? [
        {
          id: "cyber",
          title: "Cybersecurity",
          text: "Understand exposures, strengthen controls and organize your risk reduction priorities.",
          items: [
            "Vulnerabilities & assessments",
            "Cloud, identity & applications",
            "Industrial security & monitoring",
          ],
          action: "Explore cybersecurity",
        },
        {
          id: "datacenter",
          title: "Data centers",
          text: "Design the foundations that support your data, applications and operational continuity.",
          items: [
            "Architecture & virtualization",
            "Storage, backup & recovery",
            "Power, cooling & monitoring",
          ],
          action: "Explore data centers",
        },
        {
          id: "telecom",
          title: "Telecommunications",
          text: "Connect people, locations and services through networks built around your business.",
          items: [
            "LAN, Wi-Fi & optical fiber",
            "Site connectivity & SD-WAN",
            "Voice, Internet & radio links",
          ],
          action: "Explore telecommunications",
        },
      ]
    : [
        {
          id: "cyber",
          title: "Cybersécurité",
          text: "Comprendre les expositions, renforcer les protections et organiser vos priorités de réduction du risque.",
          items: [
            "Vulnérabilités & audits",
            "Cloud, identités & applications",
            "Sécurité industrielle & supervision",
          ],
          action: "Explorer la cybersécurité",
        },
        {
          id: "datacenter",
          title: "Data centers",
          text: "Concevoir les fondations qui soutiennent vos données, vos applications et la continuité de votre activité.",
          items: [
            "Architecture & virtualisation",
            "Stockage, sauvegarde & reprise",
            "Énergie, refroidissement & supervision",
          ],
          action: "Explorer les data centers",
        },
        {
          id: "telecom",
          title: "Télécommunications",
          text: "Relier les personnes, les sites et les services avec des réseaux pensés pour vos usages.",
          items: [
            "LAN, Wi-Fi & fibre optique",
            "Interconnexion & SD-WAN",
            "Voix, Internet & liaisons radio",
          ],
          action: "Explorer les télécommunications",
        },
      ];
  const icons = { cyber: ShieldCheck, datacenter: Server, telecom: Radio };
  return (
    <section id="expertises" className="section multi-expertise">
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            {en ? "ALYAD, by your side" : "ALYAD, à vos côtés"}
          </span>
          <h2>
            {en
              ? "Three fields. One shared ambition."
              : "Trois domaines. Une même ambition."}
          </h2>
        </div>
        <p>
          {en
            ? "Move your projects forward with one business contact and solutions built around your priorities."
            : "Faire avancer vos projets avec un interlocuteur commercial unique et des solutions choisies selon vos priorités."}
        </p>
      </div>
      <div className="expertise-grid">
        {fields.map((field, index) => {
          const Icon = icons[field.id as keyof typeof icons];
          return (
            <article
              key={field.id}
              className={`expertise-card domain-${field.id}`}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <div className="expertise-image" aria-hidden="true">
                <Icon size={24} />
                <span>{field.title}</span>
              </div>
              <h3>{field.title}</h3>
              <p>{field.text}</p>
              <ul>
                {field.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a href="#solutions" onClick={() => onSelect(field.id)}>
                {field.action}
                <ArrowUpRight size={18} />
              </a>
            </article>
          );
        })}
      </div>
      <div className="engagement-line">
        <span className="engagement-mark" aria-hidden="true" />
        <p>
          {en
            ? "Your business sets the direction. We help define the architecture, scope and next steps."
            : "Votre activité donne le cap. Nous vous aidons à définir l’architecture, le périmètre et les prochaines étapes."}
        </p>
        <a href="#contact">
          {en ? "Build my project" : "Construire mon projet"}
          <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  );
}
