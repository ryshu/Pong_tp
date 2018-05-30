# Lancement du jeu

Pour lancer le jeu, il faut ouvrir le fichier index.html dans un navigateur.
Le jeu est testé pour les navigateurs chrome et firefox.


# Description du jeu 

Le jeu n'a pas d'objectif en soi, le but est pédagogique. Plusieurs fonctionnalités sont disponibles dont :

## Ajouter des formes :

Pour ajouter des formes, il faut entrer les différentes caractéristiques en fonction de la forme souhaitée.

Les caratéristiques sont verrouillées pour des raisons de cohérence.

Le nombre de balles est limité à 5, celui des murs à 3.

 - Position x : un nombre entre 10 et 700

 - Position y : un nombre entre 10 et 600

 - Diamètre : un nombre entre 5 et 10

 - Hauteur : un nombre entre 50 et 100

 - Largeur : un nombre entre 50 et 100

 - Déplacer le triangle :

Pour déplacer le triangle, les touches suivantes sont utilisées:
```
Flèche haut :    Déplacement vers le haut
Flèche bas : 	   Déplacement vers le bas
Flèche gauche : 	Déplacement vers la gauche
Flèche droite : 	Déplacement vers la droite
Barre espace : 	 Fin du déplacement
```

## Collision :

Les collisions sont gérées automatiquement par le script pong.js
Ajout du triangle :

Le triangle est recréé automatiquement à chaque lancement du jeu
Couleur:

Les couleurs sont mises en place automatiquement, et changées aléatoirement à chaque collision.
Vitesse des balles:

Les vitesses des balles sont définies aléatoirement et redéfinies à chaque collision.
