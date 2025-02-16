# Cour :  🚀 **La fonction `populate` en Mongoose**  

## 1. **Définition**  

- La méthode `.populate()` de **Mongoose** permet de remplacer une **référence** stockée sous forme d'ObjectId par le document complet correspondant dans une autre collection. Cela facilite la récupération des données liées sans avoir à effectuer plusieurs requêtes séparées.

## 2. **Syntaxe :**  

```js
query.populate({
    path : 'nomDuChamp',
    select : '-champ1'
})
```
- `nomDuChamp` : Nom du champ qui contient l'ObjectId référencé.  

- On peut chaîner plusieurs `.populate()` si plusieurs champs contiennent des références.



## 3. **Exemple avec Query Middleware (`pre` ou `post`) :**  

- **Cas d'utilisation** : 

    - Supposons que nous ayons un modèle `Post` qui référence un `User` par son ID.  

    - Collection `users`

    - Collection `posts` (chaque post appartient à un utilisateur via `author`)

- **Modèles en Mongoose**  

    ```js
    const mongoose = require('mongoose');

    const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    });

    const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Référence vers User
    });

    const User = mongoose.model('User', userSchema);
    const Post = mongoose.model('Post', postSchema);
    ```


- **Utilisation de `populate` dans un Query Middleware**  

    ```js
    postSchema.pre(/^find/, function(next) {
    this.populate('author'); // Remplace l'ObjectId de "author" par le document complet du User
    next();
    });
    ```

- ✅ **Explication** :  

    - Le middleware `pre(/^find/)` s'exécute avant **toutes** les requêtes `find`, `findOne`, `findById`, etc.

    - Il applique automatiquement `.populate('author')` à chaque requête `find`.


- 📌 **Requête avec `populate`**  

    ```js
    async function getPosts() {
    const posts = await Post.find();
    console.log(posts); // Chaque post affichera les infos complètes de l'auteur (User)
    }

    getPosts();
    ```

