# Structure de la Base de Données de l'Application UN

## Introduction

Cette documentation décrit la structure de la base de données simulée utilisée dans l'application de gestion d'association UN. L'application utilise une base de données locale stockée dans le LocalStorage du navigateur, gérée par la classe `UNDatabase`.

## Architecture Générale

La base de données est composée de plusieurs collections d'entités interconnectées :

1. **Utilisateurs** (`users`) - Gestion des comptes et des permissions
2. **Membres** (`members`) - Informations détaillées sur les membres de l'association
3. **Événements** (`events`) - Organisation des événements et activités
4. **Rapports** (`reports`) - Génération et suivi des rapports
5. **Finances** (`finances`) - Suivi des cotisations et des dépenses

## 1. Collection Utilisateurs (`users`)

### Structure
```javascript
{
  id: Number,           // Identifiant unique
  username: String,     // Nom d'utilisateur (unique)
  password: String,     // Mot de passe (stocké en clair dans la démo)
  role: String,         // Rôle : superadmin, administrateur, trésorier, secrétaire, membre
  fullName: String,     // Nom complet
  email: String,        // Adresse email
  phone: String,        // Numéro de téléphone
  dateInscription: Date,// Date d'inscription
  lastLogin: Date,      // Date de dernière connexion
  status: String,       // Statut : actif/inactif
  permissions: Object   // Permissions spécifiques
}
```

### Permissions par rôle
- **Super Administrateur** : Accès complet à toutes les fonctionnalités
- **Administrateur** : Gestion des utilisateurs, membres, événements, rapports, finances
- **Trésorier** : Lecture générale, écriture sur finances
- **Secrétaire** : Lecture générale, gestion des membres et événements
- **Membre** : Lecture limitée aux informations de base

## 2. Collection Membres (`members`)

### Structure
```javascript
{
  id: Number,           // Identifiant unique
  userId: Number,       // Lien vers l'utilisateur associé
  fullName: String,     // Nom complet
  email: String,        // Adresse email
  role: String,         // Rôle dans l'association
  dateAdhesion: Date,   // Date d'adhésion
  status: String        // Statut : actif/inactif
}
```

### Relations
- Chaque membre est lié à un utilisateur via le champ `userId`
- Les modifications d'un membre peuvent affecter l'utilisateur associé

## 3. Collection Événements (`events`)

### Structure
```javascript
{
  id: Number,           // Identifiant unique
  title: String,        // Titre de l'événement
  date: Date,           // Date de l'événement
  time: String,         // Heure de l'événement
  location: String,     // Lieu de l'événement
  description: String,  // Description détaillée
  status: String        // Statut : programmé, en cours, terminé, annulé
}
```

## 4. Collection Rapports (`reports`)

### Structure
```javascript
{
  id: Number,           // Identifiant unique
  title: String,        // Titre du rapport
  period: String,       // Période couverte
  generatedDate: Date,  // Date de génération
  status: String        // Statut : en cours, généré
}
```

## 5. Collection Finances (`finances`)

### Structure
```javascript
{
  id: Number,           // Identifiant unique
  type: String,         // Type : cotisation, dépense
  amount: Number,       // Montant
  currency: String,     // Devise (FCFA)
  date: Date,           // Date de la transaction
  member: String,       // Membre concerné (ou "Association" pour les dépenses)
  description: String,  // Description de la transaction
  status: String        // Statut : payé, en attente
}
```

## Gestion des Identifiants

Le système utilise des compteurs séquentiels pour générer des identifiants uniques :
- `nextIds.user` : Prochain ID utilisateur
- `nextIds.member` : Prochain ID membre
- `nextIds.event` : Prochain ID événement
- `nextIds.report` : Prochain ID rapport
- `nextIds.finance` : Prochain ID finance

## Sécurité et Authentification

### Authentification
- Vérification du nom d'utilisateur et du mot de passe
- Stockage de la session utilisateur dans `currentUser`
- Mise à jour automatique de la date de dernière connexion

### Autorisations
- Contrôle d'accès basé sur les rôles
- Hiérarchie des permissions (superadmin > administrateur > autres rôles)
- Protection contre la suppression de l'administrateur principal par des utilisateurs non autorisés

## Persistance des Données

### Sauvegarde
- Toutes les modifications sont automatiquement sauvegardées dans `localStorage`
- Les données sont stockées sous la clé `unAppData` au format JSON

### Chargement
- Les données sont chargées automatiquement au démarrage de l'application
- Initialisation avec des données par défaut si aucun localStorage n'existe

## Méthodes de Gestion

### Utilisateurs
- `getUsers()` : Récupérer tous les utilisateurs
- `addUser()` : Ajouter un nouvel utilisateur
- `updateUser()` : Modifier un utilisateur existant
- `deleteUser()` : Supprimer un utilisateur

### Membres
- `getMembers()` : Récupérer tous les membres
- `addMember()` : Ajouter un nouveau membre
- `updateMember()` : Modifier un membre existant
- `deleteMember()` : Supprimer un membre

### Événements
- `getEvents()` : Récupérer tous les événements
- `addEvent()` : Ajouter un nouvel événement
- `updateEvent()` : Modifier un événement existant
- `deleteEvent()` : Supprimer un événement

### Rapports
- `getReports()` : Récupérer tous les rapports
- `addReport()` : Ajouter un nouveau rapport
- `updateReport()` : Modifier un rapport existant
- `deleteReport()` : Supprimer un rapport
- `generateReport()` : Générer un rapport

### Finances
- `getFinances()` : Récupérer toutes les transactions financières
- `addFinance()` : Ajouter une nouvelle transaction
- `updateFinance()` : Modifier une transaction existante
- `deleteFinance()` : Supprimer une transaction

## Statistiques et Métriques

La méthode `getStatistics()` fournit un résumé des indicateurs clés :
- Nombre total de membres
- Nombre de membres actifs
- Nombre total d'événements
- Nombre d'événements à venir
- Solde financier total
- Nombre total d'utilisateurs

## Réinitialisation

La méthode `resetAllData()` permet de réinitialiser complètement la base de données :
- Remise à zéro de tous les compteurs
- Vidage de toutes les collections
- Réinitialisation avec les données par défaut

## Bonnes Pratiques

1. **Sécurité** :
   - Ne jamais stocker les mots de passe en clair en production
   - Toujours vérifier les permissions avant les opérations critiques
   - Protéger l'administrateur principal

2. **Intégrité des données** :
   - Maintenir la cohérence entre membres et utilisateurs
   - Utiliser les compteurs pour générer des IDs uniques
   - Sauvegarder après chaque modification significative

3. **Performance** :
   - Limiter les recherches dans les grandes collections
   - Utiliser des index lorsque possible
   - Nettoyer les données obsolètes régulièrement

## Limitations

1. **Stockage** :
   - Capacité limitée du LocalStorage (généralement 5-10MB)
   - Pas de synchronisation entre appareils

2. **Sécurité** :
   - Données accessibles côté client
   - Pas de chiffrement des données sensibles

3. **Fiabilité** :
   - Données perdues si le LocalStorage est vidé
   - Pas de mécanisme de sauvegarde automatique

Cette structure permet une gestion complète de l'association avec des contrôles d'accès appropriés et une persistance des données côté client.