# Système de Gestion des Utilisateurs - Application UN

## Description
Ce système permet à l'administrateur de gérer les utilisateurs de l'application UN, y compris la création, la modification et la suppression des comptes utilisateurs.

## Fonctionnalités

### 1. Authentification
- Seuls les administrateurs peuvent accéder à la gestion des utilisateurs
- Les autres rôles (trésorier, secrétaire, membre) n'ont pas accès à cette fonctionnalité

### 2. Gestion des Utilisateurs
- **Création d'utilisateurs** : Ajout de nouveaux utilisateurs avec attribution de rôles
- **Modification d'utilisateurs** : Mise à jour des informations des utilisateurs existants
- **Suppression d'utilisateurs** : Suppression des comptes (sauf l'administrateur principal)
- **Génération de mots de passe** : Création automatique de mots de passe sécurisés

### 3. Rôles Disponibles
1. **Administrateur** : Accès complet à toutes les fonctionnalités
2. **Trésorier** : Gestion des finances et des rapports
3. **Secrétaire** : Gestion des membres et des événements
4. **Membre** : Accès en lecture seule aux informations de base

## Utilisation

### Accès à la Gestion des Utilisateurs
1. Connectez-vous avec un compte administrateur
2. La section "Gestion des Utilisateurs" apparaîtra dans le menu de navigation

### Création d'un Utilisateur
1. Cliquez sur "Ajouter un utilisateur"
2. Remplissez le formulaire avec les informations requises :
   - Nom complet
   - Nom d'utilisateur (doit être unique)
   - Email
   - Rôle
   - Mot de passe (minimum 8 caractères)
3. Vous pouvez générer automatiquement un mot de passe sécurisé en cliquant sur le bouton "Générer"
4. Confirmez le mot de passe
5. Cliquez sur "Enregistrer"

### Modification d'un Utilisateur
1. Cliquez sur le bouton "Modifier" dans la ligne de l'utilisateur concerné
2. Modifiez les informations nécessaires
3. Si vous souhaitez changer le mot de passe, saisissez-en un nouveau et confirmez-le
4. Cliquez sur "Enregistrer"

### Suppression d'un Utilisateur
1. Cliquez sur le bouton "Supprimer" dans la ligne de l'utilisateur concerné
2. Confirmez la suppression dans la boîte de dialogue

## Hébergement sur GitHub Pages

### Étapes pour déployer le site
1. Créez un compte GitHub si vous n'en avez pas
2. Créez un nouveau dépôt sur GitHub (nommez-le par exemple "un-site-web")
3. Connectez le dépôt local au dépôt distant :
   ```bash
   git remote add origin https://github.com/VOTRE_NOM_UTILISATEUR/un-site-web.git
   git branch -M main
   git push -u origin main
   ```
4. Activez GitHub Pages dans les paramètres du dépôt :
   - Allez dans "Settings" > "Pages"
   - Sélectionnez "Deploy from a branch"
   - Choisissez la branche "main" et le dossier "/ (root)"
5. Accédez à votre site à l'adresse :
   `https://VOTRE_NOM_UTILISATEUR.github.io/un-site-web/`

## Sécurité
- Les mots de passe sont stockés en clair dans cette version de démonstration
- Dans une application de production, les mots de passe devraient être hashés
- L'administrateur principal ne peut pas être supprimé
- Les noms d'utilisateur doivent être uniques

## Technologies Utilisées
- HTML5
- CSS3
- JavaScript (ES6+)
- Stockage local du navigateur (LocalStorage)

## Structure des Fichiers
- `user-management.html` : Interface de gestion des utilisateurs
- `js/user-management.js` : Logique de gestion des utilisateurs
- `js/database.js` : Simulateur de base de données avec gestion des rôles et permissions
- `js/auth.js` : Gestion de l'authentification et des sessions