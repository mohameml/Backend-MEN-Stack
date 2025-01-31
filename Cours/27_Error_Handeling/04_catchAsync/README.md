# Cour : **catchAsync :**

## 1. **Définition de `catchAsync` :**


- En **Express.js**, lorsqu'on travaille avec des **fonctions asynchrones**, il est important de capturer les erreurs pour éviter que l'application ne plante. C'est là -qu'intervient **catchAsync**, un wrapper qui simplifie la gestion des erreurs dans les **middlewares et contrôleurs asynchrones**.

- `catchAsync` est une **fonction utilitaire** qui permet de capturer automatiquement les erreurs des fonctions asynchrones et de les passer au middleware d'erreur d'Express.

- Sans `catchAsync`, il faut toujours entourer les fonctions asynchrones avec un **bloc `try...catch`** et passer l'erreur manuellement à `next(err)`. `catchAsync` automatise ce processus.


## 2. **Syntaxe de `catchAsync`**

- On définit `catchAsync` comme une **fonction qui prend une fonction asynchrone** et renvoie une nouvelle fonction qui capture les erreurs et les passe à `next`.

  ```javascript
  const catchAsync = fn => {
    return (req, res, next) => {
      fn(req, res, next).catch(next);
    };
  };
  ```


- **Exemple d'utilisation de `catchAsync` en Express.js**

  1️⃣ **Sans `catchAsync` (avec try...catch)**

  ```javascript
  app.get('/data', async (req, res, next) => {
    try {
      const data = await fetchDataFromDB();
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err); // Passer l'erreur au middleware d'erreur
    }
  });
  ```

  2️⃣ **Avec `catchAsync` (simplifié)**

  ```javascript
  app.get('/data', catchAsync(async (req, res) => {
    const data = await fetchDataFromDB();
    res.status(200).json({ success: true, data });
  }));
  ```

