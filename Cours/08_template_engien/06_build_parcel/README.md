# Cour : **Cours sur Parcel et les outils de bundler**

## 1. **Outils de bundler en général et leurs avantages:**

> Un bundler est un outil qui prend plusieurs fichiers source (JavaScript, CSS, images, etc.), les optimise et les regroupe en un ensemble de fichiers destinés à être déployés en production.

- **Principaux bundlers**

    - **Webpack** : Le plus populaire et très configurable, supporte le code-splitting, tree shaking, et plugins avancés.
    - **Parcel** : Zéro configuration, rapide, et optimisé pour la simplicité.
    - **Rollup** : Idéal pour les bibliothèques JavaScript, mise en avant du tree shaking.
    - **Esbuild** : Très performant, écrit en Go, souvent utilisé pour le développement rapide.
    - **Vite** : Construit sur Esbuild, optimisé pour Vue et React avec HMR très rapide.

- **Avantages des bundlers:**

    - **Optimisation** : Minification, compression, elimination du code mort.
    - **Performance** : Chargement plus rapide des pages avec code-splitting.
    - **Gestion des dépendances** : Importation des modules avec support pour les assets (CSS, images, etc.).
    - **Compatibilité cross-browser** : Transpilation pour les anciens navigateurs avec Babel.



## 2. **Installation et configuration de Parcel:**

- **Installation de Parcel**

    Prérequis : Node.js et npm/yarn installés.
    ```sh
    npm install -g parcel-bundler  # Installation globale
    npm install --save-dev parcel  # Installation locale pour un projet
    ```


-  **Configuration avec `package.json`:**

    ```json
    {
        "targets": {
            "main": false,
            "default": {
                "context": "browser",
                "publicUrl": "./"
            }
        },
        "scripts": {
            "watch:js": "parcel watch --no-hmr ./public/js/index.js --dist-dir ./public/js/bundled",
            "build:js": "parcel build ./public/js/index.js --dist-dir ./public/js/bundled --no-scope-hoist"
        }
    }
    ```

    - **`watch:js`** : Surveille les changements dans `index.js` et rebundle sans Hot Module Replacement (HMR).
    - **`build:js`** : Fait un build optimisé pour la production sans `scope hoisting`.




