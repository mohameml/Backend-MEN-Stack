# Cour :  🚀 **Virtual Population en Mongoose**  

### 1. **Définition**  

- La **Virtual Population** en Mongoose permet d'établir une **relation logique** entre deux collections **sans stocker directement l'ID de la référence** dans le document. Contrairement à `.populate()`, où l'ID de référence est stocké dans le document, ici la relation est **dynamique** et basée sur une correspondance entre champs.  

- C'est particulièrement utile pour **éviter la duplication de données** et résoudre le problème de **Parent Referencing**.  

- 🎯 **Pourquoi utiliser Virtual Population ?**  

    🔹 **Évite de stocker les IDs dans l'objet parent** → Moins de duplication.  
    🔹 **Permet d'obtenir les documents liés sans modifier le schéma principal**.  
    🔹 **Pratique pour des relations inversées** (ex: récupérer toutes les reviews d'un tour).  



## 2. **Exemple de Virtual Population en Mongoose**  


- **Cas d'utilisation** : `Tour` et `Review`

    - **Un `Tour` a plusieurs `Reviews`**.

    - Mais **on ne stocke pas les IDs des `Reviews` dans `Tour`**.

    - On établit la relation de manière virtuelle.  

- **Modèle `Tour`**

    ```js
    const mongoose = require('mongoose');

    const tourSchema = new mongoose.Schema(
        {
            name: String,
            price: Number
        }, 
        { 
        // ✅ Activer les virtuals dans JSON et objets
            toJSON: { virtuals: true }, 
            toObject: { virtuals: true } 
        }
    ); 
    ```

- **Modèle `Review`**

    ```js
    const reviewSchema = new mongoose.Schema(
        {
            review: String,
            rating: Number,
            tour: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Tour'  // Relation classique avec Tour
            }
        }
    );

    const Review = mongoose.model('Review', reviewSchema);
    ```


- 📌 **Ajout de la Virtual Population dans `Tour`**

    ```js
    tourSchema.virtual('reviews', {
        ref: 'Review',        // ✅ Nom du modèle lié
        foreignField: 'tour', // ✅ Champ dans Review qui référence Tour
        localField: '_id'     // ✅ Champ dans Tour à matcher avec foreignField
    });

    const Tour = mongoose.model('Tour', tourSchema);
    ```



- 🎯 **Comment utiliser Virtual Population ? :**  Récupérer un Tour avec ses Reviews (via Virtuals)

    ```js
    async function getTourWithReviews() {
        const tour = await Tour.findOne({ name: 'Safari' }).populate('reviews'); 
        console.log(tour);
    }
    getTourWithReviews();

    ```
    ✅ **Résultat attendu (avec Virtual Population)** :
    ```json
    {
        "_id": "654abc",
        "name": "Safari",
        "price": 500,
        "reviews": [
            { "_id": "789xyz", "review": "Super tour!", "rating": 5 },
            { "_id": "456def", "review": "Pas mal", "rating": 4 }
        ]
    }

    ```



