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

// Gérer les cotisations avec incrémentation automatique
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
    
    // Mettre à jour les options du sélecteur de membre avec les informations de cotisation
    updateMemberSelectOptions();
}

// Mettre à jour les options du sélecteur de membre avec les informations de cotisation
function updateMemberSelectOptions() {
    const memberSelect = document.getElementById('memberSelect');
    if (memberSelect) {
        // Ajouter des informations supplémentaires dans les options
        const options = memberSelect.querySelectorAll('option');
        options.forEach(option => {
            if (option.value) {
                // Vous pouvez ajouter ici des informations supplémentaires
                // comme le nombre de cotisations précédentes
                option.setAttribute('data-member-id', option.value);
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
        
        // Afficher un message d'information si le membre a déjà des cotisations
        const memberSelect = document.getElementById('memberSelect');
        if (memberSelect) {
            memberSelect.addEventListener('change', function() {
                showMemberContributionInfo(this.value);
            });
        }
    }
    
    modal.style.display = 'block';
}

// Afficher les informations de cotisation pour un membre
function showMemberContributionInfo(memberId) {
    if (!memberId) return;
    
    // Simulation - dans une vraie application, ces données viendraient de la base de données
    const memberContributions = {
        '1': { count: 3, total: 16500 }, // Exemple: 3 cotisations, total 16.500 FCFA
        '2': { count: 2, total: 11000 }, // Exemple: 2 cotisations, total 11.000 FCFA
        '3': { count: 1, total: 5000 },  // Exemple: 1 cotisation, total 5.000 FCFA
        '4': { count: 0, total: 0 }      // Exemple: 0 cotisation
    };
    
    const contribInfo = memberContributions[memberId];
    if (contribInfo && contribInfo.count > 0) {
        const incrementInfo = document.getElementById('contributionIncrementInfo');
        if (incrementInfo) {
            incrementInfo.textContent = `Ce membre a déjà ${contribInfo.count} cotisation(s) pour un total de ${contribInfo.total} FCFA. Le montant sera automatiquement incrémenté.`;
        } else {
            // Créer un élément d'information s'il n'existe pas
            const infoElement = document.createElement('div');
            infoElement.id = 'contributionIncrementInfo';
            infoElement.className = 'info-message';
            infoElement.style.cssText = 'background-color: #e3f2fd; padding: 10px; border-radius: 4px; margin: 10px 0; font-size: 0.9rem;';
            infoElement.textContent = `Ce membre a déjà ${contribInfo.count} cotisation(s) pour un total de ${contribInfo.total} FCFA. Le montant sera automatiquement incrémenté.`;
            
            // Insérer l'élément après le sélecteur de membre
            const memberSelect = document.getElementById('memberSelect');
            if (memberSelect && memberSelect.parentNode) {
                memberSelect.parentNode.insertBefore(infoElement, memberSelect.nextSibling);
            }
        }
    } else {
        // Supprimer l'élément d'information s'il existe
        const incrementInfo = document.getElementById('contributionIncrementInfo');
        if (incrementInfo) {
            incrementInfo.remove();
        }
    }
}

// Fermer le modal de cotisation
function closeContributionModal() {
    const modal = document.getElementById('contributionModal');
    modal.style.display = 'none';
    
    // Supprimer l'élément d'information s'il existe
    const incrementInfo = document.getElementById('contributionIncrementInfo');
    if (incrementInfo) {
        incrementInfo.remove();
    }
}

// Sauvegarder une cotisation avec incrémentation automatique
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
    
    // Afficher un message de succès avec information sur l'incrémentation
    const existingContributions = getExistingContributionsForMember(contributionData.memberId);
    if (existingContributions.length > 0) {
        const incrementPercentage = existingContributions.length * 10;
        alert(`Cotisation enregistrée avec succès!\nMontant incrémenté de ${incrementPercentage}% car ce membre a déjà ${existingContributions.length} cotisation(s).`);
    } else {
        alert('Cotisation enregistrée avec succès!');
    }
}

// Obtenir les cotisations existantes pour un membre (simulation)
function getExistingContributionsForMember(memberId) {
    // Dans une vraie application, cela viendrait de la base de données
    // Pour la démonstration, nous simulons quelques données
    const simulatedContributions = {
        1: [{id: 1}, {id: 2}, {id: 3}], // Membre 1 a 3 cotisations
        2: [{id: 4}, {id: 5}],          // Membre 2 a 2 cotisations
        3: [{id: 6}]                    // Membre 3 a 1 cotisation
        // Membre 4 n'a pas de cotisations
    };
    
    return simulatedContributions[memberId] || [];
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