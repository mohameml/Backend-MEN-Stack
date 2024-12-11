# cour 06 : **Delete:**

## 1. **`deleteOne()`**

-   **Définition** :

    > Supprime **le premier document** qui correspond au filtre.

-   **Syntaxe** :

    ```javascript
    db.collection.deleteOne(filter, options);
    ```

    -   **`filter`** : Les critères pour sélectionner le document à supprimer.

-   **Exemple :**

    ```javascript
    db.users.deleteOne({ name: "Alice" });
    ```

    Supprimer un utilisateur âgé de moins de 18 ans vivant à Paris :

    ```javascript
    db.users.deleteOne({ age: { $lt: 18 }, city: "Paris" });
    ```

## **2. `deleteMany()`**

-   **Définition** :

    > Supprime **tous les documents** qui correspondent au filtre.

-   **Syntaxe** :

    ```javascript
    db.collection.deleteMany(filter, options);
    ```

    -   **`filter`** : Les critères pour sélectionner les documents à supprimer.

-   **Exemple :**

    Supprimer tous les utilisateurs vivant à Paris :

    ```javascript
    db.users.deleteMany({ city: "Paris" });
    ```

    Supprimer tous les utilisateurs âgés de moins de 18 ans ou vivant à "Londres" :

    ```javascript
    db.users.deleteMany({ $or: [{ age: { $lt: 18 } }, { city: "Londres" }] });
    ```

    Supprimer tous les documents :

    ```javascript
    db.users.deleteMany({});
    ```

### RQ : **Retour de ces méthodes**

Les deux méthodes renvoient un objet avec des informations sur la suppression :

```javascript
{
  "acknowledged": true,
  "deletedCount": 1 // Nombre de documents supprimés
}
```
