# Cour : **Data Modelling en MongoDB**

## 1.**Introduction**

- Le Data Modelling en MongoDB consiste à structurer les données de manière efficace en fonction des besoins applicatifs. Contrairement aux bases de données relationnelles qui utilisent des tables et des relations normalisées, MongoDB utilise des **documents JSON** flexibles.

- MongoDB permet deux grandes approches :

    - **Référencement (Normalization)** : Séparer les données en plusieurs collections en utilisant des références.
    - **Embedding (Denormalization)** : Stocker toutes les informations dans un seul document.


## 2.**Processus de Modélisation des Données**

- Le processus suit trois étapes principales :

    1. **Scénario du monde réel** → Ex: une boutique en ligne.
    2. **Données non structurées** → Différents types de données comme les catégories, produits, clients, commandes, etc.
    3. **Modèle de données structuré et logique** → Création des relations entre les entités.


- **Exemple pour une boutique en ligne :**

    - Une **catégorie** peut contenir plusieurs **produits**.
    - Un **produit** peut avoir plusieurs **fournisseurs**.
    - Un **client** peut passer plusieurs **commandes**.
    - Une **commande** est liée à un **panier**.



## 3.**Types de Relations entre les Données**

En MongoDB, les relations entre les données peuvent être de plusieurs types :

- **Relation 1:1**

    Une relation **un-à-un** est simple : chaque entité A a exactement une entité B.
    > Ex: Un **film** a un **nom unique**.

- **Relation 1:FEW**

    Une entité A peut être associée à quelques entités B.
    > Ex: Un **film** peut gagner quelques **récompenses**.

- **Relation 1:MANY**

    Une entité A peut être liée à un grand nombre d'entités B.
    > Ex: Un **film** peut recevoir de nombreuses **critiques**.

- **Relation 1:TON**

    Une entité A peut être liée à des millions d'entités B.
    > Ex: Une **application** peut générer des **logs** en grand nombre.

- **Relation MANY:MANY**

    Chaque entité A peut être liée à plusieurs entités B et vice versa.
    > Ex: Un **film** peut avoir plusieurs **acteurs**, et un **acteur** peut jouer dans plusieurs **films**.



## 4. **Référencement vs Embedding**

Le choix entre **référencement** et **embedding** dépend des performances et des besoins de requêtage.

### 4.1 **Référencement (Normalization)**

- Les documents sont séparés dans différentes collections.

- Utilisation d’**ObjectID** pour relier les entités.

- Permet une **meilleure gestion des mises à jour**.

- **Inconvénient** : nécessite plusieurs requêtes pour récupérer toutes les informations.

- **Exemple :**

    ```json
    {
        "_id": ObjectID("222"),
        "title": "Interstellar",
        "releaseYear": 2014,
        "actors": [
            ObjectID("555"),
            ObjectID("777")
        ]
    }

    {
        "_id": ObjectID("555"),
        "name": "Matthew McConaughey",
        "age": 50,
        "born": "Uvalde, USA"
    }
    ```


### 4.2. **Embedding (Denormalization) :**

- Toutes les données sont stockées dans un seul document.

- Améliore la performance en réduisant les jointures.

- **Inconvénient** : difficulté de mise à jour et duplication des données.

- **Exemple :**

    ```json
    {
        "_id": ObjectID("222"),
        "title": "Interstellar",
        "releaseYear": 2014,
        "actors": [
            {
                "name": "Matthew McConaughey",
                "age": 50,
                "born": "Uvalde, USA"
            },
            {
                "name": "Anne Hathaway",
                "age": 37,
                "born": "NYC, USA"
                
            }
        ]

    }
    ```

- **Comparaison :**

| Critère              | Référencement  | Embedding |
|----------------------|---------------|----------|
| **Performance**       | Plusieurs requêtes | 1 seule requête |
| **Scalabilité**       | Bonne pour les relations complexes | Peut devenir volumineux |
| **Mise à jour**       | Facile et efficace | Peut nécessiter des duplications |
| **Lecture rapide**    | Plus lent | Très rapide |



### **RQ:**

- Le Data Modelling en MongoDB repose sur le choix entre **embedding** et **référencement** en fonction du type de relation et des besoins en performance : 

    - Pour des relations **1:1 ou 1:FEW**, l'**embedding** est souvent préférable. 
    
    - Pour des relations **1:MANY ou MANY:MANY**, le **référencement** est recommandé.

- L’optimisation du modèle dépend donc du **cas d’usage spécifique** et du **volume des données**.

