# cour 10 : **Routes**

## 1. **`routes in express:`**

-   **Description**

    > Les routes dans Express permettent de définir la manière dont une application doit répondre à une requête HTTP effectuée sur une URL ou un chemin spécifique, en utilisant une méthode HTTP (GET, POST, PATCH, DELETE, etc.).

-   **Méthodes principales :**

    -   **`GET`** : Récupérer des données.
    -   **`POST`** : Envoyer ou créer de nouvelles données.
    -   **`PATCH`** : Modifier partiellement des données existantes.
    -   **`DELETE`** : Supprimer des données.

-   **Syntaxe**

    ```javascript
    app.nomDeMethode(path, handler);
    ```

    -   **`nomDeMethode`** : Méthode HTTP comme `get`, `post`, `patch`, ou `delete`.
    -   **`path`** : URL ou chemin de la route (par exemple : `/`, `/users`, etc.).
    -   **`handler`** : Fonction avec deux paramètres principaux :
        -   **`req`** : Objet représentant la requête entrante.
        -   **`res`** : Objet permettant de répondre à la requête.

-   **Exemple complet avec plusieurs méthodes**

    Voici un exemple combinant les méthodes HTTP principales dans une même application :

    ```javascript
    const express = require("express");
    const app = express();

    app.use(express.json()); // Middleware pour parser le JSON dans les requêtes

    // GET - Récupérer la liste des utilisateurs
    app.get("/users", (req, res) => {
        res.send(["Utilisateur 1", "Utilisateur 2", "Utilisateur 3"]);
    });

    // POST - Créer un nouvel utilisateur
    app.post("/users", (req, res) => {
        const newUser = req.body; // Données envoyées dans la requête
        res.send(`Nouvel utilisateur créé : ${JSON.stringify(newUser)}`);
    });

    // PATCH - Mettre à jour partiellement un utilisateur
    app.patch("/users/:id", (req, res) => {
        const userId = req.params.id;
        const updates = req.body; // Données de mise à jour
        res.send(
            `Utilisateur ${userId} mis à jour avec : ${JSON.stringify(updates)}`
        );
    });

    // DELETE - Supprimer un utilisateur
    app.delete("/users/:id", (req, res) => {
        const userId = req.params.id;
        res.send(`Utilisateur ${userId} supprimé.`);
    });

    // Démarrer le serveur
    const port = 3000;
    app.listen(port, () => {
        console.log(`Serveur démarré sur http://localhost:${port}`);
    });
    ```

## 2. **Routes with variables:**

-   **Description:**

    > Les routes en Express.js peuvent inclure des **variables dynamiques** dans leur chemin. Ces variables sont définies à l’aide de la syntaxe `:nom` et permettent de capturer des valeurs spécifiques de l’URL. Ces valeurs sont accessibles via **`req.params`**.

    -   Les **variables dynamiques** sont des parties du chemin d'une route précédées de deux-points (`:`), par exemple, `/endpoint/:x`.

    -   Elles permettent de rendre les routes flexibles et de capturer les données directement depuis l’URL sans utiliser les paramètres de requête (`req.query`).

    -   Si une variable est suivie d’un **`?`**, elle devient **optionnelle**, ce qui signifie que cette partie de la route peut être omise.

-   **Syntaxe :**

    ```javascript
    app.METHOD("/route/:param1/:param2/:param3?", (req, res) => {
        // Access variables with req.params
    });
    ```

    -   **`METHOD`** : La méthode HTTP (get, post, etc.).
    -   **`/route/:param1/:param2/:param3?`** :
        -   `param1`, `param2` : Variables obligatoires.
        -   `param3?` : Variable optionnelle.
    -   **`req.params`** : Contient un objet avec les valeurs des variables dynamiques.

-   **Exemple pratique**

    ```javascript
    app.get("/operation/:x/:y/:op?", (req, res) => {
        const x = parseFloat(req.params.x);
        const y = parseFloat(req.params.y);
        const op = req.params.op || "add"; // Valeur par défaut : 'add'

        let result;
        switch (op) {
            case "add":
                result = x + y;
                break;
            case "subtract":
                result = x - y;
                break;
            case "multiply":
                result = x * y;
                break;
            case "divide":
                result = y !== 0 ? x / y : "Erreur : division par zéro";
                break;
            default:
                return res.status(400).send("Opération non supportée");
        }

        res.send(`Résultat : ${result}`);
    });
    ```

## 3. **La méthode `app.route()` dans Express.js :**

-   **Description**

    > La méthode **`app.route()`** permet de **regrouper** plusieurs gestionnaires (handlers) pour une même route, mais pour **différentes méthodes HTTP**. Cela améliore la lisibilité et la gestion du code en évitant la répétition.

    -   `app.route()` est une méthode utilisée pour créer une **route spécifique** et y attacher différents gestionnaires HTTP (`GET`, `POST`, `PUT`, etc.).

    -   Contrairement à `app.METHOD(path, handler)`, elle regroupe toutes les opérations pour une route donnée dans une seule définition.

    -   Chaque méthode HTTP est liée à cette route via des appels enchaînés.

-   **Syntaxe**

    ```javascript
    app.route("/route")
        .get((req, res) => {
            // Code pour la méthode GET
        })
        .post((req, res) => {
            // Code pour la méthode POST
        })
        .put((req, res) => {
            // Code pour la méthode PUT
        })
        .delete((req, res) => {
            // Code pour la méthode DELETE
        });
    ```

    -   **`app.route('/route')`** : Spécifie la route cible.
    -   **`.METHOD(callback)`** : Définit un gestionnaire pour une méthode HTTP spécifique.
    -   Les méthodes peuvent être enchaînées directement.

-   **Exemple simple**

    ```javascript
    const express = require("express");
    const app = express();

    app.route("/user")
        .get((req, res) => {
            res.send("GET: Informations utilisateur");
        })
        .post((req, res) => {
            res.send("POST: Création d'un utilisateur");
        })
        .put((req, res) => {
            res.send("PUT: Mise à jour des informations utilisateur");
        })
        .delete((req, res) => {
            res.send("DELETE: Suppression d'un utilisateur");
        });

    const port = 3000;
    app.listen(port, () => {
        console.log(`Serveur démarré sur http://localhost:${port}`);
    });
    ```

## 4. **`express.Router()`:**

-   **Description et Définition :**

    -   **`express.Router()`** crée un objet **routeur** dans Express qui contient des routes et des middlewares. Ce routeur peut être monté sur une route spécifique dans votre application principale.

    -   Cela vous permet de **séparer la logique** de l'application en différentes sections (par exemple, les routes des utilisateurs, les routes des produits, etc.), rendant votre code plus clair et plus organisé.

    -   Un routeur agit comme un middleware, il intercepte les requêtes et les dirige vers les gestionnaires de routes correspondants.

    -   Vous pouvez créer plusieurs routeurs pour gérer différentes parties de l'application et les monter à différents endroits.

-   **Syntaxe :**

    -   **userRouter.js**

        ```javascript
        const express = require("express");
        const router = express.Router();
        router.get("/route1", (req, res) => {
            res.send("Réponse pour la route1");
        });

        router.get("/route2", (req, res) => {
            res.send("Réponse pour la route2");
        });

        module.exports = router;
        ```

    -   **app.js** : `Monter un routeur sur l'application`

        ```javascript
        const express = require("express");
        const userRouter = require("./path/to/userRouter");
        const app = express();

        app.use("/user", userRouter);
        ```

