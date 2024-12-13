# cour : **CRUD**

## 1. **CREATE :**

-   **Description**

    > Pour créer un nouveau document dans une collection, on peu utilisez la méthode `Model.create()`.

-   **Syntaxe**

    ```javascript
    const newObject = await Model.create(dataJSON);
    ```

-   **Exemple**

    ```javascript
    const User = require("./models/User");

    async function createUser() {
        const newUser = await User.create({
            username: "JohnDoe",
            email: "john@example.com",
            password: "12345",
        });
        console.log("Utilisateur créé:", newUser);
    }

    createUser();
    ```

## 2. **READ :**

-   **Définiton:**

    -   **`find`** :Récupère plusieurs documents correspondant à un critère.
    -   **`findOne :`** Récupère le premier document correspondant à un critère.
    -   **`findById`** Récupère un document spécifique via son `_id`.

-   **Syntaxe**

    ```javascript
    Model.find(query, projection, options);
    Model.findOne(query, projection, options);
    Model.findById(id, projection, options);
    ```

-   **Exemple :**

    ```javascript
    async function findUsers() {
        const users = await User.find(
            { username: "JohnDoe" },
            { email: 1, _id: 0 }
        );
        console.log("Utilisateurs trouvés:", users);
    }

    findUsers();
    ```

    ```javascript
    async function findOneUser() {
        const user = await User.findOne({ username: "JohnDoe" });
        console.log("Utilisateur trouvé:", user);
    }

    findOneUser();
    ```

    ```javascript
    async function findUserById() {
        const user = await User.findById("639abc1234def567890ghijk");
        console.log("Utilisateur trouvé par ID:", user);
    }

    findUserById();
    ```

## 3. **UPDATE :**

-   **Définition:**

    -   **`findByIdAndUpdate :`** Met à jour un document via son `_id` et retourne le document avant ou après modification.
    -   **`updateMany :`** Met à jour plusieurs documents correspondant à un critère.

-   **Syntaxe**

    ```javascript
    Model.findByIdAndUpdate(id, update, options);
    Model.updateMany(query, update, options);
    ```

    -   `id` : ID du document.
    -   `update` : Objet contenant les champs à modifier.
    -   `options` : `{ new: true }` pour retourner le document mis à jour.

-   **Exemple**

    ```javascript
    async function updateUser() {
        const updatedUser = await User.findByIdAndUpdate(
            "639abc1234def567890ghijk",
            { email: "newemail@example.com" },
            { new: true }
        );
        console.log("Utilisateur mis à jour:", updatedUser);
    }

    updateUser();
    ```

    ```javascript
    async function updateMultipleUsers() {
        const result = await User.updateMany(
            { username: "JohnDoe" },
            { password: "newpassword123" }
        );
        console.log("Documents mis à jour:", result.nModified);
    }

    updateMultipleUsers();
    ```

### 4. **DELETE :**

-   **Définition:**

    -   **`findByIdAndDelete :`** Supprime un document via son `_id`.

    -   **`deleteMany :`** Supprime plusieurs documents correspondant à un critère.

-   **Syntaxe**

    ```javascript
    Model.findByIdAndDelete(id);
    Model.deleteMany(query);
    ```

-   **Exemple**

    ```javascript
    async function deleteUserById() {
        const deletedUser = await User.findByIdAndDelete(
            "639abc1234def567890ghijk"
        );
        console.log("Utilisateur supprimé:", deletedUser);
    }

    deleteUserById();
    ```

    ```javascript
    async function deleteMultipleUsers() {
        const result = await User.deleteMany({ username: "JohnDoe" });
        console.log("Documents supprimés:", result.deletedCount);
    }

    deleteMultipleUsers();
    ```
