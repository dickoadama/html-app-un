# Guide de Réinitialisation des Données

## Introduction

Ce guide explique comment réinitialiser les données des membres et finances dans l'application de gestion d'association UN.

## Fonctionnalité de Réinitialisation

La fonctionnalité permet de :
1. Supprimer tous les membres (sauf les utilisateurs par défaut)
2. Réinitialiser les finances à zéro
3. Supprimer tous les événements enregistrés

## Accès à la Fonctionnalité

1. Connectez-vous en tant qu'administrateur ou super administrateur
2. Accédez à la section "ADMINISTRATION" dans le menu de navigation
3. Cliquez sur l'onglet "Paramètres"
4. Trouvez la section "Réinitialisation des Données"
5. Cliquez sur le bouton "Réinitialiser Membres et Finances"

## Confirmation

Avant la réinitialisation, une boîte de dialogue de confirmation s'affiche :
> "Êtes-vous sûr de vouloir réinitialiser les données des membres et finances ? Cette action est irréversible."

Cliquez sur "OK" pour confirmer ou "Annuler" pour abandonner.

## Résultats de la Réinitialisation

Après la réinitialisation :
- Tous les membres ajoutés seront supprimés (seuls les 5 utilisateurs par défaut restent)
- Toutes les transactions financières seront supprimées
- Tous les événements seront supprimés
- Les statistiques du tableau de bord seront mises à jour (0 membres, 0 FCFA, 0 événements)

## Implémentation Technique

### Méthode dans database.js

```javascript
resetMembersAndFinances() {
    // Supprimer tous les membres
    this.members = [];
    
    // Réinitialiser les finances à 0
    this.finances = [];
    
    // Réinitialiser les événements
    this.events = [];
    
    // Réinitialiser les compteurs appropriés
    this.nextIds.member = 1;
    this.nextIds.finance = 1;
    this.nextIds.event = 1;
    
    // Sauvegarder les changements
    this.saveData();
}
```

### Gestionnaire d'événement dans new-script.js

```javascript
document.getElementById('resetDataBtn')?.addEventListener('click', function() {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser les données des membres et finances ? Cette action est irréversible.')) {
        try {
            // Réinitialiser les membres et finances
            db.resetMembersAndFinances();
            
            // Mettre à jour les statistiques
            updateStats();
            
            // Afficher un message de succès
            showNotification('Les données des membres et finances ont été réinitialisées avec succès.', 'success');
        } catch (error) {
            console.error('Erreur lors de la réinitialisation des données:', error);
            showNotification('Erreur lors de la réinitialisation des données.', 'error');
        }
    }
});
```

## Bonnes Pratiques

1. **Sauvegarde** : Effectuez une sauvegarde des données importantes avant la réinitialisation
2. **Confirmation** : Toujours confirmer l'action de réinitialisation
3. **Permissions** : Seuls les administrateurs ont accès à cette fonctionnalité
4. **Audit** : Considérez cette action comme sensible et documentez-la si nécessaire

## Support

En cas de problème avec la réinitialisation des données, veuillez contacter l'administrateur système.