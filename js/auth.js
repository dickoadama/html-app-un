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
    if (!currentUser && currentPage !== 'login.html' && currentPage !== 'profile.html') {
        window.location.href = 'login.html';
        return;
    }
    
    // Si l'utilisateur est connecté, mettre à jour l'affichage
    if (currentUser && (currentPage === 'index.html' || currentPage === 'profile.html')) {
        const user = JSON.parse(currentUser);
        updateUIWithUserInfo(user);
    }
}

// Gérer la connexion
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
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
    db.logout();
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