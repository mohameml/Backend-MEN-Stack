# Cour :  **Cours complet sur les Mixins en Pug**  

>Les **mixins** en Pug sont des **fonctions réutilisables** permettant de générer du code HTML dynamique avec des paramètres. Elles sont particulièrement utiles pour éviter la répétition de code et améliorer la modularité.




## **1. Définition d'un Mixin**

> Un **mixin** est une fonction dans Pug qui peut être réutilisée plusieurs fois avec différents paramètres pour générer du HTML dynamique.

- **Syntaxe de base :**

```pug
mixin nomDuMixin(paramètre1, paramètre2)
//- Code HTML à générer
```

Une fois défini, un mixin est utilisé avec la syntaxe suivante :
```pug
+nomDuMixin(argument1, argument2)
```



## **2. Exemple simple d'un mixin**

Créons un mixin pour un **bouton** réutilisable :

```pug
mixin bouton(text, couleur)
  button(style=`background-color: ${couleur}; padding: 10px; border: none; color: white;`)
    = text
```

Utilisation :
```pug
+bouton("Clique ici", "blue")
+bouton("Supprimer", "red")
```

- **Sortie HTML générée :**

```html
<button style="background-color: blue; padding: 10px; border: none; color: white;">
  Clique ici
</button>
<button style="background-color: red; padding: 10px; border: none; color: white;">
  Supprimer
</button>
```


## **3. Mixin avec du contenu dynamique (`block`)**

On peut aussi créer des mixins qui **acceptent du contenu dynamique** via le mot-clé `block`.

### ✅ **Exemple : Une carte réutilisable avec du contenu dynamique**
```pug
mixin card(title)
  .card
    h2= title
    .content
      block
```

Utilisation avec du contenu personnalisé :
```pug
+card("Titre de la carte")
  p Ceci est une carte avec un texte personnalisé.
  ul
    li Élément 1
    li Élément 2
```

### 🔹 **Sortie HTML générée :**
```html
<div class="card">
  <h2>Titre de la carte</h2>
  <div class="content">
    <p>Ceci est une carte avec un texte personnalisé.</p>
    <ul>
      <li>Élément 1</li>
      <li>Élément 2</li>
    </ul>
  </div>
</div>
```



## 🔹 **4. Mixins avec valeurs par défaut**

On peut attribuer des **valeurs par défaut** aux paramètres pour rendre l’utilisation plus flexible.

```pug
mixin alert(message, type="info")
  .alert(class=type)
    p= message
```

Utilisation :
```pug
+alert("Ceci est une alerte d'information")
+alert("Erreur détectée", "error")
```

### 🔹 **Sortie HTML générée :**
```html
<div class="alert info">
  <p>Ceci est une alerte d'information</p>
</div>
<div class="alert error">
  <p>Erreur détectée</p>
</div>
```



## 🔹 **5. Mixins avec plusieurs paramètres et classes dynamiques**
Les mixins peuvent également inclure des **classes dynamiques**.

```pug
mixin button(text, type)
  button(class="btn btn-" + type)= text
```

Utilisation :
```pug
+button("Valider", "success")
+button("Annuler", "danger")
```

### 🔹 **Sortie HTML générée :**
```html
<button class="btn btn-success">Valider</button>
<button class="btn btn-danger">Annuler</button>
```


## 🔹 **6. Utilisation de Mixins dans un Fichier Externe (`include`)**
On peut stocker les mixins dans un fichier séparé et les inclure dans d'autres fichiers Pug.

### ✅ **Exemple :**
Fichier `mixins.pug` :
```pug
mixin button(text, type)
  button(class="btn btn-" + type)= text
```

Dans un autre fichier `index.pug` :
```pug
include mixins

html
  body
    +button("Envoyer", "primary")
    +button("Annuler", "secondary")
```

Cela permet une meilleure organisation du code !

---

## 🎯 **Conclusion**
- ✅ **Les mixins permettent d'éviter la répétition de code** en définissant des éléments réutilisables.
- ✅ **On peut leur passer des paramètres pour les rendre dynamiques.**
- ✅ **Ils peuvent inclure du contenu avec `block`.**
- ✅ **Ils permettent une organisation modulaire en étant stockés dans des fichiers séparés.**

Si tu veux structurer une application avec **Pug**, **les mixins sont un outil essentiel** pour rendre le code plus lisible et plus maintenable ! 🚀