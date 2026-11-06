# Validation — accueil illustré et parcours ALYAD

Recette du 5 novembre 2026 sous Node 24 et Chromium système. Validation locale du code et de la version compilée.

| Contrôle | Résultat |
| --- | --- |
| Compilation TypeScript et build Vite | Réussis |
| Tests Node API, catalogue et traductions | 12 réussis, 0 ignoré |
| Scénarios navigateur ordinateur et mobile | 34 réussis, 0 ignoré |
| Compatibilité des anciens liens | 4 contrôles ciblés supplémentaires réussis après normalisation vers `/solutions` |
| Audit axe WCAG A/AA | Aucune violation détectée sur l’accueil et les trois pages dédiées, dans les deux langues et les deux formats |
| Catalogue | 21 offres : 9 cybersécurité, 6 data centers, 6 télécommunications |
| Fiches détaillées | 21 fiches parcourues dans chaque langue |
| Glossaire | 15 notions sur `/ressources`, dans les deux langues |
| Rendu responsive | Pas de débordement horizontal aux largeurs contrôlées de 320 à 1440 px |
| Questionnaire | Trois étapes, trois recommandations, identifiant stable et cadrage dans la demande |
| Notes du visiteur | Conservées lors de la préparation du formulaire ; contexte complémentaire transmis |
| Identité | Cinq responsables issus de la présentation institutionnelle ; initiales et fonctions, sans portraits inventés |
| Références commerciales | Catalogue générique sans noms ni liens d’anciens fournisseurs |
| Envoi d’e-mail réel | Non exécuté : service d’envoi non configuré |
| Déploiement Vercel | Non effectué par l’assistant ; réécritures des pages préconfigurées |

Les tests couvrent les liens directs et leur actualisation, les filtres et les anciennes URL, les fiches, les demandes préremplies, les statuts d’envoi et d’échec, le téléchargement de secours, les langues et le retour du navigateur. Ils vérifient l’identité ALYAD, le téléphone, les informations légales et structurées, ainsi que la conservation des champs et des choix lors d’un changement de langue.

Les nouveaux scénarios parcourent les trois étapes du questionnaire sur ordinateur et mobile, le retour sur les choix, la remise à zéro, les recommandations et le préremplissage. Ils vérifient une sélection au clavier, la conservation d’un message déjà saisi et la transmission de son cadrage complémentaire. Les situations types changent de contenu et de lien de solution ; la méthode expose les livrables de chaque étape. Le réglage de mouvement réduit supprime les animations.

L’API valide les méthodes, l’origine, le format, la taille, les champs, le consentement, les identifiants de solution, la langue et le cadrage facultatif `projectBrief`. Le texte commercial évite de répéter un cadrage déjà placé en tête du message. Le fournisseur e-mail est simulé pour les chemins de succès et d’échec ; ces tests ne prouvent pas la délivrabilité réelle. L’intégrité des fiches bilingues et la couverture du dictionnaire d’interface sont vérifiées par les tests Node.

Les audits automatiques utilisent le mouvement réduit afin de contrôler les contenus dans leur état lisible. Ils ne constituent pas une certification complète d’accessibilité. Les captures du site compilé ont été revues visuellement sur ordinateur et mobile.

## Aperçus

Dans `docs/previews/` :

- `professionnel-fr-desktop.png`, `professionnel-fr-mobile.png` : première vue.
- `professionnel-fr-complet.png` et `accueil-mobile.png` : accueil complet.
- `orientation-projet-desktop.png`, `orientation-projet-mobile.png` : questionnaire.
- `situations-illustrees-desktop.png`, `situations-illustrees-mobile.png` : exemples interactifs et illustrations.
- `responsables-desktop.png`, `responsables-mobile.png` : présentation des responsables.
- `solutions-desktop.png`, `solutions-mobile.png` : page du catalogue.
- `presentation-animee.mp4` : démonstration de douze secondes des animations et interactions réelles.

La hauteur de l’accueil à 1440 px de large passe d’environ 8 961 à 6 286 px. Les fiches et ressources déplacées restent accessibles intégralement sur leurs pages dédiées.

## Reproduire

```bash
cd /workspace/cyber
npm ci
npm run build
npm test
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

Avec les navigateurs Playwright installés, `npm run test:e2e` suffit. La configuration Vercel conserve `/api/contact` et réécrit explicitement `/solutions`, `/ressources` et `/societe` vers l’application. Les accès directs ont été testés avec Vite ; la publication et sa vérification dans Vercel restent à effectuer. L’accès au domaine public communiqué est bloqué par la politique réseau de cet environnement : aucun résultat local n’est présenté comme une vérification du déploiement public.

## Mise à jour contact et Resend — 6 novembre 2026

L’adresse `contact@alyad-development.com` fournie par le propriétaire apparaît dans les contacts, les mentions légales et les données structurées. L’API l’utilise par défaut comme destinataire et expéditeur (`ALYAD-DEVELOPPEMENT <contact@alyad-development.com>`), tout en conservant la priorité des variables `MAIL_FROM` et `CONTACT_EMAIL`.

Vérifications de cette mise à jour : build TypeScript/Vite réussi, 13 tests Node réussis et 8 scénarios navigateur ciblés réussis (formulaire, identité, lien e-mail, métadonnées, mobile et accessibilité anglaise). La configuration locale se charge correctement ; la clé est absente des fichiers suivis par Git et des fichiers compilés destinés au navigateur. Les envois du fournisseur sont simulés. Aucun e-mail réel, aucune vérification Resend du domaine et aucun déploiement Vercel n’ont été effectués par l’assistant.

La recette complète de 34 scénarios navigateur ci-dessus correspond à la version précédente du 5 novembre ; la mise à jour du 6 novembre a été vérifiée avec les 8 scénarios ciblés pertinents. Voir `CONTACT-RESEND.md` pour l’activation côté Vercel.
