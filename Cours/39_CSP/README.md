# 📌 **Cours sur Content Security Policy (CSP)**
## 🔹 **1. Définition de la Content Security Policy (CSP)**
La **Content Security Policy (CSP)** est un mécanisme de sécurité qui aide à prévenir certaines attaques, telles que :
- **Cross-Site Scripting (XSS)**
- **Injection de contenu malveillant**
- **Clickjacking**
- **Mise en œuvre de restrictions sur les sources de contenu**

Elle fonctionne en définissant une politique de sécurité qui **restreint les ressources** qu'un navigateur peut charger (scripts, images, styles, AJAX, etc.).

---

## 🔹 **2. Comment fonctionne CSP ?**
CSP repose sur des **directives** qui spécifient les sources autorisées pour chaque type de ressource.

### **📜 Exemples de directives CSP**
| Directive        | Description |
|-----------------|-------------|
| `default-src`   | Définit la politique par défaut si aucune autre directive spécifique n’est définie. |
| `script-src`    | Définit les sources autorisées pour les scripts JavaScript. |
| `style-src`     | Définit les sources autorisées pour les styles CSS. |
| `img-src`       | Définit les sources autorisées pour les images. |
| `connect-src`   | Définit les sources autorisées pour les requêtes AJAX, WebSockets, EventSource. |
| `font-src`      | Définit les sources autorisées pour les polices de caractères. |
| `frame-src`     | Définit les sources autorisées pour les iframes et les frames. |
| `object-src`    | Définit les sources autorisées pour les plugins comme Flash. |
| `media-src`     | Définit les sources autorisées pour les vidéos et audios. |

---

## 🔹 **3. Exemple de politique CSP**
Une politique CSP se définit via **un en-tête HTTP** ou **une balise `<meta>` dans le HTML**.

### ✅ **Exemple d'en-tête CSP en HTTP**
```
Content-Security-Policy: default-src 'self'; script-src 'self' https://apis.google.com; img-src 'self' data:;
```
➡️ Explication :
- **`default-src 'self'`** → Autorise uniquement le chargement des ressources depuis le même domaine.
- **`script-src 'self' https://apis.google.com`** → Les scripts doivent venir du domaine actuel (`'self'`) ou de Google APIs.
- **`img-src 'self' data:`** → Autorise les images provenant du site ou encodées en `data:`.

---

### ✅ **Exemple d'ajout de CSP dans une balise HTML**
Si ton CSP est géré côté **frontend**, ajoute-le dans `<head>` :
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://apis.google.com;">
```
📌 **⚠️ Inconvénient** : Moins sécurisé car peut être contourné côté serveur.

---

## 🔹 **4. Implémentation de CSP en Express.js**
Dans une application **Express.js**, CSP est généralement appliqué via **des en-têtes HTTP**.

### **🔹 Solution 1 : Ajouter l’en-tête CSP manuellement**
Dans **Express.js**, utilise `res.setHeader()` :
```js
const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' https://apis.google.com; img-src 'self' data:;"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(3000, () => console.log("Serveur démarré sur http://localhost:3000"));
```
📌 **Inconvénient** : Tu dois gérer toutes les directives manuellement.

---

### **🔹 Solution 2 : Utiliser `helmet.js` (meilleure pratique)**
[`helmet.js`](https://www.npmjs.com/package/helmet) est un middleware de sécurité pour Express qui gère CSP et d'autres protections.

### **Installation**
```sh
npm install helmet
```

### **Ajout de CSP via `helmet`**
```js
const express = require("express");
const helmet = require("helmet");

const app = express();

// Appliquer CSP via Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://apis.google.com"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'", "https://api.example.com"],
      },
    },
  })
);

app.get("/", (req, res) => {
  res.send("Hello, Secure World!");
});

app.listen(3000, () => console.log("Serveur sécurisé démarré sur http://localhost:3000"));
```
📌 **Avantages** :
- 🛡️ Sécurise automatiquement plusieurs aspects.
- 🔄 Facile à configurer et à mettre à jour.

---

## 🔹 **5. Modes de CSP**
### ✅ **Mode strict (bloquant)**
Si une ressource non autorisée est chargée, elle est bloquée et une erreur est affichée dans la console du navigateur.

### ✅ **Mode "Report-Only" (détection sans blocage)**
Ce mode permet de **tester** les règles CSP sans les appliquer immédiatement.
```js
app.use(
  helmet({
    contentSecurityPolicy: {
      reportOnly: true, // Ne bloque pas mais signale les violations
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://apis.google.com"],
      },
    },
  })
);
```
➡️ **Utile pour tester avant d’appliquer CSP en mode strict !**

---

## 🔹 **6. Comment tester CSP ?**
### **📌 1. Vérifier dans les outils de développement (`F12`)**
1. **Ouvre la console (`F12` → Onglet "Console")**.
2. Regarde les erreurs **"Refused to load"** :
   ```
   Refused to load the script 'https://malicious-site.com/script.js' because it violates the following Content Security Policy directive: "script-src 'self'".
   ```
3. Vérifie l’en-tête CSP dans **l’onglet "Network" → "Headers"**.

### **📌 2. Tester en mode "Report-Only"**
Ajoute cette en-tête pour voir les violations sans bloquer :
```
Content-Security-Policy-Report-Only: default-src 'self'; script-src 'self' https://apis.google.com;
```
Tu peux aussi envoyer les violations à un serveur :
```js
app.use(
  helmet({
    contentSecurityPolicy: {
      reportUri: "/csp-report",
    },
  })
);

app.post("/csp-report", (req, res) => {
  console.log("Violation CSP détectée :", req.body);
  res.sendStatus(200);
});
```
📌 **Cela permet de recevoir des logs sans impacter les utilisateurs.**

---

## 🚀 **Résumé et Bonnes Pratiques**
✅ **Content Security Policy (CSP)** protège contre les attaques comme XSS et injection de scripts.  
✅ **Utilise `helmet.js` pour simplifier l’implémentation**.  
✅ **Teste en mode `Report-Only` avant de tout bloquer**.  
✅ **Ajoute progressivement les sources nécessaires (`script-src`, `connect-src`, etc.)**.  
✅ **Surveille les violations via la console et les logs serveur**.  

---

### 📢 **Besoin d’une démo sur un projet Express ? Dis-moi !** 🚀