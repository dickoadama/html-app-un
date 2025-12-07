// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser l'application
    initializeApp();
});

// Initialiser l'application
function initializeApp() {
    setupNavigation();
    setupEventListeners();
    setupTabs();
    updateStats();
    
    // Afficher la page du tableau de bord par défaut
    showPage('dashboard');
}

// Mettre à jour les statistiques
function updateStats() {
    // Ces valeurs seraient normalement récupérées depuis la base de données
    document.getElementById('totalMembers').textContent = '128';
    document.getElementById('activeMembers').textContent = '115';
    document.getElementById('totalEvents').textContent = '24';
    document.getElementById('upcomingEvents').textContent = '8';
    document.getElementById('totalFinances').textContent = '5.240 FCFA';
    document.getElementById('totalUsers').textContent = '5';
}

// Gérer la navigation
function setupNavigation() {
    // Navigation principale
    const navLinks = document.querySelectorAll('.nav-link[data-page]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
            
            // Mettre à jour la classe active
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Afficher une page spécifique
function showPage(pageId) {
    // Masquer toutes les pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Afficher la page demandée
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Si c'est la page d'administration, afficher le premier onglet
    if (pageId === 'administration') {
        showTab('users');
    }
}

// Gérer les onglets d'administration
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button[data-tab]');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            showTab(tabId);
            
            // Mettre à jour la classe active
            tabButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Afficher un onglet spécifique
function showTab(tabId) {
    // Masquer tous les onglets
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Afficher l'onglet demandé
    const targetTab = document.getElementById(`${tabId}-tab`);
    if (targetTab) {
        targetTab.classList.add('active');
    }
}

// Gérer les événements
function setupEventListeners() {
    // Boutons d'ouverture de modals
    document.getElementById('addMemberBtn')?.addEventListener('click', () => openModal('memberModal', 'Ajouter un membre'));
    document.getElementById('addEventBtn')?.addEventListener('click', () => openModal('eventModal', 'Ajouter un événement'));
    document.getElementById('addUserBtn')?.addEventListener('click', () => openModal('userModal', 'Ajouter un utilisateur'));
    document.getElementById('addProfileBtn')?.addEventListener('click', () => openModal('profileModal', 'Ajouter un profil'));
    document.getElementById('generateReportBtn')?.addEventListener('click', () => openModal('reportModal'));
    
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
    document.getElementById('cancelMember')?.addEventListener('click', () => closeModal('memberModal'));
    document.getElementById('cancelEvent')?.addEventListener('click', () => closeModal('eventModal'));
    document.getElementById('cancelUser')?.addEventListener('click', () => closeModal('userModal'));
    document.getElementById('cancelProfile')?.addEventListener('click', () => closeModal('profileModal'));
    document.getElementById('cancelReport')?.addEventListener('click', () => closeModal('reportModal'));
    document.getElementById('cancelSettings')?.addEventListener('click', () => showTab('users'));
    
    // Générer un mot de passe aléatoire
    document.getElementById('generatePassword')?.addEventListener('click', generateRandomPassword);
    
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
        showNotification(`Rapport ${reportName} téléchargé avec succès!`, 'success');
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
    notificationContainer.appendChild(notification);
    
    // Supprimer automatiquement après 5 secondes
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Gérer les boutons d'action dans les cartes
document.addEventListener('click', function(e) {
    // Gérer les boutons d'édition
    if (e.target.closest('.btn-icon.edit')) {
        const card = e.target.closest('.event-card, .report-card, .profile-card');
        if (card) {
            // Obtenir le nom de l'élément à partir du titre
            const titleElement = card.querySelector('h3');
            const itemName = titleElement ? titleElement.textContent : 'élément';
            showNotification(`Modification de ${itemName} en cours...`, 'info');
        }
    }
    
    // Gérer les boutons de suppression
    if (e.target.closest('.btn-icon.delete')) {
        const card = e.target.closest('.event-card, .report-card, .profile-card');
        if (card) {
            // Obtenir le nom de l'élément à partir du titre
            const titleElement = card.querySelector('h3');
            const itemName = titleElement ? titleElement.textContent : 'élément';
            
            // Confirmer la suppression
            if (confirm(`Êtes-vous sûr de vouloir supprimer ${itemName} ?`)) {
                showNotification(`${itemName} supprimé avec succès!`, 'success');
                // Supprimer la carte
                card.remove();
            }
        }
    }
    
    // Gérer les boutons de téléchargement dans les rapports
    if (e.target.closest('.btn.download') || e.target.closest('.btn.btn-secondary .fa-download')) {
        const card = e.target.closest('.report-card');
        if (card) {
            // Obtenir le nom du rapport à partir du titre
            const reportTitle = card.querySelector('h3').textContent;
            // Simuler le téléchargement du rapport
            showNotification(`Téléchargement du rapport ${reportTitle} en cours...`, 'info');
            simulateReportDownload(reportTitle.replace(/\s+/g, '_'));
        }
    }
    
    // Gérer les boutons de visualisation dans les rapports
    if (e.target.closest('.btn.btn-secondary .fa-eye')) {
        const card = e.target.closest('.report-card');
        if (card) {
            // Obtenir le nom du rapport à partir du titre
            const reportTitle = card.querySelector('h3').textContent;
            showNotification(`Visualisation du rapport ${reportTitle}...`, 'info');
        }
    }
});