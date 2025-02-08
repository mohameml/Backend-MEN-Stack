# Cour :  **Introduction à l’Authentification : la Gestion des Mots de Passe**  

## 1. **Introduction:**

- L’**authentification** est le processus permettant de vérifier l’identité d’un utilisateur avant de lui accorder l’accès à une application ou un système. L’un des moyens les plus courants d’authentification repose sur un **nom d’utilisateur (ou email) et un mot de passe**. Cependant, la gestion des mots de passe doit être faite avec précaution pour éviter des failles de sécurité.



- **Principes de Base de la Gestion des Mots de Passe**  

    1. **Ne jamais stocker un mot de passe en clair :**  Toujours utiliser un algorithme de hachage sécurisé (ex: `bcrypt`, `argon2`, `PBKDF2`).  

    2. **Utiliser un sel (salt) avant le hachage :**   Un sel est une valeur aléatoire ajoutée au mot de passe avant le hachage pour empêcher les attaques par table arc-en-ciel.  

    3. **Mettre en place des politiques de sécurité :**  

        - Longueur minimale (ex: 8 à 12 caractères)  
        - Utilisation de caractères spéciaux, majuscules et chiffres  
        - Expiration des mots de passe après une certaine période  


    4. **Éviter les attaques par force brute :**  Mettre en place des limitations de tentatives (ex: blocage après plusieurs échecs).  

    5. **Utiliser l’authentification multi-facteurs (MFA) :**  Ajouter un deuxième facteur comme un code envoyé par email ou une application d’authentification.  



## 2. **Processus d’Authentification Sécurisé**  

1️⃣ **Inscription (Signup)**  
   - L’utilisateur crée un compte avec un email et un mot de passe.  
   - Le mot de passe est haché avant d’être stocké en base de données.  

2️⃣ **Connexion (Login)**  
   - L’utilisateur saisit son email et son mot de passe.  
   - Le système récupère le mot de passe haché en base de données.  
   - Il compare la saisie utilisateur avec le hachage via `bcrypt.compare()`.  
   - Si correct, une session ou un token JWT est généré pour maintenir l’état de connexion.  

3️⃣ **Réinitialisation de Mot de Passe (Reset Password)**  
   - L’utilisateur peut demander un lien de réinitialisation envoyé par email.  
   - Ce lien contient un token temporaire permettant de changer le mot de passe.  



##  3. **Implémentation en Node.js et Mongoose**  




```javascript
const mongoose = require("mongoose")
const validtor = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please tell us your name !'],
        },
        email: {
            type: String,
            required: [true, 'Please provide your email'],
            unique: true,
            lowercase: true,
            validate: [validtor.isEmail, 'Please provide a valid email : {VALUE}']
        },
        photo: String,
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: 8,
        },
        passwordConfirm: {
            type: String,
            required: [true, 'Please confirm your password'],
            validate: {
                validator: function (val) {
                    return val === this.password
                },
                message: "Passwords are not the same"
            }
        },

    }
)


userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();

})


const User = mongoose.model('User', userSchema);

module.exports = User;
```

