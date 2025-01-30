# cour 25 : **Mongoose Middleware:**


## 1. **Définition de Mongoose Middleware:**

> Un **middleware** dans Mongoose est une fonction qui s'exécute automatiquement à des moments spécifiques dans le cycle de vie d'un document, d'une requête, d'une agrégation, ou d'un modèle. Les middlewares permettent d'ajouter une logique personnalisée ou de modifier les données avant ou après une action spécifique (par exemple, enregistrer un document, exécuter une requête, etc.).



- Mongoose propose plusieurs types de middlewares, divisés en deux grandes catégories :

    - **Middleware pré (pré-hooks)** : Exécuté avant un événement, comme avant l'enregistrement d'un document ou l'exécution d'une requête.
    
    - **Middleware post (post-hooks)** : Exécuté après un événement, comme après que les résultats d'une requête ont été récupérés.


- Chaque type de middleware est déclenché à des moments précis et est utile pour des cas spécifiques comme la validation, le formatage de données, ou le déclenchement d'autres processus asynchrones.



- **Types de Middleware dans Mongoose:**

    - **Document Middleware :** S'applique aux documents individuels, s'exécute lors de méthodes comme `save()` , `create()`, `validate()`, ou `remove()`.

    - **Query Middleware :** S'applique aux requêtes exécutées via les méthodes Mongoose comme `find()`, `findOne()`, `updateOne()`, ou `deleteMany()`.

    - **Aggregate Middleware :** S'applique aux pipelines d'agrégation créés avec `aggregate()`.

    - **Model Middleware :** S'applique directement sur des actions liées au modèle, comme `insertMany()`.


