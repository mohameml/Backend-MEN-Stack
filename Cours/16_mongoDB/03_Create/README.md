# cour : **Create :`insertion`**

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
