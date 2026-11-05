import { ArrowUpRight, Check, BookOpen, ArrowRight } from "lucide-react";
import type { Product } from "./catalog";
import type { Language } from "./i18n";

type Props = {
  language: Language;
  products: Product[];
  selected: string;
  onSelect: (id: string) => void;
  onRequest: (name: string) => void;
};
export function SolutionGuide({
  language,
  products,
  selected,
  onSelect,
  onRequest,
}: Props) {
  const en = language === "en";
  const p = products.find((p) => p.id === selected) ?? products[0];
  const hasSelection = products.some((product) => product.id === selected);
  const c = en
    ? {
        label: "Make an informed choice",
        title: "Understand the solution. Define the right scope.",
        intro:
          "Explore how each solution fits into a digital infrastructure: use cases, capabilities, deployment preparation and points to confirm before a quotation.",
        select: "Explore a detailed solution",
        overview: "What does it address?",
        capabilities: "What to explore",
        example: "An example for your organization",
        prerequisites: "Preparing your project",
        licensing: "Scope and service commitments",
        source: "Our project approach",
        cta: "Request a scoped proposal",
        note: "Each project is scoped around your environment, technical constraints and business priorities. Equipment, implementation and service commitments are specified in your proposal.",
        comparison: "Which solution for which need?",
        solution: "Solution",
        need: "Primary use case",
        audience: "Who is it for?",
        detail: "Read this guide",
      }
    : {
        label: "Choisir en connaissance de cause",
        title: "Comprendre la solution. Définir le bon périmètre.",
        intro:
          "Découvrez la place de chaque solution dans votre démarche numérique : usages, capacités à étudier, préparation du déploiement et points à confirmer avant un devis.",
        select: "Explorer une fiche détaillée",
        overview: "À quel besoin répond-elle ?",
        capabilities: "Les possibilités à étudier",
        example: "Un exemple pour votre organisation",
        prerequisites: "Préparer votre projet",
        licensing: "Périmètre et engagements",
        source: "Notre méthode projet",
        cta: "Demander une proposition adaptée",
        note: "Chaque projet est cadré selon votre environnement, vos contraintes techniques et vos priorités métier. Les équipements, la réalisation et les engagements de service sont précisés dans votre proposition.",
        comparison: "Quelle solution pour quel besoin ?",
        solution: "Solution",
        need: "Usage principal",
        audience: "Pour qui ?",
        detail: "Lire cette fiche",
      };
  return (
    <section id="guide" className="section guide">
      <div className="section-heading">
        <div>
          <span className="eyebrow">{c.label}</span>
          <h2>{c.title}</h2>
        </div>
        <p>{c.intro}</p>
      </div>
      <div className="guide-picker">
        <BookOpen size={22} aria-hidden="true" />
        <label htmlFor="guide-select">{c.select}</label>
        <select
          id="guide-select"
          value={hasSelection ? p.id : ""}
          onChange={(e) => onSelect(e.target.value)}
        >
          <option value="" disabled>
            {en
              ? "Choose a solution to explore"
              : "Choisissez une solution à découvrir"}
          </option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
      {hasSelection ? (
        <article
          className={`guide-panel domain-${p.category}`}
          aria-labelledby="guide-title"
        >
          <div className="guide-summary">
            <span className="eyebrow">{p.label}</span>
            <h3 id="guide-title">{p.name}</h3>
            <p>{p.text}</p>
            <ul>
              {p.tags.map((tag) => (
                <li key={tag}>
                  <Check size={15} aria-hidden="true" />
                  {tag}
                </li>
              ))}
            </ul>
            <a
              className="button"
              href="#contact"
              onClick={() => onRequest(p.id)}
            >
              {c.cta}
              <ArrowUpRight size={17} />
            </a>
            <a className="source-link" href="#approche">
              {c.source}
              <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="guide-body">
            <div>
              <h4>{c.overview}</h4>
              <p>{p.overview}</p>
            </div>
            <div>
              <h4>{c.capabilities}</h4>
              <ul>
                {p.capabilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="use-case">
              <h4>{c.example}</h4>
              <p>{p.example}</p>
            </div>
            <div>
              <h4>{c.prerequisites}</h4>
              <ul>
                {p.prerequisites.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>{c.licensing}</h4>
              <p>{p.licensing}</p>
            </div>
          </div>
        </article>
      ) : (
        <div className="guide-intro-note">
          <p>
            {en
              ? "Select a cybersecurity, data center or telecommunications solution to explore its use cases, preparation requirements and scope."
              : "Sélectionnez une solution de cybersécurité, de data centers ou de télécommunications pour découvrir ses usages, ses prérequis et son périmètre."}
          </p>
        </div>
      )}
      <p className="editorial-note">{c.note}</p>
      <details className="comparison-disclosure">
        <summary>
          {c.comparison}
          <ArrowRight size={19} aria-hidden="true" />
        </summary>
        <div
          className="comparison-scroll"
          role="region"
          aria-label={c.comparison}
          tabIndex={0}
        >
          <table>
            <thead>
              <tr>
                <th scope="col">{c.solution}</th>
                <th scope="col">{c.need}</th>
                <th scope="col">{c.audience}</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <th scope="row">
                    <button
                      type="button"
                      onClick={() => {
                        onSelect(product.id);
                        document.getElementById("guide-select")?.focus();
                        document.getElementById("guide")?.scrollIntoView({
                          behavior: matchMedia(
                            "(prefers-reduced-motion: reduce)",
                          ).matches
                            ? "auto"
                            : "smooth",
                        });
                      }}
                      aria-label={`${c.detail} : ${product.name}`}
                    >
                      {product.name}
                      <ArrowRight size={14} />
                    </button>
                  </th>
                  <td>{product.text}</td>
                  <td>{product.best}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}
const knowledge = {
  fr: {
    label: "Mieux comprendre pour mieux décider",
    title: "Des choix techniques qui servent votre activité.",
    intro:
      "Une solution apporte de la visibilité. Sa valeur se construit aussi dans la manière d’organiser les équipes, de traiter les constats et de vérifier les progrès.",
    articles: [
      {
        title: "Vulnérabilité, exposition et risque : quelle différence ?",
        text: "Une vulnérabilité est une faiblesse technique. Une exposition tient compte des conditions qui rendent une ressource accessible ou attaquable, comme une configuration ou une permission. Le risque dépend aussi de l’impact métier et de la probabilité d’exploitation. Une organisation gagne à rapprocher ces trois lectures pour éviter de traiter toutes les alertes de la même façon.",
      },
      {
        title: "Résilience : prévoir la panne et tester la reprise",
        text: "Un data center résilient se conçoit autour des services à maintenir : énergie, réseau, calcul, données et procédures. La redondance limite certaines pannes ; la sauvegarde et la reprise traitent d’autres scénarios. Les objectifs de perte de données et de délai de remise en service doivent être définis avec le métier puis vérifiés par des exercices.",
      },
      {
        title: "Connectivité : penser les usages, pas seulement le débit",
        text: "La qualité d’un réseau se mesure dans les usages : appels, accès applicatifs, transferts et mobilité. Le débit ne suffit pas ; la latence, la variation des délais, la perte de paquets et la couverture ont aussi un rôle. Une recette utile vérifie les scénarios réels, y compris la bascule vers un lien de secours et la séparation des accès sensibles.",
      },
    ],
    cycleTitle: "Du premier état des lieux au suivi des corrections",
    cycle: [
      [
        "Cadrer",
        "Identifier les objectifs métier, les propriétaires, le périmètre autorisé et les règles de traitement des données.",
      ],
      [
        "Évaluer",
        "Préparer les accès et les fenêtres d’intervention, puis recueillir les constats avec une méthode adaptée aux actifs.",
      ],
      [
        "Prioriser",
        "Valider les résultats, rapprocher les faiblesses de leur contexte et attribuer les actions aux responsables concernés.",
      ],
      [
        "Corriger et vérifier",
        "Passer par la gestion du changement, réévaluer les actifs et suivre les écarts qui restent à traiter.",
      ],
    ],
    glossaryTitle: "Les termes utiles, simplement",
    terms: [
      [
        "RPO",
        "Objectif de point de reprise : quantité de données que l’organisation accepte de perdre, exprimée en durée.",
      ],
      [
        "RTO",
        "Objectif de délai de reprise : durée cible pour remettre un service en fonctionnement après un incident.",
      ],
      [
        "LAN et WAN",
        "Le LAN relie les équipements d’un site ; le WAN relie plusieurs sites ou réseaux distants.",
      ],
      [
        "SD-WAN",
        "Approche de pilotage des interconnexions qui applique des politiques de trafic à plusieurs accès réseau.",
      ],
      [
        "Qualité de service",
        "Règles permettant de différencier et de prioriser certains flux, par exemple la voix, selon les capacités disponibles.",
      ],
      [
        "VoIP",
        "Transport des communications vocales sur des réseaux IP, avec des exigences de sécurité et de qualité à étudier.",
      ],
      [
        "Gestion des expositions",
        "Démarche qui rapproche plusieurs sources de faiblesse et leur contexte pour organiser la réduction du risque.",
      ],
      [
        "CVE",
        "Identifiant public d’une vulnérabilité connue. Il aide à rapprocher un constat des informations de référence.",
      ],
      [
        "CVSS",
        "Cadre de notation de la sévérité technique d’une vulnérabilité. Il ne mesure pas à lui seul le risque propre à votre entreprise.",
      ],
      [
        "Scan authentifié",
        "Évaluation utilisant des accès autorisés afin d’obtenir davantage d’informations sur le système examiné.",
      ],
      [
        "Chemin d’attaque",
        "Enchaînement de relations ou de faiblesses pouvant contribuer à une progression vers un actif sensible.",
      ],
      [
        "CSPM",
        "Gestion de la posture de sécurité cloud : examen de configurations et de pratiques au regard de règles définies.",
      ],
      [
        "CIEM",
        "Gestion des droits dans les infrastructures cloud : lecture des permissions et des accès effectifs pour limiter les excès.",
      ],
      [
        "IT et OT",
        "L’IT traite les systèmes d’information ; l’OT concerne les technologies qui supervisent ou pilotent des opérations physiques.",
      ],
      [
        "Remédiation",
        "Traitement d’une faiblesse par correction, changement de configuration ou mesure compensatoire, suivi d’une vérification.",
      ],
    ],
    prepareTitle: "Préparons un échange utile",
    prepareText:
      "Il n’est pas nécessaire de transmettre un inventaire sensible pour un premier rendez-vous. Ces informations de cadrage suffisent pour commencer.",
    questions: [
      "Quelles activités et quels services devez-vous protéger en priorité ?",
      "Quels types d’actifs sont concernés : postes, serveurs, cloud, identités, applications ou systèmes industriels ?",
      "Qui décide du périmètre, qui administre les systèmes et qui réalisera les corrections ?",
      "Quelles contraintes d’hébergement, de connectivité, de confidentialité et de maintenance faut-il respecter ?",
      "Quel calendrier et quelle enveloppe budgétaire souhaitez-vous étudier ?",
    ],
    cta: "Préparer mon échange",
  },
  en: {
    label: "Understand more. Decide better.",
    title: "Technical choices that serve your business.",
    intro:
      "A solution provides visibility. Its value also depends on how teams organize, address findings and verify progress.",
    articles: [
      {
        title: "Vulnerability, exposure and risk: what is the difference?",
        text: "A vulnerability is a technical weakness. Exposure includes conditions that make a resource reachable or attackable, such as configuration or permissions. Risk also depends on business impact and the likelihood of exploitation. Bringing these perspectives together helps organizations avoid treating every alert in the same way.",
      },
      {
        title: "Resilience: plan for failure and test recovery",
        text: "A resilient data center is designed around services to maintain: power, networking, compute, data and procedures. Redundancy limits some failures; backup and recovery address other scenarios. Data loss and recovery time objectives should be defined with business owners and verified through exercises.",
      },
      {
        title: "Connectivity: focus on use, not only bandwidth",
        text: "Network quality is measured through actual use: calls, applications, transfers and mobility. Bandwidth alone is not enough; latency, delay variation, packet loss and coverage also matter. Meaningful acceptance testing checks real scenarios, including backup link failover and separation of sensitive access.",
      },
    ],
    cycleTitle: "From the initial baseline to verified remediation",
    cycle: [
      [
        "Scope",
        "Identify business goals, owners, authorized scope and data handling rules.",
      ],
      [
        "Assess",
        "Prepare access and assessment windows, then collect findings using methods appropriate to the assets.",
      ],
      [
        "Prioritize",
        "Validate findings, put weaknesses into context and assign actions to the relevant owners.",
      ],
      [
        "Remediate and verify",
        "Follow change management, reassess assets and track outstanding issues.",
      ],
    ],
    glossaryTitle: "Useful terms, clearly explained",
    terms: [
      [
        "RPO",
        "Recovery point objective: the amount of data an organization can accept losing, expressed as a duration.",
      ],
      [
        "RTO",
        "Recovery time objective: the target time to restore a service following an incident.",
      ],
      [
        "LAN and WAN",
        "A LAN connects equipment at a site; a WAN connects multiple sites or remote networks.",
      ],
      [
        "SD-WAN",
        "An approach to managing site connectivity by applying traffic policies across multiple access links.",
      ],
      [
        "Quality of service",
        "Rules that differentiate and prioritize traffic, such as voice, within available capacity.",
      ],
      [
        "VoIP",
        "Voice communication carried over IP networks, with security and quality requirements to assess.",
      ],
      [
        "Exposure management",
        "An approach that brings different sources of weakness and their context together to organize risk reduction.",
      ],
      [
        "CVE",
        "A public identifier for a known vulnerability. It helps connect a finding to reference information.",
      ],
      [
        "CVSS",
        "A framework for rating technical vulnerability severity. It does not, on its own, measure your organization’s specific risk.",
      ],
      [
        "Credentialed scan",
        "An assessment using authorized access to obtain more information about the system under review.",
      ],
      [
        "Attack path",
        "A sequence of relationships or weaknesses that may enable progression toward a sensitive asset.",
      ],
      [
        "CSPM",
        "Cloud security posture management: reviewing configurations and practices against defined rules.",
      ],
      [
        "CIEM",
        "Cloud infrastructure entitlement management: understanding permissions and effective access to reduce excessive rights.",
      ],
      [
        "IT and OT",
        "IT covers information systems; OT covers technologies that monitor or control physical operations.",
      ],
      [
        "Remediation",
        "Addressing a weakness through a fix, configuration change or compensating control, followed by verification.",
      ],
    ],
    prepareTitle: "Prepare a useful conversation",
    prepareText:
      "You do not need to share a sensitive asset inventory for an initial meeting. These scoping questions are enough to get started.",
    questions: [
      "Which business activities and services are your highest protection priorities?",
      "Which assets are involved: workstations, servers, cloud, identities, applications or industrial systems?",
      "Who approves scope, who administers systems and who will implement fixes?",
      "Which hosting, connectivity, privacy and maintenance constraints must be respected?",
      "What timeline and budget range would you like to explore?",
    ],
    cta: "Prepare my conversation",
  },
};
export function Knowledge({ language }: { language: Language }) {
  const c = knowledge[language];
  return (
    <section id="ressources" className="section knowledge">
      <div className="section-heading">
        <div>
          <span className="eyebrow">{c.label}</span>
          <h2>{c.title}</h2>
        </div>
        <p>{c.intro}</p>
      </div>
      <div className="knowledge-grid">
        {c.articles.map((article) => (
          <article key={article.title}>
            <h3>{article.title}</h3>
            <p>{article.text}</p>
          </article>
        ))}
      </div>
      <div className="risk-cycle">
        <h3>{c.cycleTitle}</h3>
        <ol>
          {c.cycle.map(([title, text]) => (
            <li key={title}>
              <h4>{title}</h4>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="learning-grid">
        <div>
          <h3>{c.glossaryTitle}</h3>
          <dl className="glossary">
            {c.terms.map(([term, definition]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{definition}</dd>
              </div>
            ))}
          </dl>
        </div>
        <aside className="qualification">
          <h3>{c.prepareTitle}</h3>
          <p>{c.prepareText}</p>
          <ul>
            {c.questions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
          <a className="button" href="#contact">
            {c.cta}
            <ArrowUpRight size={17} />
          </a>
        </aside>
      </div>
    </section>
  );
}
