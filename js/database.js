// Système de base de données simulée pour l'application UN
// Ce fichier gère les données de l'application avec différents niveaux d'accès

class UNDatabase {
    constructor() {
        // Charger les données depuis localStorage ou initialiser avec des données par défaut
        this.loadData();
    }
    
    // Méthode pour charger les données depuis localStorage
    loadData() {
        const savedData = localStorage.getItem('unAppData');
        
        if (savedData) {
            const data = JSON.parse(savedData);
            this.users = data.users || [];
            this.members = data.members || [];
            this.events = data.events || [];
            this.reports = data.reports || [];
            this.finances = data.finances || [];
            this.contributions = data.contributions || []; // Nouvelle propriété pour les cotisations
            this.nextIds = data.nextIds || {user: 6, member: 5, event: 3, report: 4, finance: 3, contribution: 5};
        } else {
            // Données par défaut si aucune donnée sauvegardée
            this.initializeDefaultData();
        }
        
        // Définition des permissions par rôle
        this.permissions = {
            superadmin: {
                users: ["read", "write", "delete", "create"],
                members: ["read", "write", "delete", "create"],
                events: ["read", "write", "delete", "create"],
                reports: ["read", "write", "delete", "create", "generate"],
                finances: ["read", "write", "delete", "create"],
                contributions: ["read", "write", "delete", "create"] // Permissions pour les cotisations
            },
            administrateur: {
                users: ["read", "write", "delete", "create"],
                members: ["read", "write", "delete", "create"],
                events: ["read", "write", "delete", "create"],
                reports: ["read", "write", "delete", "create", "generate"],
                finances: ["read", "write", "delete", "create"],
                contributions: ["read", "write", "delete", "create"] // Permissions pour les cotisations
            },
            trésorier: {
                users: ["read"],
                members: ["read"],
                events: ["read"],
                reports: ["read", "generate"],
                finances: ["read", "write", "create"],
                contributions: ["read", "write", "create"] // Permissions pour les cotisations
            },
            secrétaire: {
                users: ["read"],
                members: ["read", "write", "create"],
                events: ["read", "write", "create"],
                reports: ["read"],
                finances: ["read"],
                contributions: ["read"] // Permissions pour les cotisations
            },
            membre: {
                users: [],
                members: ["read"],
                events: ["read"],
                reports: ["read"],
                finances: [],
                contributions: ["read"] // Permissions pour les cotisations
            }
        };
        
        // Utilisateur actuellement connecté
        this.currentUser = null;
    }
    
    // Méthode pour sauvegarder les données dans localStorage
    saveData() {
        const data = {
            users: this.users,
            members: this.members,
            events: this.events,
            reports: this.reports,
            finances: this.finances,
            contributions: this.contributions, // Sauvegarde des cotisations
            nextIds: this.nextIds
        };
        
        localStorage.setItem('unAppData', JSON.stringify(data));
    }
    
