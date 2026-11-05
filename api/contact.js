import company from "../src/company.json" with { type: "json" };
const allowedSolutions = new Set([
  "À définir ensemble",
  "Tenable One",
  "Tenable Vulnerability Management",
  "Tenable Nessus",
  "Tenable Cloud Security",
  "Tenable Identity Exposure",
  "Tenable OT Security",
  "Tenable Security Center",
  "Tenable Web App Scanning",
  "Tenable Attack Surface Management",
]);
export function validate(body) {
  if (!body || typeof body !== "object" || Array.isArray(body))
    return "Demande invalide.";
  for (const [key, min, max] of [
    ["name", 1, 120],
    ["company", 1, 160],
    ["email", 3, 254],
    ["message", 10, 3000],
  ]) {
    if (
      typeof body[key] !== "string" ||
      body[key].trim().length < min ||
      body[key].length > max
    )
      return `Champ ${key} invalide.`;
  }
  if (
    !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(body.email) ||
    /[\r\n]/.test(body.email)
  )
    return "Adresse e-mail invalide.";
  if (
    body.phone !== undefined &&
    (typeof body.phone !== "string" || body.phone.length > 40)
  )
    return "Téléphone invalide.";
  if (body.language !== undefined && !["fr", "en"].includes(body.language))
    return "Langue invalide.";
  if (!allowedSolutions.has(body.solution)) return "Solution invalide.";
  if (body.consent !== "on")
    return "Votre accord est nécessaire pour traiter cette demande.";
  return null;
}
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Méthode non autorisée." });
  }
  const type = req.headers["content-type"] || "";
  if (!type.includes("application/json"))
    return res.status(415).json({ error: "Format JSON requis." });
  if (Number(req.headers["content-length"] || 0) > 16000)
    return res.status(413).json({ error: "Demande trop longue." });
  const origin = req.headers.origin;
  if (origin) {
    try {
      if (new URL(origin).host !== req.headers.host)
        return res.status(403).json({ error: "Origine non autorisée." });
    } catch {
      return res.status(403).json({ error: "Origine invalide." });
    }
  }
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "JSON invalide." });
    }
  }
  if (Buffer.byteLength(JSON.stringify(body ?? {}), "utf8") > 16000)
    return res.status(413).json({ error: "Demande trop longue." });
  if (body?.website)
    return res.status(400).json({ error: "Demande invalide." });
  const error = validate(body);
  if (error) return res.status(400).json({ error });
  const { RESEND_API_KEY, MAIL_FROM, CONTACT_EMAIL } = process.env;
  if (!RESEND_API_KEY || !MAIL_FROM || !CONTACT_EMAIL)
    return res
      .status(503)
      .json({ error: "Le service de contact n’est pas encore configuré." });
  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(10000),
      body: JSON.stringify({
        from: MAIL_FROM,
        to: [CONTACT_EMAIL],
        reply_to: body.email,
        subject:
          body.language === "en"
            ? `New cybersecurity project inquiry — ${company.name}`
            : `Nouvelle demande de projet cybersécurité — ${company.name}`,
        text:
          body.language === "en"
            ? `Language: English\nName: ${body.name.trim()}\nCompany: ${body.company.trim()}\nEmail: ${body.email}\nPhone: ${body.phone || "Not provided"}\nSolution: ${body.solution}\n\n${body.message.trim()}`
            : `Nom : ${body.name.trim()}\nEntreprise : ${body.company.trim()}\nE-mail : ${body.email}\nTéléphone : ${body.phone || "Non renseigné"}\nSolution : ${body.solution}\n\n${body.message.trim()}`,
      }),
    });
    if (!result.ok)
      return res
        .status(502)
        .json({ error: "L’envoi a échoué. Veuillez réessayer plus tard." });
    return res.status(200).json({ ok: true });
  } catch {
    return res
      .status(502)
      .json({ error: "Le service d’envoi est indisponible." });
  }
}
