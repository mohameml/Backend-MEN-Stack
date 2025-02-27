# cour 05 : **Static Files:**

-   **Description**

    > En Express.js, la méthode `express.static()` est utilisée pour servir des fichiers statiques (comme des images, des fichiers CSS, des fichiers JavaScript, etc.) à partir d'un répertoire spécifique. C'est une fonctionnalité pratique pour les applications web où les clients doivent accéder à des fichiers publics.

    -   `express.static()` crée un middleware pour servir des fichiers statiques dans une application Express.

    -   Les fichiers dans le répertoire spécifié sont accessibles directement à partir de leur chemin dans ce répertoire.

-   **Syntaxe**

    ```javascript
    app.use(express.static(root, [options]));
    ```

    -   **`root`** : Chemin absolu ou relatif vers le répertoire contenant les fichiers statiques.

-   **Exemple 1:**

    ```javascript
    const express = require("express");
    const app = express();

    // Définir le répertoire pour les fichiers statiques
    app.use(express.static(`${__dirname}/public`));

    app.listen(3000, () => {
        console.log("Serveur en écoute sur le port 3000");
    });
    ```

    -   Si un fichier nommé `style.css` est situé dans `public/`, il sera accessible via :

        ```
        http://localhost:3000/style.css
        ```

-   **Exemple 2 : Spécifier un chemin de montage pour les fichiers statiques**

    ```javascript
    const path = require("path");
    const express = require("express");
    const app = express();

    // Utiliser un chemin de montage virtuel pour les fichiers statiques
    app.use("/static", express.static(path.join(__dirname, "public")));

    app.listen(3000, () => {
        console.log("Serveur en écoute sur le port 3000");
    });
    ```

    -   Les fichiers dans `public/` seront accessibles avec le préfixe `/static`.

        Par exemple, un fichier `image.jpg` dans `public/` sera accessible via :

        ```
        http://localhost:3000/static/image.jpg
        ```
