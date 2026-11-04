# Gestion des notes et bulletins d'une école

## Projet Full Stack Web

**Sujet :** Sujet 06 – Notes et bulletins d'une école  
**Parcours :** F  
**Formation :** Certification Full Stack Web  
**Établissement :** Dakar Institute of Technology – Promotion FSW 008

**Vidéo de présentation :** https://youtu.be/Q63KKnHPNJA

---

# 1. Présentation du projet

Ce projet consiste à développer une application web de gestion des notes et des bulletins scolaires destinée à une école privée.

L'objectif est de remplacer la gestion traditionnelle des notes sur des fichiers Excel par une solution informatique centralisée, sécurisée et facile à utiliser.

L'application permet de gérer les classes, les élèves, les matières, les enseignants, les évaluations et les notes.

Elle permet également de calculer automatiquement les moyennes des élèves et de consulter leurs résultats scolaires.

Les principaux objectifs sont :

- Centraliser les informations scolaires.
- Faciliter la gestion administrative.
- Permettre aux enseignants de saisir les notes de leurs matières.
- Automatiser le calcul des moyennes.
- Améliorer le suivi des résultats scolaires.
- Sécuriser l'accès aux différentes fonctionnalités selon les rôles.

---

# 2. Technologies utilisées

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

# 3. Architecture du projet

Le projet adopte une architecture séparant le backend et le frontend.

Le backend Laravel expose une API REST qui communique avec la base de données PostgreSQL.

Le frontend Angular consomme cette API pour afficher les données et permettre aux utilisateurs d'interagir avec l'application.

Structure principale :

```text
gestion-notes-ecole/
│
├── README.md
├── NOTE_IA.md
├── compose.yaml
├── .env.example
│
├── docs/
│   ├── schema/
│   │   └── schema.png
│   │
│   └── captures/
│       ├── connexion.png
│       ├── dashboard-admin.png
│       ├── gestion-classes.png
│       ├── saisie-notes.png
│       └── bulletin.png
│
├── backend/
│   ├── app/
│   ├── database/
│   ├── routes/
│   ├── tests/
│   ├── Dockerfile
│   └── composer.json
│
└── frontend/
    └── gestion-frontend/
        ├── src/
        ├── Dockerfile
        └── package.json
```

---

# 4. Fonctionnalités de l'application

## 4.1 Administration

L'administrateur dispose d'un espace lui permettant de gérer les informations de l'école.

Il peut :

- Ajouter, modifier et supprimer des classes.
- Ajouter, modifier et supprimer des élèves.
- Ajouter, modifier et supprimer des matières.
- Ajouter, modifier et supprimer des enseignants.
- Gérer les affectations entre les classes, les matières et les enseignants.
- Consulter le tableau de bord.
- Suivre les statistiques de l'établissement.

## 4.2 Enseignant

L'enseignant dispose d'un espace personnel sécurisé.

Il peut :

- Se connecter à son espace.
- Consulter ses affectations.
- Consulter les classes dans lesquelles il intervient.
- Choisir une classe.
- Choisir une matière qui lui est affectée.
- Sélectionner une évaluation.
- Saisir les notes des élèves.
- Modifier les notes.
- Supprimer les notes.
- Consulter les résultats scolaires.

Un enseignant ne peut saisir des notes que pour les matières qui lui sont attribuées.

## 4.3 Gestion des évaluations

Les évaluations permettent d'organiser la saisie des notes.

Chaque évaluation possède notamment :

- Un libellé.
- Une date.
- Un coefficient.
- Une matière associée.

Les notes sont associées aux élèves et aux évaluations.

## 4.4 Bulletins scolaires

Le système permet de calculer les résultats scolaires des élèves.

Les éléments prévus dans le bulletin sont :

- Les matières.
- Les moyennes par matière.
- Les coefficients.
- La moyenne générale.
- Le classement.
- Les appréciations.
- La mention.

La génération et le téléchargement des bulletins PDF dépendent de l'implémentation disponible dans l'application.

---

# 5. Gestion des rôles et sécurité

L'application utilise Laravel Sanctum pour sécuriser les échanges entre Angular et Laravel.

Deux rôles principaux sont définis :

### ADMIN

L'administrateur accède aux fonctionnalités de gestion de l'école et au tableau de bord.

### ENSEIGNANT

L'enseignant accède uniquement aux fonctionnalités autorisées pour son rôle, notamment ses affectations et la saisie des notes.

Les routes protégées vérifient l'authentification et les autorisations avant de permettre l'accès aux ressources.

