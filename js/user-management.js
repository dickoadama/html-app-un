// Gestion de la création d'utilisateurs avec hiérarchie
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser la gestion des utilisateurs
    initializeUserManagement();
    
    // Ajouter les événements pour les boutons d'action
    document.getElementById('addUserBtn')?.addEventListener('click', () => openModal('addUserModal'));
});
function initializeUserManagement() {
    // Vérifier si l'utilisateur est connecté
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    // Mettre à jour l'affichage avec les informations de l'utilisateur
    document.getElementById('userName').textContent = currentUser.fullName || currentUser.username;
    
    // Gérer la déconnexion
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            db.logout();
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    }
    
    // Configurer les formulaires
    setupUserForms();
    
    // Configurer les modals
    setupUserModals();
    
    // Afficher les utilisateurs existants
    displayUsers();
}
// Configurer les formulaires
function setupUserForms() {
    // Formulaire d'ajout d'utilisateur
    const addUserForm = document.getElementById('addUserForm');
    if (addUserForm) {
        addUserForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addUser();
        });
    }
    
    // Formulaire de modification d'utilisateur
    const editUserForm = document.getElementById('editUserForm');
    if (editUserForm) {
        editUserForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateUser();
        });
    }
}

// Configurer les modals
function setupUserModals() {
    // Boutons pour ouvrir les modals
    document.getElementById('addUserBtn')?.addEventListener('click', () => openModal('addUserModal'));
    
    // Boutons de fermeture des modals
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Fermer le modal quand on clique en dehors
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target.id);
        }
    });
    
    // Boutons "Retour" dans les formulaires
    document.getElementById('cancelAddUser')?.addEventListener('click', () => closeModal('addUserModal'));
    document.getElementById('cancelEditUser')?.addEventListener('click', () => closeModal('editUserModal'));
}