-   **Avantages de l'utilisation de `express.Router()` pour plusieurs routeurs**

    -   **Modularité** : Permet de diviser l'application en plusieurs fichiers ou modules pour une meilleure organisation.

    -   **Réutilisation** : Un même routeur peut être réutilisé dans différentes parties de l'application.

    -   **Clarté** : Sépare les routes par fonctionnalités (par exemple, un routeur pour les utilisateurs, un pour les produits), ce qui rend l'application plus lisible et plus facile à maintenir.

    -   **Isolation des middlewares** : Vous pouvez appliquer des middlewares à un groupe de routes spécifiques dans chaque routeur.

-   **Exemple de plusieurs routeurs :**

    Imaginons que vous avez une application avec des fonctionnalités liées aux utilisateurs et aux produits. Vous pouvez créer un routeur pour chaque fonctionnalité, puis les monter sur des préfixes distincts (`/users`, `/products`).

    ```javascript
    const express = require("express");
    const app = express();

    // Créer le routeur des utilisateurs
    const userRouter = express.Router();
    userRouter.get("/", (req, res) => {
        res.send("Liste des utilisateurs");
    });
    userRouter.get("/:id", (req, res) => {
        res.send(`Détails de l\'utilisateur ${req.params.id}`);
    });

    // Créer le routeur des produits
    const productRouter = express.Router();
    productRouter.get("/", (req, res) => {
        res.send("Liste des produits");
    });
    productRouter.get("/:id", (req, res) => {
        res.send(`Détails du produit ${req.params.id}`);
    });

    // Monter les routeurs sur l'application
    app.use("/users", userRouter); // Toutes les routes des utilisateurs sont accessibles sous /users
    app.use("/products", productRouter); // Toutes les routes des produits sont accessibles sous /products

    // Démarrer le serveur
    const port = 3000;
    app.listen(port, () => {
        console.log(`Serveur démarré sur http://localhost:${port}`);
    });
    ```
