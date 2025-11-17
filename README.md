#  Gestion de Formation

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-brightgreen.svg)](https://www.mongodb.com/)

API REST complète pour la gestion de formations et de formateurs, construite avec Node.js et Express. Cette application offre une solution robuste et scalable pour gérer un système de formation professionnel.

##  Description

Cette application permet de gérer efficacement un système de formation avec deux entités principales :
- **Formateurs** : Gestion des formateurs avec leurs spécialités et expériences
- **Formations** : Gestion des formations avec leurs détails et association aux formateurs

L'API offre des opérations CRUD complètes pour les deux entités, avec validation des données et gestion d'erreurs robuste. L'architecture modulaire facilite la maintenance et l'extension des fonctionnalités.

###  Cas d'usage

- Centres de formation professionnelle
- Plateformes d'apprentissage en ligne
- Gestion de programmes de formation d'entreprise
- Systèmes de suivi de formateurs et leurs formations

##  Fonctionnalités

### Core Features
-  Gestion complète des formateurs (CRUD)
-  Gestion complète des formations (CRUD)
-  Association formations-formateurs avec population automatique
-  Recherche de formateurs par spécialité (recherche insensible à la casse)
-  Validation des données avec Mongoose
-  Gestion d'erreurs centralisée et standardisée
-  Support des variables d'environnement
-  Structure MVC modulaire et maintenable

### Sécurité & Validation
-  Validation stricte des emails (format et unicité)
-  Validation des champs avec messages d'erreur personnalisés
-  Protection contre la suppression de formateurs avec formations associées
-  Gestion des erreurs asynchrones avec `express-async-handler`

### Architecture
-  Séparation claire des responsabilités (MVC)
-  Middleware de gestion d'erreurs réutilisable
-  Modèles Mongoose avec timestamps automatiques
-  Routes modulaires et organisées

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

###  Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Créer le fichier .env avec vos configurations
echo "PORT=3001" > .env
echo "MONGO_URI=mongodb://localhost:27017/gestion-formation" >> .env

# 3. Démarrer MongoDB (si local)
# Windows: net start MongoDB
# macOS/Linux: sudo systemctl start mongod

# 4. Lancer l'application
npm run dev
```

Vous devriez voir :
```
✓ Connexion à MongoDB réussie !
✓ Serveur démarré sur http://localhost:3001
```

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

### Base URL
```
http://localhost:3001/api
```

### Formateurs

| Méthode | Endpoint | Description | Code de statut |
|---------|----------|-------------|----------------|
| GET | `/api/formateurs` | Récupérer tous les formateurs | 200 |
| GET | `/api/formateurs/:id` | Récupérer un formateur par ID | 200, 404 |
| GET | `/api/formateurs/specialite/:specialite` | Rechercher des formateurs par spécialité | 200, 400 |
| POST | `/api/formateurs` | Créer un nouveau formateur | 201, 400 |
| PUT | `/api/formateurs/:id` | Mettre à jour un formateur | 200, 404, 400 |
| DELETE | `/api/formateurs/:id` | Supprimer un formateur | 200, 404, 400 |

### Formations

| Méthode | Endpoint | Description | Code de statut |
|---------|----------|-------------|----------------|
| GET | `/api/formations` | Récupérer toutes les formations (avec détails formateurs) | 200 |
| GET | `/api/formations/:id` | Récupérer une formation par ID | 200, 404 |
| POST | `/api/formations` | Créer une nouvelle formation | 201, 400 |
| PUT | `/api/formations/:id` | Mettre à jour une formation | 200, 404, 400 |
| DELETE | `/api/formations/:id` | Supprimer une formation | 200, 404 |

### Endpoint racine

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Informations sur l'API et endpoints disponibles |


**Relations :**
- Une formation doit être associée à un formateur existant
- La suppression d'un formateur est bloquée s'il a des formations associées
- Les formations incluent automatiquement les détails du formateur via `populate()`


##  Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm start` | Démarrer le serveur en mode production |
| `npm run dev` | Démarrer le serveur en mode développement avec rechargement automatique (nodemon) |

##  Architecture

### Structure MVC

Le projet suit une architecture MVC (Model-View-Controller) :

- **Models** (`/models`) : Définition des schémas Mongoose et validation
- **Views** : Non applicable (API REST pure)
- **Controllers** (`/controllers`) : Logique métier et gestion des requêtes
- **Routes** (`/routes`) : Définition des endpoints et routage
- **Middleware** (`/middleware`) : Gestion d'erreurs et logique transversale
- **Config** (`/config`) : Configuration de la base de données

### Flux de requête

```
Client → Route → Controller → Model → MongoDB
                ↓
            Response (JSON)
```

### Relations entre modèles

```
Formateur (1) ────────< (N) Formation
```

- Un formateur peut avoir plusieurs formations
- Une formation appartient à un seul formateur
- Utilisation de `populate()` pour charger les relations


