# cour 03 : **Module `http`**

## 1. **Introduction:**

-   **Définition:**

    > Le module **`http`** de Node.js est l'un des modules intégrés qui permet de créer des serveurs et de traiter les requêtes HTTP (Hypertext Transfer Protocol). Il fournit des fonctionnalités pour créer un serveur web, gérer les requêtes et répondre aux clients. Ce module est essentiel pour la création d'API RESTful, de services web et de sites web dynamiques.

    -   **Le module `http` permet de :**

        -   Créer un serveur qui écoute les requêtes HTTP.
        -   Envoyer des réponses HTTP aux clients.
        -   Gérer les en-têtes HTTP et les corps des requêtes/réponses.

-   **Créer un Serveur avec `http.createServer()` :**

    -   La fonction **`http.createServer()`** permet de créer un serveur HTTP. Elle prend une fonction de rappel (callback) qui est exécutée chaque fois qu'une requête est reçue par le serveur. Cette fonction de rappel prend deux arguments :

        -   **`req` (Request)** : L'objet représentant la requête du client.
        -   **`res` (Response)** : L'objet permettant d'envoyer une réponse au client.

    -   Une fois que le serveur est créé, vous devez appeler **`server.listen()`** pour démarrer le serveur et lui dire d'écouter les requêtes sur un port spécifique.

-   **Exemple de Serveur HTTP Simple :**

    ```javascript
    // Importation du module 'http'
    const http = require("http");

    // Création du serveur
    const server = http.createServer((req, res) => {
        // Définir le type de contenu de la réponse
        res.writeHead(200, { "Content-Type": "text/plain" });

        // Vérifier l'URL de la requête
        if (req.url === "/") {
            res.end("Hello from the Homepage!");
        } else if (req.url === "/about") {
            res.end("This is the About page");
        } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Page not found");
        }
    });

    // Démarrer le serveur et écouter sur le port 8000
    server.listen(8000, "127.0.0.1", () => {
        console.log("Server is running on http://localhost:8000");
    });
    ```

-   **Tester le serveur :**

    1. Démarrez le serveur en exécutant le fichier JavaScript dans le terminal :

        ```bash
        node server.js
        ```

    2. Ouvrez un navigateur web et accédez à l'URL `http://localhost:8000/` pour voir la réponse "Hello from the Homepage!".

    3. Vous pouvez également essayer `http://localhost:8000/about` pour voir la réponse "This is the About page".

## 2. **Objet `request`:**

-   **Description:**

    > L'objet **`request`** (`req` dans la plupart des exemples) représente la requête HTTP envoyée par le client au serveur. Cet objet contient des informations sur la requête, telles que les en-têtes, l'URL demandée, les paramètres de la requête, et d'autres données liées à la requête HTTP. Vous pouvez utiliser cet objet pour extraire et analyser ces informations.

-   **Attributs Essentiels de l'Objet `request` (req)**

    1. **`req.url`** :

        - Contient l'URL de la requête, c'est-à-dire la partie après le domaine ou l'adresse IP dans l'URL (ex. `/home`, `/about`).
        - Exemple :
            ```javascript
            console.log(req.url); // '/home'
            ```

    2. **`req.method`** :

        - Contient la méthode HTTP de la requête (GET, POST, PUT, DELETE, etc.).
        - Exemple :
            ```javascript
            console.log(req.method); // 'GET'
            ```

    3. **`req.headers`** :

        - Contient les en-têtes de la requête HTTP sous forme d'un objet. Vous pouvez y accéder pour récupérer des informations sur la requête, comme les types de contenu acceptés ou les informations sur l'agent utilisateur (user agent).
        - Exemple :
            ```javascript
            console.log(req.headers); // { 'content-type': 'text/html', ... }
            ```

    4. **`req.body`** (dans les requêtes POST, PUT, etc.) :

        - Contient le corps de la requête, qui peut être utilisé pour récupérer des données envoyées par le client (par exemple, lors d'une soumission de formulaire ou d'une requête JSON). Cette propriété nécessite souvent un middleware comme `body-parser` pour l'analyse.
        - Exemple :
            ```javascript
            console.log(req.body); // { name: 'John', age: 30 }
            ```

    5. **`req.query`** :

        - Contient les paramètres de la requête envoyés dans l'URL sous forme de chaîne de requête. Par exemple, pour l'URL `/search?q=node`, `req.query.q` serait `'node'`.
        - Exemple :
            ```javascript
            console.log(req.query.q); // 'node'
            ```

    6. **`req.params`** :

        - Contient les paramètres extraits de l'URL lorsque vous définissez des routes dynamiques. Par exemple, dans une route comme `/user/:id`, `req.params.id` contiendrait l'ID de l'utilisateur.
        - Exemple :
            ```javascript
            // Pour une route '/user/123'
            console.log(req.params.id); // '123'
            ```

    7. **`req.cookies`** (si des cookies sont envoyés) :

        - Contient les cookies envoyés par le client. Il nécessite souvent un middleware comme `cookie-parser` pour l'analyse des cookies.
        - Exemple :
            ```javascript
            console.log(req.cookies.sessionId); // 'abc123'
            ```

    8. **`req.ip`** :
        - Contient l'adresse IP du client qui a envoyé la requête.
        - Exemple :
            ```javascript
            console.log(req.ip); // '192.168.1.1'
            ```

