# Cour :  **Sharp : Traitement et Optimisation d'Images en Backend**  

## 1. **📌 Définition :**  

> Sharp est une bibliothèque **Node.js ultra-rapide** permettant de **redimensionner, compresser et convertir** des images sans perte de qualité. Elle fonctionne directement en mémoire, ce qui la rend **plus rapide et efficace** que d'autres solutions comme ImageMagick.  

- ⚡ **Pourquoi utiliser Sharp ?**  

    ✅ **Redimensionnement** d'images (ex: 500x500 pixels).  
    ✅ **Compression** pour optimiser le stockage et améliorer la vitesse de chargement.  
    ✅ **Conversion** entre formats (JPEG, PNG, WebP, etc.).  
    ✅ **Traitement en mémoire** (évite d'écrire sur le disque avant d'envoyer à un service cloud).  

- 🛠️ **Exemple d'Utilisation : Redimensionner une Image**  

    ```js
    const sharp = require('sharp');

    sharp('input.jpg')
        .resize(500, 500)  // Redimensionne à 500x500 pixels
        .toFormat('jpeg')   // Convertit en JPEG
        .jpeg({ quality: 80 }) // Compression à 80% de qualité
        .toFile('output.jpg') // Sauvegarde la nouvelle image
        .then(() => console.log('Image traitée avec succès !'))
        .catch(err => console.error('Erreur Sharp:', err));
    ```

## 2. 🔥 **Integration avec Multer (Stockage en Mémoire + Traitement)**  

> Sharp peut être utilisé avec **Multer** pour traiter les images **avant de les stocker** :  

```js
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'Aucune image envoyée' });

    const processedImage = await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 80 })
        .toBuffer();

    // Envoyer processedImage vers un stockage cloud (ex: AWS S3)
    res.json({ message: 'Image traitée avec succès !' });
});
```


