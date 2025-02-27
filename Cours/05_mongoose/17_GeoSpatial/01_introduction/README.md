# Cour : **les données géospatiales:**



## 1. Qu'est-ce que **les données géospatiales** ?

- Les **données géospatiales** désignent toutes les données qui contiennent une **composante géographique**, c’est-à-dire une **localisation** sur la Terre. Elles sont utilisées dans divers domaines comme les cartes interactives, les GPS, les applications mobiles de localisation, etc.  

- Les données géospatiales peuvent être représentées de différentes manières :  

  - **Coordonnées (Longitude, Latitude)** : Utilisées pour définir un point spécifique sur la Terre.  

  - **Altitudes (Élévation)** : Décrit la hauteur d’un point par rapport au niveau de la mer.  

  - **Polygones** : Utilisés pour définir des zones (comme les frontières d’un pays ou d’une ville).  


- **Coordonnées Géographiques**

  Une position sur la Terre est généralement définie par **deux ou trois valeurs** :  

  1. **Longitude** (`lng`) : Position est-ouest sur la Terre (de -180° à +180°).  
  2. **Latitude** (`lat`) : Position nord-sud (de -90° à +90°).  
  3. **Altitude** (`alt`) : Hauteur au-dessus du niveau de la mer (en mètres).  

- **Exemple :**

  - Paris (France) : **`[2.3522, 48.8566]`**  

  - Everest : **`[86.9250, 27.9881, 8848]`** (avec altitude de 8848m)


## 2. Définition de **GeoJSON**  


- **GeoJSON** est un **format de données basé sur JSON** conçu pour représenter des données géospatiales. Il est couramment utilisé pour stocker et échanger des données de localisation dans des bases de données, des API et des systèmes SIG (Systèmes d’Information Géographique).  


- **Caractéristiques principales de GeoJSON :**

  - Il est **basé sur JSON**, ce qui le rend lisible et facile à manipuler.  

  - Il prend en charge plusieurs types de géométries comme **Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon et GeometryCollection**.  

  - Il suit une structure standard qui permet une **interopérabilité** entre différents systèmes utilisant des données géographiques.  

- **Exemple de structure GeoJSON d'un point**  

  ```json
  {
    "type": "Point",
    "coordinates": [ -73.9857, 40.7484 ]
  }
  ```


  >**Explication :**  
  >- `"type": "Point"` → Définit que la géométrie est un point.  
  >- `"coordinates": [longitude, latitude]` → Coordonnées du point.  
    >- Longitude (`-73.9857`) : Mesure est-ouest.  
    >- Latitude (`40.7484`) : Mesure nord-sud.  


- GeoJSON permet aussi de stocker des **propriétés supplémentaires** pour enrichir les données, comme ceci :  

  ```json
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [ -73.9857, 40.7484 ]
    },
    "properties": {
      "name": "Empire State Building",
      "height": 381
    }
  }
  ```



### RQ : **Utilisation de la Géolocalisation en JavaScript**


- Si on veut récupérer la localisation actuelle d’un utilisateur, on peut utiliser l’API **Geolocation** intégrée dans le navigateur :

```js
navigator.geolocation.getCurrentPosition(
    (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    },
    (error) => {
        console.error("Erreur de géolocalisation :", error);
    }
);
```


