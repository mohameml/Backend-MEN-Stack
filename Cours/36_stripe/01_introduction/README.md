# Cour : 🎯 **Stripe : Introduction et Guide pour Développeurs**  

> Stripe est une plateforme de paiement en ligne permettant aux entreprises et aux développeurs d’accepter et de gérer des paiements sur le web et le mobile.  


##  **1. Qu’est-ce que Stripe ?**  

- Stripe est un **fournisseur de services de paiement** qui simplifie l’intégration des paiements dans les applications web et mobiles. Il permet :  

    ✅ D’accepter des paiements via **cartes bancaires, wallets (Google Pay, Apple Pay), virements bancaires**.  
    ✅ De gérer des **abonnements** et des paiements récurrents.  
    ✅ D’effectuer des **remboursements** et de gérer la comptabilité.  
    ✅ D'intégrer des **paiements internationaux** avec conversion de devises.  


- **Utilisation de Stripe : Cas d’usage**  

    - **E-commerce** : Vente de produits en ligne.  
    - **SaaS** : Gestion d’abonnements et facturation automatique.  
    - **Marketplaces** : Gestion des paiements pour plusieurs vendeurs (ex: Uber, Airbnb).  
    - **Applications mobiles** : Paiements intégrés dans des apps iOS/Android.  


## 2. **Stripe Setup :**  

- **Création d’un compte Stripe et configuration**  

    1. Inscription sur [Stripe](https://stripe.com/)  

    2. Récupération des clés API :  
        - **Clé secrète** (`sk_live_xxx`) : Pour exécuter les transactions.  
        - **Clé publique** (`pk_live_xxx`) : Pour afficher le formulaire de paiement.  

- **Configuration de Stripe dans Express.js**  

    Crée un fichier `.env` pour stocker les clés API Stripe :  

    ```
    STRIPE_SECRET_KEY=sk_test_xxx
    STRIPE_PUBLIC_KEY=pk_test_xxx
    ```



- **Installation du SDK Stripe en Node.js**  

    ```bash
    npm install stripe
    ```


- **import stripe:**

    ```javascript
    const stripe = require('stripe')('sk_test_xxx'); // Clé secrète
    ```



## 3. **Autres Fonctionnalités Importantes**  

| Fonction | Description |
|----------|------------|
| **Stripe Elements** | Formulaire de paiement personnalisé. |
| **Stripe Checkout** | Page de paiement Stripe prête à l’emploi. |
| **Paiements récurrents** | Gestion des abonnements. |
| **Stripe Connect** | Paiements pour marketplaces. |
| **Remboursements** | Annulation et retour d’argent. |
| **Gestion de la fraude** | Protection via Stripe Radar. |

