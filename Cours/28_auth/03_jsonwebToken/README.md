# Cour :  **JSON Web Token (jsonwebtoken - JWT)**  

## 1. **Définition**  

- JSON Web Token (JWT) est un standard ouvert (RFC 7519) permettant l'échange sécurisé d'informations entre des parties sous forme d'un objet JSON signé.  
JWT est souvent utilisé pour l'authentification et l'autorisation dans les applications web.  

- **Installation du package en Node.js**  

    ```sh
    npm install jsonwebtoken
    ```



## 2. **`jwt.sign()` Générer un token :**


```js
const jwt = require('jsonwebtoken');

const payload = { id: "12345", role: "admin" };
const secretKey = "monSecretUltraSecurise";
const options = { expiresIn: "1h" };

const token = jwt.sign(payload, secretKey, options);
console.log(token);
```

- **`payload`** : Données stockées dans le token (peuvent être déchiffrées par n’importe qui, ne pas y mettre des infos sensibles).
- **`secretKey`** : Clé secrète utilisée pour signer le token (ne doit jamais être exposée).
- **`expiresIn`** : Durée avant expiration (`"1h"` = 1 heure).



## 3.**`jwt.verify()` Vérifier un token :**

- **code :**

    ```js
    const decoded = jwt.verify(token, secretKey);
    console.log(decoded);
    ```
    - Vérifie si le token est valide (non modifié, non expiré).

    - Retourne le payload du token s'il est valide.

- **RQ :** Si le token est expiré ou invalide , `jwt.verify()` lève une erreur.  

```js
try {
    const decoded = jwt.verify(token, secretKey);
    console.log(decoded);
} catch (error) {
    console.error("Token invalide ou expiré !");
}
```



## 4. **Exemple d'un middleware Express.js utilisant JWT**

```js
const jwt = require('jsonwebtoken');

const protect = catchAsync(async (req, res, next) => {

    let token;

    //  1) Getting token and check of it's there 

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }


    if (!token) {
        return next(new AppError("Your are not logged in! Please log in to get access", 401));
    }

    // 2) Verification token : token valide 

    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user is still exists 

    const user = await User.findById(decode.id);

    if (!user) {
        return next(new AppError("The user belonging to this token has no longer exist.", 401));
    }

    // 4) Check if user changend password after the token was issued 

    if (user.isPasswordChanged(decode.iat)) {

        return next(new AppError("User recently changed password! Please log in again.", 401));
    }

    // GRANT ACCESS TO PROTECED ROUTE :
    req.user = user;
    next();


});
```


## RQ : **Bonnes pratiques avec JWT**

✔️ **Stocker le secret dans les variables d'environnement** (`process.env.JWT_SECRET`).  
✔️ **Utiliser HTTPS** pour éviter l'interception des tokens.  
✔️ **Éviter de stocker le JWT en `localStorage`** (risque XSS), privilégier **httpOnly cookies**.  
✔️ **Toujours définir une expiration** pour éviter les tokens à vie (`expiresIn: "1h"`).  

