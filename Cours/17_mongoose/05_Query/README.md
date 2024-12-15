# cour : **Query:**

## 1. **Introduction:**

- **Définition :**

	> un Query Object est une instance de la classe **Query** qui représente une requête MongoDB non encore exécutée. Il fournit une API pour construire, configurer et finalement exécuter des opérations sur une base de données, comme les recherches, les mises à jour ou les suppressions 



- **Syntaxe:**

	Un Query Object est généralement créé à partir d'une méthode du modèle :

	```javascript
	const query = Tour.find({ price: { $lt: 100 } }); // Crée un Query Object
	```

	À ce stade, aucune requête n’a encore été envoyée à la base .

- **Exécution de la requête :** Pour exécuter la requête et obtenir des résultats :

	- **Avec `await` :**

	```javascript
	const results = await query;
	```

	- **Avec `.exec()` :**

	```javascript
	query.exec().then(results => console.log(results));
	```

## 2. **Méthodes Principales du Query :**


Le Query Object offre des méthodes pour affiner la requête **avant son exécution** :

| **Méthode**     | **Description**                                                                                           | **Exemple**                                    |
|-----------------|-----------------------------------------------------------------------------------------------------------|------------------------------------------------|
| `.where()`      | Ajoute des conditions dynamiques.                                                                         | `query.where('price').lt(100)`                 |
| `.select()`     | Définit les champs à inclure ou exclure dans les résultats.                                                | `query.select('name price')`                  |
| `.sort()`       | Trie les résultats selon un ou plusieurs champs.                                                           | `query.sort({ price: -1 })`                   |
| `.limit()`      | Limite le nombre de documents retournés.                                                                   | `query.limit(10)`                             |
| `.skip()`       | Saute un certain nombre de documents (pagination).                                                         | `query.skip(10)`                              |
| `.populate()`   | Remplit les références avec les documents associés d'autres collections.                                   | `query.populate('guide')`                     |
| `.lean()`       | Retourne des objets JavaScript simples au lieu d'instances de modèles Mongoose 						       | `query.lean()`                           |
| `.setOptions()` | Définit des options supplémentaires comme `maxTimeMS`.                                                     | `query.setOptions({ maxTimeMS: 5000 })`       |
| `.exec()`       | Exécute la requête et retourne une `Promise` contenant les résultats.                                      | `query.exec()`                                |



```javascript
query
  .where('price').lt(100)  // Ajoute un filtre : prix < 100
  .select('name price')    // Sélectionne uniquement les champs 'name' et 'price'
  .sort({ price: 1 })      // Trie par ordre croissant du prix
  .limit(5);               // Limite les résultats à 5 documents
```




