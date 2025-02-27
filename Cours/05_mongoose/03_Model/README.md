# cour : **Model**

## 1. **Model:**

-   **Définition :**

    > Un **modèle** dans Mongoose est une classe construite à partir d'un schéma. Il représente une collection dans MongoDB et offre une interface pour interagir avec cette collection. Grâce à un modèle, tu peux :

    -   Effectuer des opérations CRUD (Create, Read, Update, Delete).
    -   Valider et sauvegarder des documents dans la base.
    -   Utiliser des méthodes personnalisées ou statiques.

-   **Syntaxe :**

    Pour créer un modèle en Mongoose, on utilise la méthode `mongoose.model()`. Voici la syntaxe générale :

    ```javascript
    const mongoose = require("mongoose");

    // Définition d'un schéma
    const nomDuSchema = new mongoose.Schema({
        champ1: { type: TypeDeDonnée, options },
        champ2: TypeDeDonnée,
        // Autres champs
    });

    // Création d'un modèle à partir du schéma
    const NomDuModele = mongoose.model("NomDeLaCollection", nomDuSchema);
    ```

-   **Exemple :**

    ```javascript
    const mongoose = require("mongoose");

    // Définition du schéma d'un utilisateur
    const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true, // Champ obligatoire
            minlength: 3, // Longueur minimale
            maxlength: 50, // Longueur maximale
        },
        email: {
            type: String,
            unique: true, // Doit être unique
            required: true,
            match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Validation regex
        },
        age: {
            type: Number,
            required: true,
            min: 18, // Âge minimum
        },
        hobbies: {
            type: [String], // Tableau de chaînes
            default: [], // Par défaut, tableau vide
        },
        createdAt: {
            type: Date,
            default: Date.now, // Par défaut, la date actuelle
        },
    });

    // Création du modèle basé sur le schéma
    const User = mongoose.model("User", userSchema);

    // Exportation pour utilisation dans d'autres fichiers
    module.exports = User;
    ```

## 2. **Utilisation d'un Model:**

-   **Définition:**

    > Une fois qu’un modèle est défini avec un schéma, on peut l’utiliser pour manipuler les données de la collection associée.

    -   `new Model():` Crée un nouvel objet basé sur le modèle défini. Cet objet correspond à un futur document dans la collection MongoDB.

-   **Syntaxe** :

    ```javascript
    const instance = new Model(data);
    instance.save().then().catch();
    ```

    -   `save()` : Sauvegarde l’instance créée dans la collection associée à MongoDB. Si des validations sont définies dans le schéma, elles sont vérifiées avant l’enregistrement.

-   **Exemple** :

    ```javascript
    const user = new User({
        username: "johndoe",
        email: "john@example.com",
        password: "securepassword",
        age: 25,
        role: "user",
    });

    user.save()
        .then((doc) => console.log("User saved:", doc))
        .catch((err) => console.error("Error saving user:", err));
    ```
