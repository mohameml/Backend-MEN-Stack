# cour : **Protocol Buffers**

## 1. **Introduction:**

-   **Définition :**

    > Protocol Buffers (souvent abrégé en **protobuf**) est un **format de sérialisation de données** développé par Google. Il permet de définir des structures de données (messages) de manière concise et de les sérialiser dans un format binaire compact, idéal pour la transmission et le stockage.

-   **Caractéristiques principales :**

    -   **Langage neutre et indépendant de la plateforme :** Protobuf peut être utilisé avec différents langages de programmation (C++, Python, Java, etc.).

    -   **Performances élevées :** Grâce à son format binaire compact, il est plus rapide à sérialiser/désérialiser et consomme moins de bande passante et de stockage que des formats comme JSON ou XML.

-   **Utilisation de Protocol Buffers**

    -   **Communication entre services :** Protobuf est souvent utilisé dans les systèmes distribués, notamment avec des protocoles comme gRPC, pour transmettre des messages rapidement.

    -   **Stockage de données :** Pour des bases de données ou des fichiers nécessitant un format compact et efficace.

    -   **Échange de données sur des réseaux peu fiables ou à faible bande passante :** Son format binaire le rend optimal pour les environnements contraints.

-   **Comparaison Protobuf vs JSON**

    | **Critère**              | **Protocol Buffers (Protobuf)**                             | **JSON**                                     |
    | ------------------------ | ----------------------------------------------------------- | -------------------------------------------- |
    | **Format**               | Binaire compact                                             | Texte lisible par un humain                  |
    | **Lisibilité**           | Non lisible directement (nécessite un outil pour décoder)   | Lisible directement                          |
    | **Poids**                | Plus léger (compact)                                        | Plus lourd                                   |
    | **Performance**          | Plus rapide pour la sérialisation et la désérialisation     | Plus lent                                    |
    | **Schéma**               | Requiert un schéma pré-défini (`.proto`)                    | Non requis, mais moins strict                |
    | **Compatibilité**        | Extensibilité avec gestion des versions                     | Aucune gestion native des versions           |
    | **Utilisation courante** | Services backend (e.g., gRPC, RPC)                          | APIs RESTful, échanges humains               |
    | **Support natif**        | Nécessite des bibliothèques spécifiques pour chaque langage | Support natif dans presque tous les langages |

## 2. **`.proto`:**

### 2.1 **Définition:**

-   **Définition:**

    > Un fichier **`.proto`** est un fichier texte utilisé pour définir les **schémas** dans Protocol Buffers (Protobuf). Il décrit la structure des données sous forme de messages, ainsi que les services associés (dans le cas de gRPC). Ce fichier sert de base pour générer le code source dans différents langages.

-   **Structure générale d'un fichier `.proto`**

    Un fichier `.proto` contient :

    -   Une **syntaxe** (indique la version de Protobuf).
    -   La définition de **messages** (les structures de données).
    -   Les types de données et les **champs** associés.
    -   Optionnellement, des **services** pour gRPC.

### 2.2 **Syntaxe de base d’un fichier `.proto`**

-   **Déclaration de la syntaxe**

    La version Protobuf utilisée est spécifiée au début du fichier :

    ```proto
    syntax = "proto3"; // Version actuelle (proto3)
    ```

-   **Définition d’un message**

    Un message représente une structure de données avec des champs typés :

    ```proto
    message MessageName {
        fieldType fieldName = fieldNumber;
    }
    ```

    -   **`fieldType`** : Type du champ (exemples : `int32`, `string` , `float` ..etc).
    -   **`fieldName`** : Nom du champ.
    -   **`fieldNumber`** : Identifiant unique du champ (doit être un entier positif, utilisé pour sérialiser/désérialiser).

-   **Types :**

    Les types scalaires sont des types de base pour les champs des messages.

    | **Type** | **Description**                             |
    | -------- | ------------------------------------------- |
    | `double` | Nombre à virgule flottante double précision |
    | `float`  | Nombre à virgule flottante simple précision |
    | `int32`  | Entier signé 32 bits                        |
    | `int64`  | Entier signé 64 bits                        |
    | `uint32` | Entier non signé 32 bits                    |
    | `uint64` | Entier non signé 64 bits                    |
    | `string` | Chaîne de texte encodée en UTF-8            |
    | `bool`   | Valeur booléenne (`true` ou `false`)        |
    | `bytes`  | Tableau de bytes                            |

