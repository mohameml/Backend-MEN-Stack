# cour 17 : **MongoDB Driver :**

## 1. **Introduction :**

-   **Définition:**

    > Un **MongoDB Driver** est une bibliothèque logicielle qui permet aux applications de communiquer directement avec une base de données MongoDB. Il agit comme une interface entre ton application et MongoDB, facilitant les opérations CRUD (Create, Read, Update, Delete) et les requêtes complexes.

-   **Caractéristiques principales :**

    -   **Langages multiples** : MongoDB propose des drivers officiels pour plusieurs langages (Node.js, Python, Java, C++, etc.).

    -   **API bas-niveau** : Offre un accès direct aux fonctionnalités MongoDB, comme la gestion des connexions, l'exécution des requêtes et les transactions.

    -   **Optimisation des performances** : Gère efficacement les connexions via des pools et optimise les interactions avec le serveur.

-   **Installation :`mongodb`**

    ```bash
    npm install mongodb
    ```

-   **Exemple avec le MongoDB Driver pour Node.js :**

    Connexion et interaction de base :

    ```javascript
    const { MongoClient } = require("mongodb");
    const uri = "mongodb://127.0.0.1:27017";

    async function main() {
        const client = new MongoClient(uri);
        try {
            await client.connect();
            const db = client.db("testDB");
            const collection = db.collection("testCollection");
            await collection.insertOne({ name: "Alice", age: 25 });
            console.log(await collection.find({}).toArray());
        } finally {
            await client.close();
        }
    }

    main().catch(console.error);
    ```

## 2. **`Mongoose :`**

-   **Défintion:**

    > **Mongoose** est une bibliothèque ODM (_Object Data Modeling_) pour Node.js qui fonctionne avec MongoDB. Elle fournit une abstraction plus haut niveau que le MongoDB Driver, en ajoutant des fonctionnalités comme la définition de schémas, la validation et la gestion des relations.

    > Un **ODM** (Object-Document Modeling) est une technique ou une bibliothèque qui facilite l'interaction entre une application et une base de données orientée documents (comme MongoDB). Il permet de mapper les documents JSON ou BSON stockés dans la base de données à des objets dans le langage de programmation utilisé (par exemple, des objets JavaScript en Node.js)

-   **Caractéristiques principales :**

    -   **Schémas** : Permet de définir une structure pour les documents MongoDB avec des types, des validations et des champs par défaut.
    -   **Middleware** : Offre des hooks pré/post pour les opérations sur les documents.
    -   **Modèles** : Lie les schémas à des collections MongoDB pour faciliter l'interaction.
    -   **Facilité d'utilisation** : Simplifie les opérations complexes grâce à une syntaxe intuitive.

-   **Installation :**

    ```bash
    npm install mongoose
    ```

-   **Connection :**

    ```javascript
    const mongoose = require("mongoose");

    mongoose
        .connect("mongodb+srv://username:password@host/nomDB?retryWrites=tru")
        .then(() => console.log("DB Connection successful !"));
    ```

### RQ : **Différences entre MongoDB Driver et Mongoose :**

| **Aspect**                 | **MongoDB Driver**                     | **Mongoose**                   |
| -------------------------- | -------------------------------------- | ------------------------------ |
| **Niveau d'abstraction**   | Bas : accès direct à MongoDB           | Haut : abstraction via schémas |
| **Schémas**                | Non pris en charge                     | Pris en charge                 |
| **Validation**             | Doit être implémentée manuellement     | Intégrée dans les schémas      |
| **Performances**           | Plus rapide pour les opérations brutes | Légèrement plus lent           |
| **Facilité d'utilisation** | Complexe pour les débutants            | Simple grâce à l'abstraction   |
