# Cour : **Gestion des routes incorrectes en Express**

## 1. **Définition :**

- En **Express.js**, lorsqu'un utilisateur accède à une URL qui **n'existe pas** dans l'application, on parle de **route incorrecte** (ou **404 Not Found**).  
Il est recommandé d'ajouter un **middleware de gestion des routes inexistantes** pour renvoyer une réponse claire au client.


## 2. **Syntaxe :**

```javascript
app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    });
});
```

- `app.all('*', ...)` : Capture **toutes les requêtes** (`GET`, `POST`, `PUT`, `DELETE`, etc.) qui ne correspondent à **aucune route définie**.
- `req.originalUrl` : Affiche l'URL que l'utilisateur a essayé d'accéder.
- `res.status(404).json({...})` : Retourne un JSON avec le **statut 404** et un message d'erreur.


## 3.**Amélioration avec `next()`**

- Il est préférable d'envoyer l'erreur à un **gestionnaire global des erreurs** en utilisant `next()`, au lieu de répondre directement :

    ```javascript
    app.all('*', (req, res, next) => {
        const err = new Error(`Can't find ${req.originalUrl} on this server!`);
        err.status = 'fail';
        err.statusCode = 404;
        next(err);
    });

    // Middleware global de gestion des erreurs
    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).json({
            status: err.status || 'error',
            message: err.message || 'Internal Server Error'
        });
    });
 
    ```
- **Pourquoi utiliser `next(err)` ?**

    - Permet d'envoyer l'erreur au **middleware global de gestion des erreurs**.

    - Facilite la gestion des erreurs **personnalisées**.

