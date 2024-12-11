# cour : **CRUD**

## 1. **CREATE (Insertion de documents) :**

-   **Description :**

    > MongoDB fournit deux méthodes principales pour insérer des documents dans une collection : **`insertOne`** pour insérer un seul document et **`insertMany`** pour insérer plusieurs documents.

    -   La méthode `insertMany` insère plusieurs documents dans une collection en une seule opération. Si l'un des documents échoue (par exemple, duplication de clé), aucun document n'est inséré (par défaut).

-   **Syntaxe :**

    ```javascript
    db.collection.insertOne(document);
    db.collection.insertMany([document1, document2, ...])

    ```

    -   **`document`** : Le document JSON à insérer (clé-valeur).

-   **Exemple :**

    ```javascript
    db.utilisateurs.insertOne({
        nom: "Jean Dupont",
        âge: 30,
        email: "jean.dupont@example.com",
        actif: true,
    });
    ```

    ```javascript
    db.utilisateurs.insertMany([
        { nom: "Alice", âge: 25, email: "alice@example.com" },
        { nom: "Bob", âge: 28, email: "bob@example.com", actif: true },
        { nom: "Charlie", âge: 32, email: "charlie@example.com", actif: false },
    ]);
    ```

    -   **Résultat attendu :**

    ```json
    {
    "acknowledged": true,
    "insertedId": ObjectId("64bdf3e96d6e3c85fa4f9b9c")
    }
    ```

    ```json
    {
    "acknowledged": true,
    "insertedIds": {
        "0": ObjectId("64bdf41c6d6e3c85fa4f9b9d"),
        "1": ObjectId("64bdf41c6d6e3c85fa4f9b9e"),
        "2": ObjectId("64bdf41c6d6e3c85fa4f9b9f")
    }
    }
    ```

## 2. **READ (Lecture des documents)**

-   **Syntaxe :**

    Pour lire tous les documents d'une collection :

    ```javascript
    db.collection.find(query, projection);
    ```

    Pour lire un seul document :

    ```javascript
    db.collection.findOne(query, projection);
    ```

-   **Exemples :**

    -   Lire tous les documents :
        ```javascript
        db.utilisateurs.find();
        ```
    -   Lire avec un filtre (query) :
        ```javascript
        db.utilisateurs.find({ age: { $gte: 25 } }); // Âge supérieur ou égal à 25
        ```
    -   Lire avec une projection (afficher uniquement certains champs) :
        ```javascript
        db.utilisateurs.find({}, { nom: 1, _id: 0 }); // Afficher seulement les noms
        ```
    -   Lire un seul document :
        ```javascript
        db.utilisateurs.findOne({ nom: "Jean Dupont" });
        ```

-   **3. UPDATE (Mise à jour des documents) :**

-   **Syntaxe :**

    Pour mettre à jour un seul document :

    ```javascript
    db.collection.updateOne(filter, update);
    ```

    Pour mettre à jour plusieurs documents :

    ```javascript
    db.collection.updateMany(filter, update);
    ```

-   **Exemples :**

    -   Mettre à jour un champ :
        ```javascript
        db.utilisateurs.updateOne(
            { nom: "Jean Dupont" }, // Filtre
            { $set: { âge: 31 } } // Mise à jour
        );
        ```
    -   Ajouter un champ à tous les documents :
        ```javascript
        db.utilisateurs.updateMany(
            {}, // Aucun filtre, tous les documents
            { $set: { actif: true } }
        );
        ```
    -   Incrémenter un champ numérique :
        ```javascript
        db.utilisateurs.updateOne(
            { nom: "Alice" },
            { $inc: { âge: 1 } } // Âge augmenté de 1
        );
        ```

## **4. DELETE (Suppression de documents) :**

-   **Syntaxe :**

    Pour supprimer un seul document :

    ```javascript
    db.collection.deleteOne(filter);
    ```

    Pour supprimer plusieurs documents :

    ```javascript
    db.collection.deleteMany(filter);
    ```

-   **Exemples :**

    -   Supprimer un seul document :
        ```javascript
        db.utilisateurs.deleteOne({ nom: "Jean Dupont" });
        ```
    -   Supprimer plusieurs documents :
        ```javascript
        db.utilisateurs.deleteMany({ âge: { $lt: 25 } }); // Âge inférieur à 25
        ```
    -   Supprimer tous les documents :
        ```javascript
        db.utilisateurs.deleteMany({});
        ```