---

# 6. Modèle de données

Le modèle de données repose sur les principales entités suivantes :

- User
- Classe
- Eleve
- Matiere
- Enseignant
- ClasseMatiere
- Evaluation
- Note

## Relations principales

- Un utilisateur possède un rôle.
- Un enseignant est associé à un compte utilisateur.
- Une classe possède plusieurs élèves.
- Une classe peut être associée à plusieurs matières.
- Une matière peut être associée à plusieurs classes.
- Les enseignants possèdent des affectations.
- Une évaluation appartient à une matière.
- Une évaluation possède plusieurs notes.
- Une note appartient à un élève.
- Un élève possède plusieurs notes.

## Schéma de la base de données

Le schéma relationnel est disponible dans :

`docs/schema/schema.png`

---

# 7. Installation et lancement du projet

## 7.1 Prérequis

Pour installer et exécuter le projet, les outils suivants sont nécessaires :

- Git
- Docker Desktop
- Docker Compose

Pour une installation manuelle complémentaire :

- PHP 8.2 ou supérieur
- Composer
- Node.js
- Angular CLI
- PostgreSQL

## 7.2 Récupération du projet

Cloner le dépôt GitHub :

```bash
git clone https://github.com/mamediarra524/gestion-notes-ecole.git
```

Entrer dans le dossier :

```bash
cd gestion-notes-ecole
```

## 7.3 Configuration de l'environnement

Créer les fichiers d'environnement nécessaires à partir des fichiers `.env.example` fournis dans le projet.

Vérifier particulièrement la configuration de la connexion PostgreSQL :

- DB_CONNECTION
- DB_HOST
- DB_PORT
- DB_DATABASE
- DB_USERNAME
- DB_PASSWORD

Les fichiers `.env` contenant des informations locales ou sensibles ne doivent pas être publiés sur GitHub.

## 7.4 Lancement avec Docker

Depuis la racine du projet :

```bash
docker compose up -d --build
```

Vérifier l'état des conteneurs :

```bash
docker compose ps
```

Consulter les journaux :

```bash
docker compose logs
```

Les services démarrent selon la configuration définie dans `compose.yaml`.

## 7.5 Préparation du backend Laravel

Lorsque les conteneurs sont démarrés, exécuter les commandes Laravel dans le conteneur backend, selon le nom du service défini dans `compose.yaml`.

Installation des dépendances :

```bash
composer install
```

Génération de la clé Laravel si nécessaire :

```bash
php artisan key:generate
```

Exécution des migrations :

```bash
php artisan migrate
```

Chargement des données de démonstration :

```bash
php artisan db:seed
```

Pour réinitialiser entièrement la base de données :

```bash
php artisan migrate:fresh --seed
```

**Attention :** cette dernière commande supprime les données existantes avant de recréer les tables.

## 7.6 Accès à l'application

L'application Angular est accessible à l'adresse configurée dans le projet :

```text
http://localhost:4200
```

L'API Laravel est accessible à :

```text
http://127.0.0.1:8000
```

Ces adresses correspondent à la configuration locale de développement et doivent être adaptées si les ports Docker sont différents.

---

# 8. Comptes de démonstration

Les comptes suivants sont prévus pour la démonstration.

## Administrateur

Email :

```text
admin@ecole.com
```

Mot de passe :

```text
password
```

Rôle :

```text
ADMIN
```

## Enseignant

Email :

```text
prof.math@ecole.com
```

Mot de passe :

```text
password
```

Rôle :

```text
ENSEIGNANT
```

Ces identifiants sont réservés à l'environnement de démonstration.

---

# 9. Données de démonstration

Les données de démonstration chargées par les seeders comprennent :

| Élément | Quantité |
|---|---:|
| Élèves | 60 |
| Classes | 5 |
| Matières | 5 |
| Enseignants | 5 |
| Évaluations | 15 |
| Notes | 900 |

Ces données fictives permettent de tester les principales fonctionnalités de l'application.

---

# 10. Tableau de bord et indicateurs

Le tableau de bord administratif permet de consulter les statistiques générales de l'établissement.

Les indicateurs sont calculés à partir des données de la base de données.

## 10.1 Nombre d'élèves

Formule :

```sql
SELECT COUNT(*) FROM eleves;
```

## 10.2 Nombre de classes

Formule :

```sql
SELECT COUNT(*) FROM classes;
```

## 10.3 Nombre de matières

Formule :

```sql
SELECT COUNT(*) FROM matieres;
```