    // Initialiser les données par défaut
    initializeDefaultData() {
        this.nextIds = {
            user: 6,
            member: 5,
            event: 3,
            report: 4,
            finance: 3,
            contribution: 5 // Nouvel ID pour les cotisations
        };
        
        // Chaque membre est aussi un utilisateur
        this.users = [
            {
                id: 1,
                username: "superadmin",
                password: "superadmin123",
                role: "superadmin",
                fullName: "Super Administrateur",
                email: "superadmin@un-association.fcfa",
                phone: "+221 11 111 11 11",
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
                phone: "+221 12 345 67 89",
                dateInscription: "2024-01-15",
                lastLogin: "2024-12-05",
                status: "actif",
                permissions: {
                    canExport: true,
                    canDelete: true,
                    canModifySettings: true
                }
            },
            {
                id: 3,
                username: "jean.martin",
                password: "jean123",
                role: "trésorier",
                fullName: "Jean Martin",
                email: "jean.martin@un-association.fcfa",
                phone: "+221 98 765 43 21",
                dateInscription: "2024-01-20",
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
                username: "marie.lambert",
                password: "marie123",
                role: "secrétaire",
                fullName: "Marie Lambert",
                email: "marie.lambert@un-association.fcfa",
                phone: "+221 45 678 90 12",
                dateInscription: "2024-01-22",
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
                phone: "+221 33 444 55 66",
                dateInscription: "2024-02-01",
                lastLogin: "2024-12-02",
                status: "actif",
                permissions: {
                    canExport: false,
                    canDelete: false,
                    canModifySettings: false
                }
            }
        ];
        
        // Informations supplémentaires sur les membres (liées aux utilisateurs)
        this.members = [
            {
                id: 1,
                userId: 1, // Lien vers l'utilisateur Super Admin
                fullName: "Super Administrateur",
                email: "superadmin@un-association.fcfa",
                role: "Super Admin",
                dateAdhesion: "2020-01-01",
                status: "actif"
            },
            {
                id: 2,
                userId: 2, // Lien vers l'utilisateur Admin
                fullName: "Administrateur Principal",
                email: "admin@un-association.fcfa",
                role: "Administrateur",
                dateAdhesion: "2020-01-15",
                status: "actif"
            },
            {
                id: 3,
                userId: 3, // Lien vers l'utilisateur Jean Martin
                fullName: "Jean Martin",
                email: "jean.martin@un-association.fcfa",
                role: "Trésorier",
                dateAdhesion: "2020-06-10",
                status: "actif"
            },
            {
                id: 4,
                userId: 4, // Lien vers l'utilisateur Marie Lambert
                fullName: "Marie Lambert",
                email: "marie.lambert@un-association.fcfa",
                role: "Secrétaire",
                dateAdhesion: "2021-03-22",
                status: "actif"
            },
            {
                id: 5,
                userId: 5, // Lien vers l'utilisateur Pierre Dubois
                fullName: "Pierre Dubois",
                email: "pierre.dubois@un-association.fcfa",
                role: "Membre",
                dateAdhesion: "2020-01-15",
                status: "actif"
            }
        ];
        
        this.events = [
            {
                id: 1,
                title: "Assemblée générale annuelle",
                date: "2024-12-15",
                time: "14:00",
                location: "Salle des fêtes, 123 Rue de la Paix",
                description: "Assemblée générale pour discuter des activités de l'année et du budget.",
                status: "programmé"
            },
            {
                id: 2,
                title: "Nettoyage urbain",
                date: "2024-12-20",
                time: "09:00",
                location: "Place de la Mairie",
                description: "Action de nettoyage participatif avec les membres de l'association.",
                status: "programmé"
            }
        ];
        
        this.reports = [
            {
                id: 1,
                title: "Rapport financier mensuel",
                period: "Novembre 2024",
                generatedDate: "2024-12-01",
                status: "généré"
            },
            {
                id: 2,
                title: "Rapport d'activités trimestriel",
                period: "Octobre - Décembre 2024",
                generatedDate: null,
                status: "en cours"
            },
            {
                id: 3,
                title: "Rapport annuel",
                period: "2024",
                generatedDate: "2025-01-15",
                status: "généré"
            }
        ];
        
        this.finances = [
            {
                id: 1,
                type: "cotisation",
                amount: 5000,
                currency: "FCFA",
                date: "2024-12-01",
                member: "Jean Martin",
                description: "Cotisation mensuelle"
            },
            {
                id: 2,
                type: "dépense",
                amount: 2500,
                currency: "FCFA",
                date: "2024-12-05",
                member: "Association",
                description: "Achat de matériel"
            }
        ];
        
        // Nouvelles données pour les cotisations
        this.contributions = [
            {
                id: 1,
                memberId: 3,
                memberName: "Jean Martin",
                amount: 5000,
                currency: "FCFA",
                date: "2024-12-01",
                type: "mensuelle",
                description: "Cotisation mensuelle",
                status: "payée"
            },
            {
                id: 2,
                memberId: 4,
                memberName: "Marie Lambert",
                amount: 5000,
                currency: "FCFA",
                date: "2024-12-01",
                type: "mensuelle",
                description: "Cotisation mensuelle",
                status: "payée"
            },
            {
                id: 3,
                memberId: 2,
                memberName: "Administrateur Principal",
                amount: 5000,
                currency: "FCFA",
                date: "2024-12-01",
                type: "mensuelle",
                description: "Cotisation mensuelle",
                status: "payée"
            },
            {
                id: 4,
                memberId: 5,
                memberName: "Pierre Dubois",
                amount: 5000,
                currency: "FCFA",
                date: "2024-12-01",
                type: "mensuelle",
                description: "Cotisation mensuelle",
                status: "payée"
            }
        ];
        
        // Sauvegarder les données initiales
        this.saveData();
    }
    
    // Méthodes CRUD pour les cotisations avec incrémentation automatique
    getContributions() {
        if (this.hasPermission('contributions', 'read')) {
            return this.contributions;
        }
        throw new Error("Permission denied: Cannot read contributions");
    }
    
    // Obtenir le montant total des cotisations pour un membre
    getTotalContributionsForMember(memberId) {
        return this.contributions
            .filter(c => c.memberId === memberId)
            .reduce((total, contribution) => total + contribution.amount, 0);
    }
    
