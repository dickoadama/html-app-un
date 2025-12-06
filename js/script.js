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
    
    // Initialiser les gestionnaires d'événements globaux
    setupGlobalEventHandlers();
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

// Initialiser les gestionnaires d'événements globaux
function setupGlobalEventHandlers() {
    // Gestionnaire d'événements pour les boutons d'édition
    document.addEventListener('click', function(e) {
        // Vérifier si le clic est sur un bouton d'édition
        if (e.target.closest('.btn-icon.edit') || e.target.closest('.btn.edit')) {
            const editButton = e.target.closest('.btn-icon.edit') || e.target.closest('.btn.edit');
            handleEditButtonClick(editButton);
        }
        
        // Vérifier si le clic est sur un bouton de suppression
        if (e.target.closest('.btn-icon.delete') || e.target.closest('.btn.delete')) {
            const deleteButton = e.target.closest('.btn-icon.delete') || e.target.closest('.btn.delete');
            handleDeleteButtonClick(deleteButton);
        }
    });
}

// Gérer le clic sur un bouton d'édition
function handleEditButtonClick(button) {
    // Identifier le type d'élément à éditer
    const parentRow = button.closest('tr');
    const parentCard = button.closest('.event-card, .report-card, .profile-card');
    
    if (parentRow) {
        // Édition dans un tableau
        const tableName = parentRow.closest('table').id || parentRow.closest('.members-table, .profiles-table, .contributions-table, .users-table')?.className;
        editTableRow(parentRow, tableName);
    } else if (parentCard) {
        // Édition dans une carte
        const cardType = parentCard.className;
        editCard(parentCard, cardType);
    } else {
        // Édition générique
        editGenericItem(button);
    }
}

// Gérer le clic sur un bouton de suppression
function handleDeleteButtonClick(button) {
    // Demander confirmation avant suppression
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.')) {
        return;
    }
    
    // Identifier le type d'élément à supprimer
    const parentRow = button.closest('tr');
    const parentCard = button.closest('.event-card, .report-card, .profile-card');
    
    if (parentRow) {
        // Suppression dans un tableau
        const tableName = parentRow.closest('table').id || parentRow.closest('.members-table, .profiles-table, .contributions-table, .users-table')?.className;
        deleteTableRow(parentRow, tableName);
    } else if (parentCard) {
        // Suppression dans une carte
        const cardType = parentCard.className;
        deleteCard(parentCard, cardType);
    } else {
        // Suppression générique
        deleteGenericItem(button);
    }
}

// Éditer une ligne de tableau
function editTableRow(row, tableName) {
    console.log('Édition de la ligne du tableau:', tableName);
    
    // Extraire les données de la ligne
    const rowData = extractRowData(row);
    
    // Identifier le type d'élément à éditer
    switch(tableName) {
        case 'members-table':
            openEditMemberModal(rowData);
            break;
        case 'profiles-table':
            openEditProfileModal(rowData);
            break;
        case 'contributions-table':
            openEditContributionModal(rowData);
            break;
        case 'users-table':
            openEditUserModal(rowData);
            break;
        default:
            showEditNotification('Édition de l\'élément', rowData);
    }
}

// Supprimer une ligne de tableau
function deleteTableRow(row, tableName) {
    console.log('Suppression de la ligne du tableau:', tableName);
    
    // Animation de suppression
    row.style.transition = 'opacity 0.3s ease';
    row.style.opacity = '0';
    
    setTimeout(() => {
        row.remove();
        showDeleteNotification('Élément supprimé avec succès');
    }, 300);
}

// Éditer une carte
function editCard(card, cardType) {
    console.log('Édition de la carte:', cardType);
    
    // Extraire les données de la carte
    const cardData = extractCardData(card);
    
    // Identifier le type de carte à éditer
    switch(cardType) {
        case 'event-card':
            openEditEventModal(cardData);
            break;
        case 'report-card':
            openEditReportModal(cardData);
            break;
        default:
            showEditNotification('Édition de la carte', cardData);
    }
}

// Supprimer une carte
function deleteCard(card, cardType) {
    console.log('Suppression de la carte:', cardType);
    
    // Animation de suppression
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        card.remove();
        showDeleteNotification('Élément supprimé avec succès');
    }, 300);
}

