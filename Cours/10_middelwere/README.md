# cour 10 : **Middelwere**

### **Qu'est-ce qu'un middleware ?**

Un **middleware** dans Express (ou en développement web en général) est une fonction qui intercepte les requêtes HTTP entrantes ou les réponses sortantes, les traite, puis les transmet à une autre fonction. Il agit comme une couche intermédiaire dans le cycle de traitement des requêtes-réponses.

---

### **Caractéristiques d'un middleware :**

1. **Fonctionnalités supplémentaires :**  
   Les middlewares sont utilisés pour ajouter des fonctionnalités à votre application, comme l'authentification, la gestion des logs, ou l'analyse des données des requêtes.

2. **Signature de la fonction middleware :**  
   Un middleware est une fonction qui prend trois arguments :

    ```javascript
    function middleware(req, res, next) {
        // Traitement ici
        next(); // Passe à l'étape suivante
    }
    ```

    - **`req`** : L'objet de la requête HTTP.
    - **`res`** : L'objet de la réponse HTTP.
    - **`next`** : Une fonction qui appelle le prochain middleware dans la chaîne.

3. **Chaînage des middlewares :**  
   Les middlewares sont exécutés dans l'ordre dans lequel ils sont déclarés. Ils peuvent modifier les objets `req` et `res` avant que la requête atteigne le gestionnaire final.

---

### **Types de middlewares :**

1. **Middlewares intégrés :**  
   Fournis directement par Express pour des fonctionnalités courantes.  
   Exemple :

    - **`express.json()`** : Analyse les données JSON dans les requêtes.
    - **`express.static()`** : Servir des fichiers statiques (images, CSS, JS).

2. **Middlewares tiers :**  
   Des bibliothèques créées par la communauté pour des fonctionnalités spécifiques.  
   Exemple :

    - **`cors`** : Pour gérer les autorisations CORS.
    - **`morgan`** : Pour les logs HTTP.

3. **Middlewares définis par l'utilisateur :**  
   Vous pouvez créer vos propres middlewares pour des tâches spécifiques comme la vérification d'authentification ou la gestion des erreurs.

---

### **Exemple de middleware :**

#### **1. Middleware simple pour journaliser les requêtes :**

```javascript
const express = require("express");
const app = express();

// Middleware pour journaliser chaque requête
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Passe au middleware suivant ou au gestionnaire de route
});

// Route principale
app.get("/", (req, res) => {
    res.send("Bienvenue sur mon application Express !");
});

// Lancer le serveur
app.listen(3000, () => {
    console.log("Serveur démarré sur http://localhost:3000");
});
```

#### **2. Middleware pour vérifier l'authentification :**

```javascript
function checkAuth(req, res, next) {
    const isAuthenticated =
        req.headers.authorization === "Bearer mySecretToken";
    if (isAuthenticated) {
        next(); // Passe à la route suivante
    } else {
        res.status(401).send("Non autorisé");
    }
}

// Utilisation dans une route protégée
app.get("/private", checkAuth, (req, res) => {
    res.send("Bienvenue dans une zone sécurisée");
});
```

---

### **Cycle des middlewares :**

1. Une requête arrive dans votre application.
2. Elle passe à travers une série de middlewares (dans l'ordre de leur déclaration).
3. Chaque middleware peut :
    - Modifier `req` ou `res`.
    - Terminer le traitement en envoyant une réponse.
    - Appeler `next()` pour passer au middleware suivant.
4. Une fois tous les middlewares traversés, la requête atteint le gestionnaire final (une route spécifique).

---

### **Pourquoi utiliser des middlewares ?**

-   **Réutilisabilité :** Factoriser des fonctionnalités communes (authentification, logs, etc.).
-   **Extensibilité :** Ajouter facilement des fonctionnalités à votre application.
-   **Modularité :** Diviser le traitement des requêtes en petites étapes gérables.

Les middlewares sont une des bases fondamentales de l'architecture d'Express, rendant vos applications modulaires et flexibles.
