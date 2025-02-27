# Cour : **Cours sur les Webhooks Stripe**


## 1. **Définition et Configuration**

- **Définition** :  
    
    >Les **webhooks Stripe** sont des endpoints HTTP configurés pour recevoir des notifications en temps réel sur les événements Stripe (ex: paiement réussi, remboursement, abonnement annulé). Ils permettent à votre backend de réagir automatiquement aux changements d’état des transactions.


- **Configuration** :

    1. **Créer un endpoint** dans le [Dashboard Stripe](https://dashboard.stripe.com/test/webhooks) :
        - Accédez à **Developers > Webhooks**.
        - Cliquez sur **Add endpoint**.
        - Entrez l’URL de votre serveur (ex: `https://votre-domaine.com/webhook`).
        - Sélectionnez les événements à écouter (ex: `payment_intent.succeeded`).
        

    2. **Récupérer la clé secrète** :
        - Après création, Stripe génère un **Webhook Signing Secret** (ex: `whsec_xyz`).
        - Stockez-le dans vos variables d’environnement (`.env`).


## 2. **Exemple Complet d’Intégration:**

>**Projet Type** :  
>Un backend Node.js/Express qui gère les paiements et les webhooks Stripe.



- **Structure du Projet** :

    ```bash
    project/
    ├── .env
    ├── package.json
    ├── server.js
    └── webhooks/
        └── stripe.js  # Gestion des webhooks
    ```


- **Installation** :

    ```bash
    npm install express stripe dotenv
    ```

- **Fichier `.env`** :

    ```env
    STRIPE_SECRET_KEY=sk_test_xyz
    STRIPE_WEBHOOK_SECRET=whsec_xyz
    PORT=3000
    ```

- **Code Principal (`server.js`)** :

    ```javascript
    import express from 'express';
    import stripeRouter from './webhooks/stripe.js';

    const app = express();
    app.use('/webhook/stripe', stripeRouter);  // Route dédiée

    app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
    });
    ```


- **Gestion des Webhooks (`webhooks/stripe.js`)** :

    ```javascript
    import express from 'express';
    import Stripe from 'stripe';
    import 'dotenv/config';

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const router = express.Router();

    // Middleware pour parser le corps brut (nécessaire pour la signature)
    router.use(express.raw({ type: 'application/json' }));

    router.post('/', async (req, res) => {
    const signature = req.headers['stripe-signature'];
    let event;

    try {
        // Vérifier la signature
        event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Traiter l'événement
    switch (event.type) {
        case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('Paiement réussi:', paymentIntent.id);
        // Ex: Mettre à jour la base de données
        break;

        case 'charge.refunded':
        const charge = event.data.object;
        console.log('Remboursement effectué:', charge.id);
        break;

        default:
        console.log(`Événement non géré: ${event.type}`);
    }

    res.status(200).json({ received: true });  // Répondre à Stripe
    });

    export default router;
    ```



## 3. **Tester en Local** :

- **Utiliser le Stripe CLI** :
  
   ```bash
   stripe listen --forward-to localhost:3000/webhook/stripe
   ```
   - Cela génère une URL de webhook temporaire (ex: `whsec_xxx`).

- **Déclencher un Événement** :
   ```bash
   stripe trigger payment_intent.succeeded
   ```

- **Vérifier les Logs** :
   ```
   Server running on port 3000
   Paiement réussi: pi_3P...
   ```


