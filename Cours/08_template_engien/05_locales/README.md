### **Les variables locales dans `res.locals` et leur relation avec Pug**
Dans **Express.js**, `res.locals` est un objet qui stocke des variables accessibles dans les vues **Pug** (ou d'autres moteurs de template comme EJS, Handlebars, etc.).  

#### **1️⃣ Qu'est-ce que `res.locals` ?**
C'est un objet attaché à la réponse (`res`) qui permet de stocker des données **disponibles uniquement pour la requête en cours**. Il est souvent utilisé pour :  
- **Passer des variables globales** aux templates (ex: nom d'utilisateur, flash messages, etc.).
- **Stocker des données calculées** dans un middleware et les récupérer dans la vue.

Exemple dans Express :
```javascript
app.use((req, res, next) => {
  res.locals.siteTitle = "Mon Application";
  res.locals.user = req.user || null; // Supposons que req.user contient l'utilisateur connecté
  next();
});
```
Ces variables seront accessibles **dans toutes les vues Pug** sans avoir à les passer manuellement dans `res.render()`.

---

#### **2️⃣ Comment `res.locals` fonctionne avec Pug ?**
Dans **Pug**, les variables définies dans `res.locals` sont directement accessibles.

**Exemple :**
Si dans ton routeur tu fais :
```javascript
app.get("/", (req, res) => {
  res.locals.pageTitle = "Accueil";
  res.render("index");
});
```
Dans ton fichier **`views/index.pug`**, tu peux utiliser directement `pageTitle` :
```pug
html
  head
    title= pageTitle
  body
    h1 Bienvenue sur #{pageTitle}
```
🔹 **Résultat affiché dans le navigateur :**
```
Bienvenue sur Accueil
```

---

#### **3️⃣ Différence entre `res.locals` et les variables passées à `res.render()`**
Tu peux aussi passer des variables directement dans `res.render()`, mais `res.locals` est utile pour **des variables globales** accessibles partout.

✔ **Avec `res.render()` (variables locales pour une vue spécifique)** :
```javascript
app.get("/", (req, res) => {
  res.render("index", { pageTitle: "Accueil" });
});
```
Tu dois **passer explicitement** `pageTitle` à chaque `res.render()`.

✔ **Avec `res.locals` (variables accessibles partout)** :
```javascript
app.use((req, res, next) => {
  res.locals.pageTitle = "Mon site";
  next();
});

app.get("/", (req, res) => {
  res.render("index"); // Pas besoin de passer pageTitle à chaque fois
});
```
Tu peux utiliser `pageTitle` dans **toutes** les vues Pug sans rien passer manuellement.

---

### **📌 Conclusion**
- `res.locals` stocke des variables **disponibles uniquement pour la requête en cours**.
- Utile pour **des variables globales**, comme les infos utilisateur, les messages flash, etc.
- Pug peut utiliser ces variables **sans qu'elles soient explicitement passées dans `res.render()`**.
- Alternative : passer les variables directement dans `res.render()` si elles sont spécifiques à une route.

Tu veux un exemple plus concret dans ton projet ? 🚀