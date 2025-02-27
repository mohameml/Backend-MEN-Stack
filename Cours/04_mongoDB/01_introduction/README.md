# cour 16 : **Mongo DB:**

## 1. **Introduction:**

-   **Définition :**

    > MongoDB est une base de données NoSQL orientée documents. Elle est conçue pour être hautement évolutive, flexible et performante, en exploitant une structure de données basée sur les **documents JSON**.

-   **Collection**

    -   Une **collection** est un ensemble de documents dans MongoDB, équivalent à une table dans une base relationnelle.
    -   Les collections ne nécessitent pas de schéma prédéfini, ce qui permet une flexibilité accrue dans la structure des données.
    -   Les documents d'une collection peuvent avoir des structures différentes, mais ils partagent généralement un objectif ou un contexte commun.

-   **Document**

    -   Un **document** est l'unité fondamentale de données dans MongoDB, stocké au format **BSON** (Binary JSON).
    -   Il contient des paires clé-valeur qui représentent les données.
    -   Exemples de document :
        ```json
        {
            "nom": "Jean Dupont",
            "âge": 30,
            "email": "jean.dupont@example.com"
        }
        ```

-   **Caractéristiques clés de MongoDB**

    -   **Modèle clé-valeur basé sur des documents**

        -   Les données sont représentées sous forme de documents clé-valeur (au format JSON ou BSON).
        -   Ce modèle est très intuitif pour les développeurs, car il reflète la structure des objets dans les langages modernes comme JavaScript.

    -   **Flexibilité des documents**

        -   Contrairement aux bases de données relationnelles, MongoDB ne nécessite pas de schéma fixe.
        -   Les documents dans une même collection peuvent contenir des champs différents, rendant MongoDB adapté aux données semi-structurées et non-structurées.

    -   **Modèles imbriqués (Embedded Models)**

        -   MongoDB permet d'imbriquer des documents les uns dans les autres pour représenter des relations hiérarchiques ou complexes.
        -   Cela réduit les jointures complexes et améliore la vitesse des requêtes.
        -   Exemple :
            ```json
            {
                "nom": "Jean Dupont",
                "adresse": {
                    "rue": "123 Rue Principale",
                    "ville": "Paris",
                    "codePostal": "75000"
                }
            }
            ```

## 2. **`BSON`:**

-   **Définition :**

    > `BSON` (**Binary JSON**) est le format binaire utilisé par MongoDB pour stocker les documents. Il est basé sur JSON mais conçu pour être plus performant et adapté aux besoins des bases de données modernes. BSON ajoute des fonctionnalités telles que des types supplémentaires, une sérialisation rapide et une compatibilité avec des structures de données complexes.

-   **Syntaxe:**

    -   Les documents BSON contiennent des **paires clé-valeur**, où :
        -   Les **clés** sont des chaînes UTF-8.
        -   Les **valeurs** peuvent être des types variés : chaînes, nombres, tableaux, documents imbriqués, etc.

    ```json
    {
        "nom": "Jean",
        "âge": 30,
        "adresse": {
            "ville": "Paris",
            "codePostal": 75000
        },
        "loisirs": ["lecture", "sport", "musique"]
    }
    ```

-   **Types de données supportés**

    BSON prend en charge des types supplémentaires par rapport à JSON, notamment :

    -   **String** : Texte UTF-8.
    -   **Double** : Nombres décimaux.
    -   **Integer** : Entiers 32 bits ou 64 bits.
    -   **Boolean** : Vrai ou faux.
    -   **Date** : Timestamp ou date au format UNIX.
    -   **Array** : Liste ordonnée de valeurs.
    -   **Embedded Document** : Document imbriqué dans un autre document (similaire à JSON).
    -   **ObjectId** : Identifiant unique utilisé par MongoDB.
    -   **Binary Data** : Données binaires arbitraires.
    -   **Null** : Représente une valeur nulle.
    -   **Regex** : Expressions régulières.

-   **Caractéristiques :**

    -   **Documents imbriqués (Embedded Documents)**

        -   BSON permet d'imbriquer des documents à l'intérieur d'autres documents.
        -   Cela favorise la **dénormalisation** en stockant les relations hiérarchiques dans un seul document, réduisant ainsi les jointures.

        ```json
        {
            "produit": "Ordinateur",
            "specifications": {
                "marque": "Dell",
                "processeur": "Intel i7",
                "RAM": "16GB"
            }
        }
        ```

    -   **Plusieurs valeurs dans un champ (Arrays)**

        -   BSON gère les tableaux pour stocker plusieurs valeurs dans un seul champ.

        ```json
        {
            "nom": "Jean",
            "loisirs": ["lecture", "sport", "musique"]
        }
        ```

    -   **Identifiant unique `_id` :**

        -   MongoDB génère automatiquement un champ **\_id** pour chaque document, de type **ObjectId**.
        -   **ObjectId** est un identifiant unique, encodé sur 12 octets.

-   **Limitations de BSON**

    -   **Taille augmentée par rapport à JSON** :Le stockage est légèrement plus volumineux que JSON en raison de l'inclusion d'en-têtes pour chaque champ.

    -   **Limite de taille** :Un document BSON ne peut pas dépasser 16 Mo dans MongoDB.

    -   **Complexité accrue pour les données très imbriquées** : Bien que MongoDB gère les documents imbriqués, un niveau excessif d'imbrication peut compliquer les requêtes.
