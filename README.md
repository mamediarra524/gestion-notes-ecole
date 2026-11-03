# Gestion des notes et bulletins d'une école

## Projet Full Stack Web

Application web de gestion des notes et des bulletins scolaires pour une école privée.

L'objectif est de remplacer la gestion traditionnelle des notes sur fichiers Excel par une solution centralisée permettant :

- la gestion des classes ;
- la gestion des élèves ;
- la gestion des matières ;
- la gestion des enseignants ;
- la saisie des notes ;
- le calcul automatique des moyennes ;
- la génération des bulletins scolaires PDF.


---

# Technologies utilisées


## Backend

- Laravel 12
- PHP 8.2
- API REST
- Laravel Sanctum
- PostgreSQL


## Frontend

- Angular
- TypeScript
- HTML5
- CSS3


## Infrastructure

- Docker
- Docker Compose
- PostgreSQL 16


---

# Architecture du projet

```
gestion-notes-ecole/

├── backend/
│   ├── app/
│   ├── database/
│   ├── routes/
│   ├── Dockerfile
│   └── composer.json
│
├── frontend/
│   └── gestion-frontend/
│       ├── src/
│       ├── Dockerfile
│       └── package.json
│
├── docs/
│   ├── captures/
│   └── schema/
│
├── compose.yaml
├── README.md
└── NOTE_IA.md
```


---

# Fonctionnalités


## Administration

L'administrateur peut :

- gérer les classes ;
- gérer les élèves ;
- gérer les matières ;
- gérer les enseignants ;
- consulter les statistiques de l'école.


## Enseignant

L'enseignant peut :

- se connecter à son espace ;
- consulter ses affectations ;
- choisir une classe ;
- choisir une matière ;
- sélectionner une évaluation ;
- saisir les notes des élèves ;
- modifier les notes ;
- supprimer les notes ;
- consulter les résultats.


## Bulletins scolaires

Le système permet :

- le calcul des moyennes par matière ;
- le calcul de la moyenne générale ;
- le classement des élèves ;
- l'affichage des appréciations ;
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
- Evaluation
- Note
- Bulletin


Relations principales :

- Une classe possède plusieurs élèves.
- Une classe possède plusieurs matières.
- Une matière appartient à plusieurs classes.
- Un enseignant possède plusieurs affectations.
- Une évaluation appartient à une matière.
- Une note appartient à un élève et une évaluation.
- Un bulletin appartient à un élève.


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

# Installation avec Docker


Depuis la racine du projet :

```bash
docker compose up -d --build
```


Vérifier les conteneurs :

```bash
docker compose ps
```


---

# Installation Backend Laravel


Entrer dans le backend :

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

# Base de données


Nom de la base :

```
gestion_notes_ecole
```


Migration :

```bash
php artisan migrate
```


Charger les données de démonstration :

```bash
php artisan db:seed
```


Recréer complètement la base :

```bash
php artisan migrate:fresh --seed
```


---

# Démarrer l'API Laravel


```bash
php artisan serve
```


API disponible :

```
http://127.0.0.1:8000
```


---

# Installation Frontend Angular


Aller dans le frontend :

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

Email :

```
admin@ecole.com
```

Mot de passe :

```
password
```

Rôle :

```
ADMIN
```


## Enseignant

Email :

```
prof.math@ecole.com
```

Mot de passe :

```
password
```

Rôle :

```
ENSEIGNANT
```


---

# Données de démonstration


La base contient :

- 60 élèves
- 5 classes
- 5 matières
- 5 enseignants
- 15 évaluations
- 900 notes


---

# Tableau de bord


Le tableau de bord affiche :


## Nombre d'élèves

```
COUNT(élèves)
```


## Nombre de classes

```
COUNT(classes)
```


## Nombre de matières

```
COUNT(matières)
```


## Nombre d'enseignants

```
COUNT(enseignants)
```


## Nombre de notes saisies

```
COUNT(notes)
```


## Moyenne générale

```
Somme(note × coefficient)
/
Somme(coefficients)
```


---

# Calcul des moyennes


## Moyenne matière

```
Somme(notes × coefficient évaluation)
/
Somme(coefficients évaluations)
```


## Moyenne générale

```
Somme(moyenne matière × coefficient matière)
/
Somme(coefficients matière)
```


## Mentions

| Moyenne | Mention |
|---|---|
| >= 10 | Passable |
| >= 12 | Assez bien |
| >= 14 | Bien |
| >= 16 | Très bien |


---

# Tests réalisés


Fonctionnalités testées :

- authentification ;
- gestion des rôles ;
- gestion des classes ;
- gestion des élèves ;
- gestion des matières ;
- gestion des enseignants ;
- affectations ;
- saisie des notes ;
- modification des notes ;
- suppression des notes ;
- calcul des bulletins ;
- génération PDF ;
- fonctionnement Docker PostgreSQL.


Commande de test :

```bash
php artisan test
```


---

# Captures d'écran


Les captures sont disponibles dans :

```
docs/captures/
```


Captures principales :

1. Page de connexion
2. Dashboard administrateur
3. Statistiques de l'école
4. Saisie des notes enseignant
5. Bulletin scolaire


---

# Bibliothèques utilisées


## Backend

- Laravel Framework
- Laravel Sanctum


## Frontend

- Angular Router
- Angular Forms
- Angular HttpClient


## Infrastructure

- Docker
- Docker Compose
- PostgreSQL


---

# Améliorations possibles


- ajout de graphiques statistiques avancés ;
- gestion des absences ;
- export Excel des résultats ;
- notifications utilisateurs ;
- historique des bulletins.


---

# Auteur


Projet réalisé dans le cadre d'un projet Full Stack Web.


Technologies principales :

Laravel + Angular + PostgreSQL + Docker




