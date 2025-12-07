# Guide d'utilisation des Fonctions de Téléchargement et Visualisation

## Introduction

Ce guide explique comment utiliser les fonctions de téléchargement et de visualisation des rapports dans l'application de gestion d'association. Ces fonctionnalités permettent de gérer les rapports générés par l'application.

## Fonctionnalités Implémentées

### 1. Téléchargement de Rapports
- **Emplacement** : Page "RAPPORTS" > Grille des rapports
- **Action** : Cliquer sur le bouton "Télécharger" sous chaque carte de rapport
- **Processus** :
  1. Un message de notification indique que le téléchargement est en cours
  2. Un overlay de chargement s'affiche pendant le processus
  3. Une notification de succès s'affiche lorsque le téléchargement est terminé

### 2. Visualisation de Rapports
- **Emplacement** : Page "RAPPORTS" > Grille des rapports
- **Action** : Cliquer sur le bouton "Voir" sous chaque carte de rapport
- **Processus** :
  1. Un message de notification indique que la visualisation est en cours
  2. Une notification supplémentaire indique que le rapport s'ouvre dans un nouvel onglet

## Test des Fonctionnalités

### Via la page de test
Une page de test a été créée pour vérifier le bon fonctionnement des fonctions :

1. Accédez à `test-reports.html` dans votre navigateur
2. La page exécute automatiquement une série de tests
3. Les résultats s'affichent en bas de page

### Manuellement dans l'application
1. Connectez-vous à l'application
2. Naviguez vers la page "RAPPORTS"
3. Utilisez les boutons "Télécharger" et "Voir" sur les cartes de rapports

## Notifications

Après chaque action, une notification s'affiche :
- **En cas de succès** : Notification verte avec un message de confirmation
- **En cas d'erreur** : Notification rouge avec un message d'erreur

## Processus de Téléchargement

Le processus de téléchargement simule un téléchargement réel avec :
1. Affichage d'un overlay de chargement
2. Animation de chargement
3. Notification de succès après un délai simulé

## Processus de Visualisation

Le processus de visualisation simule l'ouverture d'un rapport dans un nouvel onglet avec :
1. Notification indiquant que la visualisation est en cours
2. Notification supplémentaire indiquant que le rapport s'ouvre dans un nouvel onglet

## Support

En cas de problème avec ces fonctionnalités, veuillez contacter l'administrateur système ou consulter la documentation technique.