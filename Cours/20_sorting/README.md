# cour 20 : **Sorting:**

## 1.**Sorting dans une REST API**

- **Définition** :

    > Dans une API REST, le tri (**sorting**) permet de définir l’ordre des résultats retournés en fonction de certaines propriétés des données (par exemple, tri par prix, date, note, etc.).On utilise le **query parameter** `sort` pour indiquer les champs à trier, avec un préfixe `-` pour indiquer l’ordre décroissant.



- **Syntaxe:** :

    ```http
    GET /api/products?sort=price
    GET /api/products?sort=-price
    GET /api/products?sort=price,-rating    
    ```



## 2. **La méthode `sort()` en Mongoose**


- **Définition** :

    > La méthode `.sort()` dans Mongoose est utilisée pour trier les documents retournés par une requête. Elle accepte une chaîne de caractères ou un objet décrivant les champs à trier et leur ordre (ascendant ou descendant).

- **Syntaxe de `sort()`:** 

    ```javascript
    Model.find(query).sort({ field: 1 });   // Tri croissant
    Model.find(query).sort({ field: -1 });  // Tri décroissant
    ```

    - **Ascendant** : Utiliser `1` pour indiquer un tri croissant.  
    - **Descendant** : Utiliser `-1` pour indiquer un tri décroissant.  



    On peut aussi passer une **chaîne de caractères** où les champs sont séparés par des espaces :

    ```javascript
    Model.find(query).sort('field1 -field2');
    ```
    - `field1` : Tri croissant.
    - `-field2` : Tri décroissant.


- **Exemple  :** 


    ```http
    GET /api/products?sort=price,-rating
    ```

    ```javascript
    app.get('/api/products', async (req, res) => {
    try {
        // Obtenir les paramètres de tri depuis la query string
        const sortBy = req.query.sort ? req.query.sort.split(',').join(' ') : '';


        // Appliquer le tri sur la requête MongoDB
        const products = await Product.find().sort(sortBy);

        res.status(200).json({
        status: 'success',
        results: products.length,
        data: { products },
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
    });
    ```



