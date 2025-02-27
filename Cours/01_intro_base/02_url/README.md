# cour 04 : **URL**

## 1. **Introduction `URL`:**

-   **Définition d'un URL:**

    > Un **URL** (Uniform Resource Locator) est une adresse utilisée pour identifier et localiser une ressource sur Internet. Par exemple, dans un navigateur, un URL vous permet d'accéder à une page web, une image, une vidéo, etc.

-   **Structure d'un URL:**

    ```
    schéma://nom-hôte:port/chemin?query#fragment
    ```

    -   **Schéma (ou Protocole)** Détermine le protocole à utiliser pour accéder à la ressource :`http`, `https`, `ftp`, `file`.

    -   **Nom d'hôte:** Désigne le serveur où se trouve la ressource , ex : `www.example.com`

    -   **Port (optionnel) :** Indique le port à utiliser pour accéder au serveur. Si omis, un port par défaut est utilisé selon le protocole (80 pour HTTP, 443 pour HTTPS).

    -   **Chemin (/route):** Représente le chemin menant à une ressource spécifique sur le serveur , ex:`/articles/technologie`

    -   **Query (?query):** Contient une liste de paramètres sous la forme de paires clé-valeur, permettant de transmettre des données au serveur.

        -   Séparé du chemin par un `?`.
        -   Les paramètres sont séparés par `&`.
        -   Ex. : `?id=123&lang=fr`

    -   **Fragment (#section)** Désigne une section spécifique dans la ressource, comme une ancre dans une page HTML, ex. : `#introduction`

-   **Exemple complet:**

    ```
    https://www.example.com:8080/articles/technologie?id=123&lang=fr#introduction
    ```

    -   **Schéma** : `https`
    -   **Nom d'hôte** : `www.example.com`
    -   **Port** : `8080`
    -   **Chemin** : `/articles/technologie`
    -   **Query** : `id=123&lang=fr`
        -   Paramètre `id` : `123`
        -   Paramètre `lang` : `fr`
    -   **Fragment** : `#introduction`
