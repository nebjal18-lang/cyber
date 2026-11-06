import { test } from "node:test";
import assert from "node:assert/strict";
import handler, { validate, projectText } from "../api/contact.js";
const valid = {
  name: "Awa Diop",
  company: "Entreprise test",
  email: "awa@example.sn",
  phone: "+221 770000000",
  solution: "audit",
  message: "Nous souhaitons évaluer notre parc informatique.",
  consent: "on",
};
function response() {
  return {
    code: 0,
    headers: {},
    body: null,
    setHeader(k, v) {
      this.headers[k] = v;
    },
    status(n) {
      this.code = n;
      return this;
    },
    json(v) {
      this.body = v;
      return this;
    },
  };
}
test("validation : demande complète acceptée", () =>
  assert.equal(validate(valid), null));
test("validation : refus des champs manquants, des consentements absents et des injections", () => {
  for (const change of [
    { email: "bad" },
    { message: "court" },
    { consent: "" },
    { name: " " },
    { solution: "inconnue" },
    { email: "a@example.sn\nBcc: x@example.sn" },
  ])
    assert.ok(validate({ ...valid, ...change }));
});
test("API : GET refusé", async () => {
  let r = response();
  await handler({ method: "GET", headers: {} }, r);
  assert.equal(r.code, 405);
});
test("API : JSON mal formé et origine étrangère refusés", async () => {
  for (const [body, headers, code] of [
    ["{", { "content-type": "application/json" }, 400],
    [
      valid,
      {
        "content-type": "application/json",
        origin: "https://bad.example",
        host: "site.example",
      },
      403,
    ],
  ]) {
    let r = response();
    await handler({ method: "POST", headers, body }, r);
    assert.equal(r.code, code);
  }
});
test("API : absence de configuration signalée, aucun faux succès", async () => {
  const previous = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY;
  try {
    let r = response();
    await handler(
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: valid,
      },
      r,
    );
    assert.equal(r.code, 503);
  } finally {
    if (previous) process.env.RESEND_API_KEY = previous;
  }
});
test("API : piège robot et requête surdimensionnée refusés", async () => {
  for (const [body, code] of [
    [{ ...valid, website: "bot" }, 400],
    [{ ...valid, message: "x".repeat(17000) }, 413],
  ]) {
    let r = response();
    await handler(
      { method: "POST", headers: { "content-type": "application/json" }, body },
      r,
    );
    assert.equal(r.code, code);
  }
});
test("API : succès et échec du fournisseur correctement propagés", async () => {
  const oldFetch = globalThis.fetch;
  const old = {
    ...Object.fromEntries(
      ["RESEND_API_KEY", "MAIL_FROM", "CONTACT_EMAIL"].map((k) => [
        k,
        process.env[k],
      ]),
    ),
  };
  Object.assign(process.env, {
    RESEND_API_KEY: "test-only",
    MAIL_FROM: "test@example.sn",
    CONTACT_EMAIL: "sales@example.sn",
  });
  try {
    for (const ok of [true, false]) {
      globalThis.fetch = async (url, options) => {
        assert.equal(url, "https://api.resend.com/emails");
        const payload = JSON.parse(options.body);
        assert.equal(payload.from, "test@example.sn");
        assert.deepEqual(payload.to, ["sales@example.sn"]);
        assert.equal(payload.reply_to, valid.email);
        assert.match(payload.text, /Awa Diop/);
        return { ok };
      };
      let r = response();
      await handler(
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: valid,
        },
        r,
      );
      assert.equal(r.code, ok ? 200 : 502);
    }
  } finally {
    globalThis.fetch = oldFetch;
    for (const [k, v] of Object.entries(old)) {
      v === undefined ? delete process.env[k] : (process.env[k] = v);
    }
  }
});

test("API : les coordonnées ALYAD sont utilisées sans variables d’adresse", async () => {
  const originalFetch = globalThis.fetch;
  const keys = ["RESEND_API_KEY", "MAIL_FROM", "CONTACT_EMAIL"];
  const previous = Object.fromEntries(
    keys.map((key) => [key, process.env[key]]),
  );
  process.env.RESEND_API_KEY = "test-only";
  delete process.env.MAIL_FROM;
  delete process.env.CONTACT_EMAIL;
  let calls = 0;
  try {
    globalThis.fetch = async (url, options) => {
      calls += 1;
      assert.equal(url, "https://api.resend.com/emails");
      assert.equal(options.method, "POST");
      const payload = JSON.parse(options.body);
      assert.equal(
        payload.from,
        "ALYAD-DEVELOPPEMENT <contact@alyad-development.com>",
      );
      assert.deepEqual(payload.to, ["contact@alyad-development.com"]);
      assert.equal(payload.reply_to, valid.email);
      return { ok: true };
    };
    const res = response();
    await handler(
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: valid,
      },
      res,
    );
    assert.equal(calls, 1);
    assert.equal(res.code, 200);
    assert.deepEqual(res.body, { ok: true });
  } finally {
    globalThis.fetch = originalFetch;
    for (const [key, value] of Object.entries(previous))
      value === undefined
        ? delete process.env[key]
        : (process.env[key] = value);
  }
});

test("API : les nouvelles solutions et la langue anglaise sont acceptées", () => {
  for (const solution of ["dc-design", "lan-wifi", "backup-recovery"])
    assert.equal(validate({ ...valid, solution, language: "en" }), null);
  assert.ok(validate({ ...valid, language: "xx" }));
});
test("API : la langue choisie est conservée dans l’e-mail commercial", async () => {
  const original = globalThis.fetch;
  const keys = ["RESEND_API_KEY", "MAIL_FROM", "CONTACT_EMAIL"];
  const previous = Object.fromEntries(keys.map((k) => [k, process.env[k]]));
  Object.assign(process.env, {
    RESEND_API_KEY: "test-only",
    MAIL_FROM: "test@example.sn",
    CONTACT_EMAIL: "sales@example.sn",
  });
  try {
    globalThis.fetch = async (_url, options) => {
      const payload = JSON.parse(options.body);
      assert.match(payload.subject, /New technology/);
      assert.match(payload.text, /Language: English/);
      assert.match(payload.text, /Name: Awa Diop/);
      return { ok: true };
    };
    const res = response();
    await handler(
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: { ...valid, language: "en" },
      },
      res,
    );
    assert.equal(res.code, 200);
  } finally {
    globalThis.fetch = original;
    for (const [key, value] of Object.entries(previous))
      value === undefined
        ? delete process.env[key]
        : (process.env[key] = value);
  }
});

test("cadrage : conservation des notes, déduplication et limites", () => {
  const brief = "Cadrage : fiabiliser les sauvegardes.";
  assert.equal(validate({ ...valid, projectBrief: brief }), null);
  assert.equal(
    projectText({ ...valid, projectBrief: brief }),
    `${brief}\n\n${valid.message}`,
  );
  assert.equal(
    projectText({ ...valid, message: brief, projectBrief: brief }),
    brief,
  );
  assert.equal(projectText(valid), valid.message);
  assert.equal(
    projectText({
      ...valid,
      message: brief + "\nNotes ajoutées.",
      projectBrief: brief,
    }),
    brief + "\nNotes ajoutées.",
  );
  assert.ok(validate({ ...valid, projectBrief: {} }));
  assert.ok(validate({ ...valid, projectBrief: "x".repeat(1501) }));
});
