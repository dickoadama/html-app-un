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
    // Récupérer les statistiques depuis la base de données
    if (typeof db !== 'undefined' && db.getStatistics) {
        const stats = db.getStatistics();
        document.getElementById('totalMembers').textContent = stats.totalMembers;
        document.getElementById('activeMembers').textContent = stats.activeMembers;
        document.getElementById('totalEvents').textContent = stats.totalEvents;
        document.getElementById('upcomingEvents').textContent = stats.upcomingEvents;
        document.getElementById('totalFinances').textContent = stats.totalFinances.toLocaleString() + ' FCFA';
        document.getElementById('totalUsers').textContent = stats.totalUsers;
    } else {
        // Valeurs par défaut si la base de données n'est pas disponible
        document.getElementById('totalMembers').textContent = '0';
        document.getElementById('activeMembers').textContent = '0';
        document.getElementById('totalEvents').textContent = '0';
        document.getElementById('upcomingEvents').textContent = '0';
        document.getElementById('totalFinances').textContent = '0 FCFA';
        document.getElementById('totalUsers').textContent = '0';
    }
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
    document.getElementById('addContributionBtn')?.addEventListener('click', () => openModal('contributionModal', 'Enregistrer une cotisation'));
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
    document.getElementById('cancelContribution')?.addEventListener('click', () => closeModal('contributionModal'));
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
    // Gérer les boutons d'édition pour les membres (boutons avec class .btn-icon.edit)
    if (e.target.closest('.btn-icon.edit') && e.target.closest('#membersTableBody')) {
        const row = e.target.closest('tr');
        if (row) {
            // Obtenir les données du membre à partir de la ligne du tableau
            const cells = row.querySelectorAll('td');
            const memberName = cells[0].textContent;
            showNotification(`Modification du membre ${memberName} en cours...`, 'info');
            // TODO: Implémenter la logique de modification du membre
        }
    }
    
    // Gérer les boutons de suppression pour les membres (boutons avec class .btn-icon.delete)
    if (e.target.closest('.btn-icon.delete') && e.target.closest('#membersTableBody')) {
        const row = e.target.closest('tr');
        if (row) {
            // Obtenir les données du membre à partir de la ligne du tableau
            const cells = row.querySelectorAll('td');
            const memberName = cells[0].textContent;
            
            // Confirmer la suppression
            if (confirm(`Êtes-vous sûr de vouloir supprimer le membre ${memberName} ?`)) {
                try {
                    // Supprimer la ligne du tableau
                    row.remove();
                    showNotification(`Membre ${memberName} supprimé avec succès!`, 'success');
                } catch (error) {
                    console.error('Erreur lors de la suppression du membre:', error);
                    showNotification(`Erreur lors de la suppression du membre ${memberName}`, 'error');
                }
            }
        }
    }
    
    // Gérer les boutons d'édition pour les cotisations (boutons avec class .btn-icon.edit)
    if (e.target.closest('.btn-icon.edit') && e.target.closest('#contributionsTableBody')) {
        const row = e.target.closest('tr');
        if (row) {
            // Obtenir les données de la cotisation à partir de la ligne du tableau
            const cells = row.querySelectorAll('td');
            const memberName = cells[0].textContent;
            showNotification(`Modification de la cotisation de ${memberName} en cours...`, 'info');
            // TODO: Implémenter la logique de modification de la cotisation
        }
    }
    
    // Gérer les boutons de suppression pour les cotisations (boutons avec class .btn-icon.delete)
    if (e.target.closest('.btn-icon.delete') && e.target.closest('#contributionsTableBody')) {
        const row = e.target.closest('tr');
        if (row) {
            // Obtenir les données de la cotisation à partir de la ligne du tableau
            const cells = row.querySelectorAll('td');
            const memberName = cells[0].textContent;
            
            // Confirmer la suppression
            if (confirm(`Êtes-vous sûr de vouloir supprimer la cotisation de ${memberName} ?`)) {
                try {
                    // Supprimer la ligne du tableau
                    row.remove();
                    showNotification(`Cotisation de ${memberName} supprimée avec succès!`, 'success');
                } catch (error) {
                    console.error('Erreur lors de la suppression de la cotisation:', error);
                    showNotification(`Erreur lors de la suppression de la cotisation de ${memberName}`, 'error');
                }
            }
        }
    }
    
    // Gérer les boutons d'édition pour les événements (boutons avec class .edit dans les cartes)
    if (e.target.closest('.event-card .edit')) {
        const card = e.target.closest('.event-card');
        if (card) {
            // Obtenir le nom de l'élément à partir du titre
            const titleElement = card.querySelector('h3');
            const itemName = titleElement ? titleElement.textContent : 'événement';
            showNotification(`Modification de l'événement "${itemName}" en cours...`, 'info');
            // TODO: Implémenter la logique de modification de l'événement
        }
    }
    
    // Gérer les boutons de suppression pour les événements (boutons avec class .delete dans les cartes)
    if (e.target.closest('.event-card .delete')) {
        const card = e.target.closest('.event-card');
        if (card) {
            // Obtenir le nom de l'élément à partir du titre
            const titleElement = card.querySelector('h3');
            const itemName = titleElement ? titleElement.textContent : 'événement';
            
            // Confirmer la suppression
            if (confirm(`Êtes-vous sûr de vouloir supprimer l'événement "${itemName}" ?`)) {
                try {
                    // Supprimer la carte
                    card.remove();
                    showNotification(`Événement "${itemName}" supprimé avec succès!`, 'success');
                } catch (error) {
                    console.error('Erreur lors de la suppression de l\'événement:', error);
                    showNotification(`Erreur lors de la suppression de l'événement "${itemName}"`, 'error');
                }
            }
        }
    }
    
    // Gérer les boutons d'édition pour les utilisateurs (boutons avec class .btn-icon.edit dans l'administration)
    if (e.target.closest('.btn-icon.edit') && e.target.closest('#profilesTableBody')) {
        const row = e.target.closest('tr');
        if (row) {
            // Obtenir les données de l'utilisateur à partir de la ligne du tableau
            const cells = row.querySelectorAll('td');
            const userName = cells[0].textContent;
            showNotification(`Modification de l'utilisateur ${userName} en cours...`, 'info');
            // TODO: Implémenter la logique de modification de l'utilisateur
        }
    }
    
    // Gérer les boutons de suppression pour les utilisateurs (boutons avec class .btn-icon.delete dans l'administration)
    if (e.target.closest('.btn-icon.delete') && e.target.closest('#profilesTableBody')) {
        const row = e.target.closest('tr');
        if (row) {
            // Obtenir les données de l'utilisateur à partir de la ligne du tableau
            const cells = row.querySelectorAll('td');
            const userName = cells[0].textContent;
            
            // Confirmer la suppression
            if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${userName} ?`)) {
                try {
                    // Supprimer la ligne du tableau
                    row.remove();
                    showNotification(`Utilisateur ${userName} supprimé avec succès!`, 'success');
                } catch (error) {
                    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
                    showNotification(`Erreur lors de la suppression de l'utilisateur ${userName}`, 'error');
                }
            }
        }
    }
    
    // Gérer les boutons d'édition pour les profils (boutons avec class .edit dans les cartes de profils)
    if (e.target.closest('.profile-card .edit')) {
        const card = e.target.closest('.profile-card');
        if (card) {
            // Obtenir le nom de l'élément à partir du titre
            const titleElement = card.querySelector('h3');
            const itemName = titleElement ? titleElement.textContent : 'profil';
            showNotification(`Modification du profil "${itemName}" en cours...`, 'info');
            // TODO: Implémenter la logique de modification du profil
        }
    }
    
    // Gérer les boutons de suppression pour les profils (boutons avec class .delete dans les cartes de profils)
    if (e.target.closest('.profile-card .delete')) {
        const card = e.target.closest('.profile-card');
        if (card) {
            // Obtenir le nom de l'élément à partir du titre
            const titleElement = card.querySelector('h3');
            const itemName = titleElement ? titleElement.textContent : 'profil';
            
            // Confirmer la suppression
            if (confirm(`Êtes-vous sûr de vouloir supprimer le profil "${itemName}" ?`)) {
                try {
                    // Supprimer la carte
                    card.remove();
                    showNotification(`Profil "${itemName}" supprimé avec succès!`, 'success');
                } catch (error) {
                    console.error('Erreur lors de la suppression du profil:', error);
                    showNotification(`Erreur lors de la suppression du profil "${itemName}"`, 'error');
                }
            }
        }
    }
    
    // Gérer les boutons de téléchargement dans les rapports
    if (e.target.closest('.btn.download') || e.target.closest('.report-card .download')) {
        const card = e.target.closest('.report-card');
        if (card) {
            // Obtenir le nom du rapport à partir du titre
            const reportTitle = card.querySelector('h3').textContent;
            // Simuler le téléchargement du rapport
            showNotification(`Téléchargement du rapport "${reportTitle}" en cours...`, 'info');
            simulateReportDownload(reportTitle.replace(/\s+/g, '_'));
        }
    }

    // Gérer les boutons de visualisation dans les rapports
    if (e.target.closest('.btn.view') || e.target.closest('.report-card .view')) {
        const card = e.target.closest('.report-card');
        if (card) {
            // Obtenir le nom du rapport à partir du titre
            const reportTitle = card.querySelector('h3').textContent;
            showNotification(`Visualisation du rapport "${reportTitle}"...`, 'info');
            
            // Simuler l'ouverture du rapport dans un nouvel onglet
            setTimeout(() => {
                showNotification(`Le rapport "${reportTitle}" s'ouvre dans un nouvel onglet.`, 'success');
            }, 1000);
        }
    }
    
    // Gérer le bouton de réinitialisation des données
    if (e.target.closest('#resetAllDataBtn')) {
        if (confirm('Êtes-vous sûr de vouloir réinitialiser toutes les données ? Cette action est irréversible.')) {
            try {
                // Appeler la méthode de réinitialisation de la base de données
                if (typeof db !== 'undefined' && typeof db.resetAllData === 'function') {
                    db.resetAllData();
                    
                    // Mettre à jour les statistiques
                    updateStats();
                    
                    // Afficher un message de succès
                    showNotification('Toutes les données ont été réinitialisées avec succès!', 'success');
                } else {
                    showNotification('Erreur: Impossible de réinitialiser les données.', 'error');
                }
            } catch (error) {
                console.error('Erreur lors de la réinitialisation des données:', error);
                showNotification('Erreur lors de la réinitialisation des données.', 'error');
            }
        }
    }
});