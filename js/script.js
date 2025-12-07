// Script principal pour l'application UN

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser l'application
    initializeApp();
    
    // Gérer la navigation
    setupNavigation();
    
    // Gérer les formulaires
    setupForms();
    
    // Gérer les modals
    setupModals();
    
    // Gérer les onglets d'administration
    setupAdminTabs();
    
    // Gérer les événements de dropdown
    setupDropdowns();
    
    // Mettre à jour les statistiques
    updateStats();
});

// Initialiser l'application
function initializeApp() {
    // Vérifier si l'utilisateur est connecté
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    // Mettre à jour l'affichage avec les informations de l'utilisateur
    document.getElementById('userName').textContent = currentUser.fullName || currentUser.username;
    
    // Afficher un message spécial pour les administrateurs
    if (currentUser.role === 'administrateur' || currentUser.role === 'superadmin') {
        document.getElementById('adminMessage').style.display = 'block';
    }
    
    // Gérer la déconnexion
    document.getElementById('logoutBtn').addEventListener('click', function() {
        // Déconnecter l'utilisateur
        db.logout();
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
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
    
    // Navigation des dropdowns
    const dropdownLinks = document.querySelectorAll('.dropdown-menu a[data-page]');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            const subpage = this.getAttribute('data-subpage');
            showPage(page, subpage);
            
            // Mettre à jour la classe active
            navLinks.forEach(l => l.classList.remove('active'));
            document.querySelector(`.nav-link[data-page="${page}"]`).classList.add('active');
        });
    });
    
    // Redirection vers la page de profil lorsque l'utilisateur clique sur son nom
    document.getElementById('userInfo').addEventListener('click', function() {
        window.location.href = 'profile.html';
    });
}

// Afficher une page spécifique
function showPage(pageId, subpageId = null) {
    // Masquer toutes les pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Afficher la page demandée
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.add('active');
        
        // Si c'est la page d'administration, afficher l'onglet par défaut
        if (pageId === 'administration') {
            showTab('users');
        }
    }
    
    // Gérer les sous-pages si nécessaire
    if (subpageId) {
        // Logique spécifique pour les sous-pages
        console.log(`Affichage de la sous-page: ${subpageId}`);
    }
}

// Gérer les onglets d'administration
function setupAdminTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
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
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Afficher l'onglet demandé
    const tab = document.getElementById(`${tabId}-tab`);
    if (tab) {
        tab.classList.add('active');
    }
}

// Gérer les événements de dropdown
function setupDropdowns() {
    // La fonctionnalité des dropdowns a été supprimée
    // Cette fonction est conservée pour compatibilité
    console.log('Dropdown functionality removed');
}

// Gérer les formulaires
function setupForms() {
    // Formulaire de membre
    const memberForm = document.getElementById('memberForm');
    if (memberForm) {
        memberForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Logique de traitement du formulaire de membre
            alert('Formulaire de membre soumis avec succès!');
            closeModal('memberModal');
        });
    }
    
    // Formulaire d'événement
    const eventForm = document.getElementById('eventForm');
    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Logique de traitement du formulaire d'événement
            alert('Formulaire d\'événement soumis avec succès!');
            closeModal('eventModal');
        });
    }
    
    // Formulaire d'utilisateur
    const userForm = document.getElementById('userForm');
    if (userForm) {
        userForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Logique de traitement du formulaire d'utilisateur
            alert('Formulaire d\'utilisateur soumis avec succès!');
            closeModal('userModal');
        });
    }
    
    // Formulaire de profil
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Logique de traitement du formulaire de profil
            alert('Formulaire de profil soumis avec succès!');
            closeModal('profileModal');
        });
    }
    
    // Formulaire de paramètres
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Logique de traitement du formulaire de paramètres
            alert('Paramètres sauvegardés avec succès!');
        });
    }
    
    // Formulaire de rapport
    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Logique de traitement du formulaire de rapport
            const reportType = document.getElementById('reportType').value;
            const startDate = document.getElementById('startDate').value;
            const endDate = document.getElementById('endDate').value;
            
            // Générer un nom de rapport basé sur le type et les dates
            const reportName = `rapport_${reportType}_${startDate}_to_${endDate}`;
            
            alert('Rapport généré avec succès!');
            // Simuler le téléchargement du rapport
            simulateReportDownload(reportName);
            closeModal('reportModal');
        });
    }
    
    // Bouton de génération de mot de passe
    const generatePasswordBtn = document.getElementById('generatePassword');
    if (generatePasswordBtn) {
        generatePasswordBtn.addEventListener('click', function() {
            const passwordField = document.getElementById('password');
            if (passwordField) {
                passwordField.value = generateSecurePassword();
            }
        });
    }
}

