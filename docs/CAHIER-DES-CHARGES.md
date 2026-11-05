# Cahier des charges — ALYAD-DEVELOPPEMENT

## Objectif

Présenter l’offre ALYAD-DEVELOPPEMENT en cybersécurité, data centers et télécommunications au Sénégal. Recueillir des demandes qualifiées et guider chaque client vers un cadrage et un devis. L’offre commerciale est indépendante des noms de fabricants et ne révèle pas les choix d’approvisionnement. L’identité juridique, l’adresse et le téléphone sont repris du document institutionnel fourni par le propriétaire.

## Parcours

1. Accueil : « L’infrastructure de vos ambitions. », proposition de valeur, visuel architectural illustratif et demande de projet.
2. Trois pôles visuels : cybersécurité, data centers et télécommunications ; liens directs vers les offres filtrées.
3. Catalogue de 21 solutions, avec filtres persistants dans l’URL et descriptions originales.
4. Fiches détaillées : contexte, possibilités, exemple, préparation et engagements ; comparaison des solutions.
5. Approche de projet, enjeux sectoriels et présentation d’ALYAD, de ses activités et de sa direction.
6. Ressources pédagogiques sur les risques, la résilience et la qualité des réseaux ; glossaire de 15 notions.
7. FAQ générale, formulaire et liens d’appel. Mentions légales et confidentialité en français et en anglais.

## Identité et design

Logo transmis par le propriétaire, préparé pour une intégration web à fond transparent. Palette : bleu nuit `#09263b`, vert de marque `#087657`, blanc, gris bleuté `#f5f8fb` et accents de contexte limités. L’accueil utilise une illustration architecturale grand format, avec des textes lisibles sur un fond sombre. La typographie Manrope et DM Sans est hébergée localement.

Les animations ont un rôle défini : entrée de page courte, révélations uniques au défilement et interactions de navigation. Aucune boucle permanente. `prefers-reduced-motion` est respecté ; le focus clavier et les liens d’ancre rendent immédiatement visibles les sections ciblées.

Le catalogue reste complet sur sa page dédiée et ouvert par défaut. Les fiches s’affichent après sélection ; le tableau comparatif reste ouvert à la demande. L’organisation et les autres activités sont déployées sur la page Société. Le site doit conserver les descriptions, les deux langues, les informations institutionnelles et les parcours de demande.

## Fonctions

React/TypeScript/Vite, Node 24. Sélecteur FR/EN, langue et filtres partageables, conservation des champs lors du changement de langue, données structurées d’organisation. Les 21 offres disposent d’identifiants stables utilisés par le formulaire et validés côté serveur. L’e-mail utilise le libellé de solution correspondant à la langue de la demande.

API Vercel `/api/contact` : validation, consentement, limites de taille, contrôle d’origine, piège robot et délai d’envoi borné. Le fournisseur e-mail est configuré côté serveur par variables sécurisées. Sans configuration ou en cas d’échec, le site indique que la demande n’est pas transmise et permet un téléchargement local. Aucun faux succès. Les noms des sous-traitants de données restent mentionnés dans les informations de confidentialité, distinctement du catalogue de solutions.

## Limites et recette

Aucune certification, référence client, disponibilité chiffrée, propriété d’un data center ou autorisation d’opérateur n’est inventée. Équipements, travaux, licences, support et engagements sont précisés sur devis. Les interventions techniques nécessitent un périmètre autorisé et des responsabilités définies.

La recette couvre la compilation, les validations API, les traductions, les 21 fiches, les trois domaines, les parcours FR/EN, les liens d’appel, les petits écrans et l’accessibilité. Le test d’envoi réel nécessite une configuration e-mail valide. Le déploiement Vercel et le domaine sont gérés séparément. Voir `VALIDATION.md` et `IDENTITE-SOCIETE.md`.


## Évolution : accueil illustré et navigation par besoins

- Accueil : trois domaines, guide de projet en trois étapes, méthode dépliable, trois situations types interactives, cinq responsables identifiés, FAQ et formulaire.
- Solutions : catalogue complet et filtrable de 21 offres, icônes propres à chaque solution, fiches détaillées et secteurs.
- Ressources : articles pédagogiques, cycle de remédiation, glossaire et préparation du besoin.
- Société : identité légale, activités et organisation détaillée.
- Les liens de page conservent la langue choisie ; les routes directes sont préconfigurées dans Vercel.
- Orientation : aucune coordonnée demandée avant les recommandations ; une solution principale et deux pistes complémentaires sont issues du catalogue. Le résultat reste un point de départ à qualifier.
- Contact : conserver les notes du visiteur et joindre son cadrage. Le téléchargement de secours contient les mêmes informations utiles que la demande serveur.
- Personnes : noms et fonctions authentiques, initiales en attendant des photographies autorisées. Les illustrations de gestes et de préparation sont identifiées comme telles.
- Mouvement : effets courts, déclenchés par la lecture ou les actions, avec respect de la préférence de mouvement réduit.
