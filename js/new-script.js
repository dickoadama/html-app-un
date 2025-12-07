// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser l'application
    initializeApp();
});

// Initialiser l'application
function initializeApp() {
    // Mettre à jour le nom de l'utilisateur connecté
    updateUserInfo();
    
    // Initialiser l'horloge
    initClock();
    
    setupNavigation();
    setupEventListeners();
    setupTabs();
    updateStats();
    
    // Afficher la page du tableau de bord par défaut
    showPage('dashboard');
}

// Mettre à jour les informations de l'utilisateur
function updateUserInfo() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = currentUser.fullName || currentUser.username;
        }
    }
}

// Initialiser l'horloge
function initClock() {
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        
        const clockElement = document.getElementById('clockTime');
        if (clockElement) {
            clockElement.textContent = timeString;
        }
    }
    
    // Mettre à jour l'horloge immédiatement et toutes les secondes
    updateClock();
    setInterval(updateClock, 1000);
}

// Mettre à jour les statistiques
function updateStats() {
    try {
        // Obtenir les statistiques depuis la base de données
        const stats = db.getStatistics();
        
        // Mettre à jour les éléments du DOM
        document.getElementById('totalMembers').textContent = stats.totalMembers;
        document.getElementById('activeMembers').textContent = stats.activeMembers;
        document.getElementById('totalEvents').textContent = stats.totalEvents;
        document.getElementById('upcomingEvents').textContent = stats.upcomingEvents;
        document.getElementById('totalUsers').textContent = stats.totalUsers;
        
        // Formater le montant des finances
        const formattedAmount = db.formatCurrency(stats.totalFinances);
        document.getElementById('totalFinances').textContent = formattedAmount;
    } catch (error) {
        console.error('Erreur lors de la mise à jour des statistiques:', error);
    }
}

// Configurer la navigation
function setupNavigation() {
    // Gérer les clics sur les liens de navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Retirer la classe active de tous les liens
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            
            // Ajouter la classe active au lien cliqué
            this.classList.add('active');
            
            // Afficher la page correspondante
            const page = this.getAttribute('data-page');
            showPage(page);
        });
    });
}

// Afficher une page spécifique
function showPage(pageName) {
    // Masquer toutes les pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Afficher la page demandée
    const targetPage = document.getElementById(pageName);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Mettre à jour les statistiques quand on affiche le tableau de bord
    if (pageName === 'dashboard') {
        updateStats();
    }
    
    // Si on affiche la page d'administration, s'assurer que les onglets sont bien configurés
    if (pageName === 'administration') {
        // Réinitialiser l'onglet actif
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Activer le premier onglet (Utilisateurs)
        const firstTabBtn = document.querySelector('.tab-btn[data-tab="users"]');
        if (firstTabBtn) {
            firstTabBtn.classList.add('active');
        }
        
        // Masquer tous les onglets
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.style.display = 'none';
        });
        
        // Afficher le premier onglet
        const firstTab = document.getElementById('usersTab');
        if (firstTab) {
            firstTab.style.display = 'block';
        }
        
        // Mettre à jour les options de rôle dans le formulaire utilisateur
        updateUserRoleOptions();
    }
}

// Configurer les onglets
function setupTabs() {
    // Gérer les clics sur les onglets d'administration
    document.querySelectorAll('[data-tab]').forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            showTab(tabName);
        });
    });
}

