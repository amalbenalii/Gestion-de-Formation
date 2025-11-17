# 🎓 Gestion de Formation

API REST complète pour la gestion de formations et de formateurs, construite avec Node.js et Express.

## 📋 Description

Cette application permet de gérer efficacement un système de formation avec deux entités principales :
- **Formateurs** : Gestion des formateurs avec leurs spécialités et expériences
- **Formations** : Gestion des formations avec leurs détails et association aux formateurs

L'API offre des opérations CRUD complètes pour les deux entités, avec validation des données et gestion d'erreurs robuste.

##  Fonctionnalités

-  Gestion complète des formateurs (CRUD)
-  Gestion complète des formations (CRUD)
-  Association formations-formateurs
-  Recherche de formateurs par spécialité
-  Validation des données avec Mongoose
-  Gestion d'erreurs centralisée
-  Support des variables d'environnement
-  Structure MVC modulaire et maintenable

##  Technologies utilisées

- **Node.js** - Environnement d'exécution JavaScript
- **Express.js** - Framework web pour Node.js
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **dotenv** - Gestion des variables d'environnement
- **express-async-handler** - Gestion asynchrone des erreurs

##  Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [MongoDB](https://www.mongodb.com/try/download/community) (local ou MongoDB Atlas)
- npm ou yarn

##  Installation

1. **Cloner le repository** (ou télécharger le projet)
   ```bash
   git clone Gestion-de-Formation
   cd Gestion-de-Formation
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   
   Créez un fichier `.env` à la racine du projet :
   ```env
   MONGO_URI=mongodb://localhost:27017/gestion-formation
   ```
   

4. **Démarrer le serveur**
   
   Mode développement (avec rechargement automatique) :
   ```bash
   npm run dev
   ```

Le serveur sera accessible sur `http://localhost:3001` (ou le port spécifié dans `.env`)

##  Structure du projet

```
gestion-de-formation/
├── config/
│   └── db.js                 # Configuration de la connexion MongoDB
├── controllers/
│   ├── FormateurController.js # Logique métier pour les formateurs
│   └── FormationController.js # Logique métier pour les formations
├── middleware/
│   └── errorMiddleware.js     # Middleware de gestion d'erreurs
├── models/
│   ├── Formateur.js          # Modèle Mongoose pour les formateurs
│   └── Formation.js          # Modèle Mongoose pour les formations
├── routes/
│   ├── formateurRoutes.js    # Routes pour les formateurs
│   └── formationRoutes.js    # Routes pour les formations
├── server.js                 # Point d'entrée de l'application
├── package.json              # Dépendances et scripts
└── README.md                 # Documentation du projet
```

##  API Endpoints

### Formateurs

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/formateurs` | Récupérer tous les formateurs |
| GET | `/api/formateurs/:id` | Récupérer un formateur par ID |
| GET | `/api/formateurs/specialite/:specialite` | Rechercher des formateurs par spécialité |
| POST | `/api/formateurs` | Créer un nouveau formateur |
| PUT | `/api/formateurs/:id` | Mettre à jour un formateur |
| DELETE | `/api/formateurs/:id` | Supprimer un formateur |

### Formations

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/formations` | Récupérer toutes les formations (avec détails formateurs) |
| GET | `/api/formations/:id` | Récupérer une formation par ID |
| POST | `/api/formations` | Créer une nouvelle formation |
| PUT | `/api/formations/:id` | Mettre à jour une formation |
| DELETE | `/api/formations/:id` | Supprimer une formation |


##  Validation des données

### Formateur
- **nom** : Obligatoire, 2-50 caractères
- **specialite** : Obligatoire, 3-100 caractères
- **email** : Obligatoire, unique, format email valide
- **anneesExperience** : Optionnel, 0-50 (défaut: 0)

### Formation
- **titre** : Obligatoire
- **description** : Obligatoire
- **duree** : Obligatoire (en heures)
- **prix** : Obligatoire
- **formateur** : Obligatoire (référence à un formateur existant)
- **dateDebut** : Obligatoire (format Date)

##  Gestion d'erreurs

L'API retourne des réponses JSON standardisées :

**Succès :**
```json
{
  "success": true,
  "data": {...}
}
```

**Erreur :**
```json
{
  "success": false,
  "message": "Description de l'erreur",
  "error": "Détails de l'erreur"
}
```

Codes de statut HTTP :
- `200` : Succès
- `201` : Créé avec succès
- `400` : Requête invalide
- `404` : Ressource non trouvée
- `500` : Erreur serveur

##  Scripts disponibles

- `npm start` : Démarrer le serveur en mode production
- `npm run dev` : Démarrer le serveur en mode développement (avec nodemon)