-   **Champs répétés (collections)**

    Pour représenter des tableaux, utilisez le mot-clé `repeated` :

    ```proto
    message PhoneBook {
        repeated string phoneNumbers = 1; // Liste de numéros de téléphone
    }
    ```

-   **Définition d'enum (valeurs constantes)**

    Les enums permettent de définir des constantes nommées :

    ```proto
    enum Status {
        UNKNOWN = 0;  // Par défaut
        ACTIVE = 1;
        INACTIVE = 2;
    }
    ```

-   **Définition de services (gRPC):**

    -   Les services définissent les RPC (Remote Procedure Calls) avec des messages en entrée et en sortie :
    -   `rpc` Définit une méthode de service (appel distant).

    ```proto
    service Greeter {
        rpc SayHello (HelloRequest) returns (HelloResponse);
    }
    ```

### 2.3 .**Exemple complet :**

Voici un exemple combinant plusieurs fonctionnalités :

```proto
syntax = "proto3";

message Person {
  int32 id = 1;         // Identifiant unique
  string name = 2;      // Nom
  string email = 3;     // Email
  repeated PhoneNumber phones = 4; // Liste de numéros
  Gender gender = 5;   // Genre
}

enum Gender {
    MALE = 0;          // Homme
    FEMALE = 1;        // Femme

}

message PhoneNumber {
  string number = 1;
  string type = 2;
}

service ContactService {
  rpc AddPerson (Person) returns (Response);
  rpc GetPerson (Request) returns (Person);
}

message Request {
  int32 id = 1;
}

message Response {
  string status = 1;
}
```

### RQ : **Résumé des mots-clés importants**

| **Mot-clé** | **Description**                                                               |
| ----------- | ----------------------------------------------------------------------------- |
| `syntax`    | Définit la version de Protobuf (`proto2` ou `proto3`).                        |
| `message`   | Déclare une structure de données.                                             |
| `repeated`  | Indique qu’un champ peut contenir plusieurs valeurs (équivalent d’une liste). |
| `enum`      | Définit des valeurs constantes nommées.                                       |
| `service`   | Déclare des services RPC (utilisé avec gRPC).                                 |
| `rpc`       | Définit une méthode de service (appel distant).                               |

## 3. **compilateur `protoc`:**

-   **Définition :**

    > **`protoc`** est le **compilateur officiel de Protocol Buffers**. Il est utilisé pour :

    -   **Générer le code source** dans un langage cible (C++, Java, Python, JavaScript, etc.) à partir de fichiers `.proto`.

    -   Assurer la conversion entre les schémas définis dans les fichiers `.proto` et les implémentations dans les langages pris en charge.

-   **Installation de `protoc` sur Unix :**

    Pour installer `protoc` avec la dernière version stable via `apt` :

    ```bash
    sudo apt-get update && sudo apt-get install -y protobuf-compiler
    ```

    Vérifiez l'installation :

    ```bash
    protoc --version
    ```

-   **Utilisation de `protoc` pour JavaScript**

    -   **Créer un fichier `.proto`**

        ```proto
        syntax = "proto3";

        message Person {
        string name = 1;
        int32 id = 2;
        string email = 3;
        }
        ```

    -   **Compiler avec `protoc`**

        Exécutez la commande suivante pour générer le fichier JavaScript :

        ```bash
        protoc --js_out=import_style=commonjs,binary:. example.proto
        ```

        -   **`--js_out=import_style=commonjs,binary`** : Spécifie le format JavaScript généré.
        -   **`.`** : Spécifie le répertoire de sortie (dans ce cas, le répertoire courant).
        -   **`example.proto`** : Le fichier `.proto` source.

    -   **Utiliser le fichier généré**

        -   Pour utiliser les fichiers JavaScript générés par `protoc`, il faut installer le package `google-protobuf` via `npm`.

        -   Une fois le fichier généré (`example_pb.js`), vous pouvez l'utiliser dans votre projet JavaScript.

        ```javascript
        const protobuf = require("./example_pb.js");

        // Créer une instance du message Person
        const person = new protobuf.Person();
        person.setName("Alice");
        person.setId(1);
        person.setEmail("alice@example.com");

        // Sérialiser en binaire
        const binaryData = person.serializeBinary();

        // Désérialiser depuis binaire
        const decodedPerson = protobuf.Person.deserializeBinary(binaryData);

        console.log("Nom :", decodedPerson.getName());
        console.log("ID :", decodedPerson.getId());
        console.log("Email :", decodedPerson.getEmail());
        ```

