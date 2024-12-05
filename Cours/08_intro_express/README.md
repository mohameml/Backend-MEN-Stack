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

## 2. **`express`**

```js
const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.status("200").json({
        message: "Hello from the server express",
        app: "App Natours",
    });
});

app.post("/", (req, res) => {
    res.status("200").send("Hello you can post to this link ...");
});

const PORT = 3000;
app.listen(PORT, "127.0.0.1", () => {
    console.log(`App running on port ${PORT} ... `);
});
```
