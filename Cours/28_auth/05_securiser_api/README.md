# Cour 5 : **Amélioration de la sécurité d'une API Express.js :**



## 1. **Helmet :Protection contre les attaques basées sur les en-têtes HTTP**

- **Définition et description**  

    > **Helmet** est un middleware pour Express qui **ajoute et configure automatiquement des en-têtes HTTP de sécurité** afin de protéger contre diverses attaques (XSS, Clickjacking, sniffing de contenu, etc.).

- **Attaques évitées :**  

    ✅ **Clickjacking** : Une attaque où un utilisateur est trompé en cliquant sur un élément masqué malveillant sur un site.  
    ✅ **Cross-Site Scripting (XSS)** : Injection de scripts malveillants dans les pages web pour voler des données.  
    ✅ **MIME Sniffing Attack** : Une attaque où le navigateur interprète le type de fichier de manière erronée, permettant l'exécution de code malveillant.


- **Installation et usage**

    ```sh
    npm install helmet
    ```

    ```javascript
    const helmet = require("helmet");
    app.use(helmet());
    ```


## 2. **express-rate-limit : Protection contre le Brute Force et le DDoS**

- **Définition et description**  

    > **`express-rate-limit`** limite le nombre de requêtes provenant d'une même IP **pour empêcher les attaques par force brute et DDoS**.

- **Attaques évitées**  

    ✅ **Brute Force Attack** : Une attaque où un attaquant essaie plusieurs combinaisons de mots de passe pour accéder à un compte.  
    ✅ **DDoS (Distributed Denial of Service)** : Une attaque qui surcharge le serveur avec trop de requêtes.

- **Installation et usage**

    ```sh
    npm install express-rate-limit
    ```

    ```javascript
    const rateLimit = require("express-rate-limit");

    const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limite à 100 requêtes par IP
    message: "Trop de requêtes depuis cette IP, veuillez réessayer plus tard.",
    });

    app.use(limiter);
    ```



## 3.**express-mongo-sanitize : Protection contre l'injection NoSQL**

- **Définition et description**  

    > **`express-mongo-sanitize`** empêche l’injection NoSQL en supprimant les caractères spéciaux dans les requêtes MongoDB.

- **Attaques évitées**  

    ✅ **NoSQL Injection** : Une attaque où un attaquant injecte du JSON malveillant pour manipuler la base de données.  

- **Exemple d'attaque**  

    ```json
    {
    "email": { "$gt": "" },
    "password": "123456"
    }
    ```
    Cela contourne une authentification MongoDB classique.

- **Installation et usage**

    ```sh
    npm install express-mongo-sanitize
    ```

    ```javascript
    const mongoSanitize = require("express-mongo-sanitize");
    app.use(mongoSanitize());
    ```



## 4. **sanitize-html : Protection contre XSS**


- **Définition et description**  
    
    > **`sanitize-html`** nettoie le contenu HTML en supprimant les balises et attributs potentiellement dangereux.

- **Attaques évitées**  

    ✅ **Cross-Site Scripting (XSS)** : Injection de JavaScript malveillant pour voler des cookies ou exécuter du code sur le navigateur de l’utilisateur.  

- **Exemple d'attaque XSS**  

    Un utilisateur soumet un commentaire avec :
    ```html
    <script>alert("Hacked!");</script>
    ```
    Si ce code est affiché sur une page, il exécutera l'alerte dans le navigateur de l'utilisateur.


- **Installation et usage**

    ```sh
    npm install sanitize-html
    ```

    ```javascript
    const sanitizeHtml = require("sanitize-html");

    const cleanInput = (req, res, next) => {
    if (req.body) {
        for (const key in req.body) {
        req.body[key] = sanitizeHtml(req.body[key]);
        }
    }
    next();
    };

    app.use(express.json());
    app.use(cleanInput);
    ```




## 5. **hpp : Protection contre HTTP Parameter Pollution**

- **Définition et description**  

    > **`hpp`** empêche **l'injection de plusieurs paramètres identiques** dans une requête HTTP.

- **Attaques évitées**  

    ✅ **HTTP Parameter Pollution (HPP)** : Une attaque où l’attaquant envoie plusieurs valeurs pour un même paramètre, ce qui peut affecter la logique de l’application.

- **Exemple d'attaque**  

    Un attaquant envoie une requête comme :
    ```
    GET /search?role=admin&role=user
    ```
    Si le serveur prend en compte `role=admin`, l’attaquant pourrait obtenir des privilèges d’administration.

- **Installation et usage**

    ```sh
    npm install hpp
    ```

    ```javascript
    const hpp = require("hpp");
    app.use(hpp({
        whitelist: [
            "duration",
            "ratingsAverage",
            "ratingsQuantity",
            "price",
            "maxGroupSize",
            "difficulty"        
    ]
    }));
    ```




## 6. **Envoi sécurisé du token JWT dans un cookie :**

- **Pourquoi utiliser un cookie sécurisé ? :**  

    - Si un **token JWT** est stocké en **localStorage**, il est **vulnérable aux attaques XSS**.  

    - Les **cookies httpOnly** ne peuvent pas être lus par du JavaScript malveillant.  

- **Implémentation**

    ```javascript
    const jwt = require("jsonwebtoken");

    const createAndSendToken = (user, statusCode, res) => {

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        const cookieOptions = {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
            ),
            httpOnly: true, // Empêche l'accès via JavaScript
        };

        if (process.env.NODE_ENV === "production") {
            cookieOptions.secure = true; // Requiert HTTPS en production
        }

        res.cookie("jwt", token, cookieOptions);

        user.password = undefined; // Ne jamais envoyer le password

        res.status(statusCode).json({
            status: "success",
            token: token,
            data: { user: user },
        });
    };
    ```

- **Avantages**

    ✅ Protège contre **XSS** (le token ne peut pas être volé via JavaScript).  
    ✅ Empêche **le vol du token par un attaquant** via un script malveillant injecté.  

