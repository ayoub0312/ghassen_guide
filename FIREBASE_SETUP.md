# 🔥 Guide de Configuration Firebase

Ce guide vous aidera à configurer Firebase pour votre projet Ghassen Travel Guide.

## Étape 1: Télécharger la Clé de Service Firebase

1. **Ouvrez la Firebase Console**: https://console.firebase.google.com
2. **Sélectionnez votre projet**: `ghassen-a125f`
3. **Allez dans Project Settings** (⚙️ en haut à gauche)
4. **Cliquez sur l'onglet "Service Accounts"**
5. **Cliquez sur "Generate new private key"**
6. **Téléchargez le fichier JSON**

## Étape 2: Placer la Clé de Service

1. Renommez le fichier téléchargé en `serviceAccountKey.json`
2. Placez-le dans le dossier: `backend/config/serviceAccountKey.json`

```
backend/
  └── config/
      └── serviceAccountKey.json  ← Placez le fichier ici
```

## Étape 3: Vérifier la Configuration Firebase Frontend

Le fichier `frontend/src/firebase/config.js` doit contenir vos vraies credentials Firebase.

Pour les obtenir:
1. Firebase Console > Project Settings
2. Sous "Your apps", trouvez votre application web
3. Copiez la configuration Firebase

Le fichier devrait ressembler à:

```javascript
const firebaseConfig = {
    apiKey: "AIza...",
    authDomain: "ghassen-a125f.firebaseapp.com",
    projectId: "ghassen-a125f",
    storageBucket: "ghassen-a125f.appspot.com",
    messagingSenderId: "...",
    appId: "..."
};
```

## Étape 4: Migrer les Données

Une fois la clé de service en place, exécutez le script de migration:

```bash
cd backend
node scripts/migrate-to-firestore.js
```

Ce script va:
- ✅ Créer une sauvegarde de vos fichiers JSON
- ✅ Migrer toutes les activités vers Firestore
- ✅ Migrer toutes les réservations vers Firestore

## Étape 5: Démarrer le Serveur

```bash
cd backend
npm run dev
```

Le serveur devrait démarrer et se connecter à Firebase automatiquement.

## Étape 6: Vérifier dans Firebase Console

1. Allez dans Firebase Console > Firestore Database
2. Vous devriez voir deux collections:
   - `activities` (avec toutes vos activités)
   - `reservations` (avec toutes vos réservations)

## ⚠️ Dépannage

### Erreur: "Service account key not found"
- Vérifiez que le fichier `serviceAccountKey.json` est bien dans `backend/config/`
- Vérifiez que le nom du fichier est exactement `serviceAccountKey.json`

### Erreur: "Permission denied"
- Vérifiez que les règles Firestore permettent la lecture/écriture
- Dans Firebase Console > Firestore Database > Rules, utilisez:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**Note**: Ces règles sont pour le développement. En production, utilisez des règles plus strictes.

## 📝 Fichiers Importants

- `backend/config/firebase-admin-config.js` - Configuration Firebase Admin
- `backend/services/firebaseService.js` - Service layer pour Firestore
- `backend/scripts/migrate-to-firestore.js` - Script de migration
- `backend/.env` - Variables d'environnement (ne pas commiter!)
- `frontend/src/firebase/config.js` - Configuration Firebase frontend

## ✅ Checklist

- [ ] Téléchargé la clé de service Firebase
- [ ] Placé `serviceAccountKey.json` dans `backend/config/`
- [ ] Vérifié la configuration frontend dans `firebase/config.js`
- [ ] Exécuté le script de migration
- [ ] Vérifié les données dans Firebase Console
- [ ] Testé l'application

## 🎉 C'est Tout!

Votre application utilise maintenant Firebase Firestore comme base de données!
