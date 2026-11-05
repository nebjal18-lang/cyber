# ALYAD-DEVELOPPEMENT — cybersécurité, data centers et télécommunications

Site bilingue français/anglais React/TypeScript. Identité ALYAD-DEVELOPPEMENT, accueil visuel, orientation de projet en trois questions, catalogue filtrable, pages dédiées, FAQ et formulaire avec API Vercel et repli par téléchargement. Aucun déploiement ni envoi réel effectué automatiquement.

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

## Identité visuelle, interactions et animations

La direction graphique repose sur le logo transmis par le propriétaire, le bleu nuit et le vert, une composition d’accueil photographique et une hiérarchie plus aérée. Les trois domaines ont des visuels illustratifs distincts. Les images WebP sont auto-hébergées et les environnements représentés ne sont pas présentés comme des installations réelles appartenant à ALYAD.

- `src/theme.css` : composition, responsive et mouvements.
- `src/useOrganizedMotion.ts` : apparition unique des sections, prise en compte du focus clavier, des liens d’ancre et de `prefers-reduced-motion`.
- `public/images/alyad-logo.webp` : version web du logo fourni.
- `public/images/infrastructure-hero.webp` et `service-environments.webp` : illustrations d’architecture.

L’animation d’entrée est courte et finie ; aucune boucle continue. Le catalogue de 21 offres se trouve sur `/solutions`, ouvert par défaut et filtrable. Le comparatif reste dépliable. Les ressources sont sur `/ressources` et la présentation institutionnelle complète sur `/societe`. Les réécritures Vercel permettent leur ouverture directe et leur actualisation sans toucher à `/api/contact`. Une fiche détaillée n’est affichée qu’après sélection d’une solution. L’URL conserve les choix de domaine, de langue et de fiche. Ces changements préservent l’intégralité des descriptions et des données de société.

Les captures et la vidéo de lecture sont dans `docs/previews/` : `professionnel-fr-desktop.png`, `professionnel-fr-mobile.png`, `professionnel-domaines.png`, `professionnel-fr-complet.png` et `presentation-animee.mp4`.

## Accueil vivant et parcours de projet

L’accueil conserve les trois domaines, les situations types illustrées, la méthode interactive, les cinq responsables identifiés, la FAQ et le contact. Les fiches longues et le glossaire sont sur des pages dédiées. Toutes ces pages existent en français et en anglais avec des liens qui conservent la langue.

- `src/ProjectPlanner.tsx` : objectif, besoin et horizon, puis trois pistes du catalogue et préparation du formulaire. Les coordonnées ne sont pas demandées pour consulter les pistes.
- `src/project-options.json` : questions bilingues et correspondances avec les identifiants canoniques des solutions.
- `src/HomeSections.tsx` : situations interactives, méthode, responsables et introductions des pages.
- `src/solutionIcons.ts` : icône adaptée à chacune des 21 offres.
- `src/routing.ts` : routes et construction des liens localisés. Les anciens liens racine comportant `categorie` ou `fiche` restent compatibles.
- `src/experience.css` : composition des nouvelles sections et adaptation aux petits écrans.
- `public/images/project-context.webp` : illustrations de préparation d’un projet et de raccordement réseau ; elles ne représentent ni des portraits du personnel ni des réalisations clients.

Les noms et fonctions des responsables viennent de la présentation institutionnelle. Le champ facultatif `portrait` de chaque responsable, dans `src/company.json`, est vide : ajoutez un chemin local vers une photographie autorisée pour remplacer les initiales.

Le parcours sélectionne une solution stable, conserve les notes déjà saisies et ajoute un cadrage à la demande. Le texte transmis et le téléchargement conservent ces deux éléments sans répéter un cadrage déjà présent en tête du message. Le serveur valide la taille et le type du champ `projectBrief`. Aucun questionnaire n’est conservé dans le navigateur.

Les animations restent courtes : apparition des sections, ouverture des étapes et transition des situations à la demande. Le réglage système de mouvement réduit supprime ces effets. Il n’y a pas de rotation automatique des contenus.
