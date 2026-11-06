# Formulaire ALYAD — configuration Resend

L’adresse `contact@alyad-development.com` a été fournie par le propriétaire. L’API utilise par défaut :

| Paramètre | Valeur |
| --- | --- |
| Expéditeur | `ALYAD-DEVELOPPEMENT <contact@alyad-development.com>` |
| Destinataire | `contact@alyad-development.com` |
| Réponse au visiteur | Adresse saisie dans le formulaire (`reply_to`) |
| Clé | Variable serveur `RESEND_API_KEY`, jamais incluse dans les sources |

Ces adresses proviennent de `src/company.json`. Si elles doivent différer, définir `MAIL_FROM` et/ou `CONTACT_EMAIL` dans les variables serveur Vercel. Ces valeurs prennent alors priorité.

## Activation du site publié

1. Dans Resend, vérifier le domaine **alyad-development.com**. Ajouter chez le gestionnaire DNS les enregistrements exacts fournis par Resend et attendre son statut vérifié. Ne pas modifier les enregistrements de messagerie existants sans tenir compte de leurs usages.
2. Dans le projet Vercel qui publie le site Cyber, ouvrir les variables d’environnement et définir `RESEND_API_KEY` avec une clé Resend autorisée à envoyer depuis ce domaine. Sélectionner au minimum l’environnement Production. Aucun préfixe `VITE_`.
3. Les adresses sont préconfigurées dans le serveur. Facultativement, définir `MAIL_FROM` et `CONTACT_EMAIL` pour les remplacer.
4. Redéployer la branche `main` contenant cette configuration. Une variable ajoutée à Vercel ne modifie pas rétroactivement un ancien déploiement.
5. Après activation, effectuer une demande réelle avec consentement et vérifier sa réception dans la boîte de contact, les indésirables et le journal Resend. Une confirmation API ne prouve pas à elle seule une arrivée en boîte principale.

La configuration locale `.env.local` est ignorée par Git, réservée au propriétaire du fichier et exclue des archives. **Elle n’est pas copiée sur Vercel lors d’un push.** Une clé partagée dans une conversation doit être remplacée pour la production ; saisir la nouvelle valeur directement dans les variables sécurisées de Vercel.

## Vérification locale

- `npm test` vérifie les adresses par défaut, la priorité des variables, le destinataire, le `reply_to` et les réponses du serveur avec le fournisseur simulé.
- `npm run build` compile le site. Les variables sans préfixe `VITE_` ne sont pas exposées au code navigateur.
- Vite seul ne sert pas `api/contact.js`. Utiliser le runtime Vercel pour un essai de bout en bout de la fonction.
- Si la clé est absente, l’API retourne une indisponibilité, sans faux succès, et le formulaire propose le téléchargement de la demande.

La vérification du domaine, l’authenticité de la clé et la délivrabilité ne sont pas établies par les tests simulés. Aucun e-mail réel n’a été envoyé durant cette configuration.