    // Obtenir le nombre de cotisations pour un membre
    getCountContributionsForMember(memberId) {
        return this.contributions
            .filter(c => c.memberId === memberId)
            .length;
    }
    
    addContribution(contributionData) {
        if (this.hasPermission('contributions', 'create')) {
            // Vérifier s'il s'agit d'une cotisation supplémentaire pour le même membre
            const existingContributions = this.contributions.filter(
                c => c.memberId === contributionData.memberId
            );
            
            // Incrémenter automatiquement le montant si le membre a déjà des cotisations
            let incrementedAmount = contributionData.amount;
            if (existingContributions.length > 0) {
                // Option 1: Incrémenter de 10% à chaque fois (vous pouvez ajuster cette logique)
                incrementedAmount = contributionData.amount * (1 + (existingContributions.length * 0.1));
                
                // Option 2: Ajouter un montant fixe (décommentez si vous préférez cette approche)
                // incrementedAmount = contributionData.amount + (existingContributions.length * 500);
            }
            
            const newContribution = {
                id: this.nextIds.contribution++,
                ...contributionData,
                amount: incrementedAmount, // Utiliser le montant incrémenté
                createdAt: new Date().toISOString() // Ajouter la date de création
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
    
    // Méthode pour authentifier un utilisateur
    authenticate(username, password) {
        const user = this.users.find(u => u.username === username && u.password === password);
        if (user) {
            this.currentUser = { ...user };
            delete this.currentUser.password; // Ne pas stocker le mot de passe dans la session
            
            // Mettre à jour la date de dernière connexion
            const userIndex = this.users.findIndex(u => u.id === user.id);
            if (userIndex !== -1) {
                this.users[userIndex].lastLogin = new Date().toISOString().split('T')[0];
                this.saveData(); // Sauvegarder les changements
            }
            
            return this.currentUser;
        }
        return null;
    }
    
    // Méthode pour déconnecter l'utilisateur
    logout() {
        this.currentUser = null;
    }
    
    // Vérifier si un utilisateur est connecté
    isAuthenticated() {
        return this.currentUser !== null;
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
    
    addUser(userData) {
        if (this.hasPermission('users', 'create')) {
            // Vérifier si le nom d'utilisateur existe déjà
            if (this.users.some(u => u.username === userData.username)) {
                throw new Error("Ce nom d'utilisateur existe déjà.");
            }
            
            const newUser = {
                id: this.nextIds.user++,
                ...userData
            };
            this.users.push(newUser);
            this.saveData(); // Sauvegarder les changements
            return newUser;
        }
        throw new Error("Permission denied: Cannot create users");
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
            return this.members;
        }
        throw new Error("Permission denied: Cannot read members");
    }
    
    addMember(memberData) {
        if (this.hasPermission('members', 'create')) {
            const newMember = {
                id: this.nextIds.member++,
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
    
    // Méthodes CRUD pour les rapports
    getReports() {
        if (this.hasPermission('reports', 'read')) {
            return this.reports;
        }
        throw new Error("Permission denied: Cannot read reports");
    }
    
    addReport(reportData) {
        if (this.hasPermission('reports', 'create')) {
            const newReport = {
                id: this.nextIds.report++,
                ...reportData
            };
            this.reports.push(newReport);
            this.saveData(); // Sauvegarder les changements
            return newReport;
        }
        throw new Error("Permission denied: Cannot create reports");
    }
    
    updateReport(reportId, reportData) {
        if (this.hasPermission('reports', 'write')) {
            const reportIndex = this.reports.findIndex(r => r.id === reportId);
            if (reportIndex !== -1) {
                // Mettre à jour uniquement les champs fournis
                Object.keys(reportData).forEach(key => {
                    if (key !== 'id') { // Ne pas modifier l'ID
                        this.reports[reportIndex][key] = reportData[key];
                    }
                });
                
                this.saveData(); // Sauvegarder les changements
                return this.reports[reportIndex];
            }
            throw new Error("Report not found");
        }
        throw new Error("Permission denied: Cannot update reports");
    }
    
    deleteReport(reportId) {
        if (this.hasPermission('reports', 'delete')) {
            const reportIndex = this.reports.findIndex(r => r.id === reportId);
            if (reportIndex !== -1) {
                this.reports.splice(reportIndex, 1);
                this.saveData(); // Sauvegarder les changements
                return true;
            }
            throw new Error("Report not found");
        }
        throw new Error("Permission denied: Cannot delete reports");
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
}