// Édition générique
function editGenericItem(button) {
    console.log('Édition générique');
    showEditNotification('Édition de l\'élément');
}

// Suppression générique
function deleteGenericItem(button) {
    console.log('Suppression générique');
    showDeleteNotification('Élément supprimé avec succès');
}

// Extraire les données d'une ligne de tableau
function extractRowData(row) {
    const cells = row.querySelectorAll('td');
    const data = {};
    
    cells.forEach((cell, index) => {
        // Ignorer la cellule d'actions
        if (index < cells.length - 1) {
            const header = row.closest('table').querySelectorAll('th')[index];
            if (header) {
                const key = header.textContent.trim().toLowerCase().replace(/\s+/g, '_');
                data[key] = cell.textContent.trim();
            }
        }
    });
    
    return data;
}

// Extraire les données d'une carte
function extractCardData(card) {
    const data = {};
    
    // Extraire le titre
    const titleElement = card.querySelector('h3');
    if (titleElement) {
        data.title = titleElement.textContent.trim();
    }
    
    // Extraire les autres informations
    const infoElements = card.querySelectorAll('[class*="event-"], [class*="report-"]');
    infoElements.forEach(element => {
        const className = Array.from(element.classList).find(cls => cls.includes('-'));
        if (className) {
            const key = className.replace(/^(event-|report-)/, '');
            data[key] = element.textContent.trim();
        }
    });
    
    return data;
}

// Ouvrir le modal d'édition d'un membre
function openEditMemberModal(memberData) {
    alert(`Édition du membre: ${memberData.nom || 'Non spécifié'}\nFonctionnalité à implémenter`);
}

// Ouvrir le modal d'édition d'un profil
function openEditProfileModal(profileData) {
    alert(`Édition du profil: ${profileData.nom || 'Non spécifié'}\nFonctionnalité à implémenter`);
}

// Ouvrir le modal d'édition d'une cotisation
function openEditContributionModal(contributionData) {
    alert(`Édition de la cotisation: ${contributionData.membre || 'Non spécifié'}\nFonctionnalité à implémenter`);
}

// Ouvrir le modal d'édition d'un utilisateur
function openEditUserModal(userData) {
    alert(`Édition de l'utilisateur: ${userData.nom_complet || 'Non spécifié'}\nFonctionnalité à implémenter`);
}

// Ouvrir le modal d'édition d'un événement
function openEditEventModal(eventData) {
    // Remplir le formulaire avec les données de l'événement
    document.getElementById('eventId').value = eventData.id || '';
    document.getElementById('eventTitle').value = eventData.title || '';
    document.getElementById('eventDate').value = eventData.date || '';
    document.getElementById('eventTime').value = eventData.time || '';
    document.getElementById('eventLocation').value = eventData.location || '';
    document.getElementById('eventDescription').value = eventData.description || '';
    document.getElementById('eventStatus').value = eventData.status || 'programmé';
    
    // Changer le titre du modal
    document.getElementById('eventModalTitle').textContent = 'Modifier un événement';
    
    // Afficher le modal
    document.getElementById('eventModal').style.display = 'block';
}

// Ouvrir le modal d'édition d'un rapport
function openEditReportModal(reportData) {
    alert(`Édition du rapport: ${reportData.title || 'Non spécifié'}\nFonctionnalité à implémenter`);
}

// Afficher une notification d'édition
function showEditNotification(title, data = null) {
    const message = data ? `${title}\n${JSON.stringify(data, null, 2)}` : title;
    alert(message);
}

// Afficher une notification de suppression
function showDeleteNotification(message) {
    // Créer un élément de notification
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    
    // Ajouter l'animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Ajouter la notification au document
    document.body.appendChild(notification);
    
    // Supprimer la notification après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
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
            openAddEventModal();
        });
    }
    
    // Recherche d'événements
    const searchEventsInput = document.getElementById('searchEvents');
    if (searchEventsInput) {
        searchEventsInput.addEventListener('input', function() {
            console.log('Recherche d\'événements:', this.value);
        });
    }
    
    // Gérer le formulaire d'événement
    const eventForm = document.getElementById('eventForm');
    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveEvent();
        });
    }
    
    // Bouton d'annulation
    const cancelEventBtn = document.getElementById('cancelEventBtn');
    if (cancelEventBtn) {
        cancelEventBtn.addEventListener('click', function() {
            closeEventModal();
        });
    }
    
    // Bouton de fermeture du modal
    const closeModalBtn = document.querySelector('#eventModal .close');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            closeEventModal();
        });
    }
    
    // Fermer le modal en cliquant en dehors
    const eventModal = document.getElementById('eventModal');
    if (eventModal) {
        eventModal.addEventListener('click', function(e) {
            if (e.target === eventModal) {
                closeEventModal();
            }
        });
    }
}

