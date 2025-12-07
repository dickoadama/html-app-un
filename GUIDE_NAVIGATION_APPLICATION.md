# Guide de Navigation dans l'Application

## Introduction

Ce guide explique comment naviguer efficacement dans l'application de gestion d'association UN, en particulier la navigation entre les différentes pages et onglets.

## Navigation Principale

L'application utilise une barre de navigation située en haut de l'écran pour accéder aux différentes sections principales :

1. **TABLEAU DE BORD** - Vue d'ensemble des statistiques
2. **MEMBRES** - Gestion des membres de l'association
3. **COTISATIONS** - Suivi des cotisations et paiements
4. **ÉVÉNEMENTS** - Organisation des événements
5. **RAPPORTS** - Génération et consultation des rapports
6. **ADMINISTRATION** - Gestion des utilisateurs, profils et paramètres

## Navigation dans la Section Administration

La section "ADMINISTRATION" contient trois onglets organisés horizontalement :

### 1. Onglet "Utilisateurs"
- Gestion des comptes utilisateurs
- Création, modification et suppression d'utilisateurs
- Attribution de rôles (Administrateur, Trésorier, Secrétaire, Membre)

### 2. Onglet "Profils"
- Gestion des profils détaillés
- Informations personnelles des membres
- Coordonnées et préférences

### 3. Onglet "Paramètres"
- Configuration de l'application
- Réinitialisation des données
- Gestion des notifications

## Fonctionnement des Onglets

### Activation d'un onglet
1. Cliquer sur le bouton de l'onglet souhaité dans la barre d'onglets
2. L'onglet sélectionné devient actif (mis en évidence)
3. Le contenu de l'onglet s'affiche dans la zone de contenu

### Comportement par défaut
- Lors de l'accès à la section "ADMINISTRATION", l'onglet "Utilisateurs" est activé par défaut
- Seul un onglet peut être actif à la fois
- Les autres onglets restent accessibles par clic

## Résolution des Problèmes de Navigation

### Problème : Les onglets ne s'affichent pas
**Causes possibles :**
1. Le script JavaScript n'est pas correctement chargé
2. Il y a une erreur dans la console du navigateur
3. Le cache du navigateur n'est pas à jour

**Solutions :**
1. Actualiser la page (F5 ou Ctrl+R)
2. Vider le cache du navigateur
3. Vérifier la console du navigateur pour les erreurs (F12 → Console)
4. S'assurer que JavaScript est activé dans le navigateur

### Problème : Impossible de changer d'onglet
**Causes possibles :**
1. Les gestionnaires d'événements ne sont pas attachés
2. Il y a une erreur JavaScript bloquante
3. Les identifiants des éléments ne correspondent pas

**Solutions :**
1. Vérifier que tous les éléments HTML ont les bons attributs `data-tab`
2. S'assurer que les identifiants des contenus d'onglets correspondent (`id="nomOngletTab"`)
3. Vérifier qu'il n'y a pas d'erreurs JavaScript dans la console

## Bonnes Pratiques

1. **Navigation intuitive** : Toujours utiliser la barre de navigation principale
2. **Activation claire** : L'onglet actif est toujours visuellement distingué
3. **Feedback immédiat** : Le contenu change immédiatement lors du clic sur un onglet
4. **État persistant** : L'onglet sélectionné reste actif lors de la navigation

## Support

En cas de problème persistant avec la navigation, veuillez :
1. Vérifier votre connexion internet
2. Essayer avec un autre navigateur
3. Contacter l'administrateur système