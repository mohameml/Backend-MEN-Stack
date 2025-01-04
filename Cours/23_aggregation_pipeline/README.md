# cour 23 : **Aggregation pipeline**


## 1. **Introduction:**

- **Définition**

    > L'**aggregation pipeline** en MongoDB est un outil puissant pour traiter et analyser des données directement dans une base MongoDB. Elle est utilisée pour effectuer des transformations de données, des calculs agrégés et des analyses complexes sans avoir besoin d'extraire les données dans une autre application. 


    - L'**aggregation pipeline**  permet de réaliser des opérations complexes en enchaînant plusieurs étapes (**stages**) sur les documents d'une collection. Chaque étape transforme les données d'une manière spécifique et transmet le résultat à l'étape suivante.


- **Structure de la pipeline :**

   - Une pipeline est une séquence d'étapes définies sous forme de tableaux.
   - Chaque étape est un objet JSON qui spécifie une opération.
   - Les étapes sont exécutées dans l'ordre où elles sont définies.
   - La pipeline traite les documents par flux (**stream processing**) : chaque document traverse toutes les étapes.


-  **Les étapes courantes :**

   - **`$match`** : Filtre les documents (similaire à un filtre `WHERE` en SQL).
   - **`$group`** : Agrège les documents en fonction d'un ou plusieurs champs.
   - **`$project`** : Restructure ou sélectionne les champs pour chaque document.
   - **`$sort`** : Trie les documents par un ou plusieurs champs.
   - **`$limit`** : Limite le nombre de documents renvoyés.
   - **`$skip`** : Ignore un nombre spécifique de documents.
   - **`$unwind`** : Décompose des tableaux en documents individuels.
   - **`$lookup`** : Effectue une jointure avec une autre collection.
   - **`$addFields`** : Ajoute de nouveaux champs ou modifie les champs existants.




- **Exemple d'aggregation pipeline :**

    Supposons que nous ayons une collection `orders` contenant des commandes, et que nous souhaitons connaître le total des ventes par produit.

    ```json
    db.orders.aggregate([
    { "$match": { "status": "completed" } }, // Étape 1 : Filtrer les commandes terminées
    { "$group": { "_id": "$product", "totalSales": { "$sum": "$amount" } } }, // Étape 2 : Grouper par produit
    { "$sort": { "totalSales": -1 } } // Étape 3 : Trier par ventes décroissantes
    ])
    ```

## 2. **La fonction `aggregate` dans Mongoose**


- **Définition :**

    - La méthode `ModelName.aggregate()` est utilisée pour exécuter une pipeline d'agrégation sur les documents d'une collection associée à un modèle Mongoose.
    - Elle retourne une **liste d'objets** contenant les résultats de chaque groupe ou transformation définie dans la pipeline.


- **Syntaxe :**

    ```javascript
    ModelName.aggregate([
    { $stage1: { key: value } }, // Étape 1
    { $stage2: { key: value } }, // Étape 2
    ...
    ], callback);
    ```

    - **`$stage`** : Un opérateur d'agrégation MongoDB, comme `$match`, `$group`, `$sort`, etc.
    - **`key` / `value`** : Les conditions ou transformations appliquées dans chaque étape.
    - **Callback (optionnel)** : Une fonction pour gérer le résultat ou les erreurs.



- **Exemple :**

    Calculer le total des ventes (`totalSales`) pour chaque produit (`productName`) dans une collection `orders`.

    ```javascript
    Order.aggregate([
    { $match: { status: "completed" } },  
    { 
        $group: { 
        _id: "$productName", // Groupement par le champ productName
        totalSales: { $sum: { $multiply: ["$quantity", "$price"] } }, // Somme du prix total par produit
        totalQuantity: { $sum: "$quantity" } // Total des quantités vendues
        }
    },
    { $sort: { totalSales: -1 } },
    { $limit: 5 }
    ])
    .then(result => {
    console.log(result);
    })
    .catch(err => {
    console.error(err);
    });
    ```


## 3. **``Stages:``**

