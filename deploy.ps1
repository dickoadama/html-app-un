# Script de déploiement vers GitHub Pages pour Windows PowerShell

Write-Host "Déploiement vers GitHub Pages..." -ForegroundColor Green

# Sauvegarde de la branche actuelle
$currentBranch = git rev-parse --abbrev-ref HEAD
Write-Host "Branche actuelle: $currentBranch" -ForegroundColor Yellow

# Ajout de tous les fichiers
Write-Host "Ajout de tous les fichiers..." -ForegroundColor Yellow
git add .

# Commit des changements
Write-Host "Commit des changements..." -ForegroundColor Yellow
git commit -m "Mise à jour du site"

# Push vers la branche principale
Write-Host "Push vers la branche principale..." -ForegroundColor Yellow
git push origin main

# Déploiement vers GitHub Pages
Write-Host "Déploiement vers GitHub Pages..." -ForegroundColor Yellow
git push origin main:gh-pages

Write-Host "Déploiement terminé!" -ForegroundColor Green