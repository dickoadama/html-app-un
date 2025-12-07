# Guide pour Ajouter de Nouveaux Utilisateurs dans l'Administration

## Introduction

Ce guide explique comment ajouter de nouveaux utilisateurs dans la section Administration de l'application de gestion d'association UN. Cette fonctionnalité permet aux administrateurs de créer de nouveaux comptes utilisateurs selon les permissions hiérarchiques définies.

## Accès à la Fonctionnalité

1. Connectez-vous à l'application avec un compte ayant les permissions appropriées
2. Accédez à la section **ADMINISTRATION** dans le menu de navigation principal
3. Cliquez sur l'onglet **Utilisateurs**
4. Cliquez sur le bouton **"Ajouter un utilisateur"** en haut à droite

## Formulaire d'Ajout d'Utilisateur

Le formulaire d'ajout d'utilisateur contient les champs suivants :

### Champs Obligatoires
- **Nom complet** : Le nom complet de l'utilisateur
- **Nom d'utilisateur** : Identifiant unique pour la connexion
- **Email** : Adresse email de l'utilisateur
- **Rôle** : Sélectionnez le rôle approprié parmi les options disponibles
- **Mot de passe** : Mot de passe pour la connexion
- **Confirmer le mot de passe** : Confirmation du mot de passe

### Champs Optionnels
- **Téléphone** : Numéro de téléphone de l'utilisateur

## Rôles Disponibles

Les rôles disponibles dépendent du niveau de permissions de l'utilisateur connecté :

### Pour le Super Administrateur
- Administrateur
- Trésorier
- Secrétaire
- Membre

### Pour l'Administrateur
- Trésorier
- Secrétaire
- Membre

### Pour les autres rôles
- Aucun rôle disponible (pas de permission de créer des utilisateurs)

## Processus d'Ajout

1. **Remplir le formulaire** :
   - Saisissez toutes les informations requises
   - Choisissez le rôle approprié
   - Créez un mot de passe sécurisé ou utilisez le bouton "Générer"

2. **Validation** :
   - Le système vérifie que les mots de passe correspondent
   - Le système vérifie que le nom d'utilisateur est unique
   - Le système applique les règles de permissions hiérarchiques

3. **Soumission** :
   - Cliquez sur le bouton **"Enregistrer"**
   - Le système crée le nouvel utilisateur et l'ajoute à la base de données
   - Le tableau des utilisateurs est automatiquement mis à jour

## Gestion des Erreurs

### Messages d'Erreur Possibles
- "Ce nom d'utilisateur existe déjà" : Le nom d'utilisateur est déjà utilisé
- "Vous n'avez pas la permission de créer cet utilisateur" : Permissions insuffisantes
- "Seul le super admin peut créer des administrateurs" : Tentative non autorisée de créer un administrateur
- "Les mots de passe ne correspondent pas" : Les champs mot de passe et confirmation ne sont pas identiques

### Résolution des Problèmes
1. Vérifiez que tous les champs obligatoires sont remplis
2. Assurez-vous que le nom d'utilisateur est unique
3. Confirmez que les deux champs de mot de passe sont identiques
4. Vérifiez vos permissions selon votre rôle

## Bonnes Pratiques

### Sécurité
- Utilisez des mots de passe forts (combinaison de lettres, chiffres et caractères spéciaux)
- Ne partagez jamais les mots de passe
- Changez régulièrement les mots de passe

### Gestion des Rôles
- Attribuez le rôle le plus approprié selon les responsabilités de l'utilisateur
- Limitez les privilèges aux personnes qui en ont vraiment besoin
- Documentez les raisons de chaque attribution de rôle

### Maintenance
- Vérifiez régulièrement la liste des utilisateurs
- Désactivez les comptes inactifs
- Archivez les comptes des utilisateurs qui ne font plus partie de l'organisation

## Support

En cas de problème avec l'ajout d'utilisateurs :
1. Vérifiez les permissions de votre compte
2. Consultez la console du navigateur pour les messages d'erreur détaillés
3. Contactez l'administrateur système si nécessaire

## Annexes

### Hiérarchie des Permissions
```
Super Administrateur
├── Peut créer : Administrateurs, Trésoriers, Secrétaires, Membres
├── Peut modifier : Tous les utilisateurs
└── Peut supprimer : Tous les utilisateurs

Administrateur
├── Peut créer : Trésoriers, Secrétaires, Membres
├── Peut modifier : Trésoriers, Secrétaires, Membres
└── Peut supprimer : Trésoriers, Secrétaires, Membres

Autres rôles
└── Aucune permission de gestion des utilisateurs
```

### Format des Données
- **Date d'inscription** : Automatiquement générée (format YYYY-MM-DD)
- **Dernière connexion** : Initialement "Jamais", puis mise à jour à chaque connexion
- **Statut** : Par défaut "Actif"