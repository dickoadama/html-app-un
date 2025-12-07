# Guide de Réinitialisation des Données

## Introduction

Cette fonctionnalité permet de réinitialiser complètement toutes les données de l'application, remettant les compteurs à zéro et supprimant tous les enregistrements existants. Cette action est irréversible, donc utilisez-la avec prudence.

## Accès à la Fonctionnalité

1. Connectez-vous à l'application avec un compte administrateur
2. Accédez à la section "ADMINISTRATION" dans le menu de navigation
3. Cliquez sur l'onglet "Paramètres"
4. Faites défiler jusqu'à la section "Réinitialisation des données"

## Utilisation

### Via l'Interface Administrative

1. Dans la section "Réinitialisation des données", vous trouverez un message d'avertissement important
2. Cliquez sur le bouton "Réinitialiser toutes les données"
3. Une boîte de confirmation s'affichera pour vous demander de confirmer cette action
4. Si vous confirmez, toutes les données seront supprimées et les compteurs remis à zéro

### Via la Page de Test (pour développeurs)

Une page de test a été créée pour vérifier le bon fonctionnement de la fonctionnalité :

1. Accédez à `test-reset.html` dans votre navigateur
2. La page affiche les statistiques actuelles
3. Cliquez sur le bouton "Test Réinitialisation"
4. Confirmez l'action dans la boîte de dialogue
5. Les statistiques seront mises à jour pour refléter l'état réinitialisé

## Conséquences de la Réinitialisation

Lorsque vous réinitialisez les données, les éléments suivants sont supprimés :

- Tous les membres
- Tous les utilisateurs (sauf le compte de connexion actuel)
- Tous les événements
- Toutes les cotisations et transactions financières
- Tous les rapports générés

Les compteurs dans le tableau de bord seront remis à zéro :
- Membres : 0
- Membres Actifs : 0
- Événements : 0
- Événements à venir : 0
- Fonds disponibles : 0 FCFA
- Utilisateurs : 0

## Recommandations

1. **Sauvegardez vos données** : Avant de procéder à une réinitialisation, assurez-vous d'avoir sauvegardé toutes les données importantes si vous souhaitez les conserver.

2. **Utilisation en développement** : Cette fonctionnalité est particulièrement utile en environnement de développement pour repartir d'un état propre.

3. **Prudence en production** : En environnement de production, cette fonctionnalité devrait être désactivée ou fortement protégée pour éviter les pertes accidentelles de données.

## Support

En cas de problème avec cette fonctionnalité, veuillez contacter l'administrateur système ou consulter la documentation technique.