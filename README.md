# Dépôt démo — Vibe coding C822 (15 juin 2026)

Ressources prêtes à copier-coller pendant la séance d'introduction au vibe coding du C822.

> **À qui s'adresse ce dépôt** : apprentis ESIG1 inscrits au C822, séance du 15 juin 2026.
> **Pourquoi** : éviter de perdre du temps à recopier ce que SFA présente au tableau. Tu clones, tu copies, tu codes.

---

## Comment l'utiliser

### Option A — Cloner (recommandé)

```bash
git clone https://github.com/divtec-cejef/2026-c822-vibe-coding-demo.git
```

Tu obtiens tout : artefacts (`ressources/`) + snapshots du code à chaque étape (via tags Git).

### Option B — Télécharger un fichier seul

Sur la page GitHub du dépôt → ouvre le fichier voulu → bouton **« Raw »** → clic droit → **« Enregistrer sous »**.
Ou via `curl` :

```bash
curl -O https://raw.githubusercontent.com/divtec-cejef/2026-c822-vibe-coding-demo/main/ressources/00-claude-md/v4-final.md
```

### Option C — Récupérer un état complet du code à une étape donnée

```bash
git checkout etape-3-pins      # état du code après P1.3 (271 pins affichées)
```

Voir la liste des tags plus bas.

---

## Contenu

```
.
├── index.html               # ← app Brasseries CH (état final, sur main)
├── style.css
├── main.js
├── libs/leaflet/            # Leaflet 1.9.4 self-hosté (pas de CDN)
├── tests/map.spec.js        # Test e2e Playwright
├── playwright.config.js
├── package.json             # Dépendance dev : @playwright/test
├── .github/workflows/
│   ├── test.yml             # Lance le test e2e à chaque push
│   └── pages.yml            # Publie le site quand une PR est mergée sur main
└── ressources/              # ↓ Les artefacts à copier dans TON dépôt perso
    ├── 00-claude-md/        # CLAUDE.md projet — 4 versions illustrant l'évolution itérative
    │   ├── v1-stack-git.md       # Posé en premier : stack + Git Flow + conventions
    │   ├── v2-design-ref.md      # + référence DESIGN.md (après §6.1b)
    │   ├── v3-structure.md       # + structure projet + commandes utiles
    │   └── v4-final.md           # + règles métier + souveraineté (version finale)
    ├── 01-design-md/
    │   ├── DESIGN.md             # Identité visuelle (spec écrite, lue par Claude)
    │   ├── style.css             # Variables CSS issues de DESIGN.md (réutilisé dans l'app)
    │   └── styleguide.html       # Page de validation visuelle du DS (à ouvrir dans le navigateur)
    ├── 02-maquette/
    │   ├── maquette-desktop.png
    │   └── maquette-mobile.png
    ├── 03-spec/
    │   └── SPEC.md               # Mini-spec : 1 entité + 6 fonctionnalités avec critères vérifiables
    ├── 04-data/
    │   └── query-overpass.txt    # Requête Overpass prête à coller
    └── 05-prompts/
        ├── PR1-map-and-breweries.md
        ├── PR2-search-by-name.md
        └── P-pages-deploy.md
```

> **Le code de l'app** (`index.html`, `main.js`, etc.) est ce que tu obtiens **en théorie** après avoir suivi les prompts de la séance. Tu peux :
>
> * Ne pas y regarder → fais la séance les yeux fermés, compare à la fin.
> * Y regarder **après** chaque PR mergée pour vérifier que tu as bien le même résultat.
> * Faire `git checkout etape-N` pour récupérer un état complet si tu bloques.
>
> ⚠️ **Ne copie pas le code dans ton dépôt perso au lieu de le générer avec Claude Code.** Le but de la séance c'est l'expérience du vibe coding, pas le résultat.

---

## Tags Git — récupérer un état complet du code

| Tag | État du code |
|---|---|
| `etape-1-skeleton` | Après P1.1 — squelette HTML/CSS |
| `etape-2-map` | Après P1.2 — carte de la Suisse |
| `etape-3-pins` | Après P1.3 — 271 pins affichées |
| `etape-4-popup` | Après P1.4 — popups au clic (PR 1 mergée) |
| `etape-5-search` | Après PR 2 — recherche par nom + compteur |
| `etape-6-tests-ci` | Après P2.3 — Playwright + Action verte |
| `etape-7-pages` | Après P-pages — déployé sur GitHub Pages |
| `final-avant-autonomie` | État complet **avant** la PR 3 (que tu fais en autonomie) |

```bash
git checkout etape-3-pins         # essayer un état
git checkout main                 # revenir au dernier état
```

