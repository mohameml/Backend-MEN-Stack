# Cour : 

### **🔴 SIGTERM (Signal Termination) : C'est quoi ?**  
`SIGTERM` est un signal Unix utilisé pour **demander** à un processus de s'arrêter **gracieusement**. Contrairement à `SIGKILL`, il **laisse au processus le temps de nettoyer** (fermer les connexions, sauvegarder des fichiers, libérer la mémoire, etc.).

---

- **tester signal `SIGTERM`:**

```bash
ps aux | grep 'node my-app.js'
kill PID
```

### **📌 Quand est-ce qu'on reçoit un SIGTERM ?**
1. **Arrêt propre d'un service**  
   - Exemple : quand un hébergeur (comme Railway, Heroku, Docker, Kubernetes) **éteint ou redémarre ton application**.
   - Commande typique :  
     ```sh
     kill <PID>
     ```
     (sans `-9`, car `kill -9` envoie `SIGKILL`, qui force l'arrêt immédiat).

2. **Déploiement / Restart**  
   - Railway, AWS, Docker, etc., peuvent envoyer `SIGTERM` avant de redémarrer ton app.

3. **Scalabilité (autoscaling)**  
   - Si Railway réduit le nombre d'instances de ton app, il peut envoyer `SIGTERM` à certaines instances pour les éteindre.

---

### **🛠️ Comment gérer SIGTERM dans Express (Node.js) ?**
Tu peux capturer `SIGTERM` pour fermer proprement ton serveur :
```js
process.on("SIGTERM", () => {
  console.log("🛑 SIGTERM reçu : Fermeture propre du serveur...");
  server.close(() => {
    console.log("✅ Serveur fermé.");
    process.exit(0);
  });
});
```
🔹 Cela permet de **fermer les connexions en cours** avant l'arrêt.  
🔹 C'est utile pour éviter que des requêtes soient coupées brutalement.

---

### **📌 Différence entre SIGTERM et SIGKILL**
| Signal  | Comportement |
|---------|-------------|
| `SIGTERM` | Demande proprement au processus de s'arrêter (il peut gérer ça avec `process.on("SIGTERM")`). |
| `SIGKILL` | Tue immédiatement le processus **sans** lui laisser le temps de nettoyer quoi que ce soit. |

---

### **🎯 En résumé**
- `SIGTERM` est un signal pour **demander** à une application de s'arrêter proprement.
- Railway et d'autres plateformes envoient ce signal avant de **redémarrer ou éteindre** ton app.
- Tu peux capturer `SIGTERM` dans ton code pour **fermer proprement le serveur** et éviter de perdre des requêtes.

Besoin d'une implémentation spécifique pour ton app sur Railway ? 😊