// Gestion de l'authentification pour l'application UN

document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si l'utilisateur est déjà connecté
    checkAuthentication();
    
    // Gérer la soumission du formulaire de connexion
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
});

// Vérifier si l'utilisateur est déjà connecté
function checkAuthentication() {
    const currentUser = localStorage.getItem('currentUser');
    const currentPage = window.location.pathname.split('/').pop();
    
    // Si l'utilisateur est connecté et qu'on est sur la page de connexion, rediriger vers l'index
    if (currentUser && currentPage === 'login.html') {
        window.location.href = 'index.html';
        return;
    }
    
    // Si l'utilisateur n'est pas connecté et qu'on n'est pas sur la page de connexion, rediriger vers la connexion
    if (!currentUser && currentPage !== 'login.html' && currentPage !== 'profile.html' && currentPage !== 'register.html') {
        // Vérifier si nous sommes dans un environnement de développement local
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '') {
            // En développement local, permettre l'accès sans authentification
            console.warn('Mode développement : accès sans authentification');
        } else {
            window.location.href = 'login.html';
            return;
        }
    }
    
    // Si l'utilisateur est connecté, mettre à jour l'affichage
    if (currentUser && (currentPage === 'index.html' || currentPage === 'profile.html')) {
        try {
            const user = JSON.parse(currentUser);
            updateUIWithUserInfo(user);
        } catch (e) {
            console.error('Erreur lors de la lecture des informations utilisateur:', e);
            // En cas d'erreur de parsing, déconnecter l'utilisateur
            localStorage.removeItem('currentUser');
            if (currentPage !== 'login.html') {
                window.location.href = 'login.html';
            }
        }
    }
    
    // Si on est sur la page de connexion, vérifier si l'utilisateur est un super admin pour afficher les credentials
    if (currentPage === 'login.html') {
        updateLoginHelpSection(currentUser);
    }
}

// Mettre à jour la section d'aide de connexion
function updateLoginHelpSection(currentUser) {
    const loginHelpSection = document.getElementById('loginHelpSection');
    const credentialsSection = document.getElementById('credentialsSection');
    const accessMessage = document.getElementById('accessMessage');
    
    if (loginHelpSection && credentialsSection && accessMessage) {
        if (currentUser) {
            try {
                const user = JSON.parse(currentUser);
                // Afficher les informations de connexion uniquement pour le super admin
                if (user.role === 'superadmin') {
                    credentialsSection.style.display = 'block';
                    accessMessage.innerHTML = '<strong>Accès Super Administrateur:</strong> Vous avez accès aux informations de connexion de tous les comptes.';
                } else {
                    credentialsSection.style.display = 'none';
                    accessMessage.innerHTML = 'Les informations de connexion sont uniquement visibles par le Super Administrateur.';
                }
            } catch (e) {
                console.error('Erreur lors de la lecture des informations utilisateur:', e);
                credentialsSection.style.display = 'none';
                accessMessage.innerHTML = 'Les informations de connexion sont uniquement visibles par le Super Administrateur.';
            }
        } else {
            credentialsSection.style.display = 'none';
            accessMessage.innerHTML = 'Les informations de connexion sont uniquement visibles par le Super Administrateur.';
        }
    }
}

// Gérer la connexion
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        // S'assurer que la base de données est instanciée
        if (typeof db === 'undefined') {
            showError('Erreur de chargement de la base de données. Veuillez réessayer.');
            return;
        }
        
        // Authentifier l'utilisateur
        const user = db.authenticate(username, password);
        
        if (user) {
            // Connexion réussie
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'index.html';
        } else {
            // Échec de la connexion
            showError('Nom d\'utilisateur ou mot de passe incorrect.');
        }
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        showError('Une erreur s\'est produite lors de la connexion. Veuillez réessayer.');
    }
}

// Mettre à jour l'interface avec les informations de l'utilisateur
function updateUIWithUserInfo(user) {
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = user.fullName || user.username;
    }
    
    // Afficher un message spécial pour les administrateurs
    const adminMessage = document.getElementById('adminMessage');
    if (adminMessage && (user.role === 'administrateur' || user.role === 'superadmin')) {
        adminMessage.style.display = 'block';
    }
}

// Afficher une erreur
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        // Masquer l'erreur après 5 secondes
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }
}

// Gérer la déconnexion
function handleLogout() {
    // Déconnecter l'utilisateur
    if (typeof db !== 'undefined') {
        db.logout();
    }
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Attacher l'événement de déconnexion
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});