---

## PR 3 — autonomie individuelle (`feat/visited-toggle` · issue #3)

À partir d'ici, tu es seul sur ton dépôt. SFA flotte dans la salle. Tu peux demander de l'aide à un voisin si tu coinces 5 min, mais c'est toi qui pilotes ton dépôt.

> ⚠️ **Avant tout** : `/clear` dans Claude Code. Tu attaques une nouvelle PR, sans rapport avec la précédente.
> Puis ouvre l'issue #3 sur GitHub, attribue-la-toi, et crée la branche :
>
> ```bash
> git switch -c feat/visited-toggle
> ```

### Objectif

Permettre de marquer une brasserie comme « visitée » et que cet état soit conservé même si on ferme le navigateur.

### P3.1 — Le bouton « visité »

Copie ce prompt dans Claude Code :

```
Dans le popup de @main.js, ajoute un bouton « Marquer comme visitée » /
« Marquer comme non visitée » selon l'état courant de la brasserie.

Au clic :
- Toggle l'état de la brasserie.
- Persiste l'état dans localStorage sous la clé « visited_breweries »
  (un tableau d'IDs de brasseries).
- Affiche les brasseries visitées avec une pin d'une couleur distincte
  de celle définie dans @DESIGN.md pour la pin par défaut (vert mousse).

Respecte @CLAUDE.md (HTML/CSS/JS pur, pas de CDN externe).

Critère de succès : je marque une brasserie comme visitée, je recharge
la page, la pin reste de la nouvelle couleur. Console propre.

Commit en français : `feat: marquage des brasseries visitées (closes #3)`.
```

→ **Test manuel** : marque une brasserie, recharge → elle reste de la couleur « visitée ».
→ **Commit** : `feat: marquage des brasseries visitées (closes #3)`

> 💡 **Concept nouveau** : `localStorage` permet au navigateur de mémoriser des informations même après fermeture. C'est comme une mini-base de données dans ton onglet. Tu reverras ça en C141 et au-delà.

### P3.2 — Protéger la feature avec un nouveau test

```
Ajoute un nouveau test e2e dans @tests/ : au clic sur le bouton
« Marquer comme visitée » d'une pin, la pin doit changer de couleur.

Respecte @CLAUDE.md (configuration Playwright déjà en place).

Critère de succès : `npx playwright test` affiche 2 tests verts.

Commit en français : `test: la pin change de couleur quand on marque visitée`.
```

→ **Test local** : `npx playwright test --ui` → tu vois maintenant 2 tests verts.
→ **Commit** : `test: la pin change de couleur quand on marque visitée`

> 💡 **Le moment clé** : tu viens d'écrire ton 2ᵉ test en 30 secondes, juste avec un prompt. C'est ça, le filet de sécurité : pas une montagne à grimper, juste un prompt à formuler. Sur ton vrai projet C822 cette semaine, chaque feature peut être protégée comme ça.

### Avant de merger ta PR

Copie cette checklist dans la description de ta PR (cf. fiche [Checklist avant merge](https://divtec.gitbook.io/esig/c822-projet-collaboratif/vibe-coding/bonnes-pratiques/checklist-avant-merge)) :

```markdown
- [ ] Le code marche en local (test Playwright + visite manuelle)
- [ ] J'ai relu moi-même chaque ligne du diff
- [ ] Je peux expliquer chaque ligne du diff
- [ ] Chaque commit est propre, en français, avec `closes #N`
- [ ] La GitHub Action est verte (badge ✅)
- [ ] La console navigateur est propre (0 erreur, 0 warning)
- [ ] Aucun secret, aucun CDN externe dans le diff
- [ ] La PR cible `main` et traite UNE seule tâche
```

---

## Tu as fini la PR 3 ?

Va plus loin avec une **PR 4 bonus** : filtre par type, mode sombre, compteur live, drapeau du canton…
Voir [`objectifs-autonomie.md`](https://github.com/fallinov/ESIG/blob/main/822/seances/2026-06-15-vibe-coding/ressources/objectifs-autonomie.md) (dépôt principal du cours).

Pour chaque PR bonus : **issue → branche `feat/<slug>` → 1-2 prompts avec critères → commit avec `closes #N` → PR avec checklist → merge → `/clear`**.

---

## Liens utiles

- **Chapitre Vibe coding (GitBook)** : <https://divtec.gitbook.io/esig/c822-projet-collaboratif/vibe-coding>
- **Slides de la séance** : <https://divtec-cejef.github.io/2026-c822-vibe-coding-slides/>
- **Dépôt principal du cours** : <https://github.com/fallinov/ESIG/tree/main/822>
