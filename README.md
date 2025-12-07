# UN - Gestion d'Association

Application de gestion d'association complète avec système de gestion hiérarchique des utilisateurs.

## Fonctionnalités

- **Gestion des utilisateurs avec hiérarchie** :
  - SUPER ADMIN peut créer des ADMINISTRATEURS
  - ADMINISTRATEURS peuvent créer des TRÉSORIERS, SECRÉTAIRES et MEMBRES
- **Tableau de bord** avec statistiques en temps réel
- **Gestion des membres** de l'association
- **Suivi des cotisations** et finances
- **Gestion des événements** et activités
- **Génération de rapports** personnalisés
- **Interface responsive** et moderne

## Structure hiérarchique des rôles

1. **Super Administrateur** (superadmin)
   - Peut tout gérer dans l'application
   - Peut créer des administrateurs

2. **Administrateur** (administrateur)
   - Peut gérer les utilisateurs de niveau inférieur
   - Peut créer des trésoriers, secrétaires et membres

3. **Trésorier** (trésorier)
   - Gère les aspects financiers
   - Suit les cotisations

4. **Secrétaire** (secrétaire)
   - Gère les membres et événements
   - Maintient les archives

5. **Membre** (membre)
   - Accès en lecture aux informations pertinentes
   - Peut voir ses propres données

## Technologies utilisées

- HTML5, CSS3, JavaScript (Vanilla)
- LocalStorage pour la persistance des données
- Font Awesome pour les icônes
- Design responsive

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/dickoadama/html-app-un.git
   ```

2. Ouvrez le fichier `index.html` dans votre navigateur

## Utilisation

1. Connectez-vous avec les identifiants par défaut :
   - Super Administrateur : `superadmin` / `superadmin123`
   - Administrateur : `admin` / `admin123`
   - Trésorier : `tresorier` / `tresorier123`
   - Secrétaire : `secretaire` / `secretaire123`
   - Membre : `pierre.dubois` / `pierre123`

2. Naviguez dans l'application via le menu principal

## Déploiement

L'application est déployée automatiquement sur GitHub Pages via la branche `gh-pages`.

## Contribuer

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commitez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE.md](LICENSE) pour plus d'informations.

## Contact

Pour toute question ou suggestion, veuillez ouvrir une issue sur GitHub.