# Cour : **Introduction sur `webHook`:**


## 1. **Définition et Utilisation:**

> Un **webhook** est un mécanisme permettant à une application d'envoyer des données en temps réel à une autre application via une requête HTTP (généralement POST) lorsqu'un événement spécifique se produit. Contrairement aux API traditionnelles (où le client interroge le serveur), les webhooks inversent le flux : le serveur notifie automatiquement le client.

- **Utilisations courantes** :

    - Notification d’événements (ex: paiement validé, message reçu).
    - Synchronisation de données entre services (ex: mise à jour d’un CRM après un formulaire).
    - Déclenchement de workflows (ex: déploiement CI/CD, chatbots).
    - Intégration avec des plateformes externes (GitHub, Stripe, Slack).



## 2. **Concept Théorique:**

- **Fonctionnement** :  

    1. **Abonnement** : Le client fournit une URL (endpoint) au serveur pour recevoir les notifications.  
    2. **Événement** : Lorsqu'un événement se produit (ex: commit GitHub), le serveur envoie une requête POST à l’URL configurée.  
    3. **Traitement** : Le client traite la charge utile (payload) et renvoie une réponse HTTP (ex: `200 OK`).

- **Composants clés** :

    - **Endpoint** : URL du client qui reçoit les données.
    - **Payload** : Données envoyées (généralement en JSON ou XML).
    - **Headers** : Métadonnées (ex: `X-Signature` pour la sécurité).

- **Bonnes pratiques** :

    - **Sécurité** : Vérifier les requêtes via des signatures (HMAC) ou des tokens secrets.  
    - **Idempotence** : Gérer les duplications (ex: le serveur peut renvoyer le même webhook plusieurs fois).  
    - **Retry** : Implémenter une logique de réessai en cas d’échec (statut HTTP ≠ 2xx).  

- **Comparaison API REST vs Webhooks** :

    - **API REST** : Le client "tire" les données via des requêtes périodiques (polling).  
    - **Webhooks** : Le serveur "pousse" les données immédiatement (évite le polling).  


## 3. **Exemple en Express:**

> **Objectif** : Créer un endpoint webhook qui écoute les événements d’un service externe (simulé).

- **Code** :

    ```javascript
    const express = require('express');
    const bodyParser = require('body-parser');

    const app = express();

    // Clé secrète pour valider les requêtes (stockée côté client et serveur)
    const WEBHOOK_SECRET = 'mon_secret_123';

    // Endpoint webhook
    app.post('/webhook', express.raw()  , (req, res) => {
        // Récupérer la signature du header
        const signature = req.headers['x-webhook-signature'];
        
        // Valider la signature (exemple simplifié)
        if (signature !== WEBHOOK_SECRET) {
            return res.status(403).send('Accès refusé : signature invalide');
        }

        // Traiter le payload
        const payload = req.body;
        console.log('Événement reçu :', payload.event);
        
        // Répondre au serveur
        res.status(200).json({ status: 'success' });
    });

    // Démarrer le serveur
    const PORT = 3000;
    app.listen(PORT, () => {
    console.log(`Serveur webhook écoutant sur http://localhost:${PORT}`);
    });
    ```

- **Test avec cURL** :

    ```bash
    curl -X POST http://localhost:3000/webhook \
    -H "Content-Type: application/json" \
    -H "x-webhook-signature: mon_secret_123" \
    -d '{"event": "payment_completed", "amount": 100}'
    ```

- **Outils pour tester en local** :

    **Ngrok** : Expose une URL publique vers votre `localhost` pour recevoir des webhooks.  

    ```bash
    ngrok http 3000
    ```

