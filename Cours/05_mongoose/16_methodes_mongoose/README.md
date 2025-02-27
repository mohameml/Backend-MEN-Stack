# Cour :  **Instance Methods vs. Static Methods dans Mongoose**


## **1. Instance Methods :**

- **Définition**

    > Les **méthodes d’instance** sont des méthodes attachées à **une instance spécifique** d’un document Mongoose. Elles permettent d’exécuter des opérations sur un document individuel.

- **Syntaxe :**

    On les définit sur le `Schema.methods` de Mongoose.

    ```js
    Schema.methods.nomDeFonction = function(args1 , args2) {
        // this : pointe to current document 
    }

    ```

- **Exemple**

    Imaginons un modèle `User` et ajoutons une méthode pour vérifier si un utilisateur a un rôle spécifique :

    ```js
    const mongoose = require('mongoose');

    const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
    });

    // Ajout d'une méthode d'instance
    userSchema.methods.isAdmin = function() {
    return this.role === 'admin';
    };

    // Création du modèle
    const User = mongoose.model('User', userSchema);

    (async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb');

    const user = new User({ name: 'Alice', email: 'alice@example.com', role: 'admin' });
    await user.save();

    console.log(user.isAdmin()); // true

    mongoose.connection.close();
    })();
    ```

- **Pourquoi utiliser les méthodes d’instance ?**

    ✅ Elles permettent de **faciliter la manipulation des documents** directement depuis une instance.  
    ✅ Elles évitent d’avoir à réécrire la logique dans plusieurs endroits du code.  


## **2. Static Methods**

- **Définition**

    > Les **méthodes statiques** sont des méthodes attachées au **modèle** lui-même (et non à une instance spécifique). Elles permettent d’exécuter des opérations à l’échelle du modèle, comme des requêtes globales.

-  **Syntaxe**

    On les définit sur le `Schema.statics` de Mongoose.
    
    ```js
    Schema.statics.nomDeFonction = function(args1 , args2) {
        // this : pointe to Model

    }

    ```

- **Exemple**

    Ajoutons une méthode statique pour **trouver un utilisateur par email** :

    ```js
    // Ajout d'une méthode statique
    userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email });
    };

    // Création du modèle
    const User = mongoose.model('User', userSchema);

    (async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb');

    // Création d'un utilisateur
    await User.create({ name: 'Bob', email: 'bob@example.com', role: 'user' });

    // Recherche d'un utilisateur avec la méthode statique
    const user = await User.findByEmail('bob@example.com');
    console.log(user); // Affiche l'utilisateur Bob

    mongoose.connection.close();
    })();
    ```

- **Pourquoi utiliser les méthodes statiques ?**

    ✅ Elles sont utiles pour **implémenter des requêtes récurrentes** et **éviter la duplication de code**.  
    ✅ Elles permettent de **travailler sur plusieurs documents à la fois**, contrairement aux méthodes d’instance qui s’appliquent à un seul document.  


### RQ :  **Conclusion**

- **Méthodes d’instance** → Utilisées pour des opérations sur **un seul document** (ex. validation, modification).  

- **Méthodes statiques** → Utilisées pour des opérations sur **le modèle entier** (ex. recherche, agrégation).  

