# Cour : 


## 1. Variables et Affichage

Pug offre plusieurs manières d'afficher ou d'utiliser des variables dans un template.

### a. Interpolation avec `#{}`  
**Définition :**  
Permet d'insérer la valeur d'une variable dans une chaîne de caractères ou du texte.

**Syntaxe :**
```pug
p Bonjour, #{nom}!
```

**Exemple :**
```pug
- var nom = "Alice"
p Bonjour, #{nom}! Comment vas-tu aujourd'hui ?
```
*Résultat HTML :*
```html
<p>Bonjour, Alice! Comment vas-tu aujourd'hui ?</p>
```

---

### b. Utilisation de `=`  
**Définition :**  
L'opérateur `=` est utilisé pour évaluer et afficher une variable ou le résultat d'une expression sur une nouvelle ligne.  
*Attention :* Il effectue une **échappement HTML** par défaut (pour éviter les injections).

**Syntaxe :**
```pug
p= variable
```

**Exemple :**
```pug
- var message = "Bienvenue sur Pug!"
p= message
```
*Résultat HTML :*
```html
<p>Bienvenue sur Pug!</p>
```

---

### c. Utilisation de `-`  
**Définition :**  
L'opérateur `-` permet d'exécuter du code JavaScript sans produire directement de sortie HTML.  
Il est utile pour initialiser des variables ou faire des calculs.

**Syntaxe :**
```pug
- // code JavaScript ici
```

**Exemple :**
```pug
- var nb = 5
p Le double de #{nb} est #{nb * 2}.
```
*Résultat HTML :*
```html
<p>Le double de 5 est 10.</p>
```

---

## 2. Boucles

Pug permet de faire des boucles pour itérer sur des tableaux ou objets grâce à l'instruction `each`.

**Définition :**  
La boucle `each` parcourt un tableau et permet d'afficher du contenu pour chaque élément.

**Syntaxe :**
```pug
each item in items
  // utilisation de item
```

**Exemple :**
```pug
- var fruits = ['Pomme', 'Banane', 'Orange']
ul
  each fruit in fruits
    li= fruit
```
*Résultat HTML :*
```html
<ul>
  <li>Pomme</li>
  <li>Banane</li>
  <li>Orange</li>
</ul>
```

---

## 3. Conditions (if, else if, else)

Les conditions permettent de rendre le contenu dynamique en fonction d'expressions booléennes.

**Définition :**  
Utilisation des instructions `if`, `else if` et `else` pour conditionner l'affichage.

**Syntaxe :**
```pug
if condition
  // contenu si condition vraie
else if autreCondition
  // contenu si autreCondition vraie
else
  // contenu par défaut
```

**Exemple :**
```pug
- var age = 20
if age < 18
  p Vous êtes mineur.
else if age >= 18 && age < 65
  p Vous êtes adulte.
else
  p Vous êtes senior.
```
*Résultat HTML (pour age = 20) :*
```html
<p>Vous êtes adulte.</p>
```

---

## 4. Extends et Block

Ces fonctionnalités permettent de créer des layouts réutilisables et de structurer vos templates.

### a. `extends`
**Définition :**  
`extends` permet d'hériter d'un template de base (layout) et d'utiliser sa structure globale.

**Syntaxe :**
```pug
extends nom_du_fichier_layout
```

**Exemple (fichier `base.pug`) :**
```pug
// base.pug
doctype html
html
  head
    title Mon Site
  body
    header
      h1 En-tête commun
    block content
    footer
      p Pied de page
```

**Exemple (fichier `page.pug`) :**
```pug
// page.pug
extends base

block content
  main
    h2 Bienvenue sur la page d'accueil
    p Ceci est le contenu spécifique à cette page.
```

*Résultat HTML (après rendu de `page.pug`) :*
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Mon Site</title>
  </head>
  <body>
    <header>
      <h1>En-tête commun</h1>
    </header>
    <main>
      <h2>Bienvenue sur la page d'accueil</h2>
      <p>Ceci est le contenu spécifique à cette page.</p>
    </main>
    <footer>
      <p>Pied de page</p>
    </footer>
  </body>
</html>
```

### b. `block`
**Définition :**  
`block` est utilisé pour définir des zones modifiables dans un layout que les templates enfants peuvent remplacer ou étendre.

**Syntaxe :**
```pug
block nomDuBlock
  // contenu par défaut
```

**Exemple :**  
Voir l'exemple ci-dessus avec `block content` dans `base.pug`.

---

## 5. Include

**Définition :**  
La directive `include` permet d'inclure le contenu d'un autre fichier Pug dans le template courant. Cela favorise la réutilisation de code (par exemple, un header ou un footer commun).

**Syntaxe :**
```pug
include chemin/vers/le/fichier
```

**Exemple :**
Supposons que vous ayez un fichier `menu.pug` :
```pug
// menu.pug
nav
  ul
    li: a(href='/') Accueil
    li: a(href='/about') À propos
    li: a(href='/contact') Contact
```

Et un fichier principal `index.pug` :
```pug
doctype html
html
  head
    title Ma Page
  body
    include menu.pug
    main
      h1 Bienvenue sur ma page !
      p Contenu principal ici.
```

*Résultat HTML :*
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Ma Page</title>
  </head>
  <body>
    <nav>
      <ul>
        <li><a href="/">Accueil</a></li>
        <li><a href="/about">À propos</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
    <main>
      <h1>Bienvenue sur ma page !</h1>
      <p>Contenu principal ici.</p>
    </main>
  </body>
</html>
```

---

## Conclusion

Pug est un moteur de template qui permet :
- **D'afficher dynamiquement des variables** avec `#{}`, `=` et d'exécuter du code avec `-`.
- **De parcourir des tableaux** grâce à `each`.
- **De gérer des conditions** avec `if`, `else if` et `else`.
- **De structurer vos templates** avec `extends`, `block` pour créer des layouts réutilisables.
- **D'inclure d'autres fichiers** via `include` pour organiser et réutiliser des morceaux de code.

Ces fonctionnalités rendent Pug puissant pour créer des vues HTML dynamiques et maintenables dans des projets Node.js et Express.js. N'hésitez pas à expérimenter ces syntaxes pour tirer pleinement parti de la simplicité et de la concision offertes par Pug !