### RQ : **Résumé des commandes principales de `protoc`**

| **Commande**                                   | **Description**                         |
| ---------------------------------------------- | --------------------------------------- |
| `protoc --version`                             | Vérifie la version installée de protoc. |
| `protoc --js_out=import_style=commonjs,binary` | Génère des fichiers pour JavaScript.    |
| `protoc --python_out=.`                        | Génère des fichiers pour Python.        |
| `protoc --cpp_out=.`                           | Génère des fichiers pour C++.           |
| `protoc --java_out=.`                          | Génère des fichiers pour Java.          |

## 4. **`Utilisation:`**

-   **Description:**

    -   Quand vous utilisez `protoc` pour générer du code à partir d’un fichier `.proto`, il crée des classes avec des **méthodes** et **attributs** spécifiques pour chaque **message** et chaque **champ**.

-   **Pour un message simple**

    ```proto
    syntax = "proto3";

    message Person {
    string name = 1;
    int32 id = 2;
    string email = 3;
    }
    ```

    | **Méthode**                    | **Description**                                                                         |
    | ------------------------------ | --------------------------------------------------------------------------------------- |
    | `get<FieldName>()`             | Récupère la valeur du champ (`string`, `int`, etc.).                                    |
    | `set<FieldName>(value)`        | Définit la valeur du champ.                                                             |
    | `has<FieldName>()` (optionnel) | Vérifie si un champ est défini (utile en proto2 mais pas souvent nécessaire en proto3). |
    | `clear<FieldName>()`           | Réinitialise le champ à sa valeur par défaut (par exemple, `""` pour un `string`).      |

    | **Méthode**                  | **Description**                                                                 |
    | ---------------------------- | ------------------------------------------------------------------------------- |
    | `serializeBinary()`          | Sérialise le message en format binaire (ArrayBuffer ou Uint8Array).             |
    | `deserializeBinary(data)`    | Désérialise un tableau binaire pour recréer une instance du message.            |
    | `toObject(includeInstance?)` | Convertit le message en objet JavaScript classique (optionnellement avec méta). |

-   **Exemple avec le message `Person` :**

    ```javascript
    const person = new protobuf.Person();

    // Définir les valeurs des champs
    person.setName("Alice");
    person.setId(123);
    person.setEmail("alice@example.com");

    // Récupérer les valeurs des champs
    console.log(person.getName()); // "Alice"
    console.log(person.getId()); // 123
    console.log(person.getEmail()); // "alice@example.com"

    // Sérialiser et désérialiser
    const binaryData = person.serializeBinary();
    const decodedPerson = protobuf.Person.deserializeBinary(binaryData);
    console.log(decodedPerson.getName()); // "Alice"
    ```

-   **Pour un champ répété**

    ```proto
    syntax = "proto3";

    message PhoneBook {
    repeated string phoneNumbers = 1; // Une liste de numéros
    }
    ```

    | **Méthode**                     | **Description**                                                                         |
    | ------------------------------- | --------------------------------------------------------------------------------------- |
    | `get<FieldName>List()`          | Récupère tous les éléments du champ répété sous forme de tableau (`Array`).             |
    | `set<FieldName>List(array)`     | Définit les valeurs du champ répété en utilisant un tableau.                            |
    | `add<FieldName>(value, index?)` | Ajoute une valeur au champ répété. Peut inclure un index pour une insertion spécifique. |
    | `clear<FieldName>List()`        | Réinitialise le champ répété (vide le tableau).                                         |

-   **Exemple avec le champ répété `phoneNumbers` :**

    ```javascript
    const phoneBook = new protobuf.PhoneBook();

    // Ajouter des numéros
    phoneBook.addPhoneNumbers("123-456-7890");
    phoneBook.addPhoneNumbers("987-654-3210");

    // Récupérer les numéros
    const numbers = phoneBook.getPhoneNumbersList();
    console.log(numbers); // ["123-456-7890", "987-654-3210"]

    // Définir une nouvelle liste de numéros
    phoneBook.setPhoneNumbersList(["111-222-3333", "444-555-6666"]);
    console.log(phoneBook.getPhoneNumbersList()); // ["111-222-3333", "444-555-6666"]

    // Vider la liste
    phoneBook.clearPhoneNumbersList();
    console.log(phoneBook.getPhoneNumbersList()); // []
    ```
