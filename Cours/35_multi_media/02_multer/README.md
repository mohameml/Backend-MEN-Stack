# Cour : **Gestion des fichies: `Multer`**


## 1. **`form-data`** :


> **`form-data`** est un type de format d'encodage utilisé pour **envoyer des données via HTTP** lorsque vous soumettez un formulaire ou effectuez une requête API. Il est particulièrement utilisé pour envoyer des fichiers, des images ou des données complexes dans des requêtes de type **`multipart/form-data`**.



- 🔍 **À quoi ça sert ?**
    - **Envoyer des fichiers** : Permet de télécharger des fichiers (images, documents, etc.) via des formulaires HTML ou des API.
    - **Gérer des données complexes** : Permet d'envoyer des données structurées (objets, tableaux) ainsi que des fichiers dans une même requête.



- 📋 **Caractéristiques**

    1. **Encodage en multipart** : Les données sont séparées par des délimiteurs et peuvent inclure des fichiers et des champs texte dans la même requête.
    2. **En-tête HTTP** : La requête doit inclure un en-tête `Content-Type` qui spécifie `multipart/form-data`, souvent avec un **boundary** pour délimiter les différentes parties.
    3. **Utilisation dans les formulaires** : Lorsqu'un formulaire HTML contient un champ de type `file`, il doit utiliser `multipart/form-data` pour envoyer le fichier.


- **Exemple :**

    📝 **Exemple de Formulaire HTML**
    Voici un exemple de formulaire qui envoie des données sous forme de `form-data` :
    ```html
    <form action="/upload" method="POST" enctype="multipart/form-data">
        <input type="text" name="username" placeholder="Nom d'utilisateur">
        <input type="file" name="avatar">
        <button type="submit">Envoyer</button>
    </form>
    ```


    **Exemple d'Envoi avec Axios**
    Lorsque vous utilisez une bibliothèque comme **Axios** pour envoyer des données sous forme de `form-data`, cela ressemble à ceci :
    ```javascript
    const formData = new FormData();
    formData.append('username', 'JohnDoe');
    formData.append('avatar', fileInput.files[0]); // Fichier sélectionné par l'utilisateur

    axios.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Erreur lors de l\'upload', error);
    });
    ```


    > La classe **`FormData`** est une fonctionnalité native du navigateur JavaScript qui permet de créer un ensemble de paires clé-valeur, généralement utilisé pour envoyer des données de formulaires, y compris des fichiers, via des requêtes HTTP. C'est particulièrement utile lorsque vous souhaitez envoyer des données avec le format **`multipart/form-data`**.

## 2. **Multer:**

- 📦 **Multer : Qu'est-ce que c'est et à quoi ça sert ?**  

    > Multer est un **middleware pour Express.js** utilisé pour gérer l'**upload de fichiers** (images, PDF, etc.) depuis un formulaire HTML ou une API REST.


- 🎯 **Pourquoi utiliser Multer ?**

    ✅ **Gérer les fichiers envoyés par un formulaire** (`multipart/form-data`).  
    ✅ **Stocker les fichiers dans un dossier spécifique** ou en **mémoire**.  
    ✅ **Renommer, filtrer ou valider les fichiers** avant l'enregistrement.  
    ✅ **Optimisé pour Express.js**, contrairement à `body-parser`, qui ne supporte pas `multipart/form-data`.  

- **Installation :**

    ```sh
    npm install multer
    ```

- **Upload d'un seul fichier**


    ```javascript
    const express = require('express');
    const multer = require('multer');
    const app = express();

    // 📂 Configuration du stockage des fichiers
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/'); // 📂 Dossier où sauvegarder les fichiers
        },
        filename: (req, file, cb) => {
            const ext = file.mimetype.split('/')[1]; // Récupère l'extension (ex: jpg, png)
            cb(null, `user-${Date.now()}.${ext}`); // Renomme le fichier
        }
    });

    // 📌 Initialisation de multer avec le stockage défini
    const upload = multer({ storage: storage });

    // 🎯 Route pour uploader une seule image
    app.post('/upload', upload.single('image'), (req, res ,next) => {
        res.send({ message: 'Fichier uploadé avec succès !', file: req.file });
    });

    // 🚀 Démarrer le serveur
    app.listen(3000, () => console.log('Serveur démarré sur http://localhost:3000'));
    ```


