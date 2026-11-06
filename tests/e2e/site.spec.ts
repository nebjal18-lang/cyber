import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("catalogue, filtres, choix de solution et responsive", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "vos ambitions.",
  );
  await expect(page.locator(".product")).toHaveCount(0);
  await page.screenshot({
    path: `docs/previews/accueil-${test.info().project.name}.png`,
    fullPage: true,
  });
  await page.goto("/?categorie=cyber");
  await expect(page).toHaveURL(/\/solutions\?categorie=cyber/);
  await expect(page.locator(".product")).toHaveCount(9);
  await page
    .getByRole("button", { name: "Toutes les solutions", exact: true })
    .click();
  await expect(page.locator(".product")).toHaveCount(21);
  await page.getByRole("button", { name: "Data centers", exact: true }).click();
  await expect(page.locator(".product")).toHaveCount(6);
  await expect(page).toHaveURL(/categorie=datacenter/);
  await page
    .getByRole("link", { name: "Étudier cette solution" })
    .first()
    .click();
  await expect(page.locator("select[name=solution]")).toHaveValue("dc-design");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await page.screenshot({
    path: `test-results/accueil-${test.info().project.name}.png`,
    fullPage: true,
  });
});
test("formulaire : échec explicite et téléchargement", async ({ page }) => {
  await page.route("**/api/contact", (r) =>
    r.fulfill({ status: 503, contentType: "application/json", body: "{}" }),
  );
  await page.goto("/#contact");
  await page.getByLabel("Votre nom *").fill("Awa Diop");
  await page.getByLabel("Votre entreprise *").fill("Société test");
  await page.getByLabel("E-mail professionnel *").fill("awa@example.sn");
  await page
    .getByLabel("Votre projet *")
    .fill("Évaluer les vulnérabilités de notre parc.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Demander un échange" }).click();
  await expect(page.getByRole("status")).toContainText("n’a pas été transmise");
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Télécharger ma demande" }).click();
  expect((await download).suggestedFilename()).toBe("demande-projet-alyad.txt");
});
test("formulaire : confirmation après réponse serveur positive", async ({
  page,
}) => {
  await page.route("**/api/contact", (r) =>
    r.fulfill({
      status: 200,
      contentType: "application/json",
      body: '{"ok":true}',
    }),
  );
  await page.goto("/#contact");
  await page.getByLabel("Votre nom *").fill("Awa Diop");
  await page.getByLabel("Votre entreprise *").fill("Société test");
  await page.getByLabel("E-mail professionnel *").fill("awa@example.sn");
  await page
    .getByLabel("Votre projet *")
    .fill("Évaluer les vulnérabilités de notre parc.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Demander un échange" }).click();
  await expect(page.getByRole("status")).toContainText("a été envoyée");
  await expect(page.getByLabel("Votre nom *")).toHaveValue("");
});
test("navigation mobile et informations légales", async ({ page }, info) => {
  await page.goto("/");
  if (info.project.name === "mobile") {
    await page.getByRole("button", { name: "Ouvrir le menu" }).click();
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Ressources" })
      .click();
    await expect(
      page.getByRole("button", { name: "Ouvrir le menu" }),
    ).toHaveAttribute("aria-expanded", "false");
  }
  await page
    .getByRole("button", { name: "Mentions légales", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
test("accessibilité automatique de la page", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(result.violations).toEqual([]);
});

test("version anglaise complète, liens partageables et retour navigateur", async ({
  page,
}) => {
  await page.goto("/?categorie=cyber&fiche=cloud-security#solutions");
  await page.getByRole("button", { name: "EN English" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page).toHaveTitle(/Cybersecurity, data centers/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Practical answers",
  );
  await expect(page.locator(".product")).toHaveCount(9);
  await expect(page).toHaveURL(/lang=en/);
  await page
    .locator(".product")
    .filter({
      has: page.getByRole("heading", { name: "Cloud security", exact: true }),
    })
    .getByRole("link", { name: "Explore in detail", exact: true })
    .click();
  await expect(page.locator("#guide-title")).toHaveText("Cloud security");
  await expect(page.locator(".guide-body")).toContainText(
    "Cloud risk depends on permissions",
  );
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.getByRole("button", { name: "FR Français" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await page.goBack();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});
test("vingt-et-un guides détaillés et ressources disponibles dans les deux langues", async ({
  page,
}) => {
  for (const lang of ["fr", "en"]) {
    await page.goto(`/solutions?lang=${lang}#guide`);
    const picker = page.locator("#guide-select");
    const values = await picker
      .locator("option")
      .evaluateAll((options) =>
        options.map((o) => (o as HTMLOptionElement).value).filter(Boolean),
      );
    expect(values).toHaveLength(21);
    for (const id of values) {
      await picker.selectOption(id);
      await expect(page.locator(".guide-body h4")).toHaveCount(5);
      await expect(page.locator(".guide-body")).toContainText(
        lang === "en"
          ? "Scope and service commitments"
          : "Périmètre et engagements",
      );
      expect(
        (await page.locator(".guide-body").innerText()).length,
      ).toBeGreaterThan(1000);
    }
    await expect(page.locator("tbody tr")).toHaveCount(21);
    await page.goto(`/ressources?lang=${lang}`);
    await expect(page.locator(".glossary dt")).toHaveCount(15);
  }
});
test("formulaire anglais, langue envoyée et téléchargement anglais", async ({
  page,
}) => {
  let sent: Record<string, string> = {};
  await page.route("**/api/contact", (r) => {
    sent = r.request().postDataJSON();
    return r.fulfill({
      status: 503,
      contentType: "application/json",
      body: "{}",
    });
  });
  await page.goto("/?lang=en#contact");
  await page.getByLabel("Your name *").fill("Awa Diop");
  await page.getByLabel("Your company *").fill("Example company");
  await page.getByLabel("Business email *").fill("awa@example.sn");
  await page
    .getByLabel("Your project *")
    .fill("Assess our web applications and servers.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Request a conversation" }).click();
  await expect(page.getByRole("status")).toContainText(
    "has not been delivered",
  );
  expect(sent.language).toBe("en");
  expect(sent.solution).toBe("general");
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download my request" }).click();
  expect((await download).suggestedFilename()).toBe(
    "alyad-project-inquiry.txt",
  );
  await page.getByRole("button", { name: "Legal notice", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("publisher");
  await page.keyboard.press("Escape");
});
test("changement de langue préserve les champs du formulaire", async ({
  page,
}) => {
  await page.goto("/#contact");
  await page.getByLabel("Votre nom *").fill("Awa Diop");
  await page.getByRole("button", { name: "EN English" }).click();
  await expect(page.getByLabel("Your name *")).toHaveValue("Awa Diop");
});
test("accessibilité et mise en page anglaises", async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?lang=en");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  await page.screenshot({
    path: `docs/previews/english-${info.project.name}.png`,
    fullPage: true,
  });
  await page.screenshot({
    path: `docs/previews/english-hero-${info.project.name}.png`,
    fullPage: false,
  });
  for (const width of [320, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `Overflow at ${width}px`,
    ).toBeTruthy();
  }
});

test("identité ALYAD, présentation institutionnelle et contacts dans les deux langues", async ({
  page,
}) => {
  for (const language of ["fr", "en"]) {
    await page.goto(`/societe?lang=${language}#societe`);
    await expect(page).toHaveTitle(/ALYAD-DEVELOPPEMENT/);
    const profile = page.locator("#societe");
    await expect(profile).toContainText("ALYAD-DEVELOPPEMENT « AD » SUARL");
    await expect(profile).toContainText("SN DKR 2023 B 34040");
    await expect(profile).toContainText("010526210");
    await expect(profile).toContainText("Ngor Virage");
    await expect(profile.locator(".company-team article")).toHaveCount(5);
    for (const name of [
      "Younouss YADE",
      "Abou KONATÉ",
      "Awa Gogo BA",
      "Pape Saer GUEYE",
      "Awa NDIAYE",
    ])
      await expect(profile).toContainText(name);
    await expect(page.locator("#contact a.contact-phone")).toHaveAttribute(
      "href",
      "tel:+221782912111",
    );
    await expect(page.locator("#contact")).toContainText("+221 78 291 21 11");
    await expect(
      page.locator('#contact a[href="mailto:contact@alyad-development.com"]'),
    ).toBeVisible();
    await expect(profile).toBeVisible();
    await expect(page.locator("body")).not.toContainText("Teranga");
    expect(await page.locator("body").innerText()).not.toMatch(
      /demande de partenariat|partnership application|candidature|approved partner/i,
    );
    await page
      .getByRole("button", {
        name: language === "en" ? "Legal notice" : "Mentions légales",
        exact: true,
      })
      .click();
    await expect(page.getByRole("dialog")).toContainText(
      "ALYAD-DEVELOPPEMENT « AD » SUARL",
    );
    await expect(page.getByRole("dialog")).toContainText("010526210");
    await page.keyboard.press("Escape");
    const structured = JSON.parse(
      (await page.locator("#company-structured-data").textContent())!,
    );
    expect(structured.legalName).toBe("ALYAD-DEVELOPPEMENT « AD » SUARL");
    expect(structured.telephone).toBe("+221 78 291 21 11");
    expect(structured.email).toBe("contact@alyad-development.com");
    await page.setViewportSize({ width: 320, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
  }
});

test("trois domaines, offres génériques et demandes préremplies", async ({
  page,
}) => {
  for (const language of ["fr", "en"]) {
    await page.goto(`/solutions?lang=${language}#solutions`);
    const groups = [
      {
        label: language === "en" ? "Cybersecurity" : "Cybersécurité",
        count: 9,
        id: "cyber",
      },
      { label: "Data centers", count: 6, id: "datacenter" },
      {
        label: language === "en" ? "Telecommunications" : "Télécommunications",
        count: 6,
        id: "telecom",
      },
    ];
    for (const group of groups) {
      await page
        .locator(".filters")
        .getByRole("button", { name: group.label, exact: true })
        .click();
      await expect(page.locator(".product")).toHaveCount(group.count);
      await expect(page).toHaveURL(new RegExp(`categorie=${group.id}`));
    }
    await page.locator(".product .detail-link").first().click();
    await expect(page.locator("#guide-select")).toHaveValue("lan-wifi");
    await page.locator(".guide-summary .button").click();
    await expect(page.locator("select[name=solution]")).toHaveValue("lan-wifi");
    await expect(page.locator('main a[href^="http"]')).toHaveCount(0);
    expect(await page.locator("body").innerText()).not.toMatch(
      new RegExp(["ten", "able"].join("") + "|" + ["nes", "sus"].join(""), "i"),
    );
  }
});

test("logo chargé, animation de lecture et préférence de mouvement réduit", async ({
  page,
}) => {
  await page.goto("/");
  const logo = page.locator("header .brand-logo");
  await expect(logo).toBeVisible();
  await expect(logo).toHaveJSProperty("complete", true);
  expect(
    await logo.evaluate((image) => (image as HTMLImageElement).naturalWidth),
  ).toBeGreaterThan(0);
  await page
    .getByRole("link", { name: "Découvrir nos domaines", exact: true })
    .first()
    .click();
  await expect(page.locator(".expertise-card").first()).toHaveCSS(
    "opacity",
    "1",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".hero-media")).toHaveCSS("animation-name", "none");
  const running = await page.evaluate(
    () =>
      document.getAnimations().filter((a) => a.playState === "running").length,
  );
  expect(running).toBe(0);
  await expect(page.locator(".catalogue-panel")).toHaveCount(0);
  await page.goto("/solutions");
  await expect(page.locator(".catalogue-panel")).toHaveAttribute("open", "");
  await page.locator(".catalogue-panel > summary").click();
  await expect(page.locator(".catalogue-panel")).not.toHaveAttribute(
    "open",
    "",
  );
});

test("orientation interactive, conservation des notes et cadrage transmis", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  let sent: Record<string, string> = {};
  await page.route("**/api/contact", (r) => {
    sent = r.request().postDataJSON();
    return r.fulfill({
      status: 503,
      contentType: "application/json",
      body: "{}",
    });
  });
  await page.goto("/");
  await page
    .getByLabel("Votre projet *")
    .fill("Nos agences doivent garder accès aux applications métiers.");
  const planner = page.locator("#projet");
  await expect(
    planner.getByRole("button", { name: "Continuer" }),
  ).toBeDisabled();
  await planner
    .getByRole("radio", { name: /Mieux connecter mes équipes/ })
    .check();
  await planner.getByRole("button", { name: "Continuer" }).click();
  await planner
    .getByRole("radio", { name: "Relier plusieurs sites", exact: true })
    .check();
  await planner.getByRole("button", { name: "Continuer" }).click();
  await planner
    .getByRole("radio", { name: "Un besoin prioritaire", exact: true })
    .check();
  await planner.getByRole("button", { name: "Voir mes pistes" }).click();
  await expect(planner.locator(".planner-result li")).toHaveCount(3);
  await expect(planner.locator(".planner-result a").first()).toHaveAttribute(
    "href",
    /fiche=sdwan/,
  );
  await planner.getByRole("button", { name: "Préparer ma demande" }).click();
  await expect(page.locator("select[name=solution]")).toHaveValue("sdwan");
  await expect(page.getByLabel("Votre projet *")).toHaveValue(
    "Nos agences doivent garder accès aux applications métiers.",
  );
  await expect(page.locator(".form-project-brief")).toContainText(
    "Relier plusieurs sites",
  );
  await page.getByLabel("Votre nom *").fill("Awa Diop");
  await page.getByLabel("Votre entreprise *").fill("Société test");
  await page.getByLabel("E-mail professionnel *").fill("awa@example.sn");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Demander un échange" }).click();
  await expect(page.getByRole("status")).toContainText("n’a pas été transmise");
  expect(sent.solution).toBe("sdwan");
  expect(sent.projectBrief).toContain("Un besoin prioritaire");
  expect(sent.message).toContain("Nos agences");
  await planner.getByRole("button", { name: "Recommencer" }).click();
  await expect(
    planner.getByRole("button", { name: "Continuer" }),
  ).toBeDisabled();
  await expect(planner.locator(".planner-result")).toHaveCount(0);
});

test("orientation bilingue, retour sur les choix et préremplissage", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const planner = page.locator("#projet");
  const firstChoice = planner.getByRole("radio", {
    name: /Fiabiliser mes infrastructures/,
  });
  await firstChoice.focus();
  await firstChoice.press("Space");
  await expect(firstChoice).toBeChecked();
  await planner.getByRole("button", { name: "Continuer" }).click();
  await planner
    .getByRole("radio", {
      name: "Préparer la sauvegarde et la reprise",
      exact: true,
    })
    .check();
  await page.getByRole("button", { name: "EN English" }).click();
  await expect(
    planner.getByRole("radio", {
      name: "Plan backup and recovery",
      exact: true,
    }),
  ).toBeChecked();
  await planner.getByRole("button", { name: "Back", exact: true }).click();
  await expect(
    planner.getByRole("radio", { name: /Strengthen my infrastructure/ }),
  ).toBeChecked();
  await planner.getByRole("button", { name: "Continue", exact: true }).click();
  await planner.getByRole("button", { name: "Continue", exact: true }).click();
  await planner
    .getByRole("radio", { name: "Within the next three months", exact: true })
    .check();
  await planner.getByRole("button", { name: "See my starting points" }).click();
  await planner.getByRole("button", { name: "Prepare my inquiry" }).click();
  await expect(page.locator("select[name=solution]")).toHaveValue(
    "backup-recovery",
  );
  await expect(page.getByLabel("Your project *")).toHaveValue(
    /Project outline.*ALYAD/s,
  );
  await expect(page.getByLabel("Your project *")).not.toHaveValue(/undefined/);
});

test("situations interactives, méthode et responsables identifiés", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".home-team-grid article")).toHaveCount(5);
  await expect(page.locator(".home-team-grid")).toContainText("Younouss YADE");
  await expect(page.locator(".story-visuals")).toContainText(
    "Visuels d’illustration",
  );
  await page
    .getByRole("button", { name: "Préparer la reprise", exact: true })
    .click();
  await expect(page.locator(".story-panel h3")).toContainText("redémarrer");
  await expect(page.locator(".story-panel>a")).toHaveAttribute(
    "href",
    /fiche=backup-recovery/,
  );
  await page
    .getByRole("button", { name: "Prioriser les risques", exact: true })
    .click();
  await expect(page.locator(".story-panel>a")).toHaveAttribute(
    "href",
    /fiche=vulnerabilities/,
  );
  const phase = page.locator(".method-item").nth(2);
  await phase.getByRole("button").click();
  await expect(phase.getByRole("button")).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await expect(phase.locator(".method-deliverable")).toContainText(
    "conditions d’intervention",
  );
  await expect(
    page.locator(".method-item").first().locator(".method-panel"),
  ).toBeHidden();
});

test("pages dédiées accessibles directement, après actualisation et dans les deux langues", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const lang of ["fr", "en"]) {
    for (const [path, selector] of [
      ["/solutions", ".product"],
      ["/ressources", ".glossary dt"],
      ["/societe", ".company-team article"],
    ]) {
      await page.goto(`${path}?lang=${lang}`);
      await page.reload();
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(page.locator(selector).first()).toBeAttached();
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(result.violations, `${path} ${lang}`).toEqual([]);
      for (const width of [320, 768, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          `${path} ${width}`,
        ).toBeTruthy();
      }
    }
  }
});
