# cour 02 : **Types de Middelwere:**

## 1. **Middleware intégré : `express.json()` dans Express.js**

-   **Description**

    > Le middleware **`express.json()`** est intégré à Express.js depuis la version 4.16.0. Il permet de traiter automatiquement le corps des requêtes HTTP contenant des données JSON en le convertissant en un objet JavaScript accessible via `req.body`.

    -   Fonctionne uniquement avec des requêtes ayant un `Content-Type` égal à `application/json`.

    -   Retourne une erreur si le JSON envoyé est mal formé.

-   **Syntaxe :**

    ```javascript
    app.use(express.json());
    ```

-   **Exemple :**

    ```javascript
    const express = require("express");
    const app = express();

    // Ajouter le middleware pour parser le JSON
    app.use(express.json());

    // Route pour traiter une requête POST
    app.post("/data", (req, res) => {
        console.log(req.body); // Affiche le corps de la requête
        res.json({ message: "Données reçues avec succès", data: req.body });
    });

    const port = 3000;
    app.listen(port, () => {
        console.log(`Serveur démarré sur http://localhost:${port}`);
    });
    ```

    -   **Requête :**

        ```json
        POST /data
        Content-Type: application/json

        {
        "name": "Alice",
        "age": 25
        }
        ```

    -   **Sortie dans la console :**

        ```
        { name: 'Alice', age: 25 }
        ```

    -   **Réponse au client :**

        ```json
        {
            "message": "Données reçues avec succès",
            "data": {
                "name": "Alice",
                "age": 25
            }
        }
        ```

## 2. **Middleware Tiers dans Express**

-   **Description:**

    > Les **middlewares tiers** sont des middlewares fournis par des bibliothèques externes (ou tiers) et sont généralement utilisés pour étendre les fonctionnalités d'Express. Ces middlewares peuvent être utilisés pour une variété de tâches telles que la gestion des requêtes HTTP, la sécurité, l'authentification, le logging, la gestion des sessions, etc.

-   **`morgan`:**

    -   **Morgan** est une bibliothèque de middleware tiers très populaire pour Express qui facilite la gestion des logs des requêtes HTTP. Elle enregistre des informations comme la méthode HTTP, l'URL, le statut de la réponse, le temps de réponse, etc.

    -   Le **logging** est le processus de **suivi** et de **journalisation** des événements et des informations sur l'application pendant son exécution. Dans le contexte d'un serveur web, le logging permet de suivre les requêtes entrantes, les erreurs, les réponses envoyées, et d'autres informations importantes. Cela aide à déboguer, surveiller l'application et obtenir des informations sur son fonctionnement.

    -   Dans Express, un middleware de logging peut enregistrer des informations sur chaque requête, comme :

        -   Le **méthode HTTP** utilisée (GET, POST, etc.).
        -   L'**URL** demandée.
        -   Le **code de statut HTTP** renvoyé.
        -   Le **temps** qu'a pris le traitement de la requête.
        -   Et d'autres informations utiles.

-   **Syntaxe de Morgan**

    Une fois installé, vous pouvez utiliser **Morgan** comme middleware dans votre application Express. La syntaxe de base est la suivante :

    ```javascript
    const morgan = require("morgan");

    app.use(morgan("format"));
    ```

    L'argument **`'format'`** est une chaîne de caractères qui définit le format des logs. Morgan propose plusieurs formats prédéfinis comme :

    -   `'tiny'` : Affiche une version simplifiée du log.
    -   `'dev'` : Affiche des logs plus détaillés avec la couleur des codes de statut.
    -   `'common'` : Format utilisé pour les logs communs dans les serveurs web.
    -   `'combined'` : Format plus détaillé, souvent utilisé en production.

-   **Exemple d'utilisation de Morgan pour le Logging :**

    Voici un exemple simple d'application Express utilisant **Morgan** pour enregistrer les logs des requêtes HTTP :

    ```javascript
    const express = require("express");
    const morgan = require("morgan");
    const app = express();

    // Utiliser Morgan pour le logging des requêtes
    app.use(morgan("dev")); // Utilise le format 'dev' pour des logs colorés et détaillés

    // Exemple de route
    app.get("/", (req, res) => {
        res.send("Bienvenue sur le serveur Express !");
    });

    // Démarrer le serveur
    const port = 3000;
    app.listen(port, () => {
        console.log(`Serveur démarré sur http://localhost:${port}`);
    });
    ```
