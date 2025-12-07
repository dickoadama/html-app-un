# Système de Gestion d'Association - Application UN

## Description
Cette application permet de gérer une association avec plusieurs fonctionnalités incluant la gestion des membres, des cotisations, des événements, des rapports et des utilisateurs avec différents niveaux de permissions.

## Fonctionnalités

### 1. Authentification
- Seuls les utilisateurs authentifiés peuvent accéder à l'application
- Différents niveaux d'accès selon les rôles
- Page de connexion avec comptes de démonstration

### 2. Tableau de Bord
- Vue d'ensemble des statistiques de l'association
- Activité récente
- Indicateurs clés (membres, événements, finances)

### 3. Gestion des Membres
- Ajout, modification et suppression de membres
- Recherche et filtrage des membres
- Association avec des comptes utilisateurs

### 4. Gestion des Cotisations
- Suivi des cotisations des membres
- Historique des paiements
- Génération de rapports financiers

### 5. Gestion des Événements
- Création et organisation d'événements
- Calendrier des événements à venir
- Gestion des participants

### 6. Gestion des Rapports
- Génération de rapports personnalisés
- Téléchargement et visualisation des rapports
- Historique des rapports générés

### 7. Administration
- Gestion des utilisateurs avec différents rôles
- Configuration des paramètres de l'application
- Gestion des profils

### 8. Fonctionnalités Flottantes
- Horloge en temps réel
- Bouton "Retour" en haut de page
- Blog d'informations flottant

## Rôles Disponibles
1. **Super Administrateur** : Accès complet à toutes les fonctionnalités
2. **Administrateur** : Gestion des utilisateurs et paramètres
3. **Trésorier** : Gestion des finances et des rapports
4. **Secrétaire** : Gestion des membres et des événements
5. **Membre** : Accès en lecture seule aux informations de base

## Utilisation

### Accès à l'Application
1. Ouvrez le fichier `login.html` dans votre navigateur
2. Connectez-vous avec un compte de démonstration

### Comptes de Démonstration
- **Super Administrateur** - Nom d'utilisateur: `superadmin`, Mot de passe: `superadmin123`
- **Administrateur** - Nom d'utilisateur: `admin`, Mot de passe: `admin123`
- **Trésorier** - Nom d'utilisateur: `jean.martin`, Mot de passe: `jean123`
- **Secrétaire** - Nom d'utilisateur: `marie.lambert`, Mot de passe: `marie123`
- **Membre** - Nom d'utilisateur: `pierre.dubois`, Mot de passe: `pierre123`

## Sécurité
- Les mots de passe sont stockés en clair dans cette version de démonstration
- Dans une application de production, les mots de passe devraient être hashés
- L'administrateur principal ne peut pas être supprimé
- Les noms d'utilisateur doivent être uniques
- Contrôle d'accès basé sur les rôles

## Technologies Utilisées
- HTML5
- CSS3
- JavaScript (ES6+)
- Font Awesome (icônes)
- Stockage local du navigateur (LocalStorage)

## Structure des Fichiers
- `index.html` : Point d'entrée de l'application (redirige vers app.html)
- `app.html` : Interface principale de l'application
- `login.html` : Page d'authentification
- `css/new-style.css` : Styles principaux de l'application
- `js/new-script.js` : Logique principale de l'application
- `js/database.js` : Simulateur de base de données avec gestion des rôles et permissions
- `js/auth.js` : Gestion de l'authentification et des sessions