# cour 06 : **NPM**

## 1. **Introduction:**

-   **Définition:**

    > NPM (**Node Package Manager**) est un outil utilisé pour gérer les bibliothèques et dépendances JavaScript. Il est installé par défaut avec **Node.js**. Avec NPM, vous pouvez :

    -   Installer des packages (bibliothèques) pour votre projet.
    -   Gérer les versions des dépendances.
    -   Publier vos propres packages pour les partager avec d'autres développeurs.

## 2. **Commandes essentielles avec `NPM`:**

-   **`npm init :`** Initialise un nouveau projet Node.js et crée un fichier `package.json`.

    ```bash
    npm init
    npm init -y // Pour éviter les questions interactives
    ```

-   **`npm install:`** (ou `npm i`) Installe les dépendances listées dans le fichier `package.json`.

    ```bash
    npm install
    npm install <nom_du_package>
    npm install <nom_du_package>@aa.bb.cc // avce une version spécifique
    ```

-   **`--global :`** Installe un package globalement, ce qui le rend disponible partout sur votre machine.

    ```bash
    npm install -g <nom_du_package>
    ```

-   **`--save-dev` :** Installe un package comme une dépendance de développement (non utilisée dans la version de production).

    ```bash
    npm install --save-dev <nom_du_package>
    ```

-   **`npm uninstall`** : Désinstalle un package du projet ou globalement.

    ```bash
    npm uninstall <nom_du_package>
    ```

-   **`npm list`** : Liste les packages installés localement ou globalement.

    ```bash
    npm list
    npm list -g
    ```

-   **`--force`** : Force l'exécution d'une commande, comme la suppression du cache ou une installation, même en cas de conflits.

    ```bash
    npm cache clean --force
    npm install <nom_du_package> --force
    ```

-   **`npm update :`**

    Pour mettre à jour une dépendance tout en respectant les règles définies dans `package.json` (par exemple, `^1.2.3` ou `~1.2.3`) :

    ```bash
    npm update <nom_du_package>
    ```

-   **`npm outdated :`**

    Rechercher les mises à jour disponibles Pour voir quelles versions sont disponibles pour vos dépendances :

    ```bash
    npm outdated
    ```

## 3. **scripts du package.json:**

-   **Description:**

    > Dans le fichier `package.json`, la section **"scripts"** est utilisée pour définir des commandes personnalisées que vous pouvez exécuter via **npm**. Ces scripts sont souvent utilisés pour automatiser des tâches comme le démarrage d'un serveur, la compilation du code, les tests, etc.

    -   Vous pouvez exécuter un script défini avec la commande `npm run <nom_du_script>`.

-   **Structure des scripts dans `package.json`**

    ```json
    {
        "name": "mon-projet",
        "version": "1.0.0",
        "scripts": {
            "start": "node app.js",
            "dev": "webpack --config webpack.config.js",
            "test": "mocha tests/**/*.js",
            "build": "npm run clean && webpack --config webpack.config.js",
            "clean": "rm -rf dist"
        }
    }
    ```

-   **Explication des commandes :**

1. **`start`** :

    - **Description** : C'est un script spécial. Si vous exécutez `npm start`, **npm** exécutera la commande associée à `start`. Il est couramment utilisé pour démarrer une application.
    - **Exemple** :
        ```bash
        npm start
        ```
        Cela exécutera `node app.js`.

2. **`dev`** :

    - **Description** : Utilisé pour des tâches liées au développement, comme démarrer un serveur en mode développement ou utiliser des outils comme **webpack** pour la compilation.
    - **Exemple** :
        ```bash
        npm run dev
        ```
        Cela pourrait exécuter une commande comme `webpack --config webpack.config.js` pour démarrer la compilation.

3. **`test`** :

    - **Description** : C'est une commande utilisée pour exécuter des tests. En exécutant `npm test`, **npm** recherchera le script `test` dans `package.json` et l'exécutera.
    - **Exemple** :
        ```bash
        npm test
        ```
        Cela pourrait exécuter des tests unitaires avec un framework comme **Mocha**.

4. **`build`** :

    - **Description** : Utilisé pour compiler, minifier, ou préparer votre application pour la production. Vous pouvez inclure plusieurs étapes comme la suppression des anciens fichiers (via un script `clean`) puis la construction.

    - **Exemple** :
        ```bash
        npm run build
        ```
        Cela pourrait exécuter `npm run clean && webpack --config webpack.config.js`.

5. **`clean`** :

    - **Description** : Un script pour nettoyer ou supprimer des fichiers avant de faire une nouvelle compilation ou une nouvelle étape de construction.
    - **Exemple** :
        ```bash
        npm run clean
        ```
        Cela pourrait supprimer un dossier `dist` ou d'autres fichiers de build.

## 4. **Versioning && Updating:**

-   **Versioning et Updating en NPM**

    > Dans NPM, les versions des packages suivent généralement le système **SemVer (Semantic Versioning)**, qui se présente sous la forme `MAJEUR.MINEUR.PATCH` (ou `aa.bb.cc`). Cela permet de gérer efficacement les mises à jour tout en assurant la compatibilité entre les versions.

-   **Structure de version SemVer (`aa.bb.cc`)**

    -   **MAJEUR (aa)** :

        -   Changé lorsqu’il y a des modifications **incompatibles** avec les versions précédentes.
        -   Exemple : Suppression de fonctionnalités ou modifications de l'API qui cassent la compatibilité.
        -   **Exemple** : Passer de `1.2.3` à `2.0.0`.

    -   **MINEUR (bb)** :

        -   Changé lorsqu’il y a des nouvelles **fonctionnalités rétro-compatibles**.
        -   Exemple : Ajout d'une nouvelle méthode ou amélioration d’une fonctionnalité existante.
        -   **Exemple** : Passer de `1.2.3` à `1.3.0`.

    -   **PATCH (cc)** :
        -   Changé lorsqu’il y a des **correctifs** ou des mises à jour mineures sans modification de l’API.
        -   Exemple : Correction de bogues ou petites améliorations internes.
        -   **Exemple** : Passer de `1.2.3` à `1.2.4`.

-   **Updating configuration `package.json`:**

    -   **`^` (Caret)** :

        -   **Mise à jour MINEURE et PATCH autorisée**.
        -   Permet de mettre à jour toutes les versions tant que le numéro **MAJEUR** reste le même.
        -   **Exemple** :
            -   `"lodash": "^1.2.3"` autorise les mises à jour vers `1.3.x` ou `1.4.x`, mais pas `2.x.x`.

    -   **`~` (Tilde)** :

        -   **Mise à jour PATCH autorisée uniquement**.
        -   Permet de mettre à jour les correctifs tant que le numéro **MINEUR** reste le même.
        -   **Exemple** :
            -   `"lodash": "~1.2.3"` autorise les mises à jour vers `1.2.4`, mais pas `1.3.x`.

    -   **`*` (Wildcard)** :

        -   Autorise **toutes les versions disponibles**.
        -   **Exemple** :
            -   `"lodash": "*"` peut installer n’importe quelle version de `lodash`.