// Ouvrir le modal d'ajout d'événement
function openAddEventModal() {
    // Réinitialiser le formulaire
    document.getElementById('eventForm').reset();
    document.getElementById('eventId').value = '';
    
    // Changer le titre du modal
    document.getElementById('eventModalTitle').textContent = 'Ajouter un événement';
    
    // Afficher le modal
    document.getElementById('eventModal').style.display = 'block';
}

// Fermer le modal d'événement
function closeEventModal() {
    document.getElementById('eventModal').style.display = 'none';
}

// Sauvegarder un événement
function saveEvent() {
    // Récupérer les données du formulaire
    const eventId = document.getElementById('eventId').value;
    const eventTitle = document.getElementById('eventTitle').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    const eventLocation = document.getElementById('eventLocation').value;
    const eventDescription = document.getElementById('eventDescription').value;
    const eventStatus = document.getElementById('eventStatus').value;
    
    // Valider les données
    if (!eventTitle || !eventDate) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
    }
    
    // Créer l'objet événement
    const eventData = {
        id: eventId || Date.now(), // Utiliser timestamp si nouvel événement
        title: eventTitle,
        date: eventDate,
        time: eventTime,
        location: eventLocation,
        description: eventDescription,
        status: eventStatus
    };
    
    if (eventId) {
        // Modification d'un événement existant
        updateEvent(eventData);
    } else {
        // Ajout d'un nouvel événement
        addNewEvent(eventData);
    }
    
    // Fermer le modal
    closeEventModal();
    
    // Afficher un message de succès
    alert('Événement enregistré avec succès!');
}

// Ajouter un nouvel événement
function addNewEvent(eventData) {
    // Créer la carte de l'événement
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';
    
    // Formater la date pour l'affichage
    const formattedDate = formatDateForDisplay(eventData.date);
    
    eventCard.innerHTML = `
        <h3>${eventData.title}</h3>
        <div class="event-date"><i class="far fa-calendar-alt"></i> ${formattedDate}</div>
        ${eventData.location ? `<div class="event-location"><i class="fas fa-map-marker-alt"></i> ${eventData.location}</div>` : ''}
        ${eventData.description ? `<div class="event-description">${eventData.description}</div>` : ''}
        <div class="event-actions">
            <button class="btn btn-secondary edit"><i class="fas fa-edit"></i> Modifier</button>
            <button class="btn btn-danger delete"><i class="fas fa-trash"></i> Supprimer</button>
        </div>
    `;
    
    // Ajouter la carte au début du conteneur
    const eventsContainer = document.getElementById('eventsContainer');
    eventsContainer.insertBefore(eventCard, eventsContainer.firstChild);
    
    console.log('Nouvel événement ajouté:', eventData);
}

// Mettre à jour un événement existant
function updateEvent(eventData) {
    // Dans une vraie application, cela mettrait à jour l'événement dans la base de données
    console.log('Événement mis à jour:', eventData);
    alert('Événement mis à jour avec succès!');
}

// Formater la date pour l'affichage
function formatDateForDisplay(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
    
    // Gérer les onglets d'administration
    setupAdminTabs();
}

// Gérer les onglets d'administration
function setupAdminTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchToTab(tabName);
        });
    });
}

// Basculer vers un onglet d'administration
function switchToTab(tabName) {
    // Masquer tous les onglets
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Désactiver tous les boutons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Activer l'onglet sélectionné
    document.getElementById(`${tabName}-tab`).classList.add('active');
    document.querySelector(`.tab-button[data-tab="${tabName}"]`).classList.add('active');
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