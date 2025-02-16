# Cour : Le stage d'agrégation **`$geoNear`**


## 1. **Définition:**

> Le stage d'agrégation **`$geoNear`** est utilisé pour effectuer des requêtes géospatiales dans MongoDB et Mongoose, en retournant des documents triés par distance par rapport à un point donné. C'est le **premier stage obligatoire** de toute pipeline d'agrégation qui fait des recherches géospatiales.


- **`$geoNear`** permet de :

    - Calculer la distance entre un point de référence et les documents ayant un champ géospatial.
    - Retourner les documents en les triant par ordre croissant de distance.
    - Filtrer les documents selon une distance maximale (ou minimale).
    - Ajouter un champ (par exemple `distance`) à chaque document, indiquant la distance calculée.



## 2. **Syntaxe:**

- La syntaxe générale est la suivante :

```js
{
  $geoNear: {
    near: { 
      type: "Point", 
      coordinates: [ <longitude>, <latitude> ]
    },
    distanceField: "<nom_du_champ_distance>",
    distanceMultiplier : 0.001 // convertir m en km 
    maxDistance: <valeur_en_mètres>, // facultatif
    minDistance: <valeur_en_mètres>, // facultatif
  }
}
```


- **`near`** : Définit le point de référence sous forme d'objet GeoJSON.
- **`distanceField`** : Le champ qui sera ajouté à chaque document pour indiquer la distance calculée.
- **`maxDistance` / `minDistance`** : Pour filtrer par distance.


## 3. **Exemple avec Mongoose:**

-  Supposons que vous ayez une collection `places` qui contient un champ `location` indexé en 2dsphere (au format GeoJSON). 

- Voici comment vous pourriez utiliser `$geoNear` dans une agrégation en Mongoose pour trouver les lieux proches d'un point donné :



```js
const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: String,
  location: {
    type: {
      type: String, // Doit être "Point"
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  }
});

// Création de l'index géospatial 2dsphere sur le champ location
placeSchema.index({ location: "2dsphere" });

const Place = mongoose.model('Place', placeSchema);
```


```js
(async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect('mongodb://localhost:27017/testdb');

    // Coordonnées de référence (par exemple : Paris)
    const point = {
      type: "Point",
      coordinates: [2.3522, 48.8566]  // [longitude, latitude]
    };

    // Pipeline d'agrégation utilisant $geoNear
    const results = await Place.aggregate([
      {
        $geoNear: {
          near: point,
          distanceField: "distance",    // Le champ qui contiendra la distance
          maxDistance: 5000,             // Limite à 5000 mètres (facultatif)
        }
      },
      // Par exemple, on peut limiter le nombre de résultats
      { $limit: 10 }
    ]);

    console.log("Résultats de l'agrégation géospatiale :", results);

    await mongoose.disconnect();
  } catch (err) {
    console.error("Erreur:", err);
  }
})();
```