// Générer un mot de passe sécurisé
function generateSecurePassword(length = 12) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

// Simuler le téléchargement d'un rapport
function simulateReportDownload(reportName = 'rapport') {
    // Créer un élément de lien temporaire
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,Rapport généré';
    link.download = `${reportName}.pdf`;
    link.click();
    
    // Afficher un message de confirmation
    alert(`Le rapport ${reportName} a été téléchargé avec succès!`);
}

// Gérer les modals
function setupModals() {
    // Boutons pour ouvrir les modals
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
    document.getElementById('cancelSettings')?.addEventListener('click', () => showTab('users'));
    document.getElementById('cancelReport')?.addEventListener('click', () => closeModal('reportModal'));
}

// Ouvrir un modal
function openModal(modalId, title = null) {
    const modal = document.getElementById(modalId);
    if (modal) {
        // Mettre à jour le titre si fourni
        if (title) {
            const titleElement = modal.querySelector('h3');
            if (titleElement) {
                titleElement.textContent = title;
            }
        }
        
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

// Fonctions utilitaires pour les tableaux
function setupTableActions() {
    // Gérer les boutons d'édition et de suppression dans les tableaux
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-icon.edit')) {
            const row = e.target.closest('tr');
            if (row) {
                // Logique d'édition
                console.log('Édition de la ligne:', row);
                alert('Fonction d\'édition à implémenter');
                // Vous pouvez ajouter ici la logique pour ouvrir un modal d'édition
                // avec les données de la ligne sélectionnée
            }
        }
        
        if (e.target.closest('.btn-icon.delete')) {
            const row = e.target.closest('tr');
            if (row && confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
                // Logique de suppression
                row.remove();
                alert('Élément supprimé avec succès');
            }
        }
        
        // Gérer les boutons de téléchargement dans les rapports
        if (e.target.closest('.btn.download') || e.target.closest('.btn.btn-secondary .fa-download')) {
            const card = e.target.closest('.report-card');
            if (card) {
                // Obtenir le nom du rapport à partir du titre
                const reportTitle = card.querySelector('h3').textContent;
                // Simuler le téléchargement du rapport
                simulateReportDownload(reportTitle.replace(/\s+/g, '_'));
            }
        }
        
        // Gérer les boutons de visualisation dans les rapports
        if (e.target.closest('.btn.view') || e.target.closest('.btn.btn-secondary .fa-eye')) {
            const card = e.target.closest('.report-card');
            if (card) {
                // Obtenir le nom du rapport à partir du titre
                const reportTitle = card.querySelector('h3').textContent;
                alert(`Visualisation du rapport: ${reportTitle}`);
                // Dans une implémentation réelle, vous ouvririez un modal avec le contenu du rapport
            }
        }
        
        // Gérer les boutons d'édition dans les événements
        if (e.target.closest('.btn.edit') || e.target.closest('.btn.btn-secondary .fa-edit')) {
            const card = e.target.closest('.event-card');
            if (card) {
                // Obtenir le nom de l'événement à partir du titre
                const eventName = card.querySelector('h3').textContent;
                alert(`Édition de l'événement: ${eventName}`);
                // Dans une implémentation réelle, vous ouvririez un modal d'édition
            }
        }
        
        // Gérer les boutons de suppression dans les événements
        if (e.target.closest('.btn.delete') || e.target.closest('.btn.btn-danger .fa-trash')) {
            const card = e.target.closest('.event-card');
            if (card) {
                // Obtenir le nom de l'événement à partir du titre
                const eventName = card.querySelector('h3').textContent;
                if (confirm(`Êtes-vous sûr de vouloir supprimer l'événement: ${eventName} ?`)) {
                    // Logique de suppression
                    card.remove();
                    alert(`Événement ${eventName} supprimé avec succès`);
                }
            }
        }
    });
}

// Initialiser les actions de tableau
setupTableActions();