// Afficher un onglet spécifique
function showTab(tabName) {
    // Masquer tous les onglets
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    
    // Afficher l'onglet demandé
    const targetTab = document.getElementById(tabName + 'Tab');
    if (targetTab) {
        targetTab.style.display = 'block';
    }
    
    // Mettre à jour l'onglet actif dans la navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// Mettre à jour les options de rôle dans le formulaire utilisateur
function updateUserRoleOptions() {
    const roleSelect = document.getElementById('role');
    if (!roleSelect) return;
    
    // Obtenir le rôle de l'utilisateur connecté
    const currentUserRole = db.getCurrentUserRole();
    
    // Effacer les options existantes
    roleSelect.innerHTML = '<option value="">Sélectionner un rôle</option>';
    
    // Ajouter les options en fonction du rôle de l'utilisateur connecté
    if (currentUserRole === 'superadmin') {
        // Le super admin peut créer tous les types d'utilisateurs
        roleSelect.innerHTML += `
            <option value="administrateur">Administrateur</option>
            <option value="trésorier">Trésorier</option>
            <option value="secrétaire">Secrétaire</option>
            <option value="membre">Membre</option>
        `;
    } else if (currentUserRole === 'administrateur') {
        // L'administrateur peut créer des utilisateurs de niveau inférieur
        roleSelect.innerHTML += `
            <option value="trésorier">Trésorier</option>
            <option value="secrétaire">Secrétaire</option>
            <option value="membre">Membre</option>
        `;
    } else {
        // Les autres utilisateurs ne peuvent pas créer d'utilisateurs
        roleSelect.innerHTML += '<option value="" disabled>Aucun rôle disponible</option>';
    }
}

// Gérer les événements
function setupEventListeners() {
    // Gérer la déconnexion
    document.getElementById('logoutBtn')?.addEventListener('click', function() {
        // Déconnecter l'utilisateur
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
    
    // Gérer le bouton de support flottant
    document.getElementById('supportButton')?.addEventListener('click', function() {
        showNotification('Service client\n\nPour toute assistance, veuillez contacter:\nEmail: support@un-association.fcfa\nTéléphone: +221 12 345 67 89', 'info');
    });
    
    // Gérer le bouton retour flottant
    document.getElementById('backToTopBtn')?.addEventListener('click', function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
    
    // Gérer le blog flottant
    document.getElementById('blogToggleBtn')?.addEventListener('click', function() {
        const blogContent = document.getElementById('blogContent');
        if (blogContent) {
            if (blogContent.style.display === 'none') {
                blogContent.style.display = 'block';
            } else {
                blogContent.style.display = 'none';
            }
        }
    });
    
    // Gérer la fermeture du blog
    document.getElementById('closeBlog')?.addEventListener('click', function() {
        const blogContent = document.getElementById('blogContent');
        if (blogContent) {
            blogContent.style.display = 'none';
        }
    });
    
    // Fermer le blog quand on clique en dehors
    document.addEventListener('click', function(e) {
        const blogContainer = document.getElementById('floatingBlog');
        const blogContent = document.getElementById('blogContent');
        
        if (blogContainer && blogContent && !blogContainer.contains(e.target) && blogContent.style.display === 'block') {
            blogContent.style.display = 'none';
        }
    });
    
    // Gérer le bouton de réinitialisation des données
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
    
    // Gérer le bouton de génération de mot de passe
    document.getElementById('generatePassword')?.addEventListener('click', function() {
        generateRandomPassword();
    });
    
    // Gérer les formulaires
    setupForms();
}

// Gérer les formulaires
function setupForms() {
    // Formulaire de membre
    const memberForm = document.getElementById('memberForm');
    if (memberForm) {
        memberForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Logique de traitement du formulaire de membre
            showNotification('Membre ajouté avec succès!', 'success');
            closeModal('memberModal');
        });
    }
    
    // Formulaire de cotisation
    const contributionForm = document.getElementById('contributionForm');
    if (contributionForm) {
        contributionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Logique de traitement du formulaire de cotisation
            showNotification('Cotisation enregistrée avec succès!', 'success');
            closeModal('contributionModal');
        });
    }
    
    // Formulaire d'événement
    const eventForm = document.getElementById('eventForm');
    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Logique de traitement du formulaire d'événement
            showNotification('Événement ajouté avec succès!', 'success');
            closeModal('eventModal');
        });
    }
    
    // Formulaire d'utilisateur
    const userForm = document.getElementById('userForm');
    if (userForm) {
        userForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Logique de traitement du formulaire d'utilisateur
            showNotification('Utilisateur ajouté avec succès!', 'success');
            closeModal('userModal');
        });
    }
    
    // Formulaire de profil
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Logique de traitement du formulaire de profil
            showNotification('Profil ajouté avec succès!', 'success');
            closeModal('profileModal');
        });
    }
    
    // Formulaire de rapport
    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Logique de traitement du formulaire de rapport
            showNotification('Rapport en cours de génération...', 'info');
            simulateReportGeneration();
            closeModal('reportModal');
        });
    }
    
    // Formulaire de paramètres
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Logique de traitement du formulaire de paramètres
            showNotification('Paramètres enregistrés avec succès!', 'success');
        });
    }
}

// Ouvrir un modal
function openModal(modalId, title = null) {
    const modal = document.getElementById(modalId);
    if (modal) {
        if (title) {
            const titleElement = modal.querySelector('h3');
            if (titleElement) {
                titleElement.textContent = title;
            }
        }
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

// Générer un mot de passe aléatoire
function generateRandomPassword() {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    if (passwordInput) {
        passwordInput.value = password;
    }
    
    if (confirmPasswordInput) {
        confirmPasswordInput.value = password;
    }
    
    showNotification('Mot de passe généré avec succès!', 'success');
}

// Simuler la génération d'un rapport
function simulateReportGeneration() {
    // Afficher l'overlay de chargement
    showLoading();
    
    // Simuler un délai de traitement
    setTimeout(() => {
        hideLoading();
        showNotification('Rapport généré avec succès! Vous pouvez maintenant le télécharger.', 'success');
    }, 3000);
}

// Simuler le téléchargement d'un rapport
function simulateReportDownload(reportName) {
    // Afficher l'overlay de chargement
    showLoading();
    
    // Simuler un délai de téléchargement
    setTimeout(() => {
        hideLoading();
        showNotification(`Rapport "${reportName}" téléchargé avec succès!`, 'success');
    }, 2000);
}

// Fonction pour afficher l'overlay de chargement
function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
    }
}

// Fonction pour masquer l'overlay de chargement
function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

// Système de notifications
const notificationContainer = document.getElementById('notificationContainer');

function showNotification(message, type = 'info') {
    if (!notificationContainer) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const iconMap = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };
    
    const iconClass = iconMap[type] || iconMap.info;
    
    notification.innerHTML = `
        <i class="fas ${iconClass}"></i>
        <span>${message}</span>
        <button class="close-notification">&times;</button>
    `;
    
    // Ajouter le bouton de fermeture
    const closeBtn = notification.querySelector('.close-notification');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    notificationContainer.appendChild(notification);
    
    // Fermer automatiquement après 5 secondes
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}