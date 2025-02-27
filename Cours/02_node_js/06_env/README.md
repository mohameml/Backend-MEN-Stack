# cour 13 : **variables d'environnement**

## 1. **Introduction:**

-   **Définition :**

    > Les **variables d'environnement** sont des paramètres configurables utilisés pour gérer des données sensibles ou spécifiques à un environnement d'exécution, comme les clés API, les configurations de base de données ou les paramètres de débogage.

    -   Elles permettent d'adapter l'application à différents environnements (développement, test, production) sans modifier directement le code source.

    -   Les variables d'environnement sont des paires clé-valeur accessibles au processus en cours d'exécution. Elles sont souvent définies dans des fichiers dédiés comme `.env` ou directement dans l'environnement système où l'application est exécutée.

-   **Utilisation dans Node.js:**

    -   Node.js fournit un objet global, `process.env`, pour accéder aux variables d'environnement. Cet objet contient toutes les variables disponibles pour le processus en cours.

## 2. **Fichier `config.env` et module `dotenv`**

-   **Définition:**

    > Le fichier **`config.env`** est un fichier texte simple utilisé pour stocker les variables d'environnement sous forme de paires clé-valeur. Il est souvent utilisé avec le module **`dotenv`** dans les applications Node.js pour charger ces variables dans l'environnement d'exécution.

-   **Fichier `config.env`**

    Le fichier `config.env` (ou `.env`, qui est plus communément utilisé) contient les configurations sensibles ou spécifiques à l'environnement. Voici un exemple typique :

    ```plaintext
    # Configuration du serveur
    PORT=5000

    # Configuration de la base de données
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=root
    DB_PASS=secretpassword

    # Autres configurations
    API_KEY=your-api-key
    NODE_ENV=development
    ```

    -   Chaque ligne représente une variable sous la forme `CLÉ=VALEUR`.
    -   Les commentaires commencent par `#`.
    -   Le fichier est souvent ajouté à `.gitignore` pour éviter de compromettre des informations sensibles.

-   **Module `dotenv`**

    > Le module **`dotenv`** est une bibliothèque Node.js utilisée pour charger les variables définies dans un fichier `.env` (ou tout autre fichier de configuration, comme `config.env`) dans `process.env`.

    ```javascript
    require("dotenv").config({ path: "./config.env" });

    console.log(process.env.API_KEY);
    ```

-   **Exemple complet :**

    -   **Contenu du fichier `config.env` :**

        ```plaintext
        PORT=4000
        DB_HOST=127.0.0.1
        DB_USER=admin
        DB_PASS=supersecurepassword
        NODE_ENV=development
        ```

    -   **Code dans `app.js` :**

        ```javascript
        require("dotenv").config({ path: "./config.env" });

        const express = require("express");
        const app = express();

        const port = process.env.PORT || 3000;

        app.get("/", (req, res) => {
            res.send("Hello, World!");
        });

        app.listen(port, () => {
            console.log(`Serveur démarré sur le port : ${port}`);
            console.log(`Mode : ${process.env.NODE_ENV}`);
        });
        ```
