import { useState } from "react";
import { ArrowUpRight, ArrowRight, MapPin, Check, Plus } from "lucide-react";
import { company } from "./config";
import type { Language } from "./i18n";
import type { SitePage } from "./routing";
import { localLink } from "./routing";
import { solutionIcon } from "./solutionIcons";

export function PageIntro({
  language,
  page,
}: {
  language: Language;
  page: Exclude<SitePage, "home">;
}) {
  const en = language === "en";
  const copy = {
    solutions: {
      fr: [
        "Nos solutions",
        "Des réponses concrètes à vos enjeux numériques.",
        "Explorez 21 offres de cybersécurité, de data centers et de télécommunications. Choisissez un domaine ou découvrez une fiche détaillée.",
      ],
      en: [
        "Our solutions",
        "Practical answers to your digital challenges.",
        "Explore 21 cybersecurity, data center and telecommunications offerings. Choose a field or read a detailed solution.",
      ],
    },
    resources: {
      fr: [
        "Ressources",
        "Comprendre pour mieux décider.",
        "Des repères pour préparer votre projet : risques, résilience, connectivité et vocabulaire technique.",
      ],
      en: [
        "Resources",
        "Understand more. Decide better.",
        "Guidance to prepare your project: risk, resilience, connectivity and technical terms.",
      ],
    },
    company: {
      fr: [
        "La société",
        "ALYAD, des responsabilités et un ancrage local.",
        "Découvrez notre identité, notre organisation et les domaines d’activité présentés dans notre documentation institutionnelle.",
      ],
      en: [
        "Our company",
        "ALYAD, clear responsibilities and local roots.",
        "Explore our identity, organization and business activities as described in our institutional documentation.",
      ],
    },
  };
  const [label, title, text] = copy[page][en ? "en" : "fr"];
  return (
    <section className="page-intro">
      <div className="page-breadcrumb">
        <a href={localLink("/", language)}>{en ? "Home" : "Accueil"}</a>
        <ArrowRight size={13} aria-hidden="true" />
        <span>{label}</span>
      </div>
      <span className="eyebrow">{label}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}

export function TeamIntro({ language }: { language: Language }) {
  const en = language === "en";
  return (
    <section id="equipe" className="section team-intro">
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            {en ? "The people behind ALYAD" : "Les personnes derrière ALYAD"}
          </span>
          <h2>
            {en
              ? "People you can identify. Responsibilities you can understand."
              : "Des personnes identifiées. Des responsabilités claires."}
          </h2>
        </div>
        <p>
          {en
            ? "Our management brings together project oversight, legal affairs, institutional relations and administration."
            : "Notre direction réunit le pilotage des projets, les affaires juridiques, les relations institutionnelles et la gestion administrative."}
        </p>
      </div>
      <div className="home-team-grid">
        {company.team.map((person, index) => (
          <article key={person.name} className={index === 0 ? "team-lead" : ""}>
            {person.portrait ? (
              <img
                src={person.portrait}
                alt={person.name}
                width="240"
                height="280"
                loading="lazy"
              />
            ) : (
              <div className="home-team-avatar" aria-hidden="true">
                {person.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 3)}
              </div>
            )}
            <div>
              <h3>{person.name}</h3>
              <p>{en ? person.roleEn : person.roleFr}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="team-intro-bottom">
        <span>
          <MapPin size={15} aria-hidden="true" />
          {en ? "Based in Dakar, Senegal" : "Basés à Dakar, au Sénégal"}
        </span>
        <a href={localLink("/societe", language)}>
          {en ? "Meet our company" : "Découvrir la société"}
          <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  );
}

const stories = {
  fr: [
    {
      id: "sdwan",
      tab: "Relier mes sites",
      title: "Vos équipes travaillent sur plusieurs sites ?",
      text: "Le projet peut associer l’interconnexion, la qualité des accès et les scénarios de secours. L’enjeu : préparer un fonctionnement cohérent pour les applications et les utilisateurs.",
      points: [
        "Cartographier les flux et les usages prioritaires.",
        "Étudier les accès, la sécurité et la continuité.",
        "Préparer une recette sur des scénarios concrets.",
      ],
      action: "Explorer l’interconnexion",
    },
    {
      id: "backup-recovery",
      tab: "Préparer la reprise",
      title: "Vos services doivent pouvoir redémarrer.",
      text: "Une stratégie de protection se construit autour des données et des applications à restaurer. Les copies, les accès et les procédures doivent être étudiés ensemble, puis testés.",
      points: [
        "Définir les priorités et les objectifs RPO/RTO.",
        "Préparer les copies de protection et les procédures.",
        "Vérifier la restauration lors d’exercices documentés.",
      ],
      action: "Explorer la reprise d’activité",
    },
    {
      id: "vulnerabilities",
      tab: "Prioriser les risques",
      title: "Par où commencer pour réduire les vulnérabilités ?",
      text: "Une première évaluation aide à connaître les actifs et à organiser les corrections. La criticité métier, l’exposition et les contraintes de maintenance donnent du sens aux constats techniques.",
      points: [
        "Définir un périmètre d’évaluation autorisé.",
        "Rapprocher les constats de leur contexte métier.",
        "Organiser le traitement et la vérification des corrections.",
      ],
      action: "Explorer la gestion des vulnérabilités",
    },
  ],
  en: [
    {
      id: "sdwan",
      tab: "Connect my locations",
      title: "Do your teams work across several locations?",
      text: "The project can bring together site connectivity, access quality and fallback scenarios. The objective is to prepare consistent operations for applications and users.",
      points: [
        "Map traffic flows and priority use cases.",
        "Assess access, security and continuity.",
        "Prepare acceptance tests using real scenarios.",
      ],
      action: "Explore site connectivity",
    },
    {
      id: "backup-recovery",
      tab: "Prepare recovery",
      title: "Your services need a path back to operation.",
      text: "A protection strategy starts with the data and applications to restore. Copies, access and procedures need to be assessed together, then tested.",
      points: [
        "Define priorities and RPO/RTO objectives.",
        "Prepare protection copies and procedures.",
        "Verify restoration through documented exercises.",
      ],
      action: "Explore disaster recovery",
    },
    {
      id: "vulnerabilities",
      tab: "Prioritize risks",
      title: "Where should vulnerability reduction begin?",
      text: "An initial assessment helps identify assets and organize fixes. Business criticality, exposure and maintenance constraints give technical findings meaning.",
      points: [
        "Define an authorized assessment scope.",
        "Connect findings with business context.",
        "Organize remediation and verification.",
      ],
      action: "Explore vulnerability management",
    },
  ],
};
export function FieldStories({ language }: { language: Language }) {
  const [selected, setSelected] = useState("sdwan");
  const en = language === "en";
  const items = stories[language];
  const story = items.find((item) => item.id === selected)!;
  const Icon = solutionIcon(story.id);
  return (
    <section id="situations" className="section field-stories">
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            {en ? "From your needs to the project" : "De vos besoins au projet"}
          </span>
          <h2>
            {en
              ? "A practical starting point. A clear next step."
              : "Un point de départ concret. Une prochaine étape claire."}
          </h2>
        </div>
        <p>
          {en
            ? "Explore common project situations. These examples describe possible needs and do not represent completed client projects."
            : "Explorez des situations types. Ces exemples décrivent des besoins possibles et ne sont pas présentés comme des réalisations clients."}
        </p>
      </div>
      <div className="story-layout">
        <div className="story-visuals" aria-hidden="true">
          <div className="context-photo context-collaboration" />
          <div className="context-photo context-field" />
          <span>{en ? "Context illustrations" : "Visuels d’illustration"}</span>
        </div>
        <div className="story-content">
          <div
            className="story-choices"
            role="group"
            aria-label={
              en
                ? "Choose a project situation"
                : "Choisir une situation de projet"
            }
          >
            {items.map((item) => (
              <button
                type="button"
                key={item.id}
                aria-pressed={story.id === item.id}
                onClick={() => setSelected(item.id)}
              >
                {item.tab}
              </button>
            ))}
          </div>
          <div className="story-panel" aria-live="polite" key={story.id}>
            <span className="story-symbol">
              <Icon size={25} aria-hidden="true" />
            </span>
            <h3>{story.title}</h3>
            <p>{story.text}</p>
            <ul>
              {story.points.map((point) => (
                <li key={point}>
                  <Check size={16} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <a
              href={localLink(
                "/solutions",
                language,
                { fiche: story.id },
                "guide",
              )}
            >
              {story.action}
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const method = {
  fr: [
    {
      title: "Comprendre votre environnement",
      text: "Nous cadrons vos usages, les systèmes concernés, les contraintes et les objectifs métier.",
      deliverable: "Un besoin reformulé et un périmètre initial à valider.",
    },
    {
      title: "Choisir le bon périmètre",
      text: "Nous préparons les choix d’architecture, le dimensionnement et les prestations à étudier.",
      deliverable:
        "Une proposition de périmètre, de responsabilités et de critères de recette.",
    },
    {
      title: "Préparer votre déploiement",
      text: "Nous définissons les prérequis, les interlocuteurs et les étapes avant toute intervention autorisée.",
      deliverable:
        "Un cadre de mise en œuvre et des conditions d’intervention convenues.",
    },
    {
      title: "Faire vivre votre démarche",
      text: "Selon les prestations retenues, nous préparons la prise en main et le suivi des priorités.",
      deliverable:
        "Des prochaines étapes documentées et des points de suivi définis.",
    },
  ],
  en: [
    {
      title: "Understand your environment",
      text: "We scope your use cases, systems, constraints and business objectives.",
      deliverable: "A clarified requirement and an initial scope to validate.",
    },
    {
      title: "Choose the right scope",
      text: "We prepare architecture choices, sizing and services to assess.",
      deliverable: "Proposed scope, responsibilities and acceptance criteria.",
    },
    {
      title: "Prepare your deployment",
      text: "We define prerequisites, stakeholders and stages before authorized work.",
      deliverable:
        "An implementation framework and agreed intervention conditions.",
    },
    {
      title: "Keep your program moving",
      text: "Depending on the selected services, we prepare onboarding and priority tracking.",
      deliverable: "Documented next steps and agreed follow-up points.",
    },
  ],
};
export function MethodSteps({ language }: { language: Language }) {
  const [active, setActive] = useState(0);
  const en = language === "en";
  return (
    <ol className="method-list">
      {method[language].map((item, index) => (
        <li
          className={`method-item ${active === index ? "active" : ""}`}
          key={item.title}
        >
          <button
            type="button"
            aria-expanded={active === index}
            aria-controls={`method-panel-${index}`}
            onClick={() => setActive(active === index ? -1 : index)}
          >
            <span className="method-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{item.title}</span>
            <Plus size={17} aria-hidden="true" />
          </button>
          <div
            id={`method-panel-${index}`}
            hidden={active !== index}
            className="method-panel"
          >
            <p>{item.text}</p>
            <p className="method-deliverable">
              <strong>
                {en ? "To prepare together" : "À préparer ensemble"}
              </strong>
              {item.deliverable}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
