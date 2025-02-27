# Cour : Les **aggregation middleware** en **Mongoose**


## 1. **Définition des Aggregation Middleware**

- Les **aggregation middleware** en **Mongoose** permettent d’intercepter et de modifier les pipelines d’agrégation avant ou après leur exécution. Ils sont utiles pour ajouter des filtres automatiques, enregistrer des logs, ou transformer les résultats.  


- Les middleware d’agrégation fonctionnent avec la méthode `.aggregate()` et s’appliquent aux **pipelines d'agrégation** de MongoDB.  

- Ils existent sous deux formes :

    - **`pre('aggregate')`** : S’exécute avant l'exécution de l'agrégation.
    - **`post('aggregate')`** : S’exécute après l'exécution de l'agrégation.


## 2. **La fonction `pre('aggregate')` en Mongoose**

- Le middleware `pre('aggregate')` permet **de modifier le pipeline avant son exécution**.

- **Syntaxe**

    ```javascript
    schema.pre('aggregate', function(next) {
        this.pipeline().push({

        })
        this.pipeline().unshift({

        })
        console.log('Pipeline avant exécution :', this.pipeline());
        next();
    });
    ```

- **Exemple :**

    On peut ajouter un filtre automatique `{ isDeleted: false }` pour **ignorer les documents supprimés**.

    ```javascript
    const mongoose = require('mongoose');

    // Définition du schéma
    const userSchema = new mongoose.Schema({
    name: String,
    isDeleted: { type: Boolean, default: false }
    });

    // Middleware `pre('aggregate')` pour exclure les documents supprimés
    userSchema.pre('aggregate', function(next) {
    // Ajoute un filtre au début du pipeline
    this.pipeline().unshift({ $match: { isDeleted: false } });
    console.log('Pipeline modifié :', this.pipeline());
    next();
    });

    // Création du modèle
    const User = mongoose.model('User', userSchema);

    // Requête `aggregate()`
    User.aggregate([{ $group: { _id: null, count: { $sum: 1 } } }])
    .then(result => console.log('Résultat de l\'agrégation :', result))
    .catch(err => console.error('Erreur :', err));
    ```



## 3. **La fonction `post('aggregate')`**

- Le middleware `post('aggregate')` permet **de manipuler ou logger les résultats après l'exécution du pipeline**.

- **Syntaxe**

    ```javascript
    schema.post('aggregate', function(result, next) {
        console.log('Résultat après agrégation :', result);
        next();
    });
    ```

- **Exemple : Logger les résultats**

    ```javascript
    userSchema.post('aggregate', function(result, next) {
    console.log(`Pipeline exécuté avec succès. Nombre de résultats : ${result.length}`);
    next();
    });

    // Exécuter une requête `aggregate()`
    User.aggregate([{ $group: { _id: null, count: { $sum: 1 } } }])
    .then(result => console.log('Résultat final :', result))
    .catch(err => console.error('Erreur :', err));
    ```



