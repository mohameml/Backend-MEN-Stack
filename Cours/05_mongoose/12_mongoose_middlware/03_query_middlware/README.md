# Cour : Les **query middleware** en **Mongoose** 


## 1. **Définition des Query Middleware**

- Les **query middleware** en **Mongoose** permettent d’exécuter du code avant ou après l'exécution d'une requête. Ils sont utiles pour modifier, valider ou enregistrer des logs sur les requêtes effectuées.

- Les query middleware interceptent les méthodes qui retournent un ou plusieurs documents comme :

    - `find()`
    - `findOne()`
    - `findOneAndUpdate()`
    - `findOneAndDelete()`
    - `deleteMany()`


- Les deux principaux types sont :

    - **`pre()`** : S'exécute avant l'exécution de la requête.
    - **`post()`** : S'exécute après l'exécution de la requête.


## 2. **La fonction `pre('find')` en Mongoose :**

- Le middleware `pre('find')` permet d'exécuter du code **avant** qu'une requête `find()` ne soit exécutée.

- **Syntaxe**

    ```javascript
    // this : pointe vers le query 
    schema.pre(/^find/, function(next) {
        console.log('Avant l\'exécution de find():', this.getFilter());
        next();
    });
    ```

- **Exemple :**

    Si une collection contient un champ `isDeleted`, on peut filtrer les documents supprimés **avant** que `find()` ne s’exécute.

    ```javascript
    const mongoose = require('mongoose');

    // Définition du schéma
    const userSchema = new mongoose.Schema({
    name: String,
    isDeleted: { type: Boolean, default: false }
    });

    // Middleware `pre('find')` pour exclure les utilisateurs supprimés
    userSchema.pre('find', function(next) {
    this.where({ isDeleted: false }); // Ajoute une condition au filtre
    next();
    });

    // Création du modèle
    const User = mongoose.model('User', userSchema);

    // Requête `find()`
    User.find()
    .then(users => console.log('Utilisateurs trouvés :', users))
    .catch(err => console.error('Erreur :', err));
    ```


## 3. **La fonction `post('find')`**

- Le middleware `post('find')` permet d'exécuter du code **après** qu'une requête `find()` a retourné ses résultats.

- **Syntaxe :**

    ```javascript
    schema.post('find', function(docs, next) {
        console.log(`Requête find() exécutée, ${docs.length} documents trouvés.`);
        next();
    });
    ```


- **Exemple :**

    ```javascript
    userSchema.post('find', function(docs, next) {
    console.log(`La requête a retourné ${docs.length} documents.`);
    next();
    });

    // Exécuter une requête `find()`
    User.find()
    .then(users => console.log('Résultat :', users))
    .catch(err => console.error('Erreur :', err));
    ```


