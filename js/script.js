// Script principal pour l'application UN
// Gère la navigation, les interactions utilisateur et l'initialisation de l'application

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser l'application
    initializeApp();
    
    // Gérer la navigation
    setupNavigation();
    
    // Gérer les membres
    setupMembers();
    
    // Gérer les événements
    setupEvents();
    
    // Gérer les rapports
    setupReports();
    
    // Gérer l'administration
    setupAdministration();
    
    // Gérer les cotisations
    setupContributions();
    
    // Gérer la déconnexion
    setupLogout();
});

// Initialiser l'application
function initializeApp() {
    // Vérifier si l'utilisateur est connecté
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        // Rediriger vers la page de connexion si aucun utilisateur n'est connecté
        window.location.href = 'login.html';
        return;
    }
    
    // Afficher le nom de l'utilisateur
    document.getElementById('userName').textContent = currentUser.fullName;
    
    // Mettre à jour les statistiques du tableau de bord
    updateDashboardStats();
}

// Mettre à jour les statistiques du tableau de bord
function updateDashboardStats() {
    // Ces valeurs seraient normalement récupérées depuis la base de données
    document.getElementById('totalMembers').textContent = '128';
    document.getElementById('activeMembers').textContent = '115';
    document.getElementById('totalEvents').textContent = '24';
    document.getElementById('upcomingEvents').textContent = '8';
    document.getElementById('totalFinances').textContent = '5.240 FCFA';
    document.getElementById('totalUsers').textContent = '5';
}

// Gérer la navigation entre les différentes sections
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Retirer la classe active de tous les liens
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            // Ajouter la classe active au lien cliqué
            this.classList.add('active');
            
            // Masquer toutes les pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Afficher la page correspondante
            const pageId = this.getAttribute('data-page');
            document.getElementById(pageId).classList.add('active');
        });
    });
}

// Gérer les membres
function setupMembers() {
    // Bouton pour ajouter un membre
    const addMemberBtn = document.getElementById('addMemberBtn');
    if (addMemberBtn) {
        addMemberBtn.addEventListener('click', function() {
            alert('Fonctionnalité d\'ajout de membre - À implémenter');
        });
    }
    
    // Recherche de membres
    const searchMembersInput = document.getElementById('searchMembers');
    if (searchMembersInput) {
        searchMembersInput.addEventListener('input', function() {
            console.log('Recherche de membres:', this.value);
        });
    }
}

// Gérer les événements
function setupEvents() {
    // Bouton pour ajouter un événement
    const addEventBtn = document.getElementById('addEventBtn');
    if (addEventBtn) {
        addEventBtn.addEventListener('click', function() {
            alert('Fonctionnalité d\'ajout d\'événement - À implémenter');
        });
    }
    
    // Recherche d'événements
    const searchEventsInput = document.getElementById('searchEvents');
    if (searchEventsInput) {
        searchEventsInput.addEventListener('input', function() {
            console.log('Recherche d\'événements:', this.value);
        });
    }
}

// Gérer les rapports
function setupReports() {
    // Exemple de gestion des rapports
    console.log('Gestion des rapports initialisée');
}

// Gérer l'administration
function setupAdministration() {
    // Exemple de gestion de l'administration
    console.log('Gestion de l\'administration initialisée');
}

// Gérer les cotisations
function setupContributions() {
    // Bouton pour ajouter une cotisation
    const addContributionBtn = document.getElementById('addContributionBtn');
    if (addContributionBtn) {
        addContributionBtn.addEventListener('click', function() {
            openContributionModal();
        });
    }
    
    // Recherche de cotisations
    const searchContributionsInput = document.getElementById('searchContributions');
    if (searchContributionsInput) {
        searchContributionsInput.addEventListener('input', function() {
            console.log('Recherche de cotisations:', this.value);
        });
    }
    
    // Gérer le formulaire de cotisation
    const contributionForm = document.getElementById('contributionForm');
    if (contributionForm) {
        contributionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveContribution();
        });
    }
    
    // Bouton d'annulation
    const cancelContributionBtn = document.getElementById('cancelContributionBtn');
    if (cancelContributionBtn) {
        cancelContributionBtn.addEventListener('click', function() {
            closeContributionModal();
        });
    }
    
    // Bouton de fermeture du modal
    const closeModalBtn = document.querySelector('#contributionModal .close');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            closeContributionModal();
        });
    }
    
    // Fermer le modal en cliquant en dehors
    const contributionModal = document.getElementById('contributionModal');
    if (contributionModal) {
        contributionModal.addEventListener('click', function(e) {
            if (e.target === contributionModal) {
                closeContributionModal();
            }
        });
    }
}

// Ouvrir le modal de cotisation
function openContributionModal(contributionId = null) {
    const modal = document.getElementById('contributionModal');
    const modalTitle = document.getElementById('modalTitle');
    
    if (contributionId) {
        // Mode édition
        modalTitle.textContent = 'Modifier une cotisation';
        // Pré-remplir le formulaire avec les données de la cotisation
        // À implémenter
    } else {
        // Mode création
        modalTitle.textContent = 'Ajouter une cotisation';
        // Réinitialiser le formulaire
        document.getElementById('contributionForm').reset();
    }
    
    modal.style.display = 'block';
}

// Fermer le modal de cotisation
function closeContributionModal() {
    const modal = document.getElementById('contributionModal');
    modal.style.display = 'none';
}

// Sauvegarder une cotisation
function saveContribution() {
    // Récupérer les données du formulaire
    const memberSelect = document.getElementById('memberSelect');
    const contributionAmount = document.getElementById('contributionAmount');
    const contributionDate = document.getElementById('contributionDate');
    const contributionType = document.getElementById('contributionType');
    const contributionDescription = document.getElementById('contributionDescription');
    const contributionStatus = document.getElementById('contributionStatus');
    
    // Valider les données
    if (!memberSelect.value || !contributionAmount.value || !contributionDate.value || 
        !contributionType.value || !contributionStatus.value) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
    }
    
    // Créer l'objet cotisation
    const contributionData = {
        memberId: parseInt(memberSelect.value),
        memberName: memberSelect.options[memberSelect.selectedIndex].text,
        amount: parseFloat(contributionAmount.value),
        currency: "FCFA",
        date: contributionDate.value,
        type: contributionType.value,
        description: contributionDescription.value,
        status: contributionStatus.value
    };
    
    // Sauvegarder la cotisation (simulation)
    console.log('Cotisation sauvegardée:', contributionData);
    
    // Fermer le modal
    closeContributionModal();
    
    // Afficher un message de succès
    alert('Cotisation enregistrée avec succès!');
}

// Gérer la déconnexion
function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Supprimer l'utilisateur courant du localStorage
            localStorage.removeItem('currentUser');
            
            // Rediriger vers la page de connexion
            window.location.href = 'login.html';
        });
    }
}