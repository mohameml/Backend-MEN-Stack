# Cour : **Document Middlware**


## 1. **Définition:**


- Les **document middleware**  dans **Mongoose** permettent d'exécuter du code avant ou après certains événements sur un document. Ils sont utiles pour :

    - **Modifier des données avant de les enregistrer** (ex: hachage de mot de passe).
    - **Exécuter des actions après l'enregistrement d'un document** (ex: envoi d'un email de confirmation).
    - **Effectuer des validations supplémentaires**.

- Il existe deux types principaux :

    - **Pre Middleware (`pre`)** : s'exécute **avant** l'événement spécifié.
    - **Post Middleware (`post`)** : s'exécute **après** l'événement spécifié.



## 2.**La fonction `pre('save')` en Mongoose**


- Le middleware `pre('save')` permet d'exécuter du code avant qu'un document ne soit sauvegardé dans la base de données. Il est souvent utilisé pour **modifier les données avant l'insertion ou la mise à jour**.

- **Syntaxe**

    ```javascript
    schema.pre('save', function(next) {
        // `this` fait référence au document en cours de sauvegarde
        console.log('Avant la sauvegarde du document:', this);
        
        // Appelle `next()` pour continuer l'exécution
        next();
    });
    ```

- **Exemple**

    ```javascript
    const mongoose = require('mongoose');
    const bcrypt = require('bcrypt');

    // Définition du schéma
    const userSchema = new mongoose.Schema({
    username: String,
    password: String
    });

    // Middleware `pre('save')` pour hasher le mot de passe avant sauvegarde
    userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); // Ne hash que si le mot de passe a changé

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
    });

    // Création du modèle
    const User = mongoose.model('User', userSchema);

    // Création d'un utilisateur avec mot de passe sécurisé
    const newUser = new User({ username: 'Alice', password: 'monSuperMotDePasse' });

    newUser.save()
    .then(() => console.log('Utilisateur enregistré avec mot de passe sécurisé'))
    .catch(err => console.error('Erreur :', err));
    ```



## 3. **La fonction `post('save')`:**

- Le middleware `post('save')` permet d'exécuter du code **après** que le document a été sauvegardé avec succès.

- **Syntaxe :**

    ```javascript
    schema.post('save', function(doc, next) {
        console.log('Document sauvegardé avec succès:', doc);
        next();
    });
    ```

- **Exemple d'utilisation : Envoi d'un email après l'inscription**

    ```javascript
    const userSchema = new mongoose.Schema({
    username: String,
    email: String
    });

    // Middleware `post('save')` pour exécuter une action après l'enregistrement
    userSchema.post('save', function(doc, next) {
    console.log(`Email de bienvenue envoyé à ${doc.email}`);
    // Simuler l'envoi d'un email (dans un vrai projet, utiliser un service comme Nodemailer)
    next();
    });

    // Création du modèle
    const User = mongoose.model('User', userSchema);

    // Sauvegarde d'un utilisateur
    const newUser = new User({ username: 'Bob', email: 'bob@example.com' });

    newUser.save()
    .then(() => console.log('Utilisateur enregistré'))
    .catch(err => console.error('Erreur :', err));
    ```


