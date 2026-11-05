import {
  ArrowUpRight,
  BriefcaseBusiness,
  Truck,
  Factory,
  Globe,
  Phone,
  MapPin,
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
      <span className="brand-icon" aria-hidden="true">
        {company.acronym}
      </span>
      <span className="brand-word" translate="no">
        {company.brand}
        <small>{company.brandDescriptor}</small>
      </span>
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
          "ALYAD-DEVELOPPEMENT is developing its cybersecurity activity around business needs, exposure management and project coordination. The technical scope and delivery arrangements will be defined for each project.",
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
          "ALYAD-DEVELOPPEMENT développe son activité cybersécurité autour des besoins des entreprises, de la gestion des expositions et de la coordination des projets. Le périmètre technique et les modalités d’intervention seront définis pour chaque projet.",
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
          ? "Intended hosting provider: Vercel. Offers are subject to a quotation and confirmation of resale rights."
          : "Hébergement prévu : Vercel. Les offres sont soumises à un devis et à la confirmation des droits de commercialisation."}
      </p>
    </>
  );
}

export function CyberFocus({ language }: { language: Language }) {
  const en = language === "en";
  const c = en
    ? {
        label: "Cybersecurity at ALYAD-DEVELOPPEMENT",
        title:
          "Connecting your business priorities with your cybersecurity projects.",
        intro:
          "From Dakar, ALYAD-DEVELOPPEMENT is developing its cybersecurity activity to help businesses and institutions structure their requirements and explore exposure management solutions.",
        areas: [
          [
            "Requirements & risk scoping",
            "Discuss your business challenges, identify the environments involved and define an initial scope, priorities and operational constraints.",
          ],
          [
            "Solution orientation",
            "Explore vulnerability management, cloud security, identity, web applications and OT solutions to prepare an informed selection.",
          ],
          [
            "Project coordination",
            "Clarify stakeholders, prerequisites and responsibilities before assessment, deployment or follow-up, within the scope agreed with authorized teams.",
          ],
        ],
        projectTitle: "A local contact to help structure your project",
        statement:
          "ALYAD-DEVELOPPEMENT connects business requirements with a structured approach to Tenable solutions in Senegal. From the initial conversation to project scoping, our approach helps clarify priorities, stakeholders and next steps.",
        boundary:
          "Licensing, resale, technical delivery and support arrangements will be confirmed within the appropriate contractual framework.",
        cta: "Discuss your cybersecurity project",
      }
    : {
        label: "La cybersécurité chez ALYAD-DEVELOPPEMENT",
        title: "Relier vos priorités métier à vos projets de cybersécurité.",
        intro:
          "Depuis Dakar, ALYAD-DEVELOPPEMENT développe son activité cybersécurité pour aider les entreprises et les institutions à structurer leurs besoins et à étudier les solutions de gestion des expositions.",
        areas: [
          [
            "Cadrage des besoins & des risques",
            "Échanger sur vos enjeux métier, identifier les environnements concernés et définir un premier périmètre, les priorités et les contraintes opérationnelles.",
          ],
          [
            "Orientation vers les solutions",
            "Étudier les solutions de gestion des vulnérabilités, de sécurité cloud, d’identités, d’applications web et d’OT pour préparer un choix éclairé.",
          ],
          [
            "Coordination des projets",
            "Clarifier les interlocuteurs, les prérequis et les responsabilités avant une évaluation, un déploiement ou un suivi, sur un périmètre convenu avec les équipes habilitées.",
          ],
        ],
        projectTitle:
          "Un interlocuteur de proximité pour structurer votre projet",
        statement:
          "ALYAD-DEVELOPPEMENT relie les besoins des entreprises à une approche structurée des solutions Tenable au Sénégal. Du premier échange au cadrage du projet, notre démarche permet de clarifier les priorités, les interlocuteurs et les prochaines étapes.",
        boundary:
          "Les modalités de licence, de revente, d’intervention technique et de support seront confirmées dans le cadre contractuel approprié.",
        cta: "Parlons de votre projet cybersécurité",
      };
  return (
    <section id="cybersecurite" className="section cyber-focus">
      <div className="section-heading">
        <div>
          <span className="eyebrow">{c.label}</span>
          <h2>{c.title}</h2>
        </div>
        <p>{c.intro}</p>
      </div>
      <div className="cyber-areas">
        {c.areas.map(([title, text]) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <aside className="project-panel">
        <div>
          <h3>{c.projectTitle}</h3>
          <p>{c.statement}</p>
          <p>{c.boundary}</p>
        </div>
        <a className="button" href="#contact">
          {c.cta}
          <ArrowUpRight size={17} />
        </a>
      </aside>
    </section>
  );
}
