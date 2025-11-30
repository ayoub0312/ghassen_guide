# Guide de Déploiement Backend sur Render

Ce guide vous explique étape par étape comment mettre en ligne votre serveur backend (Node.js) gratuitement sur **Render**. Cela permettra à votre site (déployé sur Vercel) de communiquer avec votre base de données.

## Prérequis

1.  Avoir un compte GitHub et le code du projet poussé dessus (nous venons de le faire).
2.  Avoir le fichier `backend/config/serviceAccountKey.json` sur votre ordinateur (ne le partagez jamais !).

## Étape 1 : Créer un compte sur Render

1.  Allez sur [dashboard.render.com](https://dashboard.render.com/).
2.  Inscrivez-vous ou connectez-vous (utilisez "Continue with GitHub" pour plus de simplicité).

## Étape 2 : Créer un nouveau "Web Service"

1.  Cliquez sur le bouton **"New +"** en haut à droite et sélectionnez **"Web Service"**.
2.  Choisissez **"Build and deploy from a Git repository"**.
3.  Connectez votre compte GitHub si ce n'est pas déjà fait.
4.  Recherchez votre dépôt `ghassen-travel-guide` (ou le nom que vous lui avez donné) et cliquez sur **"Connect"**.

## Étape 3 : Configurer le service

Remplissez le formulaire avec les valeurs suivantes (très important de respecter exactement) :

*   **Name** : `ghassen-backend` (ou ce que vous voulez)
*   **Region** : `Frankfurt (EU Central)` (le plus proche de la Tunisie)
*   **Branch** : `main`
*   **Root Directory** : `backend` (⚠️ Important : ne laissez pas vide)
*   **Runtime** : `Node`
*   **Build Command** : `npm install`
*   **Start Command** : `node server.js`
*   **Instance Type** : `Free`

## Étape 4 : Ajouter la clé secrète Firebase (CRUCIAL)

C'est l'étape la plus importante pour que votre backend puisse parler à Firebase.

1.  Faites défiler vers le bas jusqu'à la section **"Advanced"**.
2.  Cliquez sur **"Add Secret File"**.
3.  **Filename** : `backend/config/serviceAccountKey.json`
    *   ⚠️ Attention : Le chemin doit être **exactement** celui-ci.
4.  **File Contents** :
    *   Ouvrez votre fichier `backend/config/serviceAccountKey.json` sur votre ordinateur avec un éditeur de texte (Bloc-notes, VS Code...).
    *   Copiez **tout** le contenu.
    *   Collez-le dans la zone de texte "File Contents" sur Render.
5.  Cliquez sur **"Save Changes"** (si le bouton apparaît) ou continuez.

## Étape 5 : Lancer le déploiement

1.  Cliquez sur le gros bouton **"Create Web Service"** en bas de page.
2.  Render va commencer à construire votre application. Vous verrez les logs défiler.
3.  Attendez que vous voyiez "Your service is live" ou un message de succès vert.
4.  En haut à gauche, sous le nom de votre service, vous verrez une URL qui ressemble à `https://ghassen-backend.onrender.com`. **Copiez cette URL**, nous en aurons besoin pour le frontend.

## Étape 6 : Mettre à jour le Frontend (Vercel)

Une fois le backend en ligne :

1.  Allez sur votre tableau de bord **Vercel**.
2.  Sélectionnez votre projet `ghassen-travel-guide`.
3.  Allez dans **Settings** > **Environment Variables**.
4.  Ajoutez une nouvelle variable :
    *   **Key** : `VITE_API_URL`
    *   **Value** : L'URL que vous avez copiée de Render (ex: `https://ghassen-backend.onrender.com`) **sans le slash à la fin**.
5.  Cliquez sur **Save**.
6.  Allez dans l'onglet **Deployments** et redéployez votre projet (ou faites un nouveau push sur GitHub pour déclencher le déploiement).

---

### Dépannage

*   **Erreur "Service account key not found"** : Vérifiez que vous avez bien créé le "Secret File" avec le nom exact `backend/config/serviceAccountKey.json` et que le "Root Directory" est bien `backend`.
*   **Le déploiement échoue** : Regardez les "Logs" sur Render pour voir l'erreur exacte.
