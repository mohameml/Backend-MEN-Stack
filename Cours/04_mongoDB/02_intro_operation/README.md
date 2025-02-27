# cour : **CRUD**

## 1. **Introdcution:**

-   **`use <nomdatabase>`:**

    -   **Description :** Cette commande permet de basculer vers une base de données. si la base de données n'existe pas encore, elle sera créée lorsque vous y insérerez des données.

    -   **Syntaxe :**

        ```javascript
        use <nomdatabase>
        ```

    -   **Exemple :**

        ```javascript
        use boutique
        ```

        -   Si la base de données `boutique` existe déjà, MongoDB la sélectionne.
        -   Sinon, MongoDB attend que vous insériez des données pour la créer réellement.

-   **`db` :**

    -   **Description :** Le mot-clé `db` est une référence à la base de données actuellement sélectionnée. Il est utilisé pour exécuter des commandes sur la base de données courante.

    -   **Syntaxe :**

        ```javascript
        db;
        ```

    -   **Exemple :**

        ```javascript
        use boutique
        db
        ```

-   **`show databases` :**

    -   **Description :** Cette commande affiche toutes les bases de données existantes sur le serveur MongoDB.

    -   **Syntaxe :**

        ```javascript
        show databases
        ```

-   **`show collections`:**

    -   **Description :** Affiche toutes les collections de la base de données actuellement sélectionnée.

    -   **Syntaxe :**

        ```javascript
        show collections
        ```

## 2. **collection:**

-   **Description :**

    -   Une collection dans MongoDB est un conteneur pour stocker des documents. Elle est similaire à une table dans une base de données relationnelle.

    -   MongoDB **crée automatiquement une collection** la première fois que vous insérez un document `db.nomCollection.insertOne({})`. Cependant, vous pouvez aussi créer une collection explicitement à l'aide de la commande `db.createCollection()`.

-   **Syntaxe :**

    ```javascript
    db.createCollection(name, options);
    ```

    -   **`name`** : Nom de la collection (obligatoire).
    -   **`options`** : Un document optionnel pour configurer la collection, comprenant des paramètres comme :
        -   **`capped`** : (booléen) Définit si la collection est limitée en taille.
        -   **`size`** : (nombre) Taille maximale pour une collection "capped" (en octets).
        -   **`max`** : (nombre) Nombre maximum de documents pour une collection "capped".
        -   **`validator`** : (document) Définit des règles de validation pour les documents.

-   **Exemples :**

    ```javascript
    db.createCollection("logs", {
        capped: true,
        size: 1024, // 1 Ko
        max: 100, // Maximum 100 documents
    });
    ```

    -   Cela crée une collection appelée `logs` :
        -   Limite de taille : 1 Ko.
        -   Limite de documents : 100.

-   **Créer une collection avec validation des documents :**

    ```javascript
    db.createCollection("utilisateurs", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["nom", "email"],
                properties: {
                    nom: {
                        bsonType: "string",
                        description:
                            "Le nom est obligatoire et doit être une chaîne.",
                    },
                    email: {
                        bsonType: "string",
                        pattern: "@.+\\..+",
                        description:
                            "L'email est obligatoire et doit être valide.",
                    },
                },
            },
        },
    });
    ```

    -   Cela crée une collection `utilisateurs` où :
        -   Chaque document doit avoir les champs `nom` et `email`.
        -   `email` doit être une chaîne valide au format d'une adresse email.