## 10.4 Nombre d'enseignants

Formule :

```sql
SELECT COUNT(*) FROM enseignants;
```

## 10.5 Nombre de notes saisies

Formule :

```sql
SELECT COUNT(*) FROM notes;
```

## 10.6 Moyenne générale des notes

La moyenne pondérée globale des notes est calculée selon les coefficients des évaluations :

```text
Somme(note × coefficient de l'évaluation)
------------------------------------------------
Somme des coefficients des évaluations
```

Les indicateurs effectivement affichés dans le tableau de bord sont ceux implémentés dans l'interface.

---

# 11. Calcul des moyennes et mentions

## 11.1 Moyenne par matière

La moyenne d'une matière est calculée en tenant compte des coefficients des évaluations.

```text
Moyenne matière =
Somme(note × coefficient évaluation)
--------------------------------------
Somme(coefficients des évaluations)
```

## 11.2 Moyenne générale

La moyenne générale est calculée en tenant compte des coefficients des matières.

```text
Moyenne générale =
Somme(moyenne matière × coefficient matière)
------------------------------------------------
Somme des coefficients des matières
```

## 11.3 Mentions

Les mentions sont attribuées selon la moyenne générale obtenue.

| Moyenne | Mention |
|---|---|
| 10 à moins de 12 | Passable |
| 12 à moins de 14 | Assez bien |
| 14 à moins de 16 | Bien |
| 16 à 20 | Très bien |
| Moins de 10 | Non admis |

Les notes sont comprises entre 0 et 20.

---

# 12. Tests

Les tests automatisés du backend sont exécutés avec PHPUnit via Laravel.

Commande :

```bash
php artisan test
```

Les tests doivent notamment couvrir :

- L'authentification.
- Les autorisations selon les rôles.
- La gestion des classes.
- La gestion des élèves.
- La gestion des matières.
- La gestion des enseignants.
- La saisie des notes.
- Les règles métier.
- Le calcul des moyennes.

Les résultats des tests sont à vérifier lors de l'exécution de la commande.

---

# 13. Captures d'écran

Les captures d'écran de l'application sont disponibles dans :

```text
docs/captures/
```

Les captures illustrent notamment :

1. La page de connexion.
2. Le tableau de bord administrateur.
3. La gestion des classes et des élèves.
4. La saisie des notes par l'enseignant.
5. La consultation des résultats et des bulletins.

---

# 14. Bibliothèques et dépendances utilisées

## Backend

- Laravel Framework
- Laravel Sanctum
- Composer

## Frontend

- Angular
- Angular Router
- Angular Forms
- Angular HttpClient
- TypeScript

## Infrastructure

- Docker
- Docker Compose
- PostgreSQL

Les versions exactes des dépendances sont disponibles dans les fichiers `composer.json`, `composer.lock` et `package.json`.

---

# 15. Difficultés rencontrées et solutions

Au cours du développement, plusieurs difficultés techniques ont été rencontrées :

- La configuration de la connexion entre Laravel et PostgreSQL.
- La gestion de l'authentification avec Laravel Sanctum.
- La séparation des droits entre administrateur et enseignant.
- La gestion des relations entre les classes, les matières et les enseignants.
- L'adaptation de la saisie des notes au système basé sur les évaluations.
- La communication entre Angular et l'API Laravel.

Ces difficultés ont été traitées progressivement grâce aux tests, au débogage et à la vérification des échanges entre le frontend et le backend.

---

# 16. Améliorations possibles

Plusieurs fonctionnalités pourraient être ajoutées dans une future version :

- Gestion des absences et retards.
- Export des résultats au format Excel.
- Notifications aux utilisateurs.
- Historique des bulletins.
- Amélioration des graphiques statistiques.
- Suivi des performances scolaires sur plusieurs périodes.

---

# 17. Utilisation de l'intelligence artificielle

L'utilisation de l'intelligence artificielle dans le cadre de ce projet est détaillée dans le fichier :

`NOTE_IA.md`

Ce document présente les demandes adressées à l'assistant, les objectifs de ces demandes et les parties réalisées et vérifiées par l'apprenant.

---

# 18. Auteur

Projet réalisé individuellement dans le cadre de la Certification Full Stack Web.

**Formation :** Dakar Institute of Technology  
**Promotion :** FSW 008  
**Sujet :** Sujet 06 – Notes et bulletins d'une école  
**Parcours :** F

**Technologies principales :**

Laravel 12 – Angular – PostgreSQL – Docker

---

# Fin du README




