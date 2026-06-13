# PR 2 — Recherche par nom + test automatique

> **Branche** : `feat/search-by-name` · **Issue** : #2
>
> 3 prompts numérotés. Avec installation de Playwright et de la CI.

## Avant de démarrer

> ⚠️ Tu viens de merger la PR 1. **`/clear` dans Claude Code** : tu attaques un nouveau sujet, on repart à neuf.
>
> ```bash
> git switch main && git pull
> git switch -c feat/search-by-name
> ```

Attribue-toi **l'issue #2** sur GitHub (`gh issue edit 2 --add-assignee @me`). Elle a été créée à l'[Étape 0 du README](../../README.md#étape-0--créer-les-4-issues-github-avant-le-1er-prompt).

---

## P2.1 — Le champ de recherche

```
Dans @index.html et @style.css, ajoute un champ de recherche dans l'en-tête,
sous le titre, avec le placeholder « Rechercher une brasserie... ».

Le pied de page affiche en permanence « X brasseries affichées » où X est
le nombre de pins visibles.

Respecte @DESIGN.md pour le style du champ et du compteur, et reproduis
la disposition du header avec recherche et du footer avec compteur visibles
dans @docs/maquettes/maquette-desktop.png.

Critère de succès : le champ est visible dans l'en-tête, focusable
(clic dedans → curseur). Le pied de page affiche « 271 brasseries
affichées » au chargement (tant que le filtre est vide).

Commit en français : `feat: champ de recherche et compteur (refs #2)`.
```

→ **Test manuel** : recharge → 271 affichées dans le pied de page.
→ **Commit** : `feat: champ de recherche et compteur (refs #2)`

---

## P2.2 — Le filtre

```
Dans @main.js, quand l'utilisateur tape dans le champ de recherche,
n'affiche que les brasseries dont le nom contient ce qui est tapé.

Règles métier (cf. @CLAUDE.md) :
- Comparaison insensible à la casse.
- Comparaison insensible aux accents (« lorrach » doit matcher
  « Lörrach »).
- Mise à jour en temps réel (event « input », pas « change »).
- Le compteur du pied de page se met à jour à chaque frappe.

Critère de succès : je tape « lorraine » → 1 pin reste, compteur à 1.
Je tape « LÖRRACH » → trouve aussi « lorrach ». J'efface → tout revient,
compteur à 271. Console propre.

Commit en français : `feat: filtre par nom insensible casse et accents (refs #2)`.
```

→ **Test manuel** : tape « lorraine » → 1 pin, compteur à 1. Tape « LÖRRACH » → trouve « lorrach ». Efface → 271.
→ **Commit** : `feat: filtre par nom insensible casse et accents (refs #2)`

---

## P2.3 — Un test automatique + le robot qui le lance

> ⚠️ C'est ici qu'on installe Playwright pour la première fois. Claude va lire @CLAUDE.md, créer un `package.json` minimal, installer `@playwright/test` et télécharger Chromium. Tu verras de nouveaux dossiers apparaître (`node_modules/`) — ils sont déjà ignorés par `.gitignore`, pas d'inquiétude.

```
Mise en place de Playwright + CI :

1. Crée un @package.json minimal avec @playwright/test en
   devDependency.
2. Crée @playwright.config.js qui démarre `npx live-server` avant les
   tests, et pointe vers le dossier @tests/.
3. Dans @tests/map.spec.js, écris un test e2e qui vérifie qu'au
   chargement de la page, il y a au moins une pin Leaflet sur la carte.
4. Crée @.github/workflows/test.yml qui lance `npx playwright test`
   à chaque push (Node 20, Ubuntu).

Respecte @CLAUDE.md (Playwright = pilote Chromium, pas d'autre
navigateur dans la config).

Critère de succès : `npx playwright test --ui` lance Chromium, navigue
sur la page, et le test passe (vert). Après push, l'Action `test.yml`
tourne et affiche un badge ✅ sur la PR.

Commit en français : `test: ajout d'un test automatique et de la CI (closes #2)`.
```

→ **Test local** : `npx playwright test --ui` → Playwright clique tout seul, test vert.
→ **Commit** : `test: ajout d'un test automatique et de la CI (closes #2)`

> 💡 **Concept nouveau** : un **test end-to-end** simule un utilisateur réel. **GitHub Actions** exécute ce test à ta place sur les serveurs GitHub à chaque push. Si le test passe → badge vert sur ta PR. Si le test échoue → tu sais qu'il y a un problème AVANT de merger.

---

## Avant de merger ta PR

Pousse la branche, ouvre la PR, **attends que l'Action `test.yml` soit verte**, puis copie cette checklist :

```markdown
- [ ] Le code marche en local (test Playwright + visite manuelle)
- [ ] J'ai relu moi-même chaque ligne du diff
- [ ] Je peux expliquer chaque ligne du diff
- [ ] Chaque commit est propre, en français, avec `refs #2` (et `closes #2` sur le dernier)
- [ ] La GitHub Action `test.yml` est verte (badge ✅)
- [ ] La console navigateur est propre (0 erreur, 0 warning)
- [ ] Aucun secret, aucun CDN externe dans le diff
- [ ] La PR cible `main` et traite UNE seule tâche (recherche + CI)
```

> 💡 **Le réflexe « casse-le-pour-voir »** : avant le merge, commente la ligne du filtre dans `main.js`, push. L'Action doit passer rouge (le test ne trouve plus 1 pin pour « lorraine »). Reviens, décommente, push → vert. C'est la preuve que ton test sert vraiment à quelque chose.

Merge → supprime la branche → `/clear`.
