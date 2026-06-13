# Maquettes — Brasseries de Suisse

Maquettes des écrans de l'app, générées dans Figma à partir du `DESIGN.md`.

## Fichiers

| Fichier | Format | Contenu |
|---|---|---|
| `maquette-desktop.png` | PNG 2880×1800 (1440×900 @2x) | Écran principal desktop : header (titre + recherche) + carte beige avec pins par défaut (ambre) et visitées (orange brûlé) + popup brasserie ouvert (nom, ville, lien site, bouton « visitée ») + footer compteur |
| `maquette-mobile.png` | PNG 390×844 | Écran mobile : header compact (titre + recherche dessous) + carte avec pins + **bottom-sheet** popup avec drag handle + footer compteur |

## Fichier Figma source

<https://www.figma.com/design/rzkuoUC1J3lojlmWHbe8MP> — fichier read-only sur le compte de SFA.

## Comment les utiliser

Dans les prompts Claude Code de la séance, on référence ces maquettes via la syntaxe `@docs/maquettes/<nom>.png` :

```text
Implémente F1 dans @index.html et @style.css.
Reproduis la disposition générale de @docs/maquettes/maquette-desktop.png.
Respecte @DESIGN.md pour les couleurs.
```

Claude lit alors directement l'image (Read tool) et reproduit la disposition.

## Comment elles ont été générées

Étape 3 du cadrage (cf. fiche [`cadrer-avant-de-coder`](https://divtec.gitbook.io/esig/c822-projet-collaboratif/vibe-coding/bonnes-pratiques/cadrer-avant-de-coder)) :
1. `DESIGN.md` posé en premier (palette, composants nommés).
2. Maquette générée dans Figma en respectant la palette et les composants.
3. Export PNG.

Outils alternatifs équivalents : Figma First Draft, v0.app, ou nano-banana.
