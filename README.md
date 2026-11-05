# ALYAD-DEVELOPPEMENT — cybersécurité, data centers et télécommunications

Site bilingue français/anglais React/TypeScript. Identité ALYAD-DEVELOPPEMENT, catalogue filtrable, accompagnement, FAQ, formulaire avec API Vercel et repli par téléchargement. Aucun déploiement ni envoi réel effectué automatiquement.

## Démarrer

Node.js 24.x, fixé dans `package.json` et `.nvmrc`.

```bash
cd /workspace/cyber
npm ci
npm run dev
```

Le serveur Vite sert l’interface. La fonction `/api/contact` fonctionne sur Vercel ou avec `npx vercel dev` après connexion à votre compte. Une erreur de formulaire sous Vite seul est donc attendue ; le téléchargement de la demande reste possible.

```bash
npm run build
npm test
npx playwright install chromium
npm run test:e2e
```

## Personnaliser

Les coordonnées et informations de société sont centralisées dans `src/company.json`, à partir de la présentation institutionnelle fournie : ALYAD-DEVELOPPEMENT « AD » SUARL, n° 72 Ngor Virage à Dakar, +221 78 291 21 11, R.C. SN DKR 2023 B 34040 et NINEA 010526210. Le fichier est utilisé par l’interface, les métadonnées et l’objet des e-mails. Les faits et leurs sources sont documentés dans [IDENTITE-SOCIETE.md](docs/IDENTITE-SOCIETE.md).

Le catalogue bilingue et ses 21 fiches sont dans `src/catalog.json`. La présentation de la société, de ses activités et de sa gouvernance, ainsi que les trois domaines, sont dans `src/CompanySection.tsx`. Les textes publics ne mentionnent pas les démarches de partenariat et ne prétendent pas à un statut agréé.

L’e-mail et WhatsApp restent vides car ces données ne sont pas fournies. Pour le formulaire, configurez un destinataire commercial réel dans Vercel. Les conditions de traitement et la durée de conservation restent à valider avant activation de l’envoi.

## Déployer manuellement sur Vercel

1. Dans Vercel, importez le dépôt GitHub `nebjal18-lang/cyber`, branche `main`.
2. La configuration `vercel.json` sélectionne **Vite**, l’installation `npm ci`, le build `npm run build` et la sortie `dist`. Laissez la racine du projet sur `.` (le dossier contenant `package.json`). Le runtime est fixé à Node 24.x.
3. Cliquez sur **Deploy**. Vercel déploie les fichiers compilés et la fonction `api/contact.js`. La configuration inclut les en-têtes de sécurité, les fichiers d’identité et de catalogue nécessaires à la fonction et un délai maximal de 15 secondes pour celle-ci.
4. Pour activer les demandes e-mail, créez un compte Resend, vérifiez votre domaine d’expédition et ajoutez **dans les variables serveur Vercel** : `RESEND_API_KEY`, `MAIL_FROM` (expéditeur autorisé), `CONTACT_EMAIL` (destinataire commercial). N’utilisez jamais un préfixe `VITE_` pour ces secrets. Redéployez après modification.
5. Activez une règle de limitation de débit pour `/api/contact` dans Vercel Firewall, selon les capacités du compte. Pour un trafic exposé, ajoutez au besoin un challenge anti-robot avant ouverture commerciale.
6. Effectuez une vraie demande et contrôlez la réception, le Reply-To, le rendu mobile et les liens. Les tests locaux du fournisseur sont simulés et ne prouvent pas la délivrabilité.
7. Rattachez votre domaine dans Vercel puis configurez les DNS indiqués par Vercel. Ajoutez ensuite URL canonique, image de partage et sitemap avec votre domaine réel.

Alternative CLI, après votre propre authentification : `npx vercel`, puis `npx vercel --prod`. Ne partagez aucun jeton dans le chat ou dans Git.

Le formulaire retourne une indisponibilité tant que l’envoi n’est pas configuré. Il ne prétend jamais avoir transmis une demande en cas d’échec. Les champs ne sont pas enregistrés dans une base locale ni dans le stockage du navigateur.

## Documents

- [Cahier des charges](docs/CAHIER-DES-CHARGES.md)
- [Analyse des solutions](docs/ANALYSE-SOLUTIONS.md)
- [Références techniques](docs/REFERENCES-TECHNIQUES.md)
- [Résultats de validation](docs/VALIDATION.md)

Avant publication commerciale : validation produit et commerciale, confidentialité, configuration e-mail et protection anti-abus. Le déploiement manuel reste à votre charge, conformément à votre demande.

## Versions française et anglaise

Le sélecteur FR/EN est accessible dans l’en-tête sur ordinateur et mobile. L’anglais est partageable avec `?lang=en` ; sans ce paramètre, le français est utilisé. La langue, les filtres et la fiche sélectionnée restent dans l’URL. Le retour du navigateur restaure la langue, et le passage FR/EN ne vide pas les champs du formulaire. Aucun cookie ni stockage navigateur n’est nécessaire.

- `src/locales/en.json` : traductions de l’interface française.
- `src/catalog.json` : 21 solutions, contenus FR/EN, usages, prérequis, exemples et points de licence.
- `src/SolutionGuide.tsx` : fiches, tableau comparatif, cycle de remédiation, glossaire et préparation de rendez-vous.
- `src/i18n.ts` : sélection de langue, attribut HTML et métadonnées traduites.

Les formulaires transmettent `language: fr/en` et un identifiant de solution stable au serveur. Les demandes anglaises produisent un e-mail commercial en anglais ; les valeurs des solutions restent stables entre les langues. En cas d’échec, le fichier téléchargé est rédigé dans la langue de la demande.

L’offre publique est présentée sous l’identité ALYAD. Aucun fabricant ni lien vers un produit tiers n’apparaît dans le catalogue. Les critères de choix et les références techniques consultées sont documentés dans `docs/ANALYSE-SOLUTIONS.md` et `docs/REFERENCES-TECHNIQUES.md`. Les prestations, les capacités et les niveaux de service sont définis sur devis.

La connexion du dépôt à votre compte Vercel et l’entrée des variables serveur restent à effectuer dans Vercel. La préconfiguration du dépôt ne crée pas de projet Vercel et ne prouve pas qu’un déploiement a abouti.

## Refonte visuelle et multi-solutions

La palette chaude et colorée est définie dans `src/theme.css`, après le socle `src/style.css`. Les trois domaines partagent une structure de carte, de filtre et de fiche avec des accents distincts : terre cuite, vert et bleu. Le catalogue comprend 9 solutions cybersécurité, 6 offres data centers et 6 offres télécommunications. Le formulaire utilise les mêmes identifiants dans les deux langues. Les niveaux de service, travaux et éventuelles autorisations sont cadrés avant engagement.
