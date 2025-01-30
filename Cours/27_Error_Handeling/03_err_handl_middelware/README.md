# Cour : **Error Handling Middleware en Express.js** 


## 1. **Définition :**

- Un **Error Handling Middleware** (ou middleware de gestion des erreurs) est une fonction **spéciale** dans Express.js qui intercepte les erreurs générées par l’application et les **traite de manière centralisée**.  

- Il est utilisé pour :  

    - Envoyer des **réponses cohérentes** en cas d'erreur.  
    - Empêcher Express de **crasher** sur une erreur non gérée.  
    - Distinguer les erreurs en **développement** et en **production**.  


- **Un middleware d’erreur en Express a une particularité** :   Il prend **4 arguments** : `(err, req, res, next)`.



## 2. **Syntaxe de base :**


```javascript
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        status: err.status || 'error',
        message: err.message || 'Something went wrong!'
    });
});
```

- `err` → L'objet erreur passé avec `next(err)`.
- `err.statusCode` → Code HTTP (par défaut `500` pour une erreur serveur).
- `err.status` → Soit `"fail"` (erreur utilisateur) soit `"error"` (erreur serveur).
- `message` → Message d'erreur renvoyé au client.



- **Exemple :**

    - Utilisons `next(err)` pour envoyer une erreur au **middleware global**.

    ```javascript
    const express = require('express');
    const app = express();

    // Middleware d'erreur

    app.all('*', (req, res, next) => {
        const err = new Error(`Can't find ${req.originalUrl} on this server!`);
        err.statusCode = 404;
        err.status = 'fail';
        next(err);
    });

    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).json({
            status: err.status || 'error',
            message: err.message || 'Something went wrong!'
        });
    });
    ```






## 3.**Gestion Avancée des Erreurs :**

- Dans un projet **professionnel**, on peut utiliser une **classe d’erreur personnalisée** .

- **class `AppError`:**

    ```javascript
    class AppError extends Error {
        constructor(message, statusCode) {
            super(message);
            this.statusCode = statusCode;
            this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
            this.isOperational = true; // Pour différencier les erreurs connues

            Error.captureStackTrace(this, this.constructor);
        }
    }
    ```

- **Utilisation dans une route :**

    ```javascript
    app.all('*', (req, res, next) => {
        return next(new AppError(`Can't find ${req.originalUrl} on this server!`, 400));
    });
    ```


- **Adapter le middleware global :**

    ```javascript
    app.use((err, req, res, next) => {
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        } else {
            console.error('ERROR:', err);
            res.status(500).json({
                status: 'error',
                message: 'Something went very wrong!'
            });
        }
    });
    ```




