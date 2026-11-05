import React, { useState, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Menu,
  X,
  Network,
  Cloud,
  Fingerprint,
  Factory,
  ScanLine,
  Layers,
  Check,
  Plus,
  MapPin,
  Download,
  Mail,
  ChevronDown,
  Phone,
} from "lucide-react";
import { company } from "./config";
import { getProducts } from "./catalog";
import { readLanguage, translator, updateMetadata } from "./i18n";
import { SolutionGuide, Knowledge } from "./SolutionGuide";
import {
  Brand,
  CompanySection,
  CompanyLegal,
  CyberFocus,
} from "./CompanySection";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "./style.css";

const icons = {
  one: Layers,
  vm: Network,
  nessus: ScanLine,
  cloud: Cloud,
  identity: Fingerprint,
  ot: Factory,
  sc: Network,
  was: ScanLine,
  asm: Layers,
};
const filters = [
  { id: "toutes", name: "Toutes les solutions" },
  { id: "vulnerabilites", name: "Vulnérabilités" },
  { id: "cloud", name: "Cloud" },
  { id: "identites", name: "Identités" },
  { id: "industriel", name: "Industrie & OT" },
  { id: "web", name: "Applications & exposition externe" },
];
function validCategory() {
  const id = new URLSearchParams(location.search).get("categorie");
  return filters.some((f) => f.id === id) ? id! : "toutes";
}
function App() {
  const [language, setLanguage] = useState(readLanguage);
  const t = translator(language);
  const products = getProducts(language);
  const [guide, setGuide] = useState(
    new URLSearchParams(location.search).get("fiche") || "one",
  );
  function chooseGuide(id: string) {
    setGuide(id);
    const u = new URL(location.href);
    u.searchParams.set("fiche", id);
    history.replaceState(null, "", u);
  }
  function changeLanguage(next: "fr" | "en") {
    const u = new URL(location.href);
    next === "en"
      ? u.searchParams.set("lang", "en")
      : u.searchParams.delete("lang");
    history.pushState(null, "", u);
    setLanguage(next);
  }
  useEffect(() => {
    updateMetadata(language);
  }, [language]);
  useEffect(() => {
    const sync = () => {
      setLanguage(readLanguage());
      setFilter(validCategory());
      setGuide(new URLSearchParams(location.search).get("fiche") || "one");
    };
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState(validCategory());
  const [chosen, setChosen] = useState("À définir ensemble");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState("");
  const [legal, setLegal] = useState<"confidentialite" | "mentions" | null>(
    null,
  );
  const legalTrigger = useRef<HTMLElement | null>(null);
  function openLegal(value: "confidentialite" | "mentions") {
    legalTrigger.current = document.activeElement as HTMLElement;
    setLegal(value);
  }
  function closeLegal() {
    setLegal(null);
    requestAnimationFrame(() => legalTrigger.current?.focus());
  }
  function selectFilter(id: string) {
    setFilter(id);
    const u = new URL(location.href);
    id === "toutes"
      ? u.searchParams.delete("categorie")
      : u.searchParams.set("categorie", id);
    history.replaceState(null, "", u);
  }
  function requestProduct(name: string) {
    setChosen(name);
  }
  async function submit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data: Record<string, FormDataEntryValue> = {
      ...Object.fromEntries(new FormData(form)),
      language,
    };
    const text =
      language === "en"
        ? `Project inquiry — ${company.name}\n\nName: ${data.name}\nCompany: ${data.company}\nEmail: ${data.email}\nPhone: ${data.phone || "Not provided"}\nSolution: ${t(String(data.solution))}\nProject: ${data.message}`
        : `Demande de rendez-vous — ${company.name}\n\nNom : ${data.name}\nSociété : ${data.company}\nE-mail : ${data.email}\nTéléphone : ${data.phone || "Non renseigné"}\nSolution : ${data.solution}\nProjet : ${data.message}`;
    setDraft(text);
    setBusy(true);
    setStatus("Envoi de votre demande…");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus(
        "Votre demande a été envoyée. Notre équipe pourra vous répondre à l’adresse indiquée.",
      );
      setDraft("");
      form.reset();
      setChosen("À définir ensemble");
    } catch {
      setStatus(
        "L’envoi est indisponible. Votre demande n’a pas été transmise. Téléchargez-la pour la conserver et la partager avec votre interlocuteur.",
      );
    } finally {
      setBusy(false);
    }
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([draft], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download =
      language === "en"
        ? "cybersecurity-inquiry.txt"
        : "demande-cybersecurite.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <>
      <a className="skip" href="#contenu">
        {t("Aller au contenu")}
      </a>
      <div className="topbar">
        <span>
          <MapPin size={13} />
          {t("Dakar, Sénégal")}
        </span>
        <span>{t("La cybersécurité, au plus près de vos enjeux.")}</span>
        <a href="#contact">
          {t("Parlons de votre projet")}
          <ArrowUpRight size={13} />
        </a>
      </div>
      <header>
        <Brand language={language} />
        <nav
          aria-label={t("Navigation principale")}
          className={menu ? "open" : ""}
        >
          <a href="#solutions" onClick={() => setMenu(false)}>
            {t("Solutions Tenable")}
          </a>
          <a href="#approche" onClick={() => setMenu(false)}>
            {t("Notre approche")}
          </a>
          <a href="#societe" onClick={() => setMenu(false)}>
            {t("La société")}
          </a>
          <a href="#faq" onClick={() => setMenu(false)}>
            {t("Questions fréquentes")}
          </a>
        </nav>
        <a className="button header-cta" href="#contact">
          {t("Échanger avec nous")}
          <ArrowUpRight size={16} />
        </a>
        <button
          className="menu-button"
          aria-label={t(menu ? "Fermer le menu" : "Ouvrir le menu")}
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
        <div
          className="language-switch"
          role="group"
          aria-label={language === "en" ? "Website language" : "Langue du site"}
        >
          <button
            type="button"
            lang="fr"
            aria-pressed={language === "fr"}
            onClick={() => changeLanguage("fr")}
          >
            FR<span className="sr-only"> Français</span>
          </button>
          <button
            type="button"
            lang="en"
            aria-pressed={language === "en"}
            onClick={() => changeLanguage("en")}
          >
            EN<span className="sr-only"> English</span>
          </button>
        </div>
      </header>
      <main id="contenu">
        <section className="hero">
          <div className="hero-copy">
            <span className="location-tag">
              <span />
              {t("Ancrés à Dakar. Tournés vers votre avenir.")}
            </span>
            <h1>
              {t("Voir les risques.")}
              <br />
              {t("Protéger")}
              <br />
              {t("l’essentiel.")}
            </h1>
            <p>
              {t(
                "ALYAD-DEVELOPPEMENT accompagne la réflexion cybersécurité des entreprises au Sénégal : comprendre les risques, clarifier les besoins et préparer les projets autour des solutions Tenable.",
              )}
            </p>
            <div className="hero-actions">
              <a className="button" href="#contact">
                {t("Construire mon projet")}
                <ArrowUpRight size={18} />
              </a>
              <a className="text-link" href="#solutions">
                {t("Explorer les solutions")}
                <ArrowRight size={17} />
              </a>
            </div>
            <div className="hero-proof">
              <ShieldCheck size={18} />
              <span>
                {t("Une approche préventive. Des priorités claires.")}
              </span>
            </div>
          </div>
          <div
            className="hero-art"
            role="img"
            aria-label={t(
              "Illustration de visibilité sur les actifs, identités, cloud et systèmes industriels. Données fictives, sans connexion à un système réel.",
            )}
          >
            <div className="art-top">
              <span className="signal-dot" />
              {t("Vue sur votre exposition")}{" "}
              <span className="art-caption">{t("Illustration")}</span>
            </div>
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <svg
              className="connections"
              viewBox="0 0 560 470"
              aria-hidden="true"
            >
              <path d="M280 235L106 115M280 235L443 112M280 235L465 305M280 235L126 349M280 235L300 414" />
              <path
                className="path-accent"
                d="M106 115L443 112L465 305L126 349Z"
              />
            </svg>
            <div className="core">
              <ShieldCheck size={48} />
              <span>
                {t("Une vision")}
                <br />
                <strong>{t("connectée.")}</strong>
              </span>
            </div>
            <div className="asset asset-cloud">
              <Cloud />
              <span>Cloud</span>
              <i />
            </div>
            <div className="asset asset-identity">
              <Fingerprint />
              <span>{t("Identités")}</span>
              <i />
            </div>
            <div className="asset asset-it">
              <Network />
              <span>{t("Infrastructure IT")}</span>
              <i />
            </div>
            <div className="asset asset-ot">
              <Factory />
              <span>{t("Systèmes OT")}</span>
              <i />
            </div>
            <div className="art-note">
              <span className="art-note-icon">
                <ScanLine size={18} />
              </span>
              <div>
                {t("Comprendre. Prioriser. Agir.")}
                <small>{t("La visibilité au service de vos décisions.")}</small>
              </div>
              <ArrowUpRight size={17} />
            </div>
            <div className="art-coordinates">
              {t("14.7167° N   17.4677° W")}
              <span>Dakar</span>
            </div>
          </div>
        </section>
        <div className="solution-ribbon">
          <p>
            {t("La technologie")}
            <strong translate="no">tenable</strong>
          </p>
          <span className="ribbon-line" />
          <p>
            {t("La visibilité sur vos expositions.")}
            <br />
            <strong>{t("La confiance pour avancer.")}</strong>
          </p>
          <a href="#solutions">
            {t("Découvrir l’écosystème")}
            <ArrowDownIcon />
          </a>
        </div>
        <CyberFocus language={language} />
        <section id="solutions" className="section solutions">
          <div className="section-heading">
            <div>
              <span className="eyebrow">{t("Les solutions")}</span>
              <h2>
                {t("À chaque surface d’attaque,")}
                <br />
                {t("une réponse adaptée.")}
              </h2>
            </div>
            <p>
              {t(
                "De vos postes de travail à votre cloud, choisissez les solutions qui répondent à votre environnement et à votre niveau de maturité.",
              )}
            </p>
          </div>
          <div
            className="filters"
            role="group"
            aria-label={t("Filtrer les solutions")}
          >
            {filters.map((f) => (
              <button
                key={f.id}
                aria-pressed={filter === f.id}
                onClick={() => selectFilter(f.id)}
              >
                {t(f.name)}
              </button>
            ))}
          </div>
          <div className="products">
            {products
              .filter((p) => filter === "toutes" || p.category === filter)
              .map((p) => {
                const Icon = icons[p.id as keyof typeof icons];
                return (
                  <article
                    className={`product ${p.id === "one" ? "featured" : ""}`}
                    key={p.id}
                  >
                    <div className="product-top">
                      <span className="product-icon">
                        <Icon size={25} />
                      </span>
                      {p.id === "one" && (
                        <span className="product-badge">
                          {t("Plateforme unifiée")}
                        </span>
                      )}
                    </div>
                    <span className="product-label">{p.label}</span>
                    <h3 translate="no">{p.name}</h3>
                    <p>{p.text}</p>
                    <div className="tags">
                      {p.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    <a
                      className="detail-link"
                      href="#guide"
                      onClick={() => chooseGuide(p.id)}
                    >
                      {t("Découvrir en détail")}
                      <ArrowRight size={15} />
                    </a>
                    <details>
                      <summary>
                        {t("Est-ce adapté à mon entreprise ?")}
                        <Plus size={15} />
                      </summary>
                      <p>{p.best}</p>
                      <a href={p.url} target="_blank" rel="noreferrer">
                        {t("Consulter la fiche officielle")}
                        <ArrowUpRight size={13} />
                      </a>
                    </details>
                    <a
                      className="product-link"
                      href="#contact"
                      onClick={() => requestProduct(p.name)}
                    >
                      {t("Parlons de cette solution")}
                      <ArrowUpRight size={18} />
                    </a>
                  </article>
                );
              })}
          </div>
          <p className="catalogue-note">
            {t(
              "Licences, éditions, périmètres et disponibilité à confirmer sur devis. Les descriptifs présentent les usages généraux des solutions.",
            )}
          </p>
        </section>
        <SolutionGuide
          language={language}
          products={products}
          selected={guide}
          onSelect={chooseGuide}
          onRequest={requestProduct}
        />
        <section className="approach section" id="approche">
          <div className="approach-intro">
            <span className="eyebrow">
              {t("La proximité fait la différence")}
            </span>
            <h2>
              {t("Une technologie mondiale.")}
              <br />
              {t("Un projet qui vous ressemble.")}
            </h2>
            <p>
              {t(
                "Banques, PME, institutions, industrie : chaque organisation a ses contraintes. Notre approche part de votre réalité, de vos équipes et de vos priorités.",
              )}
            </p>
            <a className="button light" href="#contact">
              {t("Faisons le point ensemble")}
              <ArrowUpRight size={18} />
            </a>
            <div className="dakar-line" aria-hidden="true">
              <svg viewBox="0 0 500 150">
                <path d="M0 128h45V90h28v38h30V78h15V55h9V25h5V55h9v23h15v50h35V94h34v34h29V65h14V40h7v25h14v63h38V80h35v48h22v-18h18v18h42V70h8V45h5v25h8v58h42" />
                <path d="M0 143q80-15 160 0t160 0t180 0" />
              </svg>
              <span>{t("Dakar. Votre point d’ancrage.")}</span>
            </div>
          </div>
          <div className="steps">
            {[
              {
                title: "Comprendre votre environnement",
                text: "Nous cadrons vos actifs, vos usages, vos contraintes opérationnelles et les objectifs de votre projet.",
              },
              {
                title: "Choisir le bon périmètre",
                text: "Nous construisons une proposition adaptée : solution, édition, dimensionnement et prestations à confirmer ensemble.",
              },
              {
                title: "Préparer votre déploiement",
                text: "Nous définissons les prérequis, le calendrier et les responsabilités. Chaque intervention est réalisée sur un périmètre autorisé.",
              },
              {
                title: "Faire vivre votre démarche",
                text: "Selon les prestations convenues, nous préparons la prise en main, le suivi des priorités et les prochaines étapes.",
              },
            ].map((s, i) => (
              <div className="step" key={t(s.title)}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{t(s.title)}</h3>
                  <p>{t(s.text)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section id="secteurs" className="section sectors">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                {t("Vos enjeux, notre point de départ")}
              </span>
              <h2>
                {t("Le Sénégal entreprend.")}
                <br />
                {t("Sa sécurité doit suivre.")}
              </h2>
            </div>
            <p>
              {t(
                "Un même besoin de visibilité. Des réalités métier différentes.",
              )}
            </p>
          </div>
          <div className="sector-grid">
            {[
              {
                n: "Finance & assurance",
                t: "Prioriser les vulnérabilités qui exposent les services critiques et mieux éclairer les décisions de risque.",
                icon: Layers,
              },
              {
                n: "Entreprises & PME",
                t: "Commencer par un périmètre réaliste, identifier les faiblesses et structurer les actions de correction.",
                icon: Network,
              },
              {
                n: "Secteur public",
                t: "Améliorer la connaissance du parc et organiser une démarche de réduction des expositions.",
                icon: ShieldCheck,
              },
              {
                n: "Industrie & infrastructures",
                t: "Développer la visibilité sur les environnements IT et OT en tenant compte des contraintes d’exploitation.",
                icon: Factory,
              },
            ].map((s) => (
              <article key={t(s.n)}>
                <s.icon size={24} />
                <h3>{t(s.n)}</h3>
                <p>{t(s.t)}</p>
              </article>
            ))}
          </div>
        </section>
        <CompanySection language={language} />
        <Knowledge language={language} />
        <section id="faq" className="section faq">
          <div>
            <span className="eyebrow">{t("Des réponses pour avancer")}</span>
            <h2>{t("Parlons concret.")}</h2>
            <p>
              {t("Vous avez une autre question ?")}
              <br />
              <a href="#contact">{t("Échangeons sur votre situation.")}</a>
            </p>
          </div>
          <div className="faq-list">
            {[
              {
                q: "Par quelle solution Tenable commencer ?",
                a: "Le choix dépend de vos actifs, de votre organisation et de vos objectifs. Nessus peut répondre à des évaluations ciblées ; Vulnerability Management à un pilotage cloud des vulnérabilités ; Tenable One à une démarche plus transverse. Un cadrage permet de confirmer le bon choix.",
              },
              {
                q: "Quel budget faut-il prévoir ?",
                a: "Le prix dépend de la solution, de l’édition, du périmètre couvert et de la durée de souscription. Nous préparons une demande de chiffrage adaptée. La devise, les taxes applicables, les prestations et les conditions de paiement seront précisés dans le devis.",
              },
              {
                q: "Peut-on organiser une démonstration ?",
                a: "Oui, vous pouvez demander une présentation. La disponibilité d’une démonstration ou d’une évaluation et ses conditions seront confirmées avec les interlocuteurs concernés. Aucun essai gratuit ni délai automatique n’est garanti.",
              },
              {
                q: "Un scan peut-il perturber mon activité ?",
                a: "Un scan doit être préparé : autorisation, périmètre, fenêtre d’intervention et paramètres adaptés. Les environnements industriels nécessitent des précautions particulières. Aucune intervention n’est lancée sans cadrage préalable.",
              },
              {
                q: "Comment sont définies les conditions de votre projet ?",
                a: "Le périmètre, les solutions, les licences et les prestations sont précisés dans une proposition adaptée à vos besoins. Les conditions de vente, d’intervention et de support sont confirmées avant tout engagement.",
              },
            ].map((f) => (
              <details key={t(f.q)}>
                <summary>
                  {t(f.q)}
                  <ChevronDown size={18} />
                </summary>
                <p>{t(f.a)}</p>
              </details>
            ))}
          </div>
        </section>
        <section id="contact" className="section contact">
          <div className="contact-copy">
            <span className="eyebrow">{t("Votre prochaine étape")}</span>
            <h2>
              {t("Et si on commençait")}
              <br />
              {t("par vos priorités ?")}
            </h2>
            <p>
              {t(
                "Un besoin précis ou une première réflexion ? Présentez-nous votre contexte pour préparer une proposition adaptée.",
              )}
            </p>
            <ul>
              <li>
                <Check size={17} />
                {t("Un échange centré sur votre activité")}
              </li>
              <li>
                <Check size={17} />
                {t("Un périmètre et des besoins clarifiés")}
              </li>
              <li>
                <Check size={17} />
                {t("Une proposition avant tout engagement")}
              </li>
            </ul>
            <div className="contact-location">
              <MapPin size={22} />
              <div>
                {company.name}
                <small>
                  {language === "en"
                    ? "No. 72, Ngor Virage, Dakar, Senegal"
                    : company.address}
                </small>
              </div>
            </div>
            <a className="contact-phone" href={`tel:${company.phoneHref}`}>
              <Phone size={19} />
              <span>
                {company.phone}
                <small>{t("Nous appeler")}</small>
              </span>
            </a>
            {company.email && (
              <a href={`mailto:${company.email}`}>
                <Mail size={17} />
                {company.email}
              </a>
            )}
            {company.whatsapp && (
              <a href={`https://wa.me/${company.whatsapp}`}>
                {t("Nous joindre sur WhatsApp")}
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>
          <form onSubmit={submit}>
            <h3>{t("Parlons de votre projet")}</h3>
            <p className="form-intro">
              {t("Les champs marqués d’un * sont obligatoires.")}
            </p>
            <div className="form-row">
              <label>
                {t("Votre nom *")}
                <input
                  name="name"
                  required
                  maxLength={120}
                  autoComplete="name"
                  placeholder={t("Prénom et nom…")}
                />
              </label>
              <label>
                {t("Votre entreprise *")}
                <input
                  name="company"
                  required
                  maxLength={160}
                  autoComplete="organization"
                  placeholder={t("Nom de votre société…")}
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                {t("E-mail professionnel *")}
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  spellCheck={false}
                  placeholder={t("vous@entreprise.sn…")}
                />
              </label>
              <label>
                {t("Téléphone")}
                <input
                  name="phone"
                  type="tel"
                  maxLength={40}
                  autoComplete="tel"
                  placeholder={t("+221…")}
                />
              </label>
            </div>
            <label>
              {t("Votre besoin")}
              <select
                name="solution"
                value={chosen}
                onChange={(e) => setChosen(e.target.value)}
              >
                <option value="À définir ensemble">
                  {t("À définir ensemble")}
                </option>
                {products.map((p) => (
                  <option key={p.id}>{p.name}</option>
                ))}
              </select>
            </label>
            <label>
              {t("Votre projet *")}
              <textarea
                name="message"
                required
                minLength={10}
                maxLength={3000}
                rows={3}
                placeholder={t(
                  "Votre environnement, vos priorités, votre calendrier…",
                )}
              />
            </label>
            <div className="honeypot" aria-hidden="true">
              <label>
                {t("Site internet")}
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <label className="consent">
              <input type="checkbox" name="consent" required />
              <span>
                {t(
                  "J’accepte que mes informations soient utilisées pour répondre à cette demande.",
                )}{" "}
                <button
                  type="button"
                  className="inline-link"
                  onClick={() => openLegal("confidentialite")}
                >
                  {t("Confidentialité")}
                </button>
              </span>
            </label>
            <button className="button submit" type="submit" disabled={busy}>
              {t(busy ? "Envoi en cours…" : "Demander un échange")}
              <ArrowUpRight size={17} />
            </button>
            <p className="form-status" role="status">
              {t(status)}
            </p>
            {draft && !busy && (
              <button className="download" type="button" onClick={download}>
                <Download size={16} />
                {t("Télécharger ma demande")}
              </button>
            )}
            <p className="form-note">
              {t(
                "Ne communiquez aucun mot de passe, clé d’accès ou détail sensible.",
              )}
            </p>
          </form>
        </section>
      </main>
      <footer>
        <div className="footer-main">
          <Brand language={language} />
          <p>
            {t("La visibilité pour décider.")}
            <br />
            {t("La proximité pour avancer.")}
          </p>
          <a href="#societe">{t("La société")}</a>
          <a href="#solutions">{t("Solutions Tenable")}</a>
          <a href="#contact">
            {t("Votre projet")}
            <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {company.legalName}{" "}
            {t("· Dakar, Sénégal")}
          </span>
          <div>
            <button onClick={() => openLegal("mentions")}>
              {t("Mentions légales")}
            </button>
            <button onClick={() => openLegal("confidentialite")}>
              {t("Confidentialité")}
            </button>
          </div>
        </div>
        <p className="trademark">
          {t(
            "Tenable et les noms de ses produits sont des marques de leurs titulaires respectifs.",
          )}{" "}
        </p>
      </footer>
      {legal && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLegal();
          }}
        >
          <dialog
            open
            aria-modal="true"
            aria-labelledby="legal-title"
            ref={(el) => {
              if (el && !el.contains(document.activeElement))
                el.querySelector("button")?.focus();
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") closeLegal();
              if (e.key === "Tab") {
                e.preventDefault();
                e.currentTarget.querySelector("button")?.focus();
              }
            }}
          >
            <button
              className="close-modal"
              aria-label={t("Fermer")}
              onClick={() => {
                closeLegal();
              }}
            >
              <X />
            </button>
            <h2 id="legal-title">
              {t(
                legal === "mentions"
                  ? "Mentions légales"
                  : "Vos données personnelles",
              )}
            </h2>
            {legal === "mentions" ? (
              <CompanyLegal language={language} />
            ) : (
              <>
                <p>
                  {t(
                    "Les informations du formulaire servent uniquement à traiter votre demande commerciale. Aucun outil de suivi publicitaire ni cookie analytique n’est intégré à ce site.",
                  )}
                </p>
                <p>
                  {t(
                    "Lorsque l’envoi sera activé, les demandes transiteront par Vercel et le service e-mail Resend. L’éditeur devra valider les conditions de traitement, les éventuels transferts internationaux et les formalités applicables au Sénégal avant activation.",
                  )}
                </p>
                <p>
                  {language === "en"
                    ? "For questions about your personal data or to exercise your rights, contact"
                    : "Pour toute question relative à vos données personnelles ou pour exercer vos droits, contactez"}{" "}
                  {company.legalName}{" "}
                  {language === "en" ? "by phone on" : "par téléphone au"}{" "}
                  {company.phone}.{" "}
                  {language === "en"
                    ? "The retention period must be defined before the form's email service is activated."
                    : "La durée de conservation doit être définie avant l’activation du service d’envoi du formulaire."}
                </p>
                <p>
                  {t(
                    "En cas d’échec d’envoi, le téléchargement conserve votre demande sur votre appareil ; il ne l’envoie pas à notre équipe.",
                  )}
                </p>
              </>
            )}
          </dialog>
        </div>
      )}
    </>
  );
}
function ArrowDownIcon() {
  return (
    <ArrowRight
      size={17}
      style={{ transform: "rotate(45deg)" }}
      aria-hidden="true"
    />
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
