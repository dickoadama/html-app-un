# Guide de Sécurité - Informations de Connexion

## Introduction

Ce guide explique la nouvelle fonctionnalité de sécurité implémentée dans l'application UN concernant l'affichage des informations de connexion.

## Fonctionnalité

Les informations de connexion des comptes de démonstration sont désormais visibles uniquement par le Super Administrateur. Pour tous les autres utilisateurs (Administrateur, Trésorier, Secrétaire, Membre), ces informations sont masquées.

### Comptes de démonstration

1. **Super Administrateur**
   - Nom d'utilisateur: `superadmin`
   - Mot de passe: `superadmin123`

2. **Administrateur**
   - Nom d'utilisateur: `admin`
   - Mot de passe: `admin123`

3. **Trésorier**
   - Nom d'utilisateur: `jean.martin`
   - Mot de passe: `jean123`

4. **Secrétaire**
   - Nom d'utilisateur: `marie.lambert`
   - Mot de passe: `marie123`

5. **Membre**
   - Nom d'utilisateur: `pierre.dubois`
   - Mot de passe: `pierre123`

## Fonctionnement

### Pour le Super Administrateur
- Lors de la connexion en tant que Super Administrateur, les informations de tous les comptes sont affichées
- Un message spécifique indique : "Accès Super Administrateur: Vous avez accès aux informations de connexion de tous les comptes."

### Pour les autres utilisateurs
- Les informations de connexion sont masquées
- Un message indique : "Les informations de connexion sont uniquement visibles par le Super Administrateur."

### Pour les visiteurs non connectés
- Les informations de connexion sont masquées
- Un message indique : "Les informations de connexion sont uniquement visibles par le Super Administrateur."

## Avantages de cette approche

1. **Sécurité accrue** : Les informations sensibles ne sont accessibles qu'au niveau le plus élevé
2. **Conformité aux bonnes pratiques** : Respecte les principes de moindre privilège
3. **Protection des comptes** : Réduit le risque d'accès non autorisé aux comptes de démonstration

## Implémentation technique

La fonctionnalité est implémentée dans deux fichiers principaux :

1. **`login.html`** : Structure HTML avec sections conditionnelles
2. **`js/auth.js`** : Logique JavaScript pour vérifier le rôle de l'utilisateur

### Code clé

```javascript
// Vérifier le rôle de l'utilisateur
if (user.role === 'superadmin') {
    // Afficher les informations de connexion
    credentialsSection.style.display = 'block';
    accessMessage.innerHTML = '<strong>Accès Super Administrateur:</strong> Vous avez accès aux informations de connexion de tous les comptes.';
} else {
    // Masquer les informations de connexion
    credentialsSection.style.display = 'none';
    accessMessage.innerHTML = 'Les informations de connexion sont uniquement visibles par le Super Administrateur.';
}
```

## Bonnes pratiques

1. **Utilisation responsable** : Le Super Administrateur doit garder ses identifiants en sécurité
2. **Formation des utilisateurs** : Informer les utilisateurs de cette restriction de sécurité
3. **Audit régulier** : Vérifier périodiquement l'accès aux informations sensibles

## Support

En cas de problème avec cette fonctionnalité, veuillez contacter l'administrateur système.