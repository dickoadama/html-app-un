// Script pour gérer la connexion à l'application UN

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    // Vérifier si l'utilisateur est déjà connecté
    if (localStorage.getItem('currentUser')) {
        window.location.href = 'index.html';
        return;
    }
    
    // Gérer la soumission du formulaire de connexion
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        try {
            // Tenter d'authentifier l'utilisateur
            const user = db.authenticate(username, password);
            
            if (user) {
                // Stocker l'utilisateur dans le localStorage
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                // Rediriger vers la page principale
                window.location.href = 'index.html';
            } else {
                // Afficher un message d'erreur
                alert('Nom d\'utilisateur ou mot de passe incorrect.');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            alert('Une erreur s\'est produite lors de la connexion.');
        }
    });
});