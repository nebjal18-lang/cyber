# Validation — refonte ALYAD multi-solutions

Recette du 5 novembre 2026 sous Node 24 et Chromium système.

| Contrôle | Résultat |
| --- | --- |
| Compilation TypeScript et build Vite | Réussis |
| Tests Node API, catalogue et traductions | 11 réussis, 0 ignoré |
| Tests navigateur ordinateur et mobile | 26 réussis, 0 ignoré |
| Audit axe WCAG A/AA | Aucune violation détectée en français et en anglais, sur ordinateur et mobile |
| Catalogue | 21 offres : 9 cybersécurité, 6 data centers, 6 télécommunications |
| Fiches détaillées | 21 fiches parcourues dans chaque langue |
| Glossaire | 15 notions disponibles dans les deux langues |
| Rendu responsive | Absence de débordement horizontal aux largeurs 320, 390, 768 et 1280 px |
| Références commerciales | Noms et liens des anciens produits retirés des sources, contenus, métadonnées et catalogue |
| Production statique | Ouverture des fichiers compilés et présence des 21 solutions vérifiées |
| Envoi d’e-mail réel | Non exécuté : service d’envoi non configuré |
| Déploiement Vercel | Non effectué par l’assistant |

Les tests couvrent le filtrage et l’URL, la sélection de fiches, la transmission des identifiants génériques de solution, le choix prérempli dans le formulaire, les statuts d’envoi et d’échec, le téléchargement de secours, les langues et le retour du navigateur. Ils vérifient aussi l’identité ALYAD, le téléphone, les informations légales, les données structurées et la conservation des champs lors d’un changement de langue.

Les tests API valident les méthodes, l’origine, le format et la taille, les champs, le consentement, les identifiants du catalogue et la langue. Le service e-mail est simulé pour tester les chemins de succès et d’échec ; cela ne prouve pas une délivrabilité réelle. L’intégrité du catalogue bilingue et la couverture de traduction de l’interface sont vérifiées par les tests Node.

Les contrastes des boutons ont été ajustés avant la recette finale. Les quatre audits de page passent en mode de mouvement réduit, afin de contrôler les contenus dans leur état lisible. L’audit automatisé ne constitue pas une certification complète d’accessibilité.

## Reproduire

```bash
cd /workspace/cyber
npm ci
npm run build
npm test
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

Sur une machine équipée des navigateurs Playwright, `npm run test:e2e` suffit. Les captures actualisées sont dans `docs/previews/`, notamment `refonte-fr-desktop.png`, `refonte-fr-mobile.png` et `trois-domaines.png`. Les références techniques et la portée des recommandations sont documentées dans `REFERENCES-TECHNIQUES.md`.

## Nouvelle composition avec logo et mouvement

Le logo est chargé et affiché dans les deux dimensions de test. Deux scénarios supplémentaires vérifient l’apparition des cartes lors de la navigation, le comportement du catalogue dépliable et la suppression des animations en mouvement réduit. Le rendu compilé a également servi à produire une vidéo de huit secondes des animations réelles.

Bilan : 11 tests Node et 26 tests navigateur réussis, aucun test ignoré, build réussi. Les visuels de revue actuels sont `professionnel-fr-desktop.png`, `professionnel-fr-mobile.png`, `professionnel-domaines.png` et `professionnel-fr-complet.png`. La vidéo est `presentation-animee.mp4`. Les anciens noms de captures françaises pointent désormais sur la nouvelle composition.
