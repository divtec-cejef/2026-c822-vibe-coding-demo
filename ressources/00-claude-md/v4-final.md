# CLAUDE.md — Projet « Brasseries de Suisse » (v4)

> **Version 4 (finale) : v3 + règles métier + souveraineté + posture vibe coding.**
> Version définitive utilisée pour les 3 PR de la séance.
>
> Ce fichier est lu par Claude Code à chaque session dans ce dépôt. Il fixe le contexte, la stack et les règles.

## Description

Application web pédagogique de la séance d'introduction au vibe coding du C822 (15 juin 2026). Une carte interactive qui affiche toutes les brasseries répertoriées en Suisse sur OpenStreetMap, avec recherche par nom et marquage des brasseries visitées via `localStorage`.

Public cible : moi-même et mes camarades de classe, pour s'entraîner aux pratiques C822.

## Stack imposée

- **HTML5 + CSS3 + JavaScript ES6+ pur**. **Aucun framework** (pas de React, Vue, Svelte, etc.).
- **Leaflet** pour la carte, en librairie **self-hostée** dans `libs/` (jamais de CDN externe).
- **OpenStreetMap Overpass API** pour les données, un seul `fetch` POST au chargement.
- **`@playwright/test`** pour les tests e2e (en local et en CI) + **`live-server`** via `npx` pour le dev local.
- **Node 20+** pour l'outillage uniquement (pas de bundler côté runtime).
- **Plateforme** : Windows + WebStorm (terminal PowerShell par défaut).

## Conventions de code

- **Variables, fonctions, classes, fichiers** : en **anglais**, `camelCase` pour JS, `kebab-case` pour les fichiers HTML/CSS.
- **Commentaires** et chaînes affichées à l'utilisateur : en **français**.
- Pas de `any` (TypeScript) — on est en JS pur de toute façon.
- Pas de `console.log` qui traîne au commit. Pas de code mort.
- Console navigateur **propre** : 0 erreur, 0 warning à la fermeture.

## Design

- L'identité visuelle de l'app est définie dans **`DESIGN.md`** à la racine (généré au cadrage, spec Google Labs).
- **Lire `DESIGN.md` avant tout travail sur le style** (CSS, composants, pins, popups) et s'y conformer : palette, typographie, espacements, composants.
- Les **maquettes** des écrans sont dans **`docs/maquettes/`** (PNG). Quand un prompt touche au visuel, référencer la maquette de l'écran concerné avec `@docs/maquettes/<nom>.png` — par exemple `@docs/maquettes/maquette-desktop.png` pour l'écran principal.

## Conventions Git

- **`main` est protégée** : aucun commit direct, tout passe par Pull Request.
- Branches `feat/<slug>` (nouvelles fonctionnalités) et `fix/<slug>` (corrections de bugs) uniquement.
- **Messages de commit en français**, format Conventional Commits : `feat:`, `fix:`, `docs:`, `test:`.
- Référencer l'issue dans le commit : `closes #N` ferme l'issue au merge.
- Une PR = un sujet net, mergeable indépendamment des autres.

## Structure du projet

```
.
├── index.html              # page principale
├── style.css               # styles
├── main.js                 # logique app
├── libs/
│   └── leaflet/            # librairie Leaflet en local
├── tests/
│   └── map.spec.js         # test automatique
├── .github/workflows/
│   ├── test.yml            # lance les tests
│   └── pages.yml           # publie le site
├── playwright.config.js    # config tests
├── package.json            # liste des outils dev
├── DESIGN.md               # identité visuelle
└── CLAUDE.md               # ce fichier
```

> **Explications complémentaires :**
> - `libs/leaflet/` contient la librairie Leaflet (CSS, JS, images) copiée en local — règle « pas de CDN externe ».
> - `test.yml` se déclenche **à chaque push** sur n'importe quelle branche.
> - `pages.yml` se déclenche **uniquement quand une PR est mergée sur `main`** — c'est ce qui met le site en ligne.
> - `package.json` ne liste qu'une seule dépendance dev : `@playwright/test`.

## Commandes utiles

| Commande | Effet |
|----------|-------|
| `npx live-server --port=8080 --no-browser` | Lance le serveur dev local sur `http://localhost:8080` |
| `npx playwright test --ui` | Lance le test e2e en mode interactif (recommandé en cours) |
| `npx playwright test` | Lance le test e2e en mode headless (utilisé en CI) |
| `git switch -c feat/<slug>` | Crée une nouvelle branche de feature |

> **Windows Defender** — au premier `npx live-server`, une pop-up demande s'il faut autoriser Node sur le réseau. Autoriser **réseau privé** (suffit pour `localhost`). Sinon Playwright ne pourra pas se connecter.

## Règles métier de la mini-app

- Une brasserie sans coordonnées (`lat`/`lon`) n'est **pas** affichée sur la carte.
- Le filtre de recherche est **insensible à la casse** et **insensible aux accents**.
- Une brasserie marquée comme « visitée » reste persistée même après fermeture du navigateur.
- Reset complet : vider `localStorage` dans les DevTools (à mentionner dans un futur prompt).

## Souveraineté et sécurité

- **Pas de CDN externe**. Toutes les libs (Leaflet, sa CSS, ses icônes) sont copiées dans `libs/` au premier prompt qui en a besoin.
- **Pas de clé d'API** dans le code source. Overpass est anonyme, pas de secret à gérer ici. Pour les futurs projets, utiliser les `secrets` GitHub Actions.
- **Pas de tracking tiers** (Google Analytics, Hotjar, etc.).

## Posture vibe coding

Avant chaque prompt, je relis les 7 règles du jeu (`regles-du-jeu.md`) :
1. Lire ce que Claude génère avant de commiter.
2. Un prompt = un petit commit testable.
3. Refuser un résultat médiocre et redemander.
4. Demander au prof, pas à Claude, si une règle métier est floue.
5. Garder une trace écrite des prompts qui marchent — ils resserviront sur le projet C822.
6. Code en anglais, commits en français, pas de CDN.
7. Jamais de secret (password, token, ssh) dans un prompt ni dans le dépôt.
