# cour 05 : **Update**

## 1. **`updateOne()`**

-   **Définition** :
    > Met à jour **un seul document** qui correspond aux critères, même si plusieurs documents correspondent.
-   **Syntaxe** :

    ```javascript
    db.collection.updateOne(filter, update, options);
    ```

    -   **`filter`** : Les critères pour sélectionner le document à mettre à jour.
    -   **`update`** : Les modifications à appliquer (opérateurs comme `$set`, `$inc`, etc.).
    -   **`options`** : Si `upsert: true` est spécifié, un nouveau document est inséré si aucun document ne correspond aux critères.

-   **Exemple** :

    Mettre à jour un utilisateur vivant à Paris pour ajouter un champ `status` avec la valeur `"active"`.

    ```javascript
    db.users.updateOne({ city: "Paris" }, { $set: { status: "active" } });
    ```

## 2. **`updateMany():`**

-   **Description:**

    > La méthode **`updateMany()`** est utilisée pour mettre à jour **plusieurs documents** dans une collection qui correspondent à un critère spécifié.

-   **Syntaxe :**

    ```javascript
    db.collection.updateMany(filter, update, options);
    ```

    -   **`filter`** : Les critères pour sélectionner les documents à mettre à jour.
    -   **`update`** : Les modifications à appliquer (utilise des opérateurs comme `$set`, `$inc`, etc.).

-   **Exemples :**

    Ajouter le champ `status` avec la valeur `"active"` à tous les utilisateurs vivant à Paris :

    ```javascript
    db.users.updateMany(
        { city: "Paris" }, // Critères de filtre
        { $set: { status: "active" } } // Modifications à appliquer
    );
    ```

    Augmenter l'âge de 1 pour tous les utilisateurs âgés de plus de 30 ans :

    ```javascript
    db.users.updateMany(
        { age: { $gt: 30 } }, // Critères de filtre
        { $inc: { age: 1 } } // Incrément de la valeur
    );
    ```

-   **Combiner plusieurs modifications**

    Changer la ville en "Marseille" et ajouter un champ `isUpdated` pour les utilisateurs âgés de moins de 25 ans :

    ```javascript
    db.users.updateMany(
        { age: { $lt: 25 } }, // Critères de filtre
        {
            $set: { city: "Marseille" }, // Modification 1
            $set: { isUpdated: true }, // Modification 2
        }
    );
    ```

-   **Supprimer un champ avec `$unset`**

    Supprimer le champ `temporary` pour tous les documents où il existe :

    ```javascript
    db.users.updateMany(
        { temporary: { $exists: true } }, // Critères de filtre
        { $unset: { temporary: "" } } // Suppression du champ
    );
    ```

### RQ : **Retour de la méthode**

La méthode retourne un objet avec les propriétés suivantes :

-   **`matchedCount`** : Le nombre de documents qui correspondent aux critères.
-   **`modifiedCount`** : Le nombre de documents effectivement modifiés.
-   **`upsertedId`** : L'identifiant du nouveau document inséré si `upsert: true`.
