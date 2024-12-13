# cour :**Schema && Model in Mongoose:**

## 1. **Schema:**

-   **Définition :**

    > Un **schéma** dans Mongoose est une structure définie pour un document MongoDB. Il spécifie la forme, le type de données, et éventuellement les validations que chaque document doit respecter dans une collection MongoDB.

    -   Le schéma agit comme un "contrat" pour les documents, en définissant les champs attendus, leurs types de données et les règles associées (ex. : champs obligatoires, valeurs par défaut, etc.).

-   **Syntaxe :**

    Pour définir un schéma dans Mongoose, on utilise la classe `mongoose.Schema`. Voici la syntaxe générale :

    ```javascript
    const mongoose = require("mongoose");

    // Définition d'un schéma
    const nomDuSchema = new mongoose.Schema({
        champ1: TypeDeDonnée, // Champ avec un type simple sans options
        champ2: { type: TypeDeDonnée, option1: valeur, option2: valeur },
        champ3: { keyName1: Type1, keyName2: Type2 },
        champ4: [TypeDeDonnée], // Champ de type tableau
    });
    ```

-   **Options :**

    | Option     | Description                                                                       |
    | ---------- | --------------------------------------------------------------------------------- |
    | `type`     | Spécifie le type de donnée attendu (`String`, `Number`, `Date`, `Boolean`, etc.). |
    | `required` | Rend le champ obligatoire.                                                        |
    | `default`  | Définit une valeur par défaut si aucune valeur n'est fournie.                     |
    | `unique`   | Garantit que les valeurs de ce champ soient uniques dans la collection.           |

-   **Exemple 1:**

    ```javascript
    const mongoose = require("mongoose");

    // Définition du schéma d'un utilisateur
    const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true, // Le champ est obligatoire
            minlength: 3, // Longueur minimale
            maxlength: 50, // Longueur maximale
        },
        age: {
            type: Number,
            required: true,
            min: 18, // Âge minimal
            max: 120, // Âge maximal
        },
        email: {
            type: String,
            unique: true, // Doit être unique
            required: true,
            match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Validation regex
        },
        createdAt: {
            type: Date,
            default: Date.now, // Valeur par défaut : date actuelle
        },
        hobbies: {
            type: [String], // Tableau de chaînes
            default: [], // Valeur par défaut : tableau vide
        },
    });

    // Création d'un modèle basé sur le schéma
    const User = mongoose.model("User", userSchema);

    // Exportation pour utilisation dans d'autres fichiers
    module.exports = User;
    ```

-   **Exemple 2 :**

    ```js
    import mongoose from "mongoose";
    const { Schema } = mongoose;

    const blogSchema = new Schema({
        title: String, // String is shorthand for {type: String}
        author: String,
        body: String,
        comments: [{ body: String, date: Date }],
        date: { type: Date, default: Date.now },
        hidden: Boolean,
        meta: {
            votes: Number,
            favs: Number,
        },
    });
    ```

## 2. **Options :**

-   **Définition:**

    > Les options dans un schéma Mongoose permettent de définir les caractéristiques, contraintes et validations appliquées aux propriétés des documents dans une collection MongoDB.

-   **Options :**

    | **Nom de l'option** | **Définition**                         | **Syntaxe**                       |
    | ------------------- | -------------------------------------- | --------------------------------- |
    | **type**            | Définit le type de la propriété.       | `type: String` ou `type: Number`  |
    | **required**        | Rend la propriété obligatoire.         | `required: true`                  |
    | **unique**          | Garantit l’unicité de la valeur.       | `unique: true`                    |
    | **default**         | Définit une valeur par défaut.         | `default: "valeur_par_defaut"`    |
    | **match**           | Valide avec une expression régulière.  | `match: /regex/`                  |
    | **min**             | Valeur minimale (pour Number ou Date). | `min: 1` ou `min: '2023-01-01'`   |
    | **max**             | Valeur maximale (pour Number ou Date). | `max: 100` ou `max: '2023-12-31'` |
    | **minLength**       | Longueur minimale pour les chaînes.    | `minLength: 5`                    |
    | **maxLength**       | Longueur maximale pour les chaînes.    | `maxLength: 255`                  |
    | **enum**            | Limite la valeur à un ensemble défini. | `enum: ['val1', 'val2']`          |
    | **validate**        | Permet une validation personnalisée.   | `validate: (val) => val > 0`      |

-   **Exemple:**

    ```javascript
    const mongoose = require("mongoose");

    const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true,
            minLength: 3,
            maxLength: 20,
            match: /^[a-zA-Z0-9]+$/, // Alphanumérique uniquement
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Format email
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
        },
        age: {
            type: Number,
            min: 18,
            max: 99,
            default: 18,
        },
        role: {
            type: String,
            enum: ["user", "admin", "moderator"], // Rôles possibles
            default: "user",
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        bio: {
            type: String,
            validate: {
                validator: (value) => value.length <= 500, // Validation personnalisée
                message: "La bio ne peut pas dépasser 500 caractères.",
            },
        },
    });

    const User = mongoose.model("User", userSchema);

    module.exports = User;
    ```
