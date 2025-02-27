# cour 01 : **Introduction:**

## 1. **Node.js : Définition et Description**

-   **Node.js** est un environnement d'exécution JavaScript côté serveur, construit sur le moteur **V8** de Google Chrome. Il permet d'exécuter du code JavaScript en dehors d'un navigateur, principalement pour des applications côté serveur. Contrairement à d'autres technologies de serveur classiques, Node.js est basé sur un modèle **non-bloquant** et **asynchrone**, ce qui le rend particulièrement performant pour des applications nécessitant une gestion simultanée de nombreuses requêtes ou connexions, comme les applications en temps réel ou les services à forte concurrence.

-   **Caractéristiques principales de Node.js :**

    1. **Single-threaded, non-bloquant** :

    -   Utilise une **boucle d'événements** (event loop) pour gérer les opérations asynchrones, ce qui permet à Node.js de traiter plusieurs connexions en même temps sans avoir à créer de nouveaux threads.
    -   Parfait pour des applications à haute charge I/O (entrée/sortie), comme les applications web, les APIs, etc.

    2. **Exécution JavaScript côté serveur** :

    -   Permet aux développeurs JavaScript de travailler à la fois côté client et côté serveur, ce qui facilite le développement d'applications complètes avec une seule langue.

    3. **Écosystème riche avec npm** :

    -   Node.js utilise **npm** (Node Package Manager) pour la gestion des dépendances. npm dispose de centaines de milliers de packages, ce qui facilite l'ajout de fonctionnalités à vos projets.

    4. **Idéal pour les applications I/O intensives** :

    -   Sa gestion asynchrone de l'I/O le rend extrêmement performant pour des applications nécessitant des accès fréquents aux fichiers, bases de données ou API externes.

-   **Projets où Node.js est adapté :**

    1. **Build API (API RESTful ou GraphQL)** :

        - Node.js est idéal pour créer des **APIs** grâce à sa capacité à gérer de nombreuses requêtes simultanées de manière efficace. Des frameworks comme **Express.js** facilitent la création d'APIs RESTful.
        - Exemple : API pour un service de gestion de données ou d'authentification.

    2. **Data Streaming** :

        - Node.js gère très bien les flux de données grâce à son modèle asynchrone. Il est parfait pour des applications qui nécessitent un traitement de données en continu, comme le **streaming vidéo** ou audio, ou encore la gestion de données en temps réel.
        - Exemple : Services de diffusion de vidéos, données en temps réel provenant de capteurs IoT, etc.

    3. **Real-time applications** :

        - Les applications en temps réel telles que les **chatbots**, les jeux en ligne, ou les notifications en temps réel (via **WebSockets** par exemple) sont un cas d’utilisation typique de Node.js.
        - Exemple : Chat en ligne, messagerie instantanée, notifications push.

    4. **Server-Side Rendering (SSR)** :
        - Node.js est utilisé pour le **rendering côté serveur** de pages web. Des frameworks comme **Next.js** (basé sur React) permettent de générer des pages HTML dynamiques avant qu'elles ne soient envoyées au client, ce qui améliore les performances et le SEO.
        - Exemple : Applications web avec contenu dynamique qui doit être servi très rapidement.

-   **Projets où Node.js n’est pas adapté :**

    1. **Applications avec un traitement serveur intensif en CPU** :

        - Node.js est **monothreadé**, ce qui signifie qu'il peut avoir des problèmes de performance pour des applications nécessitant de lourds calculs CPU. Les tâches intensives en CPU peuvent bloquer la boucle d'événements, ralentissant le serveur et affectant les autres requêtes.
        - Exemple : Calculs scientifiques lourds, rendu 3D, traitement d'images ou vidéos complexes, simulations physiques.

    2. **Applications nécessitant un haut niveau de traitement synchrone** :

        - Node.js est conçu pour l'asynchrone, donc les applications qui dépendent fortement de traitements synchrone avec des appels successifs à des processus lourds peuvent rencontrer des problèmes de performance.

    3. **Applications avec une architecture multithreadée complexe** :

        - Si vous avez besoin de gérer plusieurs processus simultanément sur plusieurs cœurs de processeur (par exemple, traitement parallèle de données en temps réel), des langages ou des environnements comme **Java** ou **C++** sont mieux adaptés.

    4. **Systèmes à faible latence avec des exigences de performance extrêmes** :

        - Pour des systèmes où chaque milliseconde compte, comme les **systèmes de trading haute fréquence**, Node.js n'est pas le meilleur choix car il n'est pas optimisé pour les calculs à faible latence.

## 2. **REPL (Read-Eval-Print Loop):**

-   **Définition:**

    > Le **REPL (Read-Eval-Print Loop)** de **Node.js** est un environnement interactif qui permet d'exécuter du code JavaScript directement dans le terminal. Il permet d'expérimenter rapidement avec du code, de tester des fonctions et d'explorer les objets et les API de Node.js en temps réel.

-   **Fonctionnalités:**

    -   **Démarrer le REPL de Node.js :**

        -   Ouvrez votre terminal et tapez la commande suivante pour lancer Node.js en mode interactif :

        ```bash
        node
        ```

        Vous serez alors dans l'environnement REPL de Node.js, et vous pourrez commencer à entrer du code JavaScript directement.

    -   **Utilisation de la touche `Tab` pour afficher les variables globales :**

    -   **Utilisation de `_` pour accéder au dernier résultat :**

        -   Le caractère **`_`** dans le REPL de Node.js fait référence au **résultat précédent** retourné par une expression ou une commande.

    -   **Utilisation de `nameOfClass.` + Tab pour afficher les méthodes de la classe :**

## 3. **Exécuter le fichier JavaScript avec Node.js**

-   Une fois que vous avez votre fichier JavaScript prêt, vous pouvez l'exécuter en utilisant la commande `node` dans votre terminal ou ligne de commande.

    ```bash
    node app.js
    ```

    Cela exécutera le fichier `app.js` et vous affichera le résultat dans le terminal, qui devrait être :

-   **Utiliser `node` avec des arguments**

    -   Vous pouvez également passer des arguments à votre script JavaScript depuis la ligne de commande. Par exemple, vous pouvez modifier votre fichier pour accepter des arguments :

    ```javascript
    // app.js
    console.log("Argument passé : " + process.argv[2]);
    ```

    Ensuite, vous pouvez exécuter le fichier avec un argument comme ceci :

    ```bash
    node app.js Bonjour
    ```
