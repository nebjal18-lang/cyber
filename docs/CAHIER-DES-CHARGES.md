# Cahier des charges — ALYAD-DEVELOPPEMENT

## Objectif

Présenter l’offre ALYAD-DEVELOPPEMENT en cybersécurité, data centers et télécommunications au Sénégal. Recueillir des demandes qualifiées et guider chaque client vers un cadrage et un devis. L’offre commerciale est indépendante des noms de fabricants et ne révèle pas les choix d’approvisionnement. L’identité juridique, l’adresse et le téléphone sont repris du document institutionnel fourni par le propriétaire.

## Parcours

1. Accueil : « Connecter. Sécuriser. Faire grandir. », proposition de valeur, diagramme numérique illustratif et demande de projet.
2. Trois pôles colorés : cybersécurité, data centers et télécommunications ; liens directs vers les offres filtrées.
3. Catalogue de 21 solutions, avec filtres persistants dans l’URL et descriptions originales.
4. Fiches détaillées : contexte, possibilités, exemple, préparation et engagements ; comparaison des solutions.
5. Approche de projet, enjeux sectoriels et présentation d’ALYAD, de ses activités et de sa direction.
6. Ressources pédagogiques sur les risques, la résilience et la qualité des réseaux ; glossaire de 15 notions.
7. FAQ générale, formulaire et liens d’appel. Mentions légales et confidentialité en français et en anglais.

## Identité et design

Palette : vert profond `#193c3b`, terre cuite `#963e2d`, vert végétal `#245d46`, bleu Atlantique `#2a547d`, or `#e5b740` et ivoire `#fffaf2`. Les trois couleurs principales différencient les domaines dans les cartes, filtres et fiches. La texture est discrète ; elle laisse les textes lisibles. Manrope et DM Sans sont hébergées localement. Le monogramme AD, les coordonnées de Dakar et la silhouette graphique soutiennent l’identité locale. Les contrastes et l’utilisation au clavier sont vérifiés.

## Fonctions

React/TypeScript/Vite, Node 24. Sélecteur FR/EN, langue et filtres partageables, conservation des champs lors du changement de langue, données structurées d’organisation. Les 21 offres disposent d’identifiants stables utilisés par le formulaire et validés côté serveur. L’e-mail utilise le libellé de solution correspondant à la langue de la demande.

API Vercel `/api/contact` : validation, consentement, limites de taille, contrôle d’origine, piège robot et délai d’envoi borné. Le fournisseur e-mail est configuré côté serveur par variables sécurisées. Sans configuration ou en cas d’échec, le site indique que la demande n’est pas transmise et permet un téléchargement local. Aucun faux succès. Les noms des sous-traitants de données restent mentionnés dans les informations de confidentialité, distinctement du catalogue de solutions.

## Limites et recette

Aucune certification, référence client, disponibilité chiffrée, propriété d’un data center ou autorisation d’opérateur n’est inventée. Équipements, travaux, licences, support et engagements sont précisés sur devis. Les interventions techniques nécessitent un périmètre autorisé et des responsabilités définies.

La recette couvre la compilation, les validations API, les traductions, les 21 fiches, les trois domaines, les parcours FR/EN, les liens d’appel, les petits écrans et l’accessibilité. Le test d’envoi réel nécessite une configuration e-mail valide. Le déploiement Vercel et le domaine sont gérés séparément. Voir `VALIDATION.md` et `IDENTITE-SOCIETE.md`.
