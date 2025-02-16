# Cour : **Introduction à Pug:**


## 1. **Introduction :**

- **Def:**

  > Pug est un moteur de template pour Node.js qui permet de générer du HTML de manière concise et lisible. Il se distingue par sa **syntaxe basée sur l'indentation** (similaire à Python), ce qui réduit le besoin d'écrire des balises fermantes et rend le code plus propre et rapide à écrire.

- **Pourquoi utiliser Pug ?**

  ✅ **Syntaxe simplifiée** : Moins de balises HTML et suppression des `{}` et `;` du JavaScript.  
  ✅ **Facilite la réutilisation** : Prise en charge des variables, boucles et conditions.  
  ✅ **Bonne intégration avec Express.js** : Permet un rendu serveur rapide pour le **Server-Side Rendering (SSR)**.  
  ✅ **Meilleure lisibilité** : La structure indentée améliore la clarté du code.



- **Installation de Pug:**

  Pour utiliser Pug dans un projet Node.js, commencez par l'installer avec npm :

  ```sh
  npm install pug
  ```

- **Configuration :**

  Si vous utilisez **Express.js**, vous devez le configurer comme moteur de template :

  ```js
  const express = require('express');
  const app = express();

  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, 'views'));
  app.use(express.static(path.join(__dirname, 'public'))); // for static file 

  app.get('/', (req, res) => {
    res.render('index', { title: 'Accueil', message: 'Bienvenue sur notre site !' });
  });

  app.listen(3000, () => console.log('Serveur en écoute sur le port 3000'));
  ```



## 3. **Syntaxe de base de Pug:**

### **a) Structure de base**
Un fichier **index.pug** :

```pug
doctype html
html
  head
    title Mon site avec Pug
  body
    h1 Bienvenue sur mon site !
    p Ceci est une page générée avec Pug.
```
👉 **Explication** :
- Pas de balises `<html>`, `<head>` ou `<body>` fermantes.
- L'indentation hiérarchise le contenu.

### **b) Variables dans Pug**
Dans Express.js, on peut passer des variables à Pug via `res.render()` :

```js
app.get('/', (req, res) => {
  res.render('index', { title: 'Accueil', user: 'Alice' });
});
```

Et dans **index.pug** :

```pug
doctype html
html
  head
    title= title
  body
    h1 Bonjour, #{user} !
```
👉 `#{}` permet d'insérer une variable directement.

---

## 4. Fonctions avancées

### **a) Conditions**
```pug
if user
  h1 Bonjour, #{user} !
else
  h1 Bienvenue, visiteur !
```

### **b) Boucles**
```pug
ul
  each item in ['Pomme', 'Banane', 'Orange']
    li= item
```

### **c) Inclusions de fichiers (layouts)**
Définition d'un **layout.pug** :

```pug
doctype html
html
  head
    title= title
  body
    block content
```
Puis utilisation dans **index.pug** :

```pug
extends layout

block content
  h1 Bienvenue sur la page d'accueil
```

---

## 5. Conclusion
🎯 **Pug** est un moteur de template efficace et élégant qui permet de simplifier le code HTML.  
🔹 Son **indentation stricte** améliore la lisibilité.  
🔹 Sa **compatibilité avec Express.js** facilite le **Server-Side Rendering (SSR)**.  
🔹 Il permet d'intégrer des **variables, boucles, conditions et layouts** pour une meilleure réutilisation du code.

C'est un excellent choix pour structurer des applications **Express.js** dynamiques et performantes ! 🚀