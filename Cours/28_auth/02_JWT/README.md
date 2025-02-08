# Cour 02 : **``JWT: JSON Web Token``**



## 1.**Définition :**


- Un **JSON Web Token (JWT)** est un standard ouvert (RFC 7519) utilisé pour **échanger des informations de manière sécurisée entre deux parties** sous forme de JSON signé numériquement. Il est souvent utilisé pour l’authentification et l’autorisation dans les applications web et mobiles.  

- **Structure d’un JWT :**  Un JWT est composé de **trois parties** encodées en Base64 et séparées par des points `.` :  

    1. **Header (En-tête)** : Contient le type de token (`JWT`) et l’algorithme de signature utilisé.  
    2. **Payload (Charge utile)** : Contient les **données** (claims) à transmettre, comme l'ID de l’utilisateur, son rôle, etc.  
    3. **Signature** : Assure l’intégrité du token et empêche toute falsification.

- **Exemple d’un JWT :** 

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkFsaSIsInJvbGUiOiJhZG1pbiJ9.VOZFNJ5oA8UpLhxu3LwR0KMB9mA7NzAw6DO5pqVHqPs
```

![alt text](image-1.png)



## 2.**Utilisation du JWT :**  

- **Authentification (AuthN) :** 

    - Un utilisateur se connecte avec son identifiant et mot de passe.  
    - Le serveur génère un JWT et le retourne au client.  
    - Le client envoie ce JWT dans les requêtes suivantes (`Authorization: Bearer <JWT>`).  

- **Autorisation (AuthZ) :**  

    - Un JWT peut contenir des **rôles** ou des **permissions** permettant au serveur de vérifier si l’utilisateur a accès à une ressource spécifique.  


![alt text](image.png)


## 3. **Implémentation (en Node.js avec `jsonwebtoken`) :**

```javascript
const jwt = require('jsonwebtoken');

const secretKey = "mySecretKey"; // Clé secrète
const payload = { userId: 123, role: "admin" };

// Création du token
const token = jwt.sign(payload, secretKey, { algorithm: "HS256", expiresIn: "1h" });
console.log("JWT:", token);

// Vérification du token
try {
  const decoded = jwt.verify(token, secretKey);
  console.log("Données décodées:", decoded);
} catch (error) {
  console.log("Token invalide !");
}
```

## 4. **Avantages et Inconvénients**

- **Avantages** :  ✅

    - Léger et facile à utiliser  
    - Auto-contenu (pas besoin de stockage côté serveur)  
    - Sécurisé lorsqu’il est bien implémenté  

- **Inconvénients** :  

    - **Non révocable** (si volé, il reste valide jusqu’à expiration)  
    - **Ne doit pas contenir d’informations sensibles** (même si signé, le payload est lisible)  








