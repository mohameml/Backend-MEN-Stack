# cour 04 : **Read : `Querying`**

## 1. **Introduction:**

-   **Description:**

    > La commande `find()` en MongoDB est utilisée pour interroger des documents dans une collection. Elle permet de récupérer des documents qui correspondent à certains critères de recherche spécifiés.

-   **Syntaxe:**

    ```javascript
    db.collection.find(query, projection);
    ```

    -   **`query` : `{keyName : {$op : value}}`** : (optionnel) Un objet qui spécifie les conditions de recherche. Si non spécifié, tous les documents sont retournés.
    -   **`projection` : `{keyName : 1/0}`** : (optionnel) Un objet qui spécifie les champs à inclure ou exclure dans le résultat. (1 pour inclure, 0 pour exclure).

-   **Exemples:**

    ```javascript
    // Récupérer tous les documents
    db.users.find();
    ```

    ```javascript
    // Récupérer les utilisateurs ayant le prénom "John" :
    db.users.find({ firstName: "John" }, { firstName: 1, age: 1 });
    ```

## 2. **`Query operations:`**

-   **$lt** (Less Than)

    -   **Définition** : Vérifie si une valeur est **strictement inférieure** à une valeur donnée.
    -   **Syntaxe** : `{ champ: { $lt: valeur } }`
    -   **Exemple** : Trouver les utilisateurs âgés de moins de 30 ans.
        ```javascript
        db.users.find({ age: { $lt: 30 } });
        ```

-   **$lte** (Less Than or Equal)

    -   **Définition** : Vérifie si une valeur est **inférieure ou égale** à une valeur donnée.
    -   **Syntaxe** : `{ champ: { $lte: valeur } }`
    -   **Exemple** : Trouver les utilisateurs âgés de 30 ans ou moins.
        ```javascript
        db.users.find({ age: { $lte: 30 } });
        ```

-   **$gt** (Greater Than)

    -   **Définition** : Vérifie si une valeur est **strictement supérieure** à une valeur donnée.
    -   **Syntaxe** : `{ champ: { $gt: valeur } }`
    -   **Exemple** : Trouver les utilisateurs âgés de plus de 30 ans.
        ```javascript
        db.users.find({ age: { $gt: 30 } });
        ```

-   **$gte** (Greater Than or Equal)

    -   **Définition** : Vérifie si une valeur est **supérieure ou égale** à une valeur donnée.
    -   **Syntaxe** : `{ champ: { $gte: valeur } }`
    -   **Exemple** : Trouver les utilisateurs âgés de 30 ans ou plus.
        ```javascript
        db.users.find({ age: { $gte: 30 } });
        ```

-   **$eq** (Equal)

    -   **Définition** : Vérifie si une valeur est **égale** à une valeur donnée.
    -   **Syntaxe** : `{ champ: { $eq: valeur } }`
    -   **Exemple** : Trouver les utilisateurs ayant exactement 30 ans.
        ```javascript
        db.users.find({ age: { $eq: 30 } });
        ```

-   **$ne** (Not Equal)

    -   **Définition** : Vérifie si une valeur est **différente** d'une valeur donnée.
    -   **Syntaxe** : `{ champ: { $ne: valeur } }`
    -   **Exemple** : Trouver les utilisateurs qui n'ont pas 30 ans.
        ```javascript
        db.users.find({ age: { $ne: 30 } });
        ```

-   **$in** (In)

    -   **Définition** : Vérifie si une valeur est **dans un ensemble** de valeurs spécifiées.
    -   **Syntaxe** : `{ champ: { $in: [valeur1, valeur2, ...] } }`
    -   **Exemple** : Trouver les utilisateurs vivant à "Paris" ou "Londres".
        ```javascript
        db.users.find({ city: { $in: ["Paris", "Londres"] } });
        ```

-   **$nin** (Not In)

    -   **Définition** : Vérifie si une valeur **n'est pas dans un ensemble** de valeurs spécifiées.
    -   **Syntaxe** : `{ champ: { $nin: [valeur1, valeur2, ...] } }`
    -   **Exemple** : Trouver les utilisateurs qui ne vivent pas à "Paris" ou "Londres".
        ```javascript
        db.users.find({ city: { $nin: ["Paris", "Londres"] } });
        ```

-   **$exists** (Exists)

    -   **Définition** : Vérifie si un champ **existe** ou non dans un document.
    -   **Syntaxe** : `{ champ: { $exists: true | false } }`
    -   **Exemple** : Trouver les documents ayant un champ `email`.
        ```javascript
        db.users.find({ email: { $exists: true } });
        ```

-   **$regex** (Regular Expression)

    -   **Définition** : Effectue une recherche textuelle avec une **expression régulière**.
    -   **Syntaxe** : `{ champ: { $regex: /motif/, $options: "i" } }`
    -   **Exemple** : Trouver les utilisateurs dont le prénom commence par "Jo".
        ```javascript
        db.users.find({ firstName: { $regex: "^Jo", $options: "i" } });
        ```

-   **$and** (And)

    -   **Définition** : Combine plusieurs conditions avec un **ET logique**.
    -   **Syntaxe** : `{ $and: [ { condition1 }, { condition2 } ] }`
    -   **Exemple** : Trouver les utilisateurs vivant à "Paris" et ayant plus de 25 ans.
        ```javascript
        db.users.find({ $and: [{ city: "Paris" }, { age: { $gt: 25 } }] });
        ```

-   **$or** (Or)

    -   **Définition** : Combine plusieurs conditions avec un **OU logique**.
    -   **Syntaxe** : `{ $or: [ { condition1 }, { condition2 } ] }`
    -   **Exemple** : Trouver les utilisateurs vivant à "Paris" ou "Londres".
        ```javascript
        db.users.find({ $or: [{ city: "Paris" }, { city: "Londres" }] });
        ```

-   **$not** (Not)

    -   **Définition** : Négocie une condition.
    -   **Syntaxe** : `{ champ: { $not: { condition } } }`
    -   **Exemple** : Trouver les utilisateurs n'ayant pas un âge supérieur à 30 ans.
        ```javascript
        db.users.find({ age: { $not: { $gt: 30 } } });
        ```

-   **$type** (Type)

    -   **Définition** : Vérifie si la valeur d'un champ correspond à un **type spécifique**.
    -   **Syntaxe** : `{ champ: { $type: "type" } }`
    -   **Exemple** : Trouver les documents où `age` est un entier.
        ```javascript
        db.users.find({ age: { $type: "int" } });
        ```
