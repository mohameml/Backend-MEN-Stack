# cour 10 : **Request && Response Objects**

## 1. **`Request Object:`**

-   **Description**

    > L’objet **`req`** (abréviation de "request") dans Express.js représente la requête HTTP envoyée par le client. Il contient des informations cruciales sur la requête, comme les paramètres, le corps, les en-têtes, et bien plus.

    -   Le **`req`** est une instance de la classe **`IncomingMessage`** de Node.js, enrichie avec des propriétés spécifiques à Express.js.

    -   Il permet d’accéder à tout ce qui est envoyé par le client (URL, méthode HTTP, corps, en-têtes, etc.).

    -   Il est utilisé pour lire les données de la requête et les traiter dans les routes ou middlewares.

-   **Attributs essentiels de `req`**

    | **Attribut**          | **Description**                                                                                             |
    | --------------------- | ----------------------------------------------------------------------------------------------------------- |
    | **`req.method`**      | La méthode HTTP utilisée (ex : `GET`, `POST`, `PUT`, `DELETE`, etc.).                                       |
    | **`req.url`**         | L’URL complète de la requête.                                                                               |
    | **`req.path`**        | Le chemin de la requête (sans les paramètres de requête).                                                   |
    | **`req.params`**      | Contient les paramètres dynamiques des routes définis avec `:` (ex : `/user/:id`).                          |
    | **`req.query`**       | Contient les paramètres de requête envoyés dans l’URL après le `?`.                                         |
    | **`req.body`**        | Contient les données envoyées dans le corps de la requête (nécessite un middleware comme `express.json()`). |
    | **`req.headers`**     | Contient les en-têtes HTTP envoyés par le client.                                                           |
    | **`req.cookies`**     | Contient les cookies envoyés par le client (nécessite un middleware comme `cookie-parser`).                 |
    | **`req.ip`**          | L’adresse IP du client.                                                                                     |
    | **`req.protocol`**    | Le protocole utilisé (`http` ou `https`).                                                                   |
    | **`req.hostname`**    | Le nom d’hôte de la requête (sans le port).                                                                 |
    | **`req.originalUrl`** | L’URL originale demandée par le client, incluant les paramètres de requête.                                 |
    | **`req.secure`**      | Renvoie `true` si la requête utilise HTTPS, sinon `false`.                                                  |

-   **Méthodes courantes de `req`**

    | **Méthode**               | **Description**                                                                                        |
    | ------------------------- | ------------------------------------------------------------------------------------------------------ |
    | **`req.get(headerName)`** | Renvoie la valeur d’un en-tête spécifique (ex : `req.get('Content-Type')`).                            |
    | **`req.is(type)`**        | Vérifie si le type MIME de la requête correspond au type spécifié (ex : `req.is('application/json')`). |
    | **`req.accepts(types)`**  | Vérifie si le client accepte un ou plusieurs types spécifiés (ex : `req.accepts(['html', 'json'])`).   |

-   **Exemple pratique avec `req`**

    ```javascript
    const express = require("express");
    const app = express();

    app.use(express.json()); // Middleware pour parser les données JSON dans req.body

    // Route pour démontrer les attributs de req
    app.get("/user/:id", (req, res) => {
        console.log("Méthode HTTP :", req.method); // Affiche la méthode HTTP
        console.log("URL :", req.url); // Affiche l'URL complète
        console.log("Path :", req.path); // Affiche le chemin
        console.log("Params :", req.params); // Affiche les paramètres dynamiques
        console.log("Query :", req.query); // Affiche les paramètres de requête
        console.log("Headers :", req.headers); // Affiche les en-têtes

        const response = {
            method: req.method,
            url: req.url,
            path: req.path,
            params: req.params,
            query: req.query,
            headers: req.headers,
        };

        res.json(response); // Renvoie un JSON avec les détails
    });

    // Route pour démontrer req.body
    app.post("/data", (req, res) => {
        console.log("Données reçues dans req.body :", req.body);
        res.send("Données reçues !");
    });

    // Démarrer le serveur
    const port = 3000;
    app.listen(port, () => {
        console.log(`Serveur démarré sur http://localhost:${port}`);
    });
    ```

## 2. **`Response Object:`**

-   **Description**

    > L’objet **`res`** (abréviation de "response") dans Express.js représente la **réponse HTTP** que le serveur envoie au client. Il contient des méthodes et des propriétés permettant de définir le contenu de la réponse, les en-têtes, le statut, et bien plus.

    -   Le **`res`** est une instance de la classe **`ServerResponse`** de Node.js, enrichie par Express.js.

-   **Attributs essentiels de `res`**

    | **Attribut**          | **Description**                                                                    |
    | --------------------- | ---------------------------------------------------------------------------------- |
    | **`res.headersSent`** | Renvoie `true` si les en-têtes ont déjà été envoyés au client.                     |
    | **`res.locals`**      | Un objet utilisé pour transmettre des données locales accessibles dans la réponse. |

-   **Méthodes principales de `res`**

    | **Méthode**                     | **Description**                                                                            |
    | ------------------------------- | ------------------------------------------------------------------------------------------ |
    | **`res.status(code)`**          | Définit le code de statut HTTP (ex. : `200`, `404`, `500`, etc.).                          |
    | **`res.set(field, value)`**     | Définit un en-tête HTTP.                                                                   |
    | **`res.get(field)`**            | Récupère la valeur d’un en-tête défini.                                                    |
    | **`res.send(data)`**            | Envoie une réponse avec les données spécifiées. Peut contenir du texte, JSON, ou un objet. |
    | **`res.json(data)`**            | Envoie une réponse JSON.                                                                   |
    | **`res.sendFile(path)`**        | Envoie un fichier en réponse au client.                                                    |
    | **`res.redirect(url)`**         | Redirige le client vers une autre URL.                                                     |
    | **`res.render(view, options)`** | Rendu d’une vue (template) avec des options, si un moteur de rendu est configuré.          |
    | **`res.type(type)`**            | Définit le type MIME de la réponse.                                                        |
    | **`res.end()`**                 | Termine la réponse sans envoyer de contenu.                                                |

-   **Exemple :**

    ```javascript
    const express = require("express");
    const app = express();

    // Route 1 : Réponse simple
    app.get("/", (req, res) => {
        res.status(200).send("Page d'accueil");
    });

    // Route 2 : Réponse JSON
    app.get("/user", (req, res) => {
        res.status(200).json({ name: "Alice", age: 30 });
    });

    // Route 3 : Redirection
    app.get("/old-page", (req, res) => {
        res.redirect("/new-page");
    });

    app.get("/new-page", (req, res) => {
        res.send("Vous avez été redirigé vers la nouvelle page.");
    });

    // Route 4 : Envoi de fichier
    const path = require("path");
    app.get("/download", (req, res) => {
        const filePath = path.join(__dirname, "example.txt");
        res.sendFile(filePath);
    });

    // Démarrage du serveur
    const port = 3000;
    app.listen(port, () => {
        console.log(`Serveur démarré sur http://localhost:${port}`);
    });
    ```
