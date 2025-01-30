# cour 24 : **Virtual Prop:**



- **Définition**

    >Les **propriétés virtuelles** en Mongoose sont des propriétés qui ne sont pas stockées dans la base de données mais qui sont dérivées ou calculées à partir d'autres champs. Elles permettent de manipuler ou d'ajouter des informations supplémentaires aux documents sans les persister.

    - Une propriété virtuelle est définie sur un schéma Mongoose en utilisant la méthode `.virtual`. Elles sont souvent utilisées pour :    
        - Calculer une valeur basée sur des champs existants.
        - Transformer la représentation d'un document, par exemple dans un format de sortie JSON.

- **Syntaxe :**

    ```javascript
    const userSchema = new Schema(
        objectSchem , 
        {
            toJSON: { virtuals: true },
            toObject: { virtuals: true },
        }    
    );
    schema.virtual('nomPropriété')
    .get(function() {
        // Retourne la valeur calculée
    })
    .set(function(valeur) {
        // Permet de définir une action lorsque la propriété virtuelle est modifiée
    });
    ```

    - **`get`** : Permet de définir une fonction pour lire (ou calculer) la valeur de la propriété virtuelle.
    - **`set`** : Permet de définir une fonction pour définir une action lors de l'affectation à la propriété virtuelle.
    
    - Par défaut, les propriétés virtuelles ne sont pas incluses lors de la conversion en JSON. Pour les inclure :

        ```javascript
        userSchema.set('toJSON', { virtuals: true });
        ```



- **Exemple :**

   ```javascript
   const mongoose = require('mongoose');
   const Schema = mongoose.Schema;

   const userSchema = new Schema({
     firstName: String,
     lastName: String
   });

   // Définir une propriété virtuelle pour le nom complet
   userSchema.virtual('fullName')
     .get(function() {
       return `${this.firstName} ${this.lastName}`;
     })
     .set(function(fullName) {
       const [firstName, lastName] = fullName.split(' ');
       this.firstName = firstName;
       this.lastName = lastName;
     });

   const User = mongoose.model('User', userSchema);
   ```

   ```javascript
   const user = new User({ firstName: 'John', lastName: 'Doe' });

   console.log(user.fullName); // John Doe

   user.fullName = 'Jane Smith';
   console.log(user.firstName); // Jane
   console.log(user.lastName);  // Smith
   ```



