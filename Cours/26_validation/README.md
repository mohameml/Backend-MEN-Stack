# Cour 26 : **Validation:**

## 1. **Définition:**

- La **validation** en Mongoose permet de garantir que les données insérées dans la base de données respectent certaines règles. Elle est définie au niveau du **schéma** et empêche l'enregistrement de données incorrectes.  

- Mongoose propose plusieurs types de validations :

    - **Validation intégrée** : `min`, `max`, `minLength`, `maxLength`, `enum`, etc.
    - **Validation personnalisée** : en utilisant des fonctions `validate`.


## 2. **Validation intégrée en Mongoose**

### 2.1 **`min` et `max`:**

- **`min`** : Définit une valeur minimale pour un champ numérique.
- **`max`** : Définit une valeur maximale pour un champ numérique.

- **Syntaxe**

    ```javascript
    const schema = new mongoose.Schema({
    age: {
        type: Number,
        min: [12, "L'âge doit être au moins de 12 ans"],
        max: [65, "L'âge ne peut pas dépasser 65 ans"]
    }
    });
    ```



### 2.2 **`minLength` et `maxLength`:**

- **`minLength`** : Définit une longueur minimale pour une chaîne.
- **`maxLength`** : Définit une longueur maximale pour une chaîne.

- **Syntaxe**

    ```javascript
    const schema = new mongoose.Schema({
    username: {
        type: String,
        minLength: [3, "Le nom d'utilisateur doit avoir au moins 3 caractères"],
        maxLength: [20, "Le nom d'utilisateur ne peut pas dépasser 20 caractères"]
    }
    });
    ```


### 2.3. **`enum` :**

- **`enum`** : Restreint un champ à une liste de valeurs spécifiques.

- **Syntaxe**

    ```javascript
    const schema = new mongoose.Schema({
    role: {
        type: String,
        enum: {
            values: ['admin', 'user', 'moderator'],
            message: "Le rôle doit être 'admin', 'user' ou 'moderator'"
        }
    }
    });
    ```



## 3. **Validation Personnalisée en Mongoose (`validate`)**


- En plus des validations intégrées (`min`, `max`, `enum`, etc.), Mongoose permet d’ajouter des **validations personnalisées** grâce à l’option **`validate`**.

- **Syntaxe de `validate`**

    ```javascript
    const schema = new mongoose.Schema({
    fieldName: {
        type: Type, 
        validate: {
            validator: function(value) {
                return /* condition retournant true ou false */;
            },
            message: "Message d'erreur personnalisé"
        }
    }
    });
    ```



- **Exemple : Validation personnalisée d'un e-mail**

    ```javascript
    const mongoose = require('mongoose');

    const userSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: {
        validator: function(email) {
            return /\S+@\S+\.\S+/.test(email); // Regex simple pour e-mail
        },
        message: "L'e-mail n'est pas valide"
        }
    }
    });

    const User = mongoose.model('User', userSchema);

    const newUser = new User({ email: "invalid-email" });

    newUser.save()
    .catch(err => console.error('Erreur de validation :', err.message));
    ```


## 4. **Validation avec la librairie `validator`:**

- La bibliothèque [`validator`](https://www.npmjs.com/package/validator) offre des fonctions de validation avancées (e-mail, URL, mot de passe fort, etc.).

- **Installation**

    ```bash
    npm install validator
    ```

- **Exemple : Validation avec `validator`**

    ```javascript
    const mongoose = require('mongoose');
    const validator = require('validator');

    const userSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: {
        validator: validator.isEmail, // Utilisation de `isEmail` de validator
        message: "L'e-mail n'est pas valide"
        }
    },
    website: {
        type: String,
        validate: {
        validator: validator.isURL, // Vérifie si c'est une URL valide
        message: "L'URL n'est pas valide"
        }
    }
    });

    const User = mongoose.model('User', userSchema);

    const newUser = new User({ email: "invalid-email", website: "invalid-url" });

    newUser.save()
    .catch(err => console.error('Erreur de validation :', err.message));
    ```



