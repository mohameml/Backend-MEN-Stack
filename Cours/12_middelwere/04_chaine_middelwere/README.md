# cour 04 : **Chaîne de Middleware dans Express**

-   **Description :**

    > Dans Express, vous pouvez associer une série de middlewares à une route spécifique en les fournissant comme arguments supplémentaires à la méthode de route (comme `app.get`, `app.post`, etc.). Cela permet d'exécuter plusieurs middlewares **séquentiellement** pour une seule requête avant de produire une réponse.

    -   **Une chaîne de middlewares** est une liste de fonctions middleware qui sont exécutées dans l'ordre où elles sont définies.

    -   Chaque middleware de la chaîne doit :

        -   **Exécuter sa logique spécifique.**
        -   Appeler **`next()`** pour passer au middleware suivant dans la chaîne.

    -   Si un middleware renvoie une réponse sans appeler `next()`, les middlewares suivants **ne seront pas exécutés**.

-   **Syntaxe :**

    ```javascript
    app.method('/route', middleware1, middleware2, ..., (req, res) => {
    // Gestion finale de la requête et envoi de la réponse
    });

    // ou :
    router('/route').method(middleware1, middleware2, ..., (req, res) => {
    // Gestion finale de la requête et envoi de la réponse
    })
    ```

    -   **`method`** : La méthode HTTP (comme `get`, `post`, etc.).
    -   **`route`** : L'URL cible de la requête.
    -   **`middlewareX`** : Les middlewares successifs exécutés avant la réponse finale.
    -   La fonction de rappel finale traite la requête après que tous les middlewares ont été exécutés.

-   **Exemple : Chaîne de middlewares**

    Voici un exemple avec trois middlewares exécutés avant d'envoyer une réponse :

    ```javascript
    const express = require("express");
    const app = express();

    // Middleware 1 : Logger la requête
    const logger = (req, res, next) => {
        console.log(`Requête reçue : ${req.method} ${req.url}`);
        next(); // Passer au middleware suivant
    };

    // Middleware 2 : Vérifier un token fictif dans l'en-tête
    const checkAuth = (req, res, next) => {
        const token = req.headers["authorization"];
        if (token !== "secrettoken") {
            return res.status(401).send("Accès non autorisé");
        }
        console.log("Authentification réussie");
        next(); // Passer au middleware suivant
    };

    // Middleware 3 : Ajouter une donnée dans l'objet req
    const addData = (req, res, next) => {
        req.customData = { user: "John Doe", role: "admin" };
        console.log("Données ajoutées à la requête");
        next(); // Passer au gestionnaire final
    };

    // Route avec la chaîne de middlewares
    app.get("/protected", logger, checkAuth, addData, (req, res) => {
        res.send(
            `Bienvenue, ${req.customData.user}! Vous êtes un ${req.customData.role}.`
        );
    });

    // Démarrer le serveur
    app.listen(3000, () => {
        console.log("Serveur démarré sur http://localhost:3000");
    });
    ```
