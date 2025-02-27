# Cour :  **Introduction à Ngrok**

> ``Ngrok`` est un outil permettant d’exposer un serveur local à Internet via un tunnel sécurisé. Il est particulièrement utile pour le développement et le test d'applications web, car il permet d’accéder à un serveur en local depuis n’importe où dans le monde sans avoir besoin de configurer un serveur en ligne.

- 🚀 **Pourquoi utiliser Ngrok ?**

    - **Développement et tests rapides** : Permet d’exposer une API ou une application web sans hébergement.
    - **Test de webhooks** : Facilite l’intégration avec des services tiers comme Stripe, GitHub, ou Slack.
    - **Partage facile** : Fournit une URL publique pour accéder à une application locale.
    - **Sécurité et tunneling** : Chiffrement SSL/TLS pour les connexions.

- 🔧 **Installation et utilisation basique**

    1. **Installation**  
    
    - Télécharge Ngrok depuis [https://ngrok.com/download](https://ngrok.com/download).
    -  Inscrivez-vous et configurez votre clé d’authentification via `ngrok authtoken <votre_token>`.

    2. **Exposition d’un serveur local**  
    Exemple pour exposer un serveur HTTP sur le port 8000 :  
    ```bash
    ngrok http 8000
    ```
    Ngrok générera une URL publique comme `https://random-id.ngrok.io`, accessible depuis Internet.

    3. **Affichage des requêtes en temps réel**  
    - Une interface web est disponible sur `http://127.0.0.1:4040` pour voir les requêtes qui transitent par le tunnel.

