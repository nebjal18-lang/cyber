# Cahier des charges — site commercial cybersécurité au Sénégal

## Objectif et positionnement

Créer une vitrine commerciale bilingue français/anglais permettant à une société de Dakar de présenter les solutions Tenable à son réseau professionnel et de recueillir des demandes qualifiées. Le site doit guider un décideur vers une discussion et un devis, sans faire croire à un achat de licence immédiat. Identité : **ALYAD-DEVELOPPEMENT « AD » SUARL**, renseignée d’après la présentation institutionnelle du propriétaire.

Cibles : dirigeants, DSI, RSSI, responsables infrastructures, consultants, responsables industriels ; entreprises, institutions, banques, PME et exploitants d’infrastructures au Sénégal. Ton : clair, professionnel et accessible, sans promesse de sécurité absolue.

## Direction artistique

Palette : Atlantique `#0b3048`, bleu de service `#09657b`, écume `#edf5f6`, blanc `#ffffff`, cuivre de focus `#b06c46`, texte secondaire `#526975`. Manrope pour les titres, DM Sans pour le texte ; polices auto-hébergées. Composition asymétrique à gauche, illustration vectorielle de visibilité à droite. L’illustration relie IT, OT, cloud et identités ; elle ne simule pas de vraies données client. Une silhouette graphique de Dakar ancre l’accompagnement local. Pas de photographie de banque d’images, de faux avis, de faux clients ni de compteurs commerciaux inventés.

## Parcours et contenus livrés

1. Accueil : proposition de valeur « Voir les risques. Protéger l’essentiel. », accès aux solutions et au formulaire.
2. Catalogue de neuf familles : Tenable One, Vulnerability Management, Nessus, Cloud Security, Identity Exposure, OT Security, Security Center, Web App Scanning et Attack Surface Management. Pour chaque entrée : usage général, points d’attention, cible, lien officiel, demande préremplie.
3. Filtres par besoin, catégorie conservée dans l’URL.
4. Accompagnement en quatre étapes : comprendre, choisir, préparer, suivre. Le périmètre réel des prestations reste contractuel.
5. Lecture par secteur : finance, PME, secteur public, industrie.
6. FAQ : choix de solution, budget, démonstrations, précautions de scan, conditions du projet.
7. Formulaire : nom, entreprise, e-mail, téléphone facultatif, solution, projet, accord de traitement. Aucun renseignement sensible demandé.
8. Informations légales et confidentialité accessibles au clavier, à compléter avec l’identité réelle.

## Fonctions et architecture

- React + TypeScript + Vite ; rendu responsive, pas de CMS ni base de données requis.
- Formulaire vers une fonction Vercel `/api/contact` et l’API Resend, configurée uniquement côté serveur.
- Validation navigateur ET serveur ; limites de longueur, refus des origines étrangères, piège robot, refus des requêtes excessives et délai d’envoi borné.
- Aucun secret dans le client. Aucune journalisation applicative du contenu des demandes.
- En cas de configuration absente ou d’échec fournisseur : message explicite, conservation des champs et téléchargement local de la demande ; aucun faux succès.
- Aucun envoi e-mail réel tant que les variables et le domaine expéditeur ne sont pas configurés.
- La limitation de débit doit être activée dans Vercel Firewall avant d’exposer le formulaire à un trafic public ; le piège robot seul ne suffit pas.
- Pas de paiement, activation de licence, espace client, réservation automatique ni CRM dans cette version. Le devis est l’étape commerciale prévue.

## Exigences qualité

Mobile à partir de 320 px, ordinateur et tablette ; navigation utilisable au clavier ; labels, focus visibles, message de formulaire annoncé, respect du mouvement réduit. Contrôle automatisé WCAG A/AA avec axe, complété par revue visuelle ; cet audit ne vaut pas certification complète. Build TypeScript/Vite, tests de validation/API et tests navigateur des parcours principaux. Pas d’appel externe pour les polices, pas de traceur publicitaire.

Métadonnées françaises, titre et description, favicon, HTML sémantique. Le site est une application React côté client ; pour une stratégie SEO éditoriale importante, prévoir ensuite pré-rendu/SSR, pages produit individuelles, domaine canonique et sitemap avec le domaine réel. Aucun domaine ni coordonnées fictifs dans les données structurées.

## Éléments à fournir avant ouverture commerciale

- Raison sociale, nom public, adresse, immatriculation, contact, téléphone et WhatsApp.
- Accord Tenable, droits de revente et règles d’utilisation de la marque ; aucune qualité officielle n’est affirmée avant validation.
- Validation des noms, éditions, disponibilité, licences et arguments produit sur les fiches officielles actualisées.
- Prestations effectivement proposées, disponibilité de l’équipe, conditions de devis, devise et fiscalité applicables.
- Responsable de traitement, durée de conservation, contact d’exercice des droits, conditions des sous-traitants et formalités sénégalaises applicables, notamment auprès de la CDP si nécessaire.
- Configuration Resend/Vercel et test d’une réception réelle ; mesures anti-abus au niveau Vercel.

## Recette et livraison

Livraison : sources, lockfile, configuration Vercel, tests, présent cahier des charges, analyse éditoriale et guide de déploiement manuel. Le propriétaire a choisi de déployer lui-même ; aucun compte ni jeton Vercel n’est nécessaire à la livraison locale. La recette technique et les limites observées sont documentées dans `VALIDATION.md`.

## Extension bilingue et approfondissement éditorial

Le sélecteur FR/EN traduit navigation, présentation, catalogue, fiches, tableau comparatif, ressources, FAQ, formulaires, statuts et textes légaux. La langue est partageable dans l’URL et restaure l’attribut `lang`, le titre et la description. Les informations saisies sont conservées lors d’un changement de langue.

Chaque solution propose une fiche longue : contexte, possibilités à étudier, exemple d’utilisation, préparation et limites de périmètre/licence. Un tableau compare les neuf familles sans promettre de compatibilité ou de fonctionnalité non confirmée. Trois articles expliquent la gestion des expositions, la priorisation et les indicateurs. Un cycle en quatre étapes, un glossaire de neuf notions et une liste de questions de cadrage accompagnent la demande commerciale.

La validation inclut des parcours anglais, l’intégrité des traductions, les deux langues pour les neuf fiches, les nouvelles solutions côté serveur, la langue de l’e-mail, la conservation des champs et le rendu de 320 à 1280 px. Les sources officielles restent à vérifier après application de la configuration réseau.

## Identité institutionnelle et positionnement cybersécurité

Le site présente ALYAD-DEVELOPPEMENT, ses coordonnées, ses identifiants administratifs, ses activités et cinq fonctions de gouvernance, avec traduction anglaise. Une section dédiée met en avant la démarche cybersécurité : cadrage des risques, orientation vers les solutions et coordination des projets. Les démarches de partenariat ne sont pas mentionnées dans le contenu public. La présentation n’invente ni certification ni expérience technique.

Les liens d’appel utilisent +221782912111. La raison sociale, le R.C., le NINEA et l’adresse figurent dans les mentions légales et les données structurées d’organisation. L’adresse e-mail et WhatsApp ne sont pas renseignés faute de données dans le document source. Voir `IDENTITE-SOCIETE.md` pour la traçabilité des faits.
