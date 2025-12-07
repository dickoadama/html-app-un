class Database {
    constructor() {
        this.initData();
    }
    
    initData() {
        // Charger les données depuis localStorage ou initialiser avec les données par défaut
        const savedData = localStorage.getItem('appData');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.users = data.users || [];
            this.members = data.members || [];
            this.contributions = data.contributions || [];
            this.events = data.events || [];
            this.profiles = data.profiles || [];
            this.finances = data.finances || [];
            this.nextIds = data.nextIds || {
                user: 6,
                member: 6,
                finance: 6,
                event: 6,
                profile: 3,
                contribution: 1
            };
        } else {
            // Données par défaut
            this.users = [
                {
                    id: 1,
                    username: "superadmin",
                    password: "superadmin123",
                    role: "superadmin",
                    fullName: "Super Administrateur",
                    email: "superadmin@un-association.fcfa",
                    phone: "+225 07 672 942 55",
                    dateInscription: "2024-01-01",
                    lastLogin: "2024-12-05",
                    status: "actif",
                    permissions: {
                        canExport: true,
                        canDelete: true,
                        canModifySettings: true
                    }
                },
                {
                    id: 2,
                    username: "admin",
                    password: "admin123",
                    role: "administrateur",
                    fullName: "Administrateur Principal",
                    email: "admin@un-association.fcfa",
                    phone: "+225 07 672 942 56",
                    dateInscription: "2024-01-01",
                    lastLogin: "2024-12-05",
                    status: "actif",
                    permissions: {
                        canExport: true,
                        canDelete: false,
                        canModifySettings: false
                    }
                },
                {
                    id: 3,
                    username: "tresorier",
                    password: "tresorier123",
                    role: "trésorier",
                    fullName: "Trésorier Principal",
                    email: "tresorier@un-association.fcfa",
                    phone: "+225 07 672 942 57",
                    dateInscription: "2024-01-01",
                    lastLogin: "2024-12-04",
                    status: "actif",
                    permissions: {
                        canExport: false,
                        canDelete: false,
                        canModifySettings: false
                    }
                },
                {
                    id: 4,
                    username: "secretaire",
                    password: "secretaire123",
                    role: "secrétaire",
                    fullName: "Secrétaire Principal",
                    email: "secretaire@un-association.fcfa",
                    phone: "+225 07 672 942 58",
                    dateInscription: "2024-01-01",
                    lastLogin: "2024-12-03",
                    status: "actif",
                    permissions: {
                        canExport: false,
                        canDelete: false,
                        canModifySettings: false
                    }
                },
                {
                    id: 5,
                    username: "pierre.dubois",
                    password: "pierre123",
                    role: "membre",
                    fullName: "Pierre Dubois",
                    email: "pierre.dubois@un-association.fcfa",
                    phone: "+225 07 672 942 59",
                    dateInscription: "2024-01-15",
                    lastLogin: "2024-12-02",
                    status: "actif",
                    permissions: {
                        canExport: false,
                        canDelete: false,
                        canModifySettings: false
                    }
                }
            ];
            
            this.members = [
                {
                    id: 1,
                    userId: 1,
                    fullName: "Super Administrateur",
                    email: "superadmin@un-association.fcfa",
                    role: "Président",
                    joinDate: "2024-01-01",
                    status: "actif",
                    associatedUser: "superadmin"
                },
                {
                    id: 2,
                    userId: 2,
                    fullName: "Administrateur Principal",
                    email: "admin@un-association.fcfa",
                    role: "Vice-président",
                    joinDate: "2024-01-01",
                    status: "actif",
                    associatedUser: "admin"
                },
                {
                    id: 3,
                    userId: 3,
                    fullName: "Trésorier Principal",
                    email: "tresorier@un-association.fcfa",
                    role: "Trésorier",
                    joinDate: "2024-01-01",
                    status: "actif",
                    associatedUser: "tresorier"
                },
                {
                    id: 4,
                    userId: 4,
                    fullName: "Secrétaire Principal",
                    email: "secretaire@un-association.fcfa",
                    role: "Secrétaire",
                    joinDate: "2024-01-01",
                    status: "actif",
                    associatedUser: "secretaire"
                },
                {
                    id: 5,
                    userId: 5,
                    fullName: "Pierre Dubois",
                    email: "pierre.dubois@un-association.fcfa",
                    role: "Membre",
                    joinDate: "2024-01-15",
                    status: "actif",
                    associatedUser: "pierre.dubois"
                }
            ];
            
            this.contributions = [
                {
                    id: 1,
                    memberId: 5,
                    date: "2024-11-01",
                    amount: 5000,
                    type: "Mensuelle",
                    status: "payée"
                },
                {
                    id: 2,
                    memberId: 3,
                    date: "2024-11-05",
                    amount: 5000,
                    type: "Mensuelle",
                    status: "payée"
                },
                {
                    id: 3,
                    memberId: 2,
                    date: "2024-11-10",
                    amount: 15000,
                    type: "Trimestrielle",
                    status: "payée"
                },
                {
                    id: 4,
                    memberId: 1,
                    date: "2024-11-15",
                    amount: 20000,
                    type: "Annuelle",
                    status: "payée"
                },
                {
                    id: 5,
                    memberId: 4,
                    date: "2024-11-20",
                    amount: 5000,
                    type: "Mensuelle",
                    status: "payée"
                }
            ];
            
            this.events = [
                {
                    id: 1,
                    title: "Assemblée Générale Annuelle",
                    date: "2024-12-15",
                    time: "10:00",
                    location: "Salle des fêtes municipales",
                    description: "Assemblée générale annuelle de l'association pour discuter des activités de l'année écoulée et des projets à venir.",
                    status: "programmé"
                },
                {
                    id: 2,
                    title: "Formation sur les subventions",
                    date: "2024-12-20",
                    time: "14:00",
                    location: "Centre de formation UN",
                    description: "Session de formation sur les démarches pour obtenir des subventions publiques.",
                    status: "programmé"
                },
                {
                    id: 3,
                    title: "Nettoyage de quartier",
                    date: "2024-11-10",
                    time: "09:00",
                    location: "Quartier du centre-ville",
                    description: "Action de nettoyage participative dans le quartier central.",
                    status: "terminé"
                },
                {
                    id: 4,
                    title: "Collecte de fonds",
                    date: "2024-10-05",
                    time: "08:00",
                    location: "Place principale",
                    description: "Collecte de fonds pour financer les projets d'hiver.",
                    status: "terminé"
                },
                {
                    id: 5,
                    title: "Réunion du conseil d'administration",
                    date: "2024-11-25",
                    time: "16:00",
                    location: "Siège de l'association",
                    description: "Réunion mensuelle du conseil d'administration pour valider les décisions opérationnelles.",
                    status: "en cours"
                }
            ];
            
            this.profiles = [
                {
                    id: 1,
                    userId: 1,
                    name: "Super Administrateur",
                    email: "superadmin@un-association.fcfa",
                    phone: "+225 07 672 942 55",
                    address: "123 Avenue des Institutions, Abidjan",
                    bio: "Responsable de la supervision globale de l'association et gestionnaire des droits d'accès."
                },
                {
                    id: 2,
                    userId: 2,
                    name: "Administrateur Principal",
                    email: "admin@un-association.fcfa",
                    phone: "+225 07 672 942 56",
                    address: "456 Boulevard de la Gestion, Abidjan",
                    bio: "Administrateur principal en charge de la coordination des activités quotidiennes."
                }
            ];
            
            this.finances = [
                {
                    id: 1,
                    date: "2024-11-01",
                    description: "Cotisations membres",
                    amount: 25000,
                    type: "recette"
                },
                {
                    id: 2,
                    date: "2024-11-05",
                    description: "Subvention municipale",
                    amount: 100000,
                    type: "recette"
                },
                {
                    id: 3,
                    date: "2024-11-10",
                    description: "Location salle conférence",
                    amount: -15000,
                    type: "dépense"
                },
                {
                    id: 4,
                    date: "2024-11-15",
                    description: "Matériel de bureau",
                    amount: -25000,
                    type: "dépense"
                },
                {
                    id: 5,
                    date: "2024-11-20",
                    description: "Frais de déplacement",
                    amount: -8000,
                    type: "dépense"
                }
            ];
            
            this.nextIds = {
                user: 6,
                member: 6,
                finance: 6,
                event: 6,
                profile: 3,
                contribution: 1
            };
            
            this.saveData();
        }
        
        // Définir l'utilisateur courant (à partir de localStorage)
        const currentUserData = localStorage.getItem('currentUser');
        this.currentUser = currentUserData ? JSON.parse(currentUserData) : null;
        
        // Définir les permissions par rôle
        this.permissions = {
            'superadmin': {
                'users': ['read', 'create', 'write', 'delete'],
                'members': ['read', 'create', 'write', 'delete'],
                'contributions': ['read', 'create', 'write', 'delete'],
                'events': ['read', 'create', 'write', 'delete'],
                'profiles': ['read', 'create', 'write', 'delete'],
                'finances': ['read', 'create', 'write', 'delete'],
                'reports': ['read', 'create', 'write', 'delete'],
                'settings': ['read', 'create', 'write', 'delete']
            },
            'administrateur': {
                'users': ['read', 'create', 'write', 'delete'], // Peut gérer les utilisateurs de niveau inférieur
                'members': ['read', 'create', 'write', 'delete'],
                'contributions': ['read', 'create', 'write', 'delete'],
                'events': ['read', 'create', 'write', 'delete'],
                'profiles': ['read', 'create', 'write', 'delete'],
                'finances': ['read', 'create', 'write', 'delete'],
                'reports': ['read', 'create', 'write']
            },
            'trésorier': {
                'users': ['read'],
                'members': ['read'],
                'contributions': ['read', 'create', 'write'],
                'events': ['read'],
                'profiles': ['read'],
                'finances': ['read', 'create', 'write'],
                'reports': ['read']
            },
            'secrétaire': {
                'users': ['read'],
                'members': ['read', 'create', 'write'],
                'contributions': ['read'],
                'events': ['read', 'create', 'write'],
                'profiles': ['read', 'create', 'write'],
                'finances': ['read'],
                'reports': ['read']
            },
            'membre': {
                'users': ['read'],
                'members': ['read'],
                'contributions': ['read'],
                'events': ['read'],
                'profiles': ['read'],
                'finances': ['read'],
                'reports': ['read']
            }
        };
    }
    
    // Sauvegarder les données dans localStorage
    saveData() {
        const data = {
            users: this.users,
            members: this.members,
            contributions: this.contributions,
            events: this.events,
            profiles: this.profiles,
            finances: this.finances,
            nextIds: this.nextIds
        };
        localStorage.setItem('appData', JSON.stringify(data));
    }
    
    // Authentification de l'utilisateur
    authenticate(username, password) {
        const user = this.users.find(u => u.username === username && u.password === password);
        if (user) {
            // Mettre à jour la date de dernière connexion
            user.lastLogin = new Date().toISOString().split('T')[0];
            this.saveData();
            
            // Stocker l'utilisateur courant
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            return user;
        }
        return null;
    }
    
    // Déconnexion de l'utilisateur
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }
    
    // Vérifier si l'utilisateur est authentifié
    isAuthenticated() {
        return this.currentUser !== null;
    }
    
    // Obtenir les détails complets de l'utilisateur courant
    getCurrentUserDetails() {
        if (!this.isAuthenticated()) {
            return null;
        }
        
        // Retourner l'utilisateur courant avec tous ses détails
        return this.currentUser;
    }    
    // Obtenir le rôle de l'utilisateur actuel
    getCurrentUserRole() {
        return this.currentUser ? this.currentUser.role : null;
    }
    
    // Vérifier si l'utilisateur a une permission spécifique
    hasPermission(resource, action) {
        if (!this.isAuthenticated()) return false;
        
        const role = this.getCurrentUserRole();
        const rolePermissions = this.permissions[role];
        
        if (!rolePermissions) return false;
        
        const resourcePermissions = rolePermissions[resource];
        return resourcePermissions && resourcePermissions.includes(action);
    }
    
    // Vérifier si l'utilisateur peut gérer d'autres utilisateurs
    canManageUsers(targetUserRole) {
        if (!this.isAuthenticated()) return false;
        
        const currentRole = this.getCurrentUserRole();
        
        // Le super admin peut gérer tout le monde
        if (currentRole === 'superadmin') return true;
        
        // Les admins peuvent gérer les utilisateurs de niveau inférieur
        if (currentRole === 'administrateur') {
            return ['trésorier', 'secrétaire', 'membre'].includes(targetUserRole);
        }
        
        // Les autres rôles ne peuvent pas gérer d'utilisateurs
        return false;
    }
    
    // Vérifier si l'utilisateur peut créer des administrateurs
    canCreateAdmins() {
        // Seul le super admin peut créer des administrateurs
        return this.getCurrentUserRole() === 'superadmin';
    }
    
    // Méthode pour générer un mot de passe aléatoire sécurisé
    generateRandomPassword(length = 12) {
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
        
        // S'assurer qu'au moins un caractère de chaque type est inclus
        let password = "";
        password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
        password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
        password += numbers.charAt(Math.floor(Math.random() * numbers.length));
        password += symbols.charAt(Math.floor(Math.random() * symbols.length));
        
        // Compléter le reste du mot de passe
        const allChars = lowercase + uppercase + numbers + symbols;
        for (let i = 4; i < length; i++) {
            password += allChars.charAt(Math.floor(Math.random() * allChars.length));
        }
        
        // Mélanger les caractères
        return password.split('').sort(() => Math.random() - 0.5).join('');
    }
    
    // Méthodes CRUD pour les utilisateurs
    getUsers() {
        if (this.hasPermission('users', 'read')) {
            return this.users.map(user => {
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            });
        }
        throw new Error("Permission denied: Cannot read users");
    }
    
    addUser(userData, skipPermissionCheck = false) {
        // Si on saute la vérification des permissions (pour l'inscription publique), on continue directement
        if (!skipPermissionCheck) {
            if (this.hasPermission('users', 'create')) {
                // Vérifier si le nom d'utilisateur existe déjà
                if (this.users.some(u => u.username === userData.username)) {
                    throw new Error("Ce nom d'utilisateur existe déjà.");
                }
                
                // Vérifier les permissions pour créer des administrateurs
                if (userData.role === 'administrateur' && !this.canCreateAdmins()) {
                    throw new Error("Seul le super admin peut créer des administrateurs.");
                }
                
                // Vérifier les permissions pour créer des utilisateurs de niveau inférieur
                if (['trésorier', 'secrétaire', 'membre'].includes(userData.role) && !this.canManageUsers(userData.role)) {
                    throw new Error("Vous n'avez pas la permission de créer cet utilisateur.");
                }
            } else {
                throw new Error("Permission denied: Cannot create users");
            }
        } else {
            // Pour l'inscription publique, vérifier seulement si le nom d'utilisateur existe déjà
            if (this.users.some(u => u.username === userData.username)) {
                throw new Error("Ce nom d'utilisateur existe déjà.");
            }
            
            // Pour l'inscription publique, forcer le rôle à 'membre' pour des raisons de sécurité
            userData.role = 'membre';
        }
        
        const newUser = {
            id: this.nextIds.user++,
            ...userData
        };
        this.users.push(newUser);
        this.saveData(); // Sauvegarder les changements
        return newUser;
    }
    
    updateUser(userId, userData) {
        if (this.hasPermission('users', 'write')) {
            const userIndex = this.users.findIndex(u => u.id === userId);
            if (userIndex !== -1) {
                const targetUser = this.users[userIndex];
                
                // Vérifier les permissions hiérarchiques
                if (!this.canManageUsers(targetUser.role)) {
                    throw new Error("Vous n'avez pas la permission de modifier cet utilisateur.");
                }
                
                // Vérifier si le nom d'utilisateur existe déjà (sauf pour l'utilisateur actuel)
                if (userData.username && this.users.some(u => u.username === userData.username && u.id !== userId)) {
                    throw new Error("Ce nom d'utilisateur existe déjà.");
                }
                
                // Empêcher un administrateur de se promouvoir en super admin
                if (userData.role === 'superadmin' && this.getCurrentUserRole() !== 'superadmin') {
                    throw new Error("Seul le super admin peut attribuer le rôle de super admin.");
                }
                
                // Empêcher un utilisateur de niveau inférieur de créer un administrateur
                if (userData.role === 'administrateur' && !this.canCreateAdmins()) {
                    throw new Error("Seul le super admin peut créer des administrateurs.");
                }
                
                // Mettre à jour uniquement les champs fournis
                Object.keys(userData).forEach(key => {
                    if (key !== 'id') { // Ne pas modifier l'ID
                        this.users[userIndex][key] = userData[key];
                    }
                });
                
                this.saveData(); // Sauvegarder les changements
                
                const updatedUser = { ...this.users[userIndex] };
                delete updatedUser.password; // Ne pas retourner le mot de passe
                return updatedUser;
            }
            throw new Error("User not found");
        }
        throw new Error("Permission denied: Cannot update users");
    }
    
    deleteUser(userId) {
        if (this.hasPermission('users', 'delete')) {
            const userIndex = this.users.findIndex(u => u.id === userId);
            if (userIndex !== -1) {
                const targetUser = this.users[userIndex];
                
                // Vérifier les permissions hiérarchiques
                if (!this.canManageUsers(targetUser.role)) {
                    throw new Error("Vous n'avez pas la permission de supprimer cet utilisateur.");
                }
                
                // Empêcher la suppression du super admin par d'autres que lui-même
                if (targetUser.role === 'superadmin' && this.getCurrentUserRole() !== 'superadmin') {
                    throw new Error("Seul le super admin peut se supprimer lui-même.");
                }
                
                this.users.splice(userIndex, 1);
                this.saveData(); // Sauvegarder les changements
                return true;
            }
            throw new Error("User not found");
        }
        throw new Error("Permission denied: Cannot delete users");
    }
    
    // Méthodes CRUD pour les membres
    getMembers() {
        if (this.hasPermission('members', 'read')) {
            // Joindre les informations des utilisateurs avec celles des membres
            return this.members.map(member => {
                const user = this.users.find(u => u.id === member.userId);
                return {
                    ...member,
                    username: user ? user.username : 'Inconnu',
                    userRole: user ? user.role : 'Inconnu'
                };
            });
        }
        throw new Error("Permission denied: Cannot read members");
    }
    
    addMember(memberData) {
        if (this.hasPermission('members', 'create')) {
            // Créer un utilisateur associé si nécessaire
            let userId = memberData.userId;
            
            // Si aucun userId n'est fourni, créer un utilisateur
            if (!userId) {
                const userData = {
                    username: memberData.username || memberData.email.split('@')[0],
                    password: this.generateRandomPassword(),
                    role: memberData.userRole || "membre",
                    fullName: memberData.fullName,
                    email: memberData.email,
                    phone: memberData.phone || "",
                    dateInscription: new Date().toISOString().split('T')[0],
                    lastLogin: "Jamais",
                    status: "actif",
                    permissions: {
                        canExport: false,
                        canDelete: false,
                        canModifySettings: false
                    }
                };
                
                const newUser = this.addUser(userData);
                userId = newUser.id;
                
                // Envoyer le mot de passe à l'utilisateur (dans une vraie application)
                console.log(`Nouvel utilisateur créé : ${userData.username}, mot de passe : ${userData.password}`);
            }
            
            const newMember = {
                id: this.nextIds.member++,
                userId: userId,
                ...memberData
            };
            
            this.members.push(newMember);
            this.saveData(); // Sauvegarder les changements
            return newMember;
        }
        throw new Error("Permission denied: Cannot create members");
    }
    
    updateMember(memberId, memberData) {
        if (this.hasPermission('members', 'write')) {
            const memberIndex = this.members.findIndex(m => m.id === memberId);
            if (memberIndex !== -1) {
                // Mettre à jour uniquement les champs fournis
                Object.keys(memberData).forEach(key => {
                    if (key !== 'id') { // Ne pas modifier l'ID
                        this.members[memberIndex][key] = memberData[key];
                    }
                });
                
                this.saveData(); // Sauvegarder les changements
                return this.members[memberIndex];
            }
            throw new Error("Member not found");
        }
        throw new Error("Permission denied: Cannot update members");
    }
    
    deleteMember(memberId) {
        if (this.hasPermission('members', 'delete')) {
            const memberIndex = this.members.findIndex(m => m.id === memberId);
            if (memberIndex !== -1) {
                this.members.splice(memberIndex, 1);
                this.saveData(); // Sauvegarder les changements
                return true;
            }
            throw new Error("Member not found");
        }
        throw new Error("Permission denied: Cannot delete members");
    }
    
    // Méthodes CRUD pour les cotisations
    getContributions() {
        if (this.hasPermission('contributions', 'read')) {
            // Joindre les informations des membres avec celles des cotisations
            return this.contributions.map(contribution => {
                const member = this.members.find(m => m.id === contribution.memberId);
                return {
                    ...contribution,
                    memberName: member ? member.fullName : 'Inconnu'
                };
            });
        }
        throw new Error("Permission denied: Cannot read contributions");
    }
    
    addContribution(contributionData) {
        if (this.hasPermission('contributions', 'create')) {
            const newContribution = {
                id: this.nextIds.contribution++,
                ...contributionData
            };
            
            this.contributions.push(newContribution);
            this.saveData(); // Sauvegarder les changements
            return newContribution;
        }
        throw new Error("Permission denied: Cannot create contributions");
    }
    
    updateContribution(contributionId, contributionData) {
        if (this.hasPermission('contributions', 'write')) {
            const contributionIndex = this.contributions.findIndex(c => c.id === contributionId);
            if (contributionIndex !== -1) {
                // Mettre à jour uniquement les champs fournis
                Object.keys(contributionData).forEach(key => {
                    if (key !== 'id') { // Ne pas modifier l'ID
                        this.contributions[contributionIndex][key] = contributionData[key];
                    }
                });
                
                this.saveData(); // Sauvegarder les changements
                return this.contributions[contributionIndex];
            }
            throw new Error("Contribution not found");
        }
        throw new Error("Permission denied: Cannot update contributions");
    }
    
    deleteContribution(contributionId) {
        if (this.hasPermission('contributions', 'delete')) {
            const contributionIndex = this.contributions.findIndex(c => c.id === contributionId);
            if (contributionIndex !== -1) {
                this.contributions.splice(contributionIndex, 1);
                this.saveData(); // Sauvegarder les changements
                return true;
            }
            throw new Error("Contribution not found");
        }
        throw new Error("Permission denied: Cannot delete contributions");
    }
    
    // Méthodes CRUD pour les événements
    getEvents() {
        if (this.hasPermission('events', 'read')) {
            return this.events;
        }
        throw new Error("Permission denied: Cannot read events");
    }
    
    addEvent(eventData) {
        if (this.hasPermission('events', 'create')) {
            const newEvent = {
                id: this.nextIds.event++,
                ...eventData
            };
            
            this.events.push(newEvent);
            this.saveData(); // Sauvegarder les changements
            return newEvent;
        }
        throw new Error("Permission denied: Cannot create events");
    }
    
    updateEvent(eventId, eventData) {
        if (this.hasPermission('events', 'write')) {
            const eventIndex = this.events.findIndex(e => e.id === eventId);
            if (eventIndex !== -1) {
                // Mettre à jour uniquement les champs fournis
                Object.keys(eventData).forEach(key => {
                    if (key !== 'id') { // Ne pas modifier l'ID
                        this.events[eventIndex][key] = eventData[key];
                    }
                });
                
                this.saveData(); // Sauvegarder les changements
                return this.events[eventIndex];
            }
            throw new Error("Event not found");
        }
        throw new Error("Permission denied: Cannot update events");
    }
    
    deleteEvent(eventId) {
        if (this.hasPermission('events', 'delete')) {
            const eventIndex = this.events.findIndex(e => e.id === eventId);
            if (eventIndex !== -1) {
                this.events.splice(eventIndex, 1);
                this.saveData(); // Sauvegarder les changements
                return true;
            }
            throw new Error("Event not found");
        }
        throw new Error("Permission denied: Cannot delete events");
    }
    
    // Méthodes CRUD pour les profils
    getProfiles() {
        if (this.hasPermission('profiles', 'read')) {
            return this.profiles;
        }
        throw new Error("Permission denied: Cannot read profiles");
    }
    
    addProfile(profileData) {
        if (this.hasPermission('profiles', 'create')) {
            const newProfile = {
                id: this.nextIds.profile++,
                ...profileData
            };
            
            this.profiles.push(newProfile);
            this.saveData(); // Sauvegarder les changements
            return newProfile;
        }
        throw new Error("Permission denied: Cannot create profiles");
    }
    
    updateProfile(profileId, profileData) {
        if (this.hasPermission('profiles', 'write')) {
            const profileIndex = this.profiles.findIndex(p => p.id === profileId);
            if (profileIndex !== -1) {
                // Mettre à jour uniquement les champs fournis
                Object.keys(profileData).forEach(key => {
                    if (key !== 'id') { // Ne pas modifier l'ID
                        this.profiles[profileIndex][key] = profileData[key];
                    }
                });
                
                this.saveData(); // Sauvegarder les changements
                return this.profiles[profileIndex];
            }
            throw new Error("Profile not found");
        }
        throw new Error("Permission denied: Cannot update profiles");
    }
    
    deleteProfile(profileId) {
        if (this.hasPermission('profiles', 'delete')) {
            const profileIndex = this.profiles.findIndex(p => p.id === profileId);
            if (profileIndex !== -1) {
                this.profiles.splice(profileIndex, 1);
                this.saveData(); // Sauvegarder les changements
                return true;
            }
            throw new Error("Profile not found");
        }
        throw new Error("Permission denied: Cannot delete profiles");
    }
    
    // Méthodes CRUD pour les finances
    getFinances() {
        if (this.hasPermission('finances', 'read')) {
            return this.finances;
        }
        throw new Error("Permission denied: Cannot read finances");
    }
    
    addFinance(financeData) {
        if (this.hasPermission('finances', 'create')) {
            const newFinance = {
                id: this.nextIds.finance++,
                ...financeData
            };
            
            this.finances.push(newFinance);
            this.saveData(); // Sauvegarder les changements
            return newFinance;
        }
        throw new Error("Permission denied: Cannot create finances");
    }
    
    updateFinance(financeId, financeData) {
        if (this.hasPermission('finances', 'write')) {
            const financeIndex = this.finances.findIndex(f => f.id === financeId);
            if (financeIndex !== -1) {
                // Mettre à jour uniquement les champs fournis
                Object.keys(financeData).forEach(key => {
                    if (key !== 'id') { // Ne pas modifier l'ID
                        this.finances[financeIndex][key] = financeData[key];
                    }
                });
                
                this.saveData(); // Sauvegarder les changements
                return this.finances[financeIndex];
            }
            throw new Error("Finance record not found");
        }
        throw new Error("Permission denied: Cannot update finances");
    }
    
    deleteFinance(financeId) {
        if (this.hasPermission('finances', 'delete')) {
            const financeIndex = this.finances.findIndex(f => f.id === financeId);
            if (financeIndex !== -1) {
                this.finances.splice(financeIndex, 1);
                this.saveData(); // Sauvegarder les changements
                return true;
            }
            throw new Error("Finance record not found");
        }
        throw new Error("Permission denied: Cannot delete finances");
    }
    
    // Méthodes pour obtenir des statistiques
    getStatistics() {
        // Obtenir les données nécessaires
        const members = this.getMembers();
        const events = this.getEvents();
        const users = this.getUsers();
        const finances = this.getFinances();
        
        // Calculer les statistiques
        const totalMembers = members.length;
        const activeMembers = members.filter(m => m.status === 'actif').length;
        const totalEvents = events.length;
        const upcomingEvents = events.filter(e => {
            const eventDate = new Date(e.date);
            const today = new Date();
            return eventDate >= today && e.status === 'programmé';
        }).length;
        const totalUsers = users.length;
        const totalFinances = finances.reduce((sum, f) => sum + f.amount, 0);
        
        return {
            totalMembers,
            activeMembers,
            totalEvents,
            upcomingEvents,
            totalUsers,
            totalFinances
        };
    }
    
    // Méthode pour formater les montants en devise
    formatCurrency(amount) {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF',
            minimumFractionDigits: 0
        }).format(amount);
    }
    
    // Méthode pour réinitialiser les données des membres et finances
    resetMembersAndFinances() {
        // Supprimer tous les membres sauf les utilisateurs par défaut
        // Conserver uniquement les 5 utilisateurs par défaut
        this.members = [];
        
        // Réinitialiser les finances à 0
        this.finances = [];
        
        // Réinitialiser les événements (les supprimer tous)
        this.events = [];
        
        // Réinitialiser les compteurs appropriés
        this.nextIds.member = 1;
        this.nextIds.finance = 1;
        this.nextIds.event = 1;
        
        // Sauvegarder les changements
        this.saveData();
    }
}

// Créer une instance de la base de données
const db = new Database();