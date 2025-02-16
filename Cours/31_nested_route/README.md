## **Nested Router en Express avec Mongoose : Définition et Utilisation**

### **Définition**
Un **Nested Router** en Express permet d’imbriquer des routes pour structurer des ressources liées entre elles. Cela est particulièrement utile dans un modèle de données relationnel, par exemple pour gérer les **reviews** d’un **tour** dans une application de voyage.

Avec Mongoose, on peut établir des relations entre les modèles grâce à la référence (`ref`), ce qui facilite la gestion des documents parents et enfants.

---

### **Modélisation des Données avec Mongoose**
Dans notre exemple, nous avons deux modèles :
- **Tour** : représente un circuit touristique.
- **Review** : représente un avis laissé par un utilisateur sur un tour spécifique.

#### **Modèle `Tour`**
```javascript
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'A tour must have a name'] },
    duration: Number,
    difficulty: String
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
```

#### **Modèle `Review`**
Chaque review est liée à un tour via la clé `tour` (référence à l’ID d’un document `Tour`).
```javascript
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review: { type: String, required: [true, 'Review cannot be empty!'] },
    rating: { type: Number, min: 1, max: 5 },
    tour: { type: mongoose.Schema.ObjectId, ref: 'Tour', required: true },
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
```

---

### **Création des Routes**
On va utiliser un **Nested Router** pour associer les reviews à un tour.

#### **1. Router Principal pour `reviews`**
Dans `reviewRoutes.js` :
```javascript
const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .post(
        authController.protect,
        authController.restrictTo('user'),
        reviewController.createReview
    )
    .get(reviewController.getAllReviews);

module.exports = router;
```
✅ **Important** : `mergeParams: true` permet au routeur d’accéder aux paramètres (`tourId`) provenant d’un autre routeur.

#### **2. Ajout du Nested Router dans `tourRoutes.js`**
Dans `tourRoutes.js` :
```javascript
const express = require('express');
const tourController = require('../controllers/tourController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

module.exports = router;
```
Cela signifie que toute requête vers `/tours/:tourId/reviews` sera redirigée vers `reviewRoutes.js`.

---

### **Contrôleurs**
#### **1. Création d’une Review**
Dans `reviewController.js` :
```javascript
const Review = require('../models/reviewModel');

exports.createReview = async (req, res) => {
    try {
        if (!req.body.tour) req.body.tour = req.params.tourId;
        if (!req.body.user) req.body.user = req.user.id; // Récupération de l'utilisateur connecté

        const newReview = await Review.create(req.body);

        res.status(201).json({
            status: 'success',
            data: { review: newReview }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};
```

#### **2. Récupération des Reviews d’un Tour**
```javascript
exports.getAllReviews = async (req, res) => {
    try {
        let filter = {};
        if (req.params.tourId) filter = { tour: req.params.tourId };

        const reviews = await Review.find(filter);

        res.status(200).json({
            status: 'success',
            results: reviews.length,
            data: { reviews }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};
```

---

### **Exemples d’Utilisation**
1. **Créer une review pour un tour (POST)**
   ```
   POST /tours/65dfb9/reviews
   Body :
   {
       "review": "Amazing experience!",
       "rating": 5,
       "user": "userId"
   }
   ```

2. **Récupérer toutes les reviews d’un tour (GET)**
   ```
   GET /tours/65dfb9/reviews
   ```

---

### **Résumé**
✅ **Nested Router** permet d’imbriquer les routes (`reviews` dans `tours`).  
✅ **mergeParams: true** dans `reviewRoutes.js` permet d’accéder à `tourId`.  
✅ **Référencement Mongoose (`ref`)** assure la relation entre les modèles.  
✅ **Bonne structure MVC** pour organiser les routes et les contrôleurs.

Tu peux tester cette implémentation avec Postman pour voir comment les données s’enchaînent entre `tours` et `reviews` ! 🚀