- **Upload de plusieurs fichiers**

    ```javascript
    app.post('/upload-multiple', upload.array('images', 5), (req, res) => {
        res.send({ message: 'Fichiers uploadés !', files: req.files });
    });
    ```

    ```html
    <input type="file" name="images" multiple>
    ```



### RQ : **config and init Multer:**

```js
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/users');
    },
    filename: (req, file, cb) => {
        // user-_id-timestep.jpeg 
        const ext = file.mimetype.split('/')[1];
        const fileName = `user-${req.user._id}-${Date.now()}.${ext}`;
        cb(null, fileName);
    }
});

const multerFiletr = (req, file, cb) => {

    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images', 400), false)
    }
}


const upload = multer({
    storage: multerStorage,
    fileFilter: multerFiletr
})

```

## 3. **memoryStorage:**


> Dans **Multer**, la méthode `memoryStorage()` est utilisée pour stocker les fichiers téléchargés en mémoire au lieu de les écrire directement sur le disque. Cela peut être utile dans plusieurs scénarios, comme le traitement de fichiers avant de les sauvegarder ou l'envoi vers un service externe.

- 📌 **Utilisation de memoryStorage()**

    Voici comment configurer Multer pour utiliser `memoryStorage()` :
    ```javascript
    const multer = require('multer');

    // 📂 Configuration de multer pour stocker les fichiers en mémoire
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });

    // 🎯 Route pour uploader un fichier
    app.post('/upload', upload.single('file'), (req, res) => {
        // req.file contient le fichier en mémoire
        console.log(req.file); // Affiche les détails du fichier

        // Exemple d'utilisation : envoyer le fichier vers un service externe
        // sendToExternalService(req.file.buffer);

        res.send({ message: 'Fichier reçu en mémoire !' });
    });
    ```

- **Détails de req.file**

    Lorsqu'un fichier est téléchargé avec `memoryStorage`, les détails du fichier sont accessibles via `req.file` :
    - `req.file.buffer` : Contient le fichier téléchargé sous forme de **Buffer**, ce qui permet de le traiter directement en mémoire.
    - `req.file.originalname` : Le nom original du fichier.
    - `req.file.mimetype` : Le type MIME du fichier.
    - `req.file.size` : La taille du fichier en octets.

- 🎯 **Cas d'utilisation de memoryStorage**

    - **Traitement des fichiers avant stockage :** Si vous souhaitez traiter le fichier (par exemple, le redimensionner, le compresser ou le convertir) avant de le sauvegarder sur le disque ou dans une base de données.

    - **Envoi vers des services externes :** Si vous devez envoyer le fichier vers un service externe (comme AWS S3, Cloudinary, etc.) sans le sauvegarder localement.

    - **Manipulation des fichiers en temps réel :** Si votre application nécessite une manipulation ou une analyse des fichiers en temps réel, sans stockage permanent.


## 4. **Multi Files:**


> Multer permet de gérer l'upload de plusieurs fichiers en une seule requête HTTP grâce à **`upload.array()`** ou **`upload.fields()`**.




- **Méthode 1 : `upload.array()` pour plusieurs fichiers avec le même champ**

    Si un formulaire permet l'envoi de **plusieurs fichiers sous le même nom de champ** (`files` dans cet exemple) :

    ```javascript
    app.post('/upload-multiple', upload.array('files', 5), (req, res) => {
        console.log(req.files); // Liste des fichiers téléchargés
        res.send({ message: 'Fichiers uploadés avec succès', files: req.files });
    });
    ```
    - `upload.array('files', 5)` : Accepte jusqu'à **5 fichiers** sous le champ `files`.



- **Méthode 2 : `upload.fields()` pour plusieurs champs différents**

    Si un formulaire contient plusieurs **champs de fichiers différents** (`avatar` et `documents`), utilisez `upload.fields()` :

    ```javascript
    app.post('/upload-mixed', upload.fields([
        { name: 'avatar', maxCount: 1 }, 
        { name: 'documents', maxCount: 3 }
    ]), (req, res) => {
        console.log(req.files); // Contient les fichiers classés par champ
        res.send({ message: 'Fichiers uploadés avec succès', files: req.files });
    });
    ```



