# Maquette — Brasseries de Suisse

Placeholder pour les fichiers de maquette générés au §6.1c de la séance.

## Fichiers attendus

| Fichier | Format | Contenu |
|---|---|---|
| `maquette-desktop.png` | PNG 1440×900 | Écran principal desktop : header + carte + footer |
| `maquette-mobile.png` | PNG 390×844 | Écran principal mobile : header compact + carte plein écran + bottom-sheet popup |

## Comment les générer

Voir le script de la séance (§6.1c) — outils proposés : Figma First Draft, v0.app, ou nano-banana pour un rendu rapide.

## Écrans à couvrir

1. **Carte (vue par défaut)** — header avec titre + champ recherche, carte centrée Suisse zoom 8, footer compteur.
2. **Popup au clic** — popup ouvert sur une brasserie avec nom, ville, lien site, bouton « Marquer comme visitée ».
3. **Recherche active** — champ avec 1 mot tapé, ≤ 5 pins visibles, compteur mis à jour.
4. **État vide de recherche** — champ avec « zzz » tapé, 0 pin, message dans le popup d'aide.

## Composants à respecter

Tous les composants sont définis dans `../01-design-md/DESIGN.md`. Aucun composant « mystère » dans la maquette.
