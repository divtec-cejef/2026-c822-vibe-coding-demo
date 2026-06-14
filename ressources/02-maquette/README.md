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

Outils alternatifs équivalents : Figma First Draft, v0.app, Penpot, ou nano-banana (rendu plus moodboard que pixel-perfect).

---

## 🔎 À toi de repérer — les manques de cette maquette

**Une maquette n'est jamais finie.** Repérer ce qui manque est exactement ce qu'on évalue à l'oral du 2 juillet.

Regarde les 2 PNG ci-dessus. **Liste ce qui manque** par rapport à une vraie app prête à mettre en ligne. Ajoute chaque point qui te paraît juste dans ta **mini-spec** (`SPEC.md`) comme une nouvelle fonctionnalité, avec son critère de succès vérifiable.

> 💡 **Indice pédagogique** : il y a au moins **7 manques** sur ces maquettes. Trouve-en au moins **4**. Si tu en trouves 7 ou plus, tu as l'œil d'un dev qui pense en utilisateur.

<details>
<summary>👀 Cliquer pour voir la liste des 7 manques que SFA a identifiés</summary>

| # | Manque | Pourquoi c'est gênant |
|---|---|---|
| 1 | **Attribution OpenStreetMap absente** | Obligatoire légalement (voir `CLAUDE.md` règle métier) — sans ça, OSM peut t'envoyer un mail de cease-and-desist. |
| 2 | **Pas d'icône loupe** dans le champ recherche | À 1 m de l'écran, un placeholder seul ne ressemble pas à un champ de recherche. |
| 3 | **Pins default vs visited trop proches** (ambre #B8651A vs orange brûlé #D97A2F) | Daltoniens : impossible à distinguer. Solution simple : ajouter un check-mark blanc sur la pin visitée. |
| 4 | **Pas de représentation de la Suisse** | Carte beige uniforme = les pins flottent dans le vide, impossible de savoir « cette brasserie est dans le Jura ». |
| 5 | **Compteur uniquement en footer** | Quand tu tapes dans le search, le feedback (« 3 affichées ») est en bas, loin du geste. Devrait être visible dans le header. |
| 6 | **Popup sans bouton fermer** (X) | Comment ferme-t-on ? Clic ailleurs ? Échap ? La maquette laisse deviner. |
| 7 | **Aucun état vide ni état erreur** | Que voit l'utilisateur si la recherche ne ramène rien ? Si l'API Overpass plante (règle déjà dans `CLAUDE.md` : message dans le footer) ? |

</details>

### Comment exploiter ces manques

1. Choisis-en **2 ou 3** qui te parlent.
2. Ajoute-les dans `SPEC.md` comme nouvelles fonctionnalités **F7, F8, F9**… avec leur critère de succès vérifiable.
3. Au moment du code, écris **1 PR par manque** (sur ton vrai projet C822, pas pendant la séance vibe coding qui a déjà 4 PR cadrées).
4. À l'oral, **tu pourras dire** : « j'ai repéré ce manque sur la maquette de départ, voilà comment je l'ai traité, voilà le test qui le prouve ».

**Ça vaut beaucoup plus de points** que de juste reproduire la maquette telle qu'elle est.