// Afficher les utilisateurs existants
function displayUsers() {
    try {
        const users = db.getUsers();
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        const tbody = document.querySelector('#usersTable tbody');
        if (tbody) {
            tbody.innerHTML = '';
            
            users.forEach(user => {
                // Vérifier si l'utilisateur courant peut gérer cet utilisateur
                if (canManageUser(currentUser, user)) {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.fullName || '-'}</td>
                        <td>${getRoleLabel(user.role)}</td>
                        <td>${user.email || '-'}</td>
                        <td>${user.phone || '-'}</td>
                        <td>${formatDate(user.dateInscription) || '-'}</td>
                        <td>${formatDate(user.lastLogin) || 'Jamais'}</td>
                        <td><span class="status ${user.status}">${user.status === 'actif' ? 'Actif' : 'Inactif'}</span></td>
                        <td>
                            <button class="btn-icon edit" data-id="${user.id}">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon delete" data-id="${user.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    `;
                    tbody.appendChild(row);
                }
            });
            
            // Ajouter les événements aux boutons
            addTableEventListeners();
        }
    } catch (error) {
        console.error('Erreur lors de l\'affichage des utilisateurs:', error);
        showNotification('Erreur lors du chargement des utilisateurs', 'error');
    }
}

// Ajouter les événements aux boutons du tableau
function addTableEventListeners() {
    // Boutons d'édition
    document.querySelectorAll('.btn-icon.edit').forEach(button => {
        button.addEventListener('click', function() {
            const userId = parseInt(this.getAttribute('data-id'));
            editUser(userId);
        });
    });
    
    // Boutons de suppression
    document.querySelectorAll('.btn-icon.delete').forEach(button => {
        button.addEventListener('click', function() {
            const userId = parseInt(this.getAttribute('data-id'));
            deleteUser(userId);
        });
    });
}

// Ajouter un utilisateur
function addUser() {
    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const formData = new FormData(document.getElementById('addUserForm'));
        
        const userData = {
            username: formData.get('username'),
            password: formData.get('password'),
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            role: formData.get('role'),
            dateInscription: new Date().toISOString().split('T')[0],
            lastLogin: 'Jamais',
            status: 'actif',
            permissions: getDefaultPermissions(formData.get('role'))
        };
        
        // Vérifier les permissions
        if (!canCreateUser(currentUser, userData.role)) {
            showNotification('Vous n\'avez pas la permission de créer un utilisateur avec ce rôle', 'error');
            return;
        }
        
        // Vérifier si le nom d'utilisateur existe déjà
        const existingUsers = db.getUsers();
        if (existingUsers.some(user => user.username === userData.username)) {
            showNotification('Ce nom d\'utilisateur existe déjà', 'error');
            return;
        }
        
        // Ajouter l'utilisateur
        db.addUser(userData);
        
        // Fermer le modal
        closeModal('addUserModal');
        
        // Rafraîchir l'affichage
        displayUsers();
        
        // Afficher une notification de succès
        showNotification('Utilisateur ajouté avec succès', 'success');
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        showNotification('Erreur lors de l\'ajout de l\'utilisateur: ' + error.message, 'error');
    }
}

// Modifier un utilisateur
function editUser(userId) {
    try {
        const user = db.getUsers().find(u => u.id === userId);
        if (!user) {
            showNotification('Utilisateur non trouvé', 'error');
            return;
        }
        
        // Remplir le formulaire avec les données de l'utilisateur
        document.getElementById('editUserId').value = user.id;
        document.getElementById('editUsername').value = user.username;
        document.getElementById('editFullName').value = user.fullName || '';
        document.getElementById('editEmail').value = user.email || '';
        document.getElementById('editPhone').value = user.phone || '';
        document.getElementById('editRole').value = user.role;
        document.getElementById('editStatus').value = user.status;
        
        // Ouvrir le modal
        openModal('editUserModal');
    } catch (error) {
        console.error('Erreur lors de l\'édition de l\'utilisateur:', error);
        showNotification('Erreur lors de l\'édition de l\'utilisateur', 'error');
    }
}

// Mettre à jour un utilisateur
function updateUser() {
    try {
        const formData = new FormData(document.getElementById('editUserForm'));
        
        const userId = parseInt(formData.get('id'));
        const userData = {
            username: formData.get('username'),
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            role: formData.get('role'),
            status: formData.get('status')
        };
        
        // Mettre à jour l'utilisateur
        db.updateUser(userId, userData);
        
        // Fermer le modal
        closeModal('editUserModal');
        
        // Rafraîchir l'affichage
        displayUsers();
        
        // Afficher une notification de succès
        showNotification('Utilisateur mis à jour avec succès', 'success');
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        showNotification('Erreur lors de la mise à jour de l\'utilisateur: ' + error.message, 'error');
    }
}

// Supprimer un utilisateur
function deleteUser(userId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
        try {
            db.deleteUser(userId);
            
            // Rafraîchir l'affichage
            displayUsers();
            
            // Afficher une notification de succès
            showNotification('Utilisateur supprimé avec succès', 'success');
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur:', error);
            showNotification('Erreur lors de la suppression de l\'utilisateur: ' + error.message, 'error');
        }
    }
}

// Ouvrir un modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        // Réinitialiser les formulaires
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
        
        // Afficher le modal
        modal.style.display = 'block';
    }
}

// Fermer un modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Vérifier si l'utilisateur courant peut gérer un autre utilisateur
function canManageUser(currentUser, targetUser) {
    // Le super admin peut gérer tout le monde
    if (currentUser.role === 'superadmin') return true;
    
    // Les admins peuvent gérer les utilisateurs de niveau inférieur
    if (currentUser.role === 'administrateur') {
        return ['trésorier', 'secrétaire', 'membre'].includes(targetUser.role);
    }
    
    // Les autres rôles ne peuvent pas gérer d'utilisateurs
    return false;
}

// Vérifier si l'utilisateur courant peut créer un utilisateur avec un rôle spécifique
function canCreateUser(currentUser, targetRole) {
    // Le super admin peut créer tous les types d'utilisateurs
    if (currentUser.role === 'superadmin') return true;
    
    // Les admins peuvent créer des utilisateurs de niveau inférieur
    if (currentUser.role === 'administrateur') {
        return ['trésorier', 'secrétaire', 'membre'].includes(targetRole);
    }
    
    // Les autres rôles ne peuvent pas créer d'utilisateurs
    return false;
}

// Obtenir les permissions par défaut pour un rôle
function getDefaultPermissions(role) {
    const permissions = {
        canExport: false,
        canDelete: false,
        canModifySettings: false
    };
    
    // Donner plus de permissions aux rôles supérieurs
    if (role === 'superadmin') {
        permissions.canExport = true;
        permissions.canDelete = true;
        permissions.canModifySettings = true;
    } else if (role === 'administrateur') {
        permissions.canExport = true;
    }
    
    return permissions;
}

// Obtenir le libellé du rôle
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

// Formater les dates
function formatDate(dateString) {
    if (!dateString || dateString === 'Jamais') return dateString;
    
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    } catch (e) {
        return dateString;
    }
}

// Afficher une notification
function showNotification(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const iconMap = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    const iconClass = iconMap[type] || iconMap.info;
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas ${iconClass}"></i>
            </div>
            <div class="notification-message">${message}</div>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Ajouter l'événement de fermeture
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Ajouter la notification au conteneur
    container.appendChild(notification);
    
    // Supprimer automatiquement après 5 secondes
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}