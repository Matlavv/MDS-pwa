# Mon Projet PWA avec Recherche de Séries et Films

Ce projet est une Progressive Web Application (PWA) qui permet aux utilisateurs de rechercher des films et des séries télévisées en utilisant l'API de TVmaze. Le projet est conçu pour fonctionner même en mode hors ligne, offrant aux utilisateurs la possibilité de consulter les résultats des recherches précédentes stockées dans le cache. En outre, une fonctionnalité de jeu est disponible sur la page `offline.html` pour les utilisateurs en mode hors ligne.

## Fonctionnalités

- Recherche de films et de séries télévisées en utilisant l'API de TVmaze.
- Fonctionnalité de travail hors ligne avec accès aux anciennes recherches stockées dans le cache.
- Jeu disponible sur la page `offline.html` pour le divertissement hors ligne.
- Design responsive adapté aux différents dispositifs.

## Prérequis

Pour exécuter ce projet localement, vous aurez besoin de :

- XAMPP ou tout autre serveur local.
- Un navigateur moderne capable de prendre en charge les Service Workers et les PWA.

## Installation

1. Téléchargez ou clonez le dépôt de ce projet.
2. Démarrez votre serveur XAMPP et placez le dossier du projet dans le répertoire `htdocs`.
3. Ouvrez votre navigateur et accédez à `http://localhost/nom_du_dossier_du_projet` pour voir l'application en action.

## Utilisation

- **Recherche :** Entrez le nom du film ou de la série dans la barre de recherche et cliquez sur le bouton de recherche. Les résultats apparaîtront sous la barre de recherche.
- **Navigation Hors Ligne :** Les recherches précédentes sont accessibles hors ligne grâce au cache du navigateur. En outre, vous pouvez jouer à un jeu sur `offline.html` si vous n'êtes pas connecté à Internet.
- **Affichage des Détails :** Cliquez sur un résultat de recherche pour afficher plus de détails sur le film ou la série sélectionné(e).

## Technologies Utilisées

- HTML
- CSS
- JavaScript
- Service Workers
- API de TVmaze
