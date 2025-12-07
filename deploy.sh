#!/bin/bash

# Script de déploiement vers GitHub Pages

echo "Déploiement vers GitHub Pages..."

# Sauvegarde de la branche actuelle
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Construction du site (si nécessaire)
echo "Construction du site..."

# Commit des changements
git add .
git commit -m "Mise à jour du site"

# Push vers la branche principale
echo "Push vers la branche principale..."
git push origin main

# Déploiement vers GitHub Pages
echo "Déploiement vers GitHub Pages..."
git push origin main:gh-pages

echo "Déploiement terminé!"