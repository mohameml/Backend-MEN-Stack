# cour 03 : **Param MiddelWere:**

-   **Description :**

    > Le middleware **`router.param`** est une méthode dans Express qui vous permet d'attacher un middleware spécifique à une route lorsque certains paramètres de route (par exemple, `:id`) sont détectés dans une requête.

    -   Ce middleware est particulièrement utile pour :

        -   **Valider** ou **normaliser** un paramètre avant d'exécuter une route.

        -   **Précharger** des données associées à un paramètre (comme récupérer un utilisateur à partir d'une base de données à partir de son `id`).

        -   **Gérer les erreurs** si le paramètre est invalide ou manquant.

-   **Syntaxe :**

    ```javascript
    router.param("name", (req, res, next, value) => {
        // Middleware logique ici
        next(); // Passer au middleware suivant ou à la route
    });
    ```

    -   **`name`** : Nom du paramètre (par exemple, `id` dans une route `/:id`).
    -   **`callback(req, res, next, value)`** :
        -   **`req`** : L'objet de requête.
        -   **`res`** : L'objet de réponse.
        -   **`next`** : Une fonction pour passer au middleware ou à la route suivante.
        -   **`value`** : La valeur du paramètre de route.

-   **Exemple :**

    Supposons que nous ayons une API où nous voulons valider et charger les données associées à un utilisateur avant de répondre.

    ```javascript
    const express = require("express");
    const app = express();
    const router = express.Router();

    // Middleware de paramètre pour valider et traiter l'id
    router.param("id", (req, res, next, id) => {
        console.log(`Paramètre ID reçu : ${id}`);
        // Exemple de validation : Vérifier si l'id est un nombre
        if (isNaN(id)) {
            return res.status(400).send("ID invalide, doit être un nombre.");
        }

        // Charger une ressource fictive pour l'utilisateur
        req.user = { id: id, name: `User ${id}` }; // Simuler un utilisateur trouvé
        next(); // Passer à la route suivante
    });

    // Route avec le paramètre `id`
    router.get("/users/:id", (req, res) => {
        res.send(`Utilisateur trouvé : ${JSON.stringify(req.user)}`);
    });

    // Monter le routeur
    app.use(router);

    // Démarrer le serveur
    app.listen(3000, () => {
        console.log("Serveur démarré sur http://localhost:3000");
    });
    ```
