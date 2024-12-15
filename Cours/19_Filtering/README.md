# cour 19 : **Filterning:**

## 1. **Filtering in API**  

- **Définition** :  

    > Le **filtering** dans une API permet de limiter les résultats renvoyés par un endpoint en fonction de certains critères ou paramètres fournis par le client. Ces critères sont souvent spécifiés à l'aide de **query parameters** dans l'URL.



- **Exemple :**  

    Si vous avez une API qui retourne une liste d'utilisateurs, vous pouvez filtrer les utilisateurs âgés de plus de 25 ans :  
    ```http
    GET /api/users?age[gt]=25
    ```

    - Ici, `age[gt]` signifie "âge supérieur à 25".
    - Ces filtres sont transformés en conditions lors de la requête vers la base de données.



## 2. **Query Parameters in URL:**  


- **Définition** :  

    > Les **query parameters** sont des paires clé-valeur ajoutées à une URL après le point d'interrogation (`?`). Ils permettent de transmettre des données ou des options à un endpoint API.

- **Syntaxe générale** :  

    ```
    http://example.com/resource?key1=value1&key2=value2
    ```

    - **`?`** : Séparateur qui marque le début des query parameters.
    - **`key=value`** : Paire clé-valeur pour définir un paramètre.
    - **`&`** : Séparateur entre plusieurs paramètres.

- **Exemple dans une API :**  

    ```http
    GET /api/products?category=electronics&price[lt]=1000&sort=price
    ```
    - `category=electronics` : Filtre pour la catégorie "électronique".
    - `price[lt]=1000` : Filtre pour un prix inférieur à 1000 (`lt` pour "less than").
    - `sort=price` : Trie les résultats par prix.



## 3. **Filtering with `Query`:**  


- **Description:**

    - En Mongoose, pour appliquer un filtrage basé sur les query parameters, vous pouvez utiliser la méthode `find()` avec un objet contenant des critères dynamiques. 

    - Cependant, certains query parameters (comme `page`, `sort`, `limit`, et `fields`) ne font pas partie des critères de filtrage pour la base de données. Ces paramètres sont utilisés pour la pagination, le tri ou le contrôle de champs, et doivent être exclus.



- **Exemple en Node.js :**  

    ```javascript
    app.get('/api/v1/products', async (req, res) => {
    // 1. Extraire les query params
    const queryObj = { ...req.query };

    // 2. Exclure les mots réservés
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // 3. Appliquer les filtres sur le modèle
    const products = await Product.find(queryObj);

    res.status(200).json({
        status: 'success',
        results: products.length,
        data: {
        products
        }
    });
    });
    ```


## 4.  **Advanced Filtering avec [op] (gt, gte, lt, lte)**  

- **Définition:**

    > L’**advanced filtering** permet d’appliquer des opérateurs logiques tels que `gt` (greater than), `gte` (greater than or equal), `lt` (less than), et `lte` (less than or equal) dans les paramètres de requête pour effectuer des recherches avancées. Ces opérateurs sont souvent utilisés dans l’URL via une syntaxe spéciale pour filtrer les résultats en fonction des plages ou des conditions spécifiques.


    - ``[get] , [gt] , [lte] et [lt] :`` Ces opérateurs sont souvent utilisés dans les **API REST** pour filtrer des données numériques comme les prix, les dates ou les quantités.

- **Syntaxe dans l’URL :**  

    Les opérateurs sont souvent passés dans l’URL sous forme de paires clé-valeur, où les clés des paramètres incluent des expressions comme `[gt]`, `[gte]`, `[lt]`, ou `[lte]`.

    ```http
    GET /api/products?price[gte]=50&price[lt]=200&rating[gt]=4
    ```

    - `price[gte]=50` : Filtre les produits dont le prix est supérieur ou égal à 50.
    - `price[lt]=200` : Filtre les produits dont le prix est inférieur à 200.
    - `rating[gt]=4` : Filtre les produits avec une note supérieure à 4.



    Lorsqu'une requête est envoyée avec des query params dans une API Node.js, `req.query` contient un objet représentant ces paramètres. 


    ```javascript
    {
        price: { gte: '50', lt: '200' },
        rating: { gt: '4' }
    }
    ```


- **Utilisation avce Mongoose (Transformation des opérateurs)**

    > Mongoose utilise une syntaxe d’opérateurs similaire à celle de MongoDB (`$gt`, `$lt`, `$gte`, `$lte`). Pour appliquer des filtres avancés, il faut transformer les query params de l’API en un format compatible avec MongoDB.


    ```javascript
    app.get('/api/v1/products', async (req, res) => {
    // 1. Copier req.query
    const queryObj = { ...req.query };

    // 2. Remplacer les opérateurs comme [gte], [lt] par $gte, $lt
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    // 3. Convertir en objet JSON utilisable par Mongoose
    const filters = JSON.parse(queryStr);

    // 4. Appliquer les filtres
    const products = await Product.find(filters);

    res.status(200).json({
        status: 'success',
        results: products.length,
        data: {
        products
        }
    });
    });
    ```







