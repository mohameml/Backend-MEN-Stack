# Cour : **Indexes:**


## 1. Concept d'Index en Base de Données

### a. Qu'est-ce qu'un index ?

- **Définition :**  
  > Un index est une structure de données (souvent un arbre B-tree, un hash, ou d'autres structures spécialisées) qui permet de rechercher, filtrer et trier les données beaucoup plus rapidement qu'en effectuant un scan complet de la table.
  
- **But :**  
  - **Accélérer les requêtes :** Un index permet de retrouver rapidement les enregistrements correspondant à une condition (exemple : retrouver un utilisateur par son email).
  - **Optimiser le tri et le filtrage :** Lorsqu'une requête requiert des opérations de tri ou de filtrage, l'index peut être utilisé pour réduire le nombre de données à parcourir.

### b. Problèmes résolus par les indexes
- **Performance :**  
  Sans index, une requête qui cherche une valeur particulière doit parcourir tous les enregistrements d'une table (full table scan), ce qui devient très inefficace pour de grandes quantités de données.
- **Scalabilité :**  
  À mesure que la quantité de données augmente, les indexes permettent de maintenir de bonnes performances.
- **Amélioration de la réactivité :**  
  Les applications utilisant des bases de données indexées répondent plus rapidement aux requêtes de l'utilisateur, améliorant ainsi l'expérience utilisateur.

---

## 2. Les Index en Mongoose

### a. Définition
- **Index dans Mongoose :**  
  En utilisant Mongoose, un ORM pour MongoDB, vous pouvez définir des indexes sur vos schémas pour optimiser vos requêtes. Ces indexes sont ensuite créés dans la base de données MongoDB et permettent, par exemple, d'assurer l'unicité d'un champ ou d'accélérer les recherches.

### b. Syntaxe et Déclaration
- **Déclaration dans le schéma :**  
  Vous pouvez définir un index de deux manières dans Mongoose :
  
  1. **Directement sur le champ dans la définition du schéma :**
  
     ```js
     const userSchema = new mongoose.Schema({
       email: {
         type: String,
         required: true,
         unique: true,  // ici, Mongoose va créer un index unique sur "email"
       },
       name: String
     });
     ```
     
     Ici, `unique: true` est un raccourci pour créer un index unique. Cela garantit que deux documents ne peuvent pas avoir le même email.

  2. **En utilisant la méthode `schema.index()`:**
  
     ```js
     const userSchema = new mongoose.Schema({
       email: {
         type: String,
         required: true
       },
       name: String,
       age: Number
     });
     
     // Crée un index composé (compound index) sur "name" et "age"
     userSchema.index({ name: 1, age: -1 });
     ```
     
     Dans cet exemple, `1` signifie un index croissant pour `name` et `-1` signifie un index décroissant pour `age`.

### c. Exemple Complet
Voici un exemple complet qui illustre la création d'un schéma avec un index unique et un index composé :

```js
const mongoose = require('mongoose');

// Définition du schéma avec un index unique sur l'email
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true  // Crée un index unique
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
});

// Définir un index composé sur "name" (croissant) et "age" (décroissant)
userSchema.index({ name: 1, age: -1 });

// Création du modèle
const User = mongoose.model('User', userSchema);

// Exemple de connexion et d'utilisation
mongoose.connect('mongodb://localhost:27017/testdb')
  .then(() => {
    console.log('DB Connected');
    // Par exemple, on peut créer un utilisateur ici
    return User.create({ email: 'test@example.com', name: 'Alice', age: 30 });
  })
  .then(user => {
    console.log('User Created:', user);
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error:', err);
  });
```

### d. Points à retenir
- **Performance :**  
  Les indexes accélèrent la recherche et le tri des données.  
- **Coût en écriture :**  
  La création d'indexes peut ralentir les opérations d'insertion, de mise à jour ou de suppression, car l'index doit être mis à jour en parallèle.
- **Taille de stockage :**  
  Les indexes occupent de l'espace supplémentaire dans la base de données.
- **Maintenance :**  
  Il est important de bien choisir quels champs indexer pour ne pas surcharger la base de données avec des indexes inutiles.

---

En résumé, les indexes sont essentiels pour améliorer les performances des requêtes en base de données. Dans Mongoose, ils se définissent facilement soit directement dans la définition du champ (par exemple, pour garantir l'unicité) soit via la méthode `schema.index()` pour des cas plus complexes comme les indexes composés.