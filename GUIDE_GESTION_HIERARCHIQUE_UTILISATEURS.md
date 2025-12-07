# Guide de Gestion Hiérarchique des Utilisateurs

## Introduction

Ce guide explique le système de gestion hiérarchique des utilisateurs dans l'application de gestion d'association UN. Le système implémente une structure de permissions basée sur les rôles qui détermine quelles actions chaque utilisateur peut effectuer.

## Rôles et Permissions

### 1. Super Administrateur (superadmin)
**Rôle le plus élevé dans l'application**

**Permissions :**
- ✅ Peut créer, lire, modifier et supprimer tous les utilisateurs
- ✅ Peut créer des administrateurs
- ✅ Peut gérer tous les aspects de l'application
- ✅ Accès complet à toutes les fonctionnalités

### 2. Administrateur (administrateur)
**Rôle de gestion intermédiaire**

**Permissions :**
- ✅ Peut créer, lire, modifier et supprimer les utilisateurs de niveau inférieur
- ❌ Ne peut PAS créer d'autres administrateurs
- ✅ Gestion des trésoriers, secrétaires et membres
- ✅ Accès aux fonctionnalités de gestion courante

### 3. Trésorier (trésorier)
**Rôle spécialisé dans la gestion financière**

**Permissions :**
- 🔍 Lecture seule pour les utilisateurs et membres
- ✅ Gestion des cotisations et finances
- 🔍 Lecture seule pour les événements et profils

### 4. Secrétaire (secrétaire)
**Rôle de gestion administrative**

**Permissions :**
- 🔍 Lecture seule pour les utilisateurs
- ✅ Gestion des membres et événements
- ✅ Gestion des profils
- 🔍 Lecture seule pour les finances

### 5. Membre (membre)
**Rôle de base avec accès limité**

**Permissions :**
- 🔍 Lecture seule pour toutes les fonctionnalités
- ❌ Aucune capacité de création ou modification

## Règles de Gestion Hiérarchique

### Création d'Utilisateurs
1. **Super Administrateur** :
   - Peut créer des utilisateurs de TOUS les rôles
   - Y compris d'autres administrateurs

2. **Administrateur** :
   - Peut créer des utilisateurs des rôles suivants :
     - Trésorier
     - Secrétaire
     - Membre
   - Ne peut PAS créer d'autres administrateurs

3. **Autres rôles** :
   - N'ont pas la permission de créer des utilisateurs

### Modification d'Utilisateurs
1. **Super Administrateur** :
   - Peut modifier les utilisateurs de TOUS les rôles
   - Peut attribuer le rôle de super admin

2. **Administrateur** :
   - Peut modifier les utilisateurs de niveau inférieur
   - Ne peut PAS promouvoir un utilisateur au rôle d'administrateur

3. **Autres rôles** :
   - N'ont pas la permission de modifier les utilisateurs

### Suppression d'Utilisateurs
1. **Super Administrateur** :
   - Peut supprimer les utilisateurs de TOUS les rôles
   - Peut se supprimer lui-même

2. **Administrateur** :
   - Peut supprimer les utilisateurs de niveau inférieur
   - Ne peut PAS supprimer le super administrateur

3. **Autres rôles** :
   - N'ont pas la permission de supprimer les utilisateurs

## Interface Utilisateur

### Formulaire d'Ajout d'Utilisateur
L'interface s'adapte automatiquement en fonction du rôle de l'utilisateur connecté :

1. **Super Administrateur connecté** :
   - Options disponibles : Administrateur, Trésorier, Secrétaire, Membre

2. **Administrateur connecté** :
   - Options disponibles : Trésorier, Secrétaire, Membre
   - Option "Administrateur" non disponible

3. **Autres rôles connectés** :
   - Formulaire désactivé ou non accessible

## Bonnes Pratiques

### Sécurité
1. Toujours vérifier les permissions avant d'autoriser une action
2. Ne jamais permettre à un utilisateur de niveau inférieur de promouvoir un autre utilisateur à un rôle supérieur
3. Protéger le compte super admin avec un mot de passe fort

### Gestion des Rôles
1. Attribuer le rôle le plus approprié à chaque utilisateur
2. Limiter le nombre de super administrateurs
3. Former les administrateurs aux bonnes pratiques de gestion

## Support

En cas de problème avec la gestion des utilisateurs :
1. Vérifier les permissions de l'utilisateur connecté
2. Consulter la console du navigateur pour les erreurs
3. Contacter l'administrateur système

## Annexes

### Hiérarchie Visuelle
```
Super Administrateur
├── Administrateur
│   ├── Trésorier
│   ├── Secrétaire
│   └── Membre
└── (autres rôles de base)
```

### Messages d'Erreur Courants
- "Seul le super admin peut créer des administrateurs"
- "Vous n'avez pas la permission de créer cet utilisateur"
- "Vous n'avez pas la permission de modifier cet utilisateur"