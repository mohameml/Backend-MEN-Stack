# cour 21 : **Sélection:**

## 1. **Sélection dans REST API :**


- **Définition :**

    > La **sélection des champs** permet de limiter les données retournées par une requête. Plutôt que de renvoyer tous les champs d'un document, vous pouvez choisir uniquement les champs spécifiques à inclure ou exclure. On utilise le query parameter `fields` pour indiquer les champs que l’on souhaite inclure dans la réponse.


- **Syntaxe :**

    ```http
    GET /api/products?fields=name,price
    GET /api/products?fields=-description
    ```

    - Utilisez une liste de champs séparés par des virgules dans le paramètre `fields`.  
    - Ajoutez un tiret (`-`) avant le nom du champ pour l’exclure.  



## 2. **La méthode `.select()` en Mongoose :**

- **Définition :**

    > La méthode `.select()` est utilisée pour contrôler quels champs sont inclus ou exclus dans les documents retournés par une requête MongoDB.Elle accepte une chaîne de caractères ou un objet.



- **Syntaxe :** 

   ```javascript
   Model.find(query).select('field1 field2');
   Model.find(query).select('-field1 -field2');
   ```

- **Exemple :**


    ```http
    GET /api/products?fields=name,price
    ```

    ```javascript
    app.get('/api/products', async (req, res) => {
    try {
        // Extraire les champs à inclure ou exclure depuis la query string
        const fields = req.query.fields ? req.query.fields.split(',').join(' ') : '';

        // Appliquer la sélection des champs
        const products = await Product.find().select(fields);

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



