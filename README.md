# Gestion des notes et bulletins d'une école

## Présentation du projet

Ce projet consiste à développer une application web de gestion des notes et des bulletins scolaires pour une école privée.

L'objectif est de remplacer la gestion traditionnelle des notes sur fichiers Excel par une solution centralisée permettant :

- la gestion des classes ;
- la gestion des élèves ;
- la gestion des matières ;
- la gestion des enseignants ;
- la saisie des notes ;
- le calcul des moyennes ;
- la génération des bulletins scolaires.

Le projet respecte les règles métier liées aux évaluations, aux coefficients, aux moyennes et aux rôles utilisateurs.

---

# Technologies utilisées

## Backend

- Laravel 12
- PHP 8.2
- API REST
- Laravel Sanctum pour l'authentification
- PostgreSQL

## Frontend

- Angular
- TypeScript
- HTML5
- CSS3

## Base de données

- PostgreSQL 16
- Docker Compose

---

# Architecture du projet

```
gestion-notes-ecole/

├── backend/
│   ├── app/
│   ├── database/
│   ├── routes/
│   └── composer.json
│
├── frontend/
│   └── gestion-frontend/
│       ├── src/
│       └── package.json
│
├── compose.yaml
├── README.md
└── NOTE_IA.md
```

---

# Fonctionnalités principales

## Administration

L'administrateur peut :

- gérer les classes ;
- gérer les élèves ;
- gérer les matières ;
- gérer les enseignants ;
- consulter le tableau de bord.

## Enseignant

L'enseignant peut :

- consulter ses matières affectées ;
- choisir une classe ;
- sélectionner une évaluation ;
- saisir les notes des élèves ;
- modifier ou supprimer une note ;
- consulter les résultats.

## Bulletins

Le système permet :

- le calcul des moyennes par matière ;
- le calcul de la moyenne générale ;
- l'affichage des bulletins ;
- la génération d'un bulletin PDF.

---

# Modèle de données

Les principales entités sont :

- User
- Classe
- Élève
- Matière
- Enseignant
- ClasseMatiere
- Évaluation
- Note
- Bulletin

Relations principales :

- Une classe possède plusieurs élèves.
- Une classe possède plusieurs matières.
- Une matière peut appartenir à plusieurs classes.
- Une évaluation appartient à une matière.
- Une note appartient à un élève et une évaluation.

---

# Installation

## Prérequis

Installer :

- PHP 8.2+
- Composer
- Node.js
- Angular CLI
- Docker Desktop

---

# Installation Backend

Aller dans le dossier backend :

```bash
cd backend
```

Installer les dépendances :

```bash
composer install
```

Créer le fichier environnement :

```bash
cp .env.example .env
```

Générer la clé Laravel :

```bash
php artisan key:generate
```

---

# Configuration Docker PostgreSQL

Lancer la base de données :

```bash
docker compose up -d
```

La base utilisée est :

```
gestion_notes_ecole
```

---

# Migration de la base

```bash
php artisan migrate
```

Pour charger les données de démonstration :

```bash
php artisan db:seed
```

---

# Démarrer Laravel

```bash
php artisan serve
```

API disponible :

```
http://127.0.0.1:8000
```

---

# Installation Frontend Angular

Aller dans le dossier :

```bash
cd frontend/gestion-frontend
```

Installer les dépendances :

```bash
npm install
```

Démarrer Angular :

```bash
ng serve
```

Application disponible :

```
http://localhost:4200
```

---

# Comptes de démonstration

## Administrateur

Rôle :

```
ADMIN
```

## Enseignant

Rôle :

```
ENSEIGNANT
```

---

# Tests réalisés

Les fonctionnalités suivantes ont été testées :

- authentification ;
- gestion des utilisateurs ;
- gestion des classes ;
- gestion des élèves ;
- gestion des matières ;
- saisie des notes ;
- modification des notes ;
- suppression des notes ;
- calcul des bulletins ;
- génération PDF ;
- fonctionnement Docker PostgreSQL.

---

# Auteur

Projet réalisé dans le cadre d'un projet de développement Full Stack Web.

Technologies principales :

Laravel + Angular + PostgreSQL + Docker