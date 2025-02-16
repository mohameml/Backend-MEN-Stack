# Cour :  **Pattern "Stats Parent-Child" dans Mongoose**

## **1. Concept du Pattern**

- **Def:**

    > Le pattern **"Stats Parent-Child"** est une approche courante dans Mongoose pour gérer des relations entre des modèles, où un modèle enfant (ex: `Review`) contient une référence à un modèle parent (ex: `Tour`). L’objectif est de **stocker des statistiques agrégées dans le parent** (comme la moyenne et le nombre d’avis) et de **mettre à jour ces stats dynamiquement** lorsque des modifications sont effectuées dans les enfants.

- **Pourquoi utiliser ce pattern ? :**

    - Éviter d’avoir à recalculer les statistiques à chaque requête (gains de performance).
    - Stocker directement les données dérivées (comme `ratingsAverage` et `ratingsQuantity`) dans le modèle parent (`Tour`).
    - Mettre à jour ces statistiques automatiquement lorsque des modifications sont effectuées dans `Review`.


- **Approche du pattern**

    1. **Les reviews stockent une référence au tour concerné (`tour` stocke l’`_id` d’un `Tour`).**
    2. **Lorsqu’un review est ajouté/supprimé, une méthode statique recalcule les stats et met à jour le tour.**
    3. **On utilise des middlewares Mongoose (`post save` et `post remove`) pour assurer la mise à jour automatique.**


## **2. Implémentation dans Mongoose**


- **Modèle `Tour` (Parent)**

    Ce modèle stocke les stats agrégées des reviews.

    ```js
    const mongoose = require('mongoose');

    const tourSchema = new mongoose.Schema({
        name: { type: String, required: true },
        ratingsAverage: { type: Number, default: 4.5 },
        ratingsQuantity: { type: Number, default: 0 }
    });

    const Tour = mongoose.model('Tour', tourSchema);
    ```

- **Modèle `Review` (Enfant)**

    Chaque review est liée à un `Tour` via la clé `tour`.

    ```js
    const reviewSchema = new mongoose.Schema({
        review: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        tour: { 
            type: mongoose.Schema.ObjectId, 
            ref: 'Tour', 
            required: true 
        }
    });
    ```


- **Méthode Statique pour Recalculer les Stats**

    On définit une **méthode statique** sur le `reviewSchema` pour recalculer la moyenne des notes (`ratingsAverage`) et le nombre total d’avis (`ratingsQuantity`) d’un `Tour` donné.

    ```js
    reviewSchema.statics.calcAverageRatings = async function (tourId) {
        const stats = await this.aggregate([
            {
                $match: { tour: tourId }  // Sélectionne toutes les reviews pour ce tour
            },
            {
                $group: {
                    _id: "$tour",
                    ratingsQuantity: { $sum: 1 },  // Compte le nombre de reviews
                    ratingsAverage: { $avg: "$rating" }  // Calcule la moyenne
                }
            }
        ]);

        if (stats.length > 0) {
            await Tour.findByIdAndUpdate(tourId, {
                ratingsQuantity: stats[0].ratingsQuantity,
                ratingsAverage: stats[0].ratingsAverage
            });
        } else {
            // Si aucune review restante, remettre les valeurs par défaut
            await Tour.findByIdAndUpdate(tourId, {
                ratingsQuantity: 0,
                ratingsAverage: 4.5
            });
        }
    };
    ```



- **Mise à Jour Automatique via Middleware :**

    Après chaque **ajout de review**, on déclenche la mise à jour des stats via un **middleware `post`**.

    ```js
    reviewSchema.post('save', function () {
        this.constructor.calcAverageRatings(this.tour);
    });
    ```

    Après chaque **suppression d’un review**, on recalcule également les statistiques.

    ```js
    reviewSchema.post('findOneAndDelete', async function (doc) {
        if (doc) {
            await doc.constructor.calcAverageRatings(doc.tour);
        }
    });
    ```



### 3. **Exemple Complet d’Utilisation :**


```js
const mongoose = require('mongoose');

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/testdb')
    .then(() => console.log('DB Connected'))
    .catch(err => console.error('Connection error:', err));

const Tour = mongoose.model('Tour', tourSchema);
const Review = mongoose.model('Review', reviewSchema);

(async () => {
    // Création d'un Tour
    const tour = await Tour.create({ name: 'Tour Test' });

    // Ajout de reviews
    await Review.create({ review: 'Super tour !', rating: 5, tour: tour._id });
    await Review.create({ review: 'Pas mal !', rating: 4, tour: tour._id });

    // Vérification du Tour après ajout de reviews
    const updatedTour = await Tour.findById(tour._id);
    console.log('Tour mis à jour:', updatedTour);

    // Suppression d'une review
    const review = await Review.findOneAndDelete({ tour: tour._id });
    console.log('Review supprimée:', review);

    // Vérification du Tour après suppression d'une review
    const updatedTourAfterDelete = await Tour.findById(tour._id);
    console.log('Tour après suppression:', updatedTourAfterDelete);

    mongoose.connection.close();
})();
```
