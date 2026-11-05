# Validation technique

Validation dans l’environnement cloud sous Node 24 et Chromium système, le 4 novembre 2026.

| Contrôle                                         | Résultat                                                     |
| ------------------------------------------------ | ------------------------------------------------------------ |
| Compilation TypeScript et build Vite             | Réussis                                                      |
| Tests Node API, catalogue et traductions         | 11 tests réussis                                             |
| Tests Playwright ordinateur et mobile            | 22 tests réussis, 0 ignoré                                   |
| Audit axe WCAG A/AA sur la page                  | Aucune violation détectée en FR/EN, sur ordinateur et mobile |
| Dépendances de production `npm audit --omit=dev` | 0 vulnérabilité signalée au moment du contrôle               |
| Revue visuelle des captures ordinateur/mobile    | Effectuée                                                    |
| Envoi d’e-mail réel                              | Non exécuté : compte et domaine Resend non configurés        |
| Déploiement Vercel                               | Non effectué : déploiement manuel choisi par le propriétaire |
| Lecture actualisée du site Tenable               | Bloquée par le proxy réseau HTTP 403                         |

Les tests navigateur vérifient le catalogue, les filtres et l’URL, le choix d’une solution dans le formulaire, l’absence de débordement horizontal, le menu mobile, les informations légales, le téléchargement de secours, l’échec d’envoi explicite et la confirmation après réponse positive simulée. Les tests API couvrent la validation, les méthodes, le JSON invalide, l’origine, les limites de taille, le piège robot, l’absence de configuration et les réponses du fournisseur simulées. Les simulations ne prouvent pas la délivrabilité d’un e-mail réel.

Les premiers audits ont signalé des contrastes insuffisants sur des textes secondaires ; ils ont été corrigés avant la recette finale. Le téléchargement du Chromium Playwright a été bloqué par la politique réseau ; les tests ont utilisé le navigateur Chromium déjà installé, sans contournement du proxy.

Reproduire dans cette machine :

```bash
cd /workspace/cyber
npm run build
npm test
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

Sur une machine avec les navigateurs Playwright installés, `npm run test:e2e` suffit. Les captures se trouvent dans `docs/previews/`. Cet audit automatisé ne remplace pas une recette avec les données réelles ni une certification d’accessibilité.

## Extension bilingue

Les tests supplémentaires vérifient les liens avec `lang=en`, le titre et l’attribut HTML de langue, le retour du navigateur, les neuf fiches dans les deux langues, le tableau comparatif, le glossaire, la conservation des champs lors du passage FR/EN, la langue transmise à l’API et le téléchargement d’une demande anglaise. L’intégrité des traductions de l’interface et des données dynamiques est aussi vérifiée. L’absence de débordement horizontal est contrôlée aux largeurs 320, 390, 768 et 1280 px.

Les nouvelles captures sont `docs/previews/english-desktop.png`, `english-mobile.png` et `english-hero-desktop.png`/`english-hero-mobile.png`. Les captures françaises ont été mises à jour avec le nouveau contenu. Les neuf fiches sont des descriptions éditoriales originales ; leur publication ne vaut pas vérification de la version actuelle du catalogue Tenable.

## Intégration ALYAD-DEVELOPPEMENT

La recette contrôle aussi la raison sociale, l’adresse, le téléphone cliquable, le registre du commerce, le NINEA avec son zéro initial, les cinq fonctions de direction et les mentions légales, dans les deux langues. Les données structurées d’organisation reprennent les coordonnées réelles. La présentation cybersécurité et la suppression des anciennes informations provisoires ont été vérifiées ; les formulations retirées à la demande du propriétaire ne figurent pas dans le site public. Les captures ont été régénérées avec l’identité ALYAD.

Bilan de cette recette : build réussi, 11 tests Node et 22 tests navigateur réussis, aucune violation détectée par les audits axe exécutés en français et en anglais, sur ordinateur et mobile. L’envoi d’e-mail réel et le déploiement n’ont pas été effectués.
