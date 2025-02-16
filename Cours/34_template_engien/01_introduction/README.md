# Cour : 

## 1. Introduction aux Moteurs de Templates en Backend

### a. Qu'est-ce qu'un moteur de template ?

- **Définition :**  
  
    > Un moteur de template est un outil qui permet de générer du contenu (généralement du HTML) de manière dynamique. Il prend des fichiers modèles (templates) contenant des espaces réservés (placeholders) et des instructions de contrôle (boucles, conditions, etc.) et les remplit avec des données venant du serveur.
  
- **Utilité :**
  
  - **Dynamisation du contenu :** Créer des pages web personnalisées en fonction des données (utilisateurs, produits, articles, etc.).
  
  - **Séparation de la logique et de la présentation :** Le code de la logique métier reste séparé du code de présentation, ce qui facilite la maintenance et la lisibilité.
  
  - **Réutilisabilité :** Permet de réutiliser des composants communs (header, footer, etc.) sur plusieurs pages.

### b. Utilisation dans le Server-Side Rendering (SSR)

- **Server-Side Rendering (SSR) :**  
  Le SSR consiste à générer le HTML complet sur le serveur avant de l'envoyer au client. Les moteurs de templates sont un outil clé dans ce processus car ils permettent :
  
  - D'améliorer le **temps de chargement initial** et le **SEO** (optimisation pour les moteurs de recherche) en fournissant un contenu immédiatement visible.
  
  - D'offrir une **meilleure expérience utilisateur** en rendant les pages rapidement avec du contenu pré-rempli.
  
- **Processus SSR avec un moteur de template :**  

  1. Le serveur reçoit une requête pour une page.
  2. Le serveur récupère les données nécessaires (depuis une base de données ou une API).
  3. Le moteur de template fusionne ces données avec un fichier template pour générer le HTML complet.
  4. Le HTML généré est envoyé au client.


## 2. Quelques Moteurs de Templates Classiques en Express.js

Express.js, framework backend pour Node.js, supporte plusieurs moteurs de templates. Voici quelques-uns des plus utilisés :

### a. EJS (Embedded JavaScript)

- **Caractéristiques :**
  - Syntaxe simple et proche du HTML.
  - Permet d'insérer du JavaScript dans le template.
  

- **Exemple de syntaxe EJS :**

    ```html
    <!-- views/index.ejs -->
    <!DOCTYPE html>
    <html>
        <head>
        <title><%= title %></title>
        </head>
        <body>
        <h1>Bienvenue, <%= user.name %>!</h1>
        <ul>
            <% for(let i = 0; i < items.length; i++) { %>
            <li><%= items[i] %></li>
            <% } %>
        </ul>
        </body>
    </html>
    ```

### b. Pug (anciennement Jade)

- **Caractéristiques :**
  
  - Syntaxe concise et basée sur l'indentation.
  
  - Moins verbeux que le HTML traditionnel.
  
- **Exemple de syntaxe Pug :**
  
    ```pug
    //- views/index.pug
    doctype html
    html
    head
        title= title
    body
        h1 Bienvenue, #{user.name}!
        ul
        each item in items
            li= item
    ```


### c. Handlebars

- **Caractéristiques :**
  - Syntaxe simple basée sur les accolades.
  - Supporte des helpers pour effectuer des opérations dans le template.
  
- **Exemple de syntaxe Handlebars :**
  ```handlebars
  <!-- views/index.handlebars -->
  <!DOCTYPE html>
  <html>
    <head>
      <title>{{title}}</title>
    </head>
    <body>
      <h1>Bienvenue, {{user.name}}!</h1>
      <ul>
        {{#each items}}
          <li>{{this}}</li>
        {{/each}}
      </ul>
    </body>
  </html>
  ```


## 3. Intégration dans une Application Express.js

Voici un exemple de configuration Express.js avec EJS :

```js
const express = require('express');
const app = express();

// Définir EJS comme moteur de template
app.set('view engine', 'ejs');

// Définir le dossier où se trouvent les templates
app.set('views', './views');

// Exemple de route avec SSR
app.get('/', (req, res) => {
  const data = {
    title: 'Accueil',
    user: { name: 'Alice' },
    items: ['Item 1', 'Item 2', 'Item 3']
  };
  // Le template "index.ejs" est rendu avec les données
  res.render('index', data);
});

app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
```

