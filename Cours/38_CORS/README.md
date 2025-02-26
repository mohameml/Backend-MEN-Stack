# Cour : 🚀 **Cours sur CORS (Cross-Origin Resource Sharing) avec Express.js**  


##   1. **Définition de CORS**

> CORS (**Cross-Origin Resource Sharing**) est un mécanisme de sécurité qui permet ou restreint les requêtes HTTP entre différentes origines (domaines, protocoles ou ports).  

- Par défaut, pour des raisons de sécurité, les navigateurs bloquent les requêtes faites vers une origine différente (cross-origin) du site web qui les a émises. **CORS est une politique de sécurité implémentée par le navigateur, et non par le serveur.**


- **Comment fonctionne CORS ?**

    Lorsqu’un navigateur envoie une requête **cross-origin** (c'est-à-dire vers un domaine différent), voici ce qui se passe :

    1. **Le navigateur envoie une requête HTTP avec un en-tête `Origin`** indiquant l’origine de la requête.
    2. **Le serveur répond avec un en-tête `Access-Control-Allow-Origin`**, précisant s’il autorise cette origine ou non.
    3. **Si l’origine est autorisée**, le navigateur accepte la réponse et exécute le code client.
    4. **Si l’origine est refusée**, le navigateur bloque la requête et affiche une erreur de CORS dans la console.


## 2. **Types de Requêtes et CORS** 

> Il existe **deux types de requêtes CORS** :

### 2.1 **Les requêtes simples (Simple Requests) :**

- Ces requêtes sont envoyées directement sans vérification préalable si elles respectent **ces trois conditions** :

    - **Méthodes HTTP autorisées** : `GET`, `POST`, `HEAD`
    - **En-têtes autorisés** : `Content-Type` doit être `application/x-www-form-urlencoded`, `multipart/form-data` ou `text/plain`
    - **Aucune utilisation d'en-têtes personnalisés (`Authorization`, `X-My-Custom-Header`, etc.)**

- 📌 **Exemple d'une requête simple :**

    ```js
    fetch('https://api.example.com/data', {
    method: 'GET'
    });
    ```
    Si le serveur répond avec :  
    ```http
    Access-Control-Allow-Origin: *
    ```
    Alors la requête est acceptée par le navigateur.



### 2.2 **Les requêtes préflight (Preflight Requests) :**

- Si une requête ne respecte pas les critères ci-dessus (par ex. si elle utilise `PUT`, `DELETE` ou un en-tête personnalisé comme `Authorization`), le navigateur envoie **d'abord** une requête **OPTIONS** avant d'envoyer la vraie requête.


- 📌 **Exemple :**

    ```js
    fetch('https://api.example.com/data', {
    method: 'DELETE',
    headers: {
        'Authorization': 'Bearer myToken'
    }
    });
    ```
    Dans ce cas, le navigateur envoie **automatiquement** une requête `OPTIONS` avant la requête `DELETE` pour demander au serveur si cette requête est autorisée.

    Le serveur doit répondre avec :

    ```http
    Access-Control-Allow-Origin: https://myfrontend.com
    Access-Control-Allow-Methods: GET, POST, PUT, DELETE
    Access-Control-Allow-Headers: Authorization
    ```
    Si ces en-têtes ne sont pas présents, le navigateur bloque la requête.



## 3. **Implémentation de CORS en Express.js:**

- Pour gérer les règles CORS dans un serveur **Express.js** :Le plus simple est d'utiliser le package [`cors`](https://www.npmjs.com/package/cors).

- 📌 **Installation :**

    ```sh
    npm install cors
    ```

- 📌 **Utilisation dans Express.js :**

    ```js
    const express = require('express');
    const cors = require('cors');

    const app = express();

    // Autorise toutes les origines

    // simple Req : 
    app.use(cors());

    // Preflight Req : 
    app.options('*' , cors());
    ```

- **Autoriser seulement certaines origines**

    Si tu veux autoriser uniquement ton frontend (`https://myfrontend.com`), utilise :
    ```js
    app.use(cors({
    origin: 'https://myfrontend.com'
    }));
    ```
    Réponse HTTP :
    ```http
    Access-Control-Allow-Origin: https://myfrontend.com
    ```

    👉 **Seules les requêtes venant de `https://myfrontend.com` seront acceptées.**



- **Configurer CORS avec des options avancées :**

    Si tu veux gérer plusieurs origines et des options avancées :

    ```js
    const corsOptions = {
    origin: ['https://myfrontend.com', 'https://admin.myfrontend.com'], // Autoriser plusieurs domaines
    methods: 'GET,POST,PUT,DELETE', // Autoriser ces méthodes HTTP
    allowedHeaders: ['Content-Type', 'Authorization'], // Autoriser ces en-têtes
    credentials: true // Autoriser les cookies et les identifiants (tokens)
    };

    app.use(cors(corsOptions));
    ```

    Réponse HTTP :
    ```http
    Access-Control-Allow-Origin: https://myfrontend.com
    Access-Control-Allow-Methods: GET, POST, PUT, DELETE
    Access-Control-Allow-Headers: Content-Type, Authorization
    Access-Control-Allow-Credentials: true
    ```



