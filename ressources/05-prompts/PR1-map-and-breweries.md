# PR 1 — Carte + brasseries

> **Branche** : `feat/map-and-breweries` · **Issue** : #1
>
> 4 prompts numérotés. **Un prompt = un commit testable.**

## Avant de démarrer

> ⚠️ **Les 4 issues GitHub doivent déjà exister** — voir [Étape 0 du README](../../README.md#étape-0--créer-les-4-issues-github-avant-le-1er-prompt). Si tu n'as pas créé les issues, fais-le maintenant.

Crée la branche depuis `main` à jour :

```bash
git switch main && git pull
git switch -c feat/map-and-breweries
```

Attribue-toi **l'issue #1** sur GitHub (`gh issue edit 1 --add-assignee @me`).

---

## P1.1 — Le squelette de la page

```
Crée le squelette de l'application dans @index.html et @style.css :
- En-tête avec le titre « Brasseries de Suisse ».
- Zone centrale qui contient la carte et prend tout l'espace dispo.
- Pied de page vide pour l'instant.

Respecte @CLAUDE.md (HTML/CSS/JS pur, pas de framework), @DESIGN.md
pour les couleurs, polices, espacements, et reproduis la disposition
générale de @docs/maquettes/maquette-desktop.png.

Critère de succès : `npx live-server` ouvre la page, je vois le titre
en haut, une zone centrale vide qui prend toute la place, un pied de
page vide. Console propre.

Commit en français : `feat: squelette de la page (refs #1)`.
```

→ **Test manuel** : `npx live-server` → tu vois le titre + zone vide + footer vide.
→ **Commit** : `feat: squelette de la page (refs #1)`

> 💡 On utilise `refs #1` (pas `closes`) sur les commits intermédiaires pour garder l'issue ouverte. C'est le **dernier** commit de la PR qui aura `closes #1`.

---

## P1.2 — La carte de la Suisse

```
Dans @main.js, affiche une carte de la Suisse avec Leaflet :
- Centrée sur la Suisse, zoom 8 (on voit tout le pays).
- Tuiles OpenStreetMap avec attribution visible.
- Leaflet self-hosté dans @libs/leaflet/ (pas de CDN) — télécharge la
  lib si besoin.

Respecte @CLAUDE.md (souveraineté : zéro CDN externe).

Critère de succès : `npx live-server` ouvre la page, je vois la Suisse
centrée, je peux zoomer/dézoomer/déplacer. L'attribution « ©
OpenStreetMap contributors » est visible dans un coin. Console propre.

Commit en français : `feat: carte de la Suisse (refs #1)`.
```

→ **Test manuel** : `npx live-server` → tu vois la Suisse.
→ **Commit** : `feat: carte de la Suisse (refs #1)`

---

## P1.3 — Les brasseries sur la carte

```
Dans @main.js, va chercher les brasseries de Suisse et affiche-les sur
la carte :
- Requête à envoyer : copie le contenu de @query-overpass.txt vers
  https://overpass.osm.ch/api/interpreter (POST) — instance suisse de
  l'API Overpass, CORS configuré pour le navigateur.
- Un seul fetch au chargement (pas de re-fetch).
- Un marker Leaflet par brasserie qui a des coordonnées.
- En cas d'erreur réseau, affiche un message dans le pied de page.

Respecte @CLAUDE.md (règle métier : brasserie sans lat/lon → non
affichée) et @DESIGN.md pour la couleur de pin par défaut.

Critère de succès : ~271 pins visibles sur la carte. Aucune erreur
dans la console. Test « avion » : couper le wifi → recharger →
le pied de page affiche un message d'erreur lisible.

Commit en français : `feat: affichage des brasseries sur la carte (refs #1)`.
```

→ **Test manuel** : ~271 pins apparaissent.
→ **Commit** : `feat: affichage des brasseries sur la carte (refs #1)`

> 💡 **Concept nouveau** : `fetch(...)` permet d'aller chercher des données sur Internet. Claude utilisera aussi `async/await` — un moyen d'attendre la réponse sans bloquer la page. Tu reverras ça en détail en C141.

---

## P1.4 — Un popup au clic

```
Dans @main.js, quand on clique sur une pin, affiche un popup Leaflet
avec :
- Le nom de la brasserie (ou « Brasserie sans nom » si tags.name absent).
- La ville si connue (tags["addr:city"]).
- Un lien vers le site web s'il existe (tags.website), avec
  target="_blank" et rel="noopener".

Respecte @DESIGN.md pour le style du popup et reproduis la disposition
du popup visible dans @docs/maquettes/maquette-desktop.png.

Critère de succès : clic sur une pin → popup avec nom ; brasserie
sans nom → « Brasserie sans nom » ; clic sur le lien site → nouvel
onglet. Console propre.

Commit en français : `feat: popup au clic sur une pin (closes #1)`.
```

→ **Test manuel** : clique sur une pin → popup avec nom.
→ **Commit** : `feat: popup au clic sur une pin (closes #1)`

---

## Avant de merger ta PR

Pousse la branche, ouvre la Pull Request sur GitHub, puis **copie cette checklist dans la description** (fiche [Checklist avant merge](https://divtec.gitbook.io/esig/c822-projet-collaboratif/vibe-coding/bonnes-pratiques/checklist-avant-merge)) :

```markdown
- [ ] Le code marche en local (`npx live-server` + visite manuelle)
- [ ] J'ai relu moi-même chaque ligne du diff
- [ ] Je peux expliquer chaque ligne du diff
- [ ] Chaque commit est propre, en français, avec `refs #1` (et `closes #1` sur le dernier)
- [ ] La console navigateur est propre (0 erreur, 0 warning)
- [ ] Aucun secret, aucun CDN externe dans le diff
- [ ] La PR cible `main` et traite UNE seule tâche (carte + pins + popup)
```

> ⚠️ **Pas d'Action verte attendue ici** : on installe Playwright à la PR 2 (P2.3). À ce stade, le filet de sécurité c'est ta visite manuelle.

Merge → supprime la branche → `/clear` dans Claude Code avant d'attaquer la PR 2.
