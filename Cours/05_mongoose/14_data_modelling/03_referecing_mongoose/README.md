# Cour  : **referencing en Mongoose:** 



##  1. **Référencement avec ObjectId**

- En **Mongoose**, le **referencing** (ou **population**) permet de créer des relations entre des documents de collections différentes en stockant seulement les **ObjectId** et en les remplissant (populate) lorsqu'on en a besoin.


- L'approche standard en Mongoose consiste à stocker uniquement l'`_id` du document référencé dans un champ.

- **Exemple : Modélisation d'une relation `User` et `Post`**

    - Un `Post` appartient à un `User` (1:N)

    - Un `User` peut avoir plusieurs `Post`

    ```js
    const mongoose = require("mongoose");

    const userSchema = new mongoose.Schema({
    name: String,
    email: String
    });

    const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User" 
        } // Référence à User
    });

    const User = mongoose.model("User", userSchema);
    const Post = mongoose.model("Post", postSchema);
    ```
    Ici, `author` stocke l'`ObjectId` d'un `User`.




    ```js
    async function createData() {
    const user = new User({ name: "Alice", email: "alice@example.com" });
    await user.save();

    const post = new Post({
        title: "Mon premier post",
        content: "Ceci est le contenu du post",
        author: user._id // Stocke l'ID de l'utilisateur
    });
    
    await post.save();

    console.log("Données enregistrées !");
    }

    createData();
    ```




##  2. **Récupérer un Post avec l'Utilisateur associé (Population)**


- Si on fait une requête simple :

    ```js
    const post = await Post.findOne().exec();
    console.log(post);
    ```
    On obtient :
    ```json
    {
    "_id": "65a12345abcde6789f012345",
    "title": "Mon premier post",
    "content": "Ceci est le contenu du post",
    "author": "65a67890fghij1234kl56789" // Seulement l'ObjectId
    }
    ```
    ➡ Pas très utile... 😕

- 👉 **Solution : `populate()` pour récupérer les données complètes de l'utilisateur**

    ```js
    const postWithAuthor = await Post.findOne().populate("author").exec();
    console.log(postWithAuthor);
    ```
    Maintenant, on obtient :
    ```json
    {
    "_id": "65a12345abcde6789f012345",
    "title": "Mon premier post",
    "content": "Ceci est le contenu du post",
    "author": {
        "_id": "65a67890fghij1234kl56789",
        "name": "Alice",
        "email": "alice@example.com"
    }
    }
    ```