-   **Exemple d'Utilisation de l'Objet `request`**

    Voici un exemple d'un serveur HTTP en Node.js utilisant l'objet `req` pour gérer les requêtes et envoyer des réponses personnalisées :

    ```javascript
    const http = require("http");
    const url = require("url");

    const server = http.createServer((req, res) => {
        // Utiliser l'URL de la requête
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;
        const query = parsedUrl.query;

        // Log de la méthode HTTP et de l'URL
        console.log(`Méthode: ${req.method}, URL: ${req.url}`);

        // Vérifier les paramètres de la requête
        if (pathname === "/greet") {
            const name = query.name || "Guest";
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(`Hello, ${name}!`);
        } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Page not found");
        }
    });

    // Démarrer le serveur
    server.listen(8000, () => {
        console.log("Server is running on http://localhost:8000");
    });
    ```

## 3. **Objet `response`:**

-   **Description:**

    > L'objet **`response`** (`res` dans la plupart des exemples) est utilisé pour envoyer une réponse HTTP au client dans un serveur Node.js créé avec le module **`http`**. Cet objet contient plusieurs attributs et méthodes que vous pouvez utiliser pour configurer et envoyer la réponse au client.

-   **Attributs Essentiels de l'Objet `response` (res)**

    | **Attribut**        | **Description**                                           |
    | ------------------- | --------------------------------------------------------- |
    | `res.statusCode`    | Code de statut HTTP de la réponse (ex. 200, 404, etc.)    |
    | `res.statusMessage` | Message de statut HTTP (ex. "OK", "Not Found")            |
    | `res.headersSent`   | Indique si les en-têtes ont déjà été envoyés              |
    | `res.locals`        | Utilisé dans Express pour stocker des données spécifiques |

-   **Méthodes Essentielles de l'Objet `response` (res)**

    1. **`res.writeHead(statusCode, [headers])`** :

        - Définit les en-têtes de la réponse HTTP et le code de statut.
        - Le code de statut est obligatoire, mais les en-têtes sont optionnels.
        - Exemple :
            ```javascript
            res.writeHead(200, { "Content-Type": "text/plain" });
            ```

    2. **`res.setHeader(name, value)`** :

        - Définit un en-tête HTTP spécifique pour la réponse.
        - Exemple :
            ```javascript
            res.setHeader("Content-Type", "text/html");
            res.setHeader("X-Powered-By", "Node.js");
            ```

    3. **`res.getHeader(name)`** :

        - Obtient la valeur d'un en-tête HTTP déjà défini pour la réponse.
        - Exemple :
            ```javascript
            const contentType = res.getHeader("Content-Type");
            console.log(contentType); // Affiche le type de contenu
            ```

    4. **`res.write(chunk, [encoding])`** :

        - Permet d'envoyer une partie de la réponse avant d'appeler `res.end()`.
        - Utilisé si vous voulez envoyer un contenu en plusieurs morceaux (par exemple, pour de gros fichiers).
        - Exemple :
            ```javascript
            res.write("Hello, ");
            res.write("World!");
            ```

    5. **`res.end([data], [encoding])`** :

        - Terminer la réponse et l'envoyer au client.
        - Le paramètre **`data`** (optionnel) est le contenu que vous souhaitez envoyer dans la réponse.
        - Exemple :
            ```javascript
            res.end("Hello from the server!");
            ```

    6. **`res.sendFile(path, [options], [callback])`** :
        - Permet d'envoyer un fichier en réponse. Cette méthode n'est disponible que dans des frameworks comme **Express** (elle n'existe pas directement dans Node.js natif).
        - Exemple :
            ```javascript
            res.sendFile(path.join(__dirname, "public", "index.html"));
            ```
