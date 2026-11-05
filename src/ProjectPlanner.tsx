import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ShieldCheck,
  Server,
  Radio,
  RefreshCw,
} from "lucide-react";
import options from "./project-options.json";
import { getProducts } from "./catalog";
import type { Language } from "./i18n";
import { localLink } from "./routing";
import { solutionIcon } from "./solutionIcons";
export type ProjectBrief = { solutionId: string; summary: string };
export function ProjectPlanner({
  language,
  onComplete,
}: {
  language: Language;
  onComplete: (brief: ProjectBrief) => void;
}) {
  const en = language === "en";
  const [step, setStep] = useState(0);
  const [domain, setDomain] = useState("");
  const [need, setNeed] = useState("");
  const [timeline, setTimeline] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const selectedDomain = options.find((item) => item.id === domain);
  const selectedNeed = selectedDomain?.choices.find(
    (item) => item.solution === need,
  );
  const products = getProducts(language);
  const horizons = [
    {
      id: "explore",
      fr: "Je prépare le projet",
      en: "I am exploring the project",
    },
    {
      id: "quarter",
      fr: "Dans les trois prochains mois",
      en: "Within the next three months",
    },
    {
      id: "priority",
      fr: "Un besoin prioritaire",
      en: "A priority requirement",
    },
  ];
  const texts = en
    ? {
        label: "Your next project",
        title: "What would you like to move forward?",
        intro:
          "Three questions to clarify your priorities and prepare a useful conversation. You can explore the solutions without entering contact details.",
        steps: ["Your goal", "Your need", "Your timeline"],
        questions: [
          "What is your main objective?",
          "What would you like to address first?",
          "What timeline are you considering?",
        ],
        back: "Back",
        next: "Continue",
        finish: "See my starting points",
        result: "Your priorities, a starting point",
        note: "This is an initial orientation. The scope, technical fit and service commitments will be defined with you.",
        contact: "Prepare my inquiry",
        restart: "Start again",
        read: "Read the solution",
        selected: "Project outline",
      }
    : {
        label: "Votre prochain projet",
        title: "Qu’avez-vous envie de faire avancer ?",
        intro:
          "Trois questions pour clarifier vos priorités et préparer un échange utile. Vous pouvez explorer les solutions sans renseigner de coordonnées.",
        steps: ["Votre objectif", "Votre besoin", "Votre horizon"],
        questions: [
          "Quel est votre objectif principal ?",
          "Quel besoin souhaitez-vous traiter en premier ?",
          "Quel horizon envisagez-vous ?",
        ],
        back: "Retour",
        next: "Continuer",
        finish: "Voir mes pistes",
        result: "Vos priorités, un point de départ",
        note: "Cette orientation est un premier cadrage. Le périmètre, l’adéquation technique et les engagements seront définis avec vous.",
        contact: "Préparer ma demande",
        restart: "Recommencer",
        read: "Lire la fiche",
        selected: "Cadrage du projet",
      };
  const advance = (next: number) => {
    setStep(next);
    requestAnimationFrame(() =>
      heading.current?.focus({ preventScroll: true }),
    );
  };
  const icons = { cyber: ShieldCheck, datacenter: Server, telecom: Radio };
  const recommendations = selectedNeed
    ? [selectedNeed.solution, ...selectedNeed.related]
        .map((id) => products.find((product) => product.id === id)!)
        .filter(Boolean)
    : [];
  const summary = [
    `${texts.selected} — ALYAD-DEVELOPPEMENT`,
    `${texts.steps[0]} : ${en ? selectedDomain?.en : selectedDomain?.fr}`,
    `${texts.steps[1]} : ${en ? selectedNeed?.en : selectedNeed?.fr}`,
    `${texts.steps[2]} : ${en ? horizons.find((h) => h.id === timeline)?.en : horizons.find((h) => h.id === timeline)?.fr}`,
    `${en ? "Solutions to explore" : "Pistes à étudier"} : ${recommendations.map((p) => p.name).join(", ")}`,
  ].join("\n");
  return (
    <section id="projet" className="section project-planner">
      <div className="planner-intro">
        <span className="eyebrow">{texts.label}</span>
        <h2>{texts.title}</h2>
        <p>{texts.intro}</p>
        <div className="planner-context" aria-hidden="true">
          <span />
          <p>
            {en
              ? "Your business needs set the direction."
              : "Vos besoins métier donnent le cap."}
          </p>
        </div>
      </div>
      <div className="planner-card">
        <ol
          className="planner-progress"
          aria-label={en ? "Project planning steps" : "Étapes du cadrage"}
        >
          {texts.steps.map((label, index) => (
            <li
              key={label}
              aria-current={step === index ? "step" : undefined}
              className={step > index ? "complete" : ""}
            >
              <span>{step > index ? <Check size={14} /> : index + 1}</span>
              {label}
            </li>
          ))}
        </ol>
        <h3 ref={heading} tabIndex={-1} className="planner-question">
          {step < 3 ? texts.questions[step] : texts.result}
        </h3>
        {step === 0 && (
          <fieldset className="planner-options">
            <legend className="sr-only">{texts.questions[0]}</legend>
            {options.map((item) => {
              const Icon = icons[item.id as keyof typeof icons];
              return (
                <label
                  key={item.id}
                  className={`planner-option ${domain === item.id ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="project-domain"
                    value={item.id}
                    checked={domain === item.id}
                    onChange={() => {
                      setDomain(item.id);
                      setNeed("");
                    }}
                  />
                  <Icon size={22} aria-hidden="true" />
                  <span>
                    <strong>{en ? item.en : item.fr}</strong>
                    <small>
                      {en ? item.descriptionEn : item.descriptionFr}
                    </small>
                  </span>
                  <span className="option-check" aria-hidden="true">
                    {domain === item.id && <Check size={13} />}
                  </span>
                </label>
              );
            })}
          </fieldset>
        )}
        {step === 1 && (
          <fieldset className="planner-options compact">
            <legend className="sr-only">{texts.questions[1]}</legend>
            {selectedDomain?.choices.map((item) => {
              const Icon = solutionIcon(item.solution);
              return (
                <label
                  key={item.solution}
                  className={`planner-option ${need === item.solution ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="project-need"
                    value={item.solution}
                    checked={need === item.solution}
                    onChange={() => setNeed(item.solution)}
                  />
                  <Icon size={20} aria-hidden="true" />
                  <span>
                    <strong>{en ? item.en : item.fr}</strong>
                  </span>
                  <span className="option-check" aria-hidden="true">
                    {need === item.solution && <Check size={13} />}
                  </span>
                </label>
              );
            })}
          </fieldset>
        )}
        {step === 2 && (
          <fieldset className="planner-options compact">
            <legend className="sr-only">{texts.questions[2]}</legend>
            {horizons.map((item) => (
              <label
                key={item.id}
                className={`planner-option ${timeline === item.id ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name="project-timeline"
                  value={item.id}
                  checked={timeline === item.id}
                  onChange={() => setTimeline(item.id)}
                />
                <span>
                  <strong>{en ? item.en : item.fr}</strong>
                </span>
                <span className="option-check" aria-hidden="true">
                  {timeline === item.id && <Check size={13} />}
                </span>
              </label>
            ))}
          </fieldset>
        )}
        {step === 3 && (
          <div className="planner-result">
            <p className="planner-answer">
              {en ? selectedDomain?.en : selectedDomain?.fr}
              <br />
              <strong>{en ? selectedNeed?.en : selectedNeed?.fr}</strong>
            </p>
            <ul>
              {recommendations.map((product) => {
                const Icon = solutionIcon(product.id);
                return (
                  <li key={product.id}>
                    <Icon size={19} aria-hidden="true" />
                    <span>{product.name}</span>
                    <a
                      href={localLink(
                        "/solutions",
                        language,
                        { fiche: product.id },
                        "guide",
                      )}
                      aria-label={`${texts.read} : ${product.name}`}
                    >
                      <ArrowUpRight size={17} />
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="planner-note">{texts.note}</p>
            <button
              className="button"
              type="button"
              onClick={() => onComplete({ solutionId: need, summary })}
            >
              {texts.contact}
              <ArrowUpRight size={17} />
            </button>
          </div>
        )}
        <div className="planner-controls">
          {step > 0 && step < 3 ? (
            <button
              type="button"
              className="planner-back"
              onClick={() => advance(step - 1)}
            >
              <ArrowLeft size={16} />
              {texts.back}
            </button>
          ) : (
            <span />
          )}
          {step < 3 ? (
            <button
              className="button"
              type="button"
              disabled={step === 0 ? !domain : step === 1 ? !need : !timeline}
              onClick={() => advance(step + 1)}
            >
              {step === 2 ? texts.finish : texts.next}
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              className="planner-back"
              type="button"
              onClick={() => {
                setDomain("");
                setNeed("");
                setTimeline("");
                advance(0);
              }}
            >
              <RefreshCw size={15} />
              {texts.restart}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
