# cour 02 : **Core Module**

## 1. **Core Modules en Node.js :**

-   **Description et Définition :**

    > Les **Core Modules** (ou modules de base) de **Node.js** sont des modules intégrés dans l'environnement Node.js, ce qui signifie que vous pouvez les utiliser directement dans vos applications sans avoir besoin de les installer via **npm**. Ces modules fournissent des fonctionnalités essentielles pour les applications serveur, telles que la gestion des fichiers, des événements, des flux de données, des protocoles HTTP, et plus encore.

-   **Quelques exemples de Core Modules :**

    1. **`fs` (File System)** : Permet d'interagir avec le système de fichiers (lire, écrire, supprimer des fichiers).
    2. **`http`** : Utilisé pour créer des serveurs HTTP.
    3. **`path`** : Fournit des utilitaires pour travailler avec les chemins de fichiers.
    4. **`os`** : Permet d’obtenir des informations sur le système d'exploitation (par exemple, la mémoire, le système de fichiers).
    5. **`events`** : Utilisé pour gérer les événements et les gestionnaires d'événements (par exemple, créer des objets EventEmitter).
    6. **`crypto`** : Fournit des fonctionnalités pour la gestion de la cryptographie, telles que le hachage et le chiffrement.

## 2. **Importation d'un Core Module avec `require`**

-   **Description:**

    > En **Node.js**, les modules sont importés en utilisant la fonction **`require`**. La fonction `require` est utilisée pour charger un module dans votre code, que ce soit un module interne de Node.js (core module) ou un module externe installé via npm.

-   **Syntaxe de `require` :**

    ```javascript
    const moduleName = require("module-name");
    ```

-   **Exemple :**

    ```javascript
    const fs = require("fs"); // Import du module fs
    fs.readFile("example.txt", "utf8", (err, data) => {
        if (err) throw err;
        console.log(data);
    });
    ```

## 3. **Module `fs`:**

-   **Description:**

    > Le module **`fs`** en Node.js fournit une API pour interagir avec le système de fichiers du serveur. Vous pouvez l'utiliser pour lire, écrire, supprimer des fichiers, et bien plus encore.

    -   Les opérations peuvent être **synchrones** ou **asynchrones**. Les méthodes **synchrones** bloquent l'exécution du programme jusqu'à ce que l'opération soit terminée, tandis que les méthodes **asynchrones** permettent de continuer l'exécution pendant que l'opération est en cours.

-   **Méthodes courantes du module `fs`**

    | Méthode                                     | Description                                                                                                 | Type          |
    | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------- |
    | `readFileSync(path, encoding)`              | Lit un fichier de manière synchrone. Le processus est bloqué jusqu'à ce que le fichier soit entièrement lu. | Synchronously |
    | `readFile(path, encoding, callback)`        | Lit un fichier de manière asynchrone. La fonction de rappel est appelée une fois le fichier lu.             | Asynchronous  |
    | `writeFileSync(path, data, encoding)`       | Écrit des données dans un fichier de manière synchrone. Si le fichier n'existe pas, il sera créé.           | Synchronously |
    | `writeFile(path, data, encoding, callback)` | Écrit des données dans un fichier de manière asynchrone. Le fichier est créé s'il n'existe pas.             | Asynchronous  |

-   **Exemples d'utilisation :**

    ```js
    const fs = require("fs");

    // Blocking code : Sync
    const txt = fs.readFileSync("./test.txt", "utf-8");

    console.log(txt);

    const output = `Hello : ${txt}.\n Created at ${Date.now()}`;
    fs.writeFileSync("output.txt", output);

    // Non-Blocking code : Async

    fs.readFile("output.txt", "utf-8", (err, data) => {
        console.log(data);
        console.log(err);
    });

    console.log("Reading file ....");
    ```
