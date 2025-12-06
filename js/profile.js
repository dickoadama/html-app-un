// Script pour gérer la page de profil administrateur

document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si l'utilisateur est connecté
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    // Mettre à jour l'affichage avec les informations de l'utilisateur
    document.getElementById('userName').textContent = currentUser.fullName || currentUser.username;
    
    // Charger les informations du profil
    loadProfileInfo(currentUser);
    
    // Gérer la déconnexion
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Déconnecter l'utilisateur
            db.logout();
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    }
    
    // Gérer les modals
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Fermer le modal quand on clique en dehors
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Gérer le modal de modification de profil
    const editProfileBtn = document.getElementById('editProfileBtn');
    const cancelEditProfileBtn = document.getElementById('cancelEditProfile');
    const editProfileForm = document.getElementById('editProfileForm');
    
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            // Remplir le formulaire avec les données actuelles
            document.getElementById('editFullName').value = currentUser.fullName || '';
            document.getElementById('editEmail').value = currentUser.email || '';
            document.getElementById('editPhone').value = currentUser.phone || '';
            
            // Afficher le modal
            document.getElementById('editProfileModal').style.display = 'block';
        });
    }
    
    if (cancelEditProfileBtn) {
        cancelEditProfileBtn.addEventListener('click', function() {
            document.getElementById('editProfileModal').style.display = 'none';
        });
    }
    
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const fullName = document.getElementById('editFullName').value;
            const email = document.getElementById('editEmail').value;
            const phone = document.getElementById('editPhone').value;
            
            // Mettre à jour les informations de l'utilisateur
            alert(`Profil mis à jour avec succès!

Nom: ${fullName}
Email: ${email}
Téléphone: ${phone}`);
            
            // Fermer le modal
            document.getElementById('editProfileModal').style.display = 'none';
        });
    }
    
    // Gérer le modal de changement de mot de passe
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const cancelChangePasswordBtn = document.getElementById('cancelChangePassword');
    const changePasswordForm = document.getElementById('changePasswordForm');
    
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', function() {
            // Réinitialiser le formulaire
            if (changePasswordForm) changePasswordForm.reset();
            
            // Afficher le modal
            document.getElementById('changePasswordModal').style.display = 'block';
        });
    }
    
    if (cancelChangePasswordBtn) {
        cancelChangePasswordBtn.addEventListener('click', function() {
            document.getElementById('changePasswordModal').style.display = 'none';
        });
    }
    
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmNewPassword = document.getElementById('confirmNewPassword').value;
            
            // Vérifier le mot de passe actuel
            if (currentPassword !== currentUser.password) {
                alert('Le mot de passe actuel est incorrect.');
                return;
            }
            
            // Vérifier que les nouveaux mots de passe correspondent
            if (newPassword !== confirmNewPassword) {
                alert('Les nouveaux mots de passe ne correspondent pas.');
                return;
            }
            
            // Vérifier la longueur du nouveau mot de passe
            if (newPassword.length < 8) {
                alert('Le nouveau mot de passe doit contenir au moins 8 caractères.');
                return;
            }
            
            // Mettre à jour le mot de passe
            alert('Mot de passe changé avec succès!');
            
            // Fermer le modal
            document.getElementById('changePasswordModal').style.display = 'none';
        });
    }
});

// Fonction pour charger les informations du profil
function loadProfileInfo(user) {
    // Obtenir les détails complets de l'utilisateur depuis la base de données
    const userDetails = db.getCurrentUserDetails();
    
    if (userDetails) {
        // Mettre à jour les informations de base
        document.getElementById('profileFullName').textContent = userDetails.fullName || 'Non spécifié';
        document.getElementById('profileRole').textContent = getRoleLabel(userDetails.role);
        document.getElementById('profileEmail').textContent = userDetails.email || 'Non spécifié';
        document.getElementById('profilePhone').textContent = userDetails.phone || 'Non spécifié';
        
        // Mettre à jour les détails
        document.getElementById('profileId').textContent = userDetails.id || '-';
        document.getElementById('profileUsername').textContent = userDetails.username || '-';
        document.getElementById('profileRegistrationDate').textContent = userDetails.dateInscription || '-';
        document.getElementById('profileLastLogin').textContent = userDetails.lastLogin || 'Jamais';
        document.getElementById('profileStatus').textContent = userDetails.status ? (userDetails.status === 'actif' ? 'Actif' : 'Inactif') : '-';
        
        // Mettre à jour les permissions
        updatePermissionsDisplay(userDetails.role);
    }
}

// Fonction pour obtenir le libellé du rôle
function getRoleLabel(role) {
    const labels = {
        'superadmin': 'Super Administrateur',
        'administrateur': 'Administrateur',
        'trésorier': 'Trésorier',
        'secrétaire': 'Secrétaire',
        'membre': 'Membre'
    };
    return labels[role] || role;
}

// Fonction pour mettre à jour l'affichage des permissions
function updatePermissionsDisplay(role) {
    // Obtenir les permissions pour le rôle
    const rolePermissions = db.permissions[role] || {};
    
    // Mettre à jour les permissions pour chaque catégorie
    updatePermissionCategory('user', rolePermissions.users || []);
    updatePermissionCategory('member', rolePermissions.members || []);
    updatePermissionCategory('event', rolePermissions.events || []);
    updatePermissionCategory('report', rolePermissions.reports || []);
    updatePermissionCategory('finance', rolePermissions.finances || []);
}

// Fonction pour mettre à jour une catégorie de permissions
function updatePermissionCategory(category, permissions) {
    const categoryElement = document.getElementById(`${category}Permissions`);
    if (categoryElement) {
        // Réinitialiser le contenu
        categoryElement.innerHTML = '';
        
        // Définir les permissions possibles
        const permissionLabels = {
            'read': 'Lecture',
            'write': 'Écriture',
            'delete': 'Suppression',
            'create': 'Création',
            'generate': 'Génération'
        };
        
        // Créer les éléments de liste pour chaque permission
        Object.keys(permissionLabels).forEach(permission => {
            const li = document.createElement('li');
            if (permissions.includes(permission)) {
                li.innerHTML = `<i class="fas fa-check-circle" style="color: #27ae60;"></i> ${permissionLabels[permission]}`;
            } else {
                li.innerHTML = `<i class="fas fa-times-circle" style="color: #e74c3c;"></i> ${permissionLabels[permission]}`;
            }
            categoryElement.appendChild(li);
        });
    }
}