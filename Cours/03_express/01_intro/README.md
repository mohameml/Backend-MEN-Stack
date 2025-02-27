# cour : **Express JS :**

## 1. **Introduction à Express.js**

-   **Definition :**

    > Express.js est un framework web rapide, minimaliste et flexible pour Node.js. Il facilite la création d'applications web et d'API en fournissant une interface simple pour gérer les requêtes, les réponses et les middlewares. Express est souvent décrit comme une couche mince au-dessus de Node.js, conçue pour simplifier le développement de serveurs et d'applications web.

-   **Ce qu'on peut faire avec Express.js :** Express.js est extrêmement polyvalent et permet de réaliser une grande variété de tâches dans le développement web :

    -   **Création de serveurs web :**

        -   Développer des serveurs HTTP simples pour gérer les requêtes et envoyer des réponses.
        -   Fournir des pages HTML, CSS, et JavaScript à partir du serveur.

    -   **Développement d'API RESTful :**

        -   Créer des routes pour différents points d’accès (GET, POST, PUT, DELETE, etc.).
        -   Récupérer et envoyer des données JSON aux clients (comme les navigateurs ou d'autres applications).

    -   **Gestion des routes :**

        -   Gérer les différentes URL/endpoints de votre application.
        -   Support pour les paramètres dynamiques dans les URLs (e.g., `/user/:id`).

    -   **Utilisation de middlewares :**

        -   Ajouter des fonctionnalités spécifiques à vos requêtes et réponses (comme l’authentification, le traitement des fichiers, ou les logs).
        -   Middleware intégré ou personnalisé pour analyser les corps de requêtes ou gérer les cookies.

    -   **Intégration avec des bases de données :**

        -   Connecter et interagir avec des bases de données (MongoDB, MySQL, PostgreSQL, etc.).
        -   Faciliter la gestion des données grâce à des bibliothèques comme Mongoose ou Sequelize.

## 2. **`server in express :`**

-   **Description**

    -   **`express()`** : C'est une fonction du framework Express.js qui initialise une application Express, cette application représente le serveur HTTP et vous permet de définir des routes, des middlewares, et de gérer les requêtes et réponses.

    -   **`app.listen(port, callback)`** : C'est une méthode utilisée pour démarrer le serveur et l'écouter sur un port spécifié.

-   **Syntaxe**

    ```javascript
    const express = require("express"); // Importer le module express
    const app = express(); // Initialiser l'application

    // Routes ou middlewares ici

    app.listen(port, [hostname], callback);
    ```

    -   **`port`** : Port d'écoute (par exemple : `3000`).
    -   **`hostname`** _(optionnel)_ : Nom d'hôte (par défaut : `'localhost'`).
    -   **`callback`** _(optionnel)_ : Une fonction exécutée après le démarrage du serveur.

-   **Exemple basique**

    Voici un exemple d'un serveur minimaliste :

    ```javascript
    // Importation d'Express
    const express = require("express");

    // Initialisation de l'application
    const app = express();

    // Définir une route GET à la racine
    app.get("/", (req, res) => {
        res.send("Bienvenue sur mon serveur Express !");
    });

    // Démarrer le serveur sur le port 3000
    const port = 3000;
    app.listen(port, () => {
        console.log(`Serveur démarré sur http://localhost:${port}`);
    });
    ```
