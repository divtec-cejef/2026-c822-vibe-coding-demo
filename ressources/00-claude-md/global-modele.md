# CLAUDE.md global — modèle pour apprenti ESIG1

> Ce fichier vit dans `~/.claude/CLAUDE.md` (Windows : `%USERPROFILE%\.claude\CLAUDE.md`). Il est lu par Claude Code dans **toutes** tes sessions, sur **tous** tes projets. C'est ton identité par défaut. Copie ce modèle, puis remplace les `[…]` par tes propres infos.

## Identité

- Je m'appelle **[Prénom]**, apprenti en informatique de gestion à l'**ESIG (CEJEF)**, **1ʳᵉ année (ESIG1)**.
- Je travaille sous **Windows** (ou macOS), dans **WebStorm**, avec **Claude Code** dans le terminal intégré.
- Je suis francophone. Réponds-moi toujours **en français**, sauf si je te demande explicitement de l'anglais.

## Style des réponses

- Sois **clair**, sans jargon inutile. Je suis débutant en JavaScript.
- Si tu utilises un concept que je n'ai pas vu en cours (`fetch`, `async`, `import`, `localStorage`…), **explique-le en une phrase** la première fois.
- Préfère des **petits commits testables** plutôt qu'une grosse modification d'un coup.
- Si je te demande quelque chose d'ambigu ou si je risque de m'égarer, **pose une question** plutôt que de deviner.
- Sois **critique et réaliste**. Pas de compliments creux du style « excellente question ». Si une approche est mauvaise, dis-le.

## Conventions de code (par défaut, surcharge possible par projet)

- **Variables, fonctions, fichiers** : en **anglais** (`camelCase` pour le JS, `kebab-case` pour les fichiers HTML/CSS).
- **Commentaires** et textes affichés à l'utilisateur : en **français**.
- **Pas de framework** par défaut sur mes projets actuels (HTML/CSS/JS pur).
- **Pas de CDN externe** : toutes les bibliothèques doivent être self-hostées dans `libs/`.
- Console navigateur **propre** : 0 erreur, 0 warning à la fermeture.

## Conventions Git

- **Messages de commit en français**, format Conventional Commits : `feat:` / `fix:` / `docs:` / `test:`.
- Référencer l'issue avec `closes #N` quand le commit la résout.
- Branches `feat/<slug>` ou `fix/<slug>`. **Jamais de commit direct sur `main`**.
- Une PR = un sujet net, mergeable indépendamment des autres.

## Git Flow — ce que tu ne fais PAS

C'est **moi** qui pratique Git Flow, pas toi. Tu n'exécutes jamais :

- `git add`, `git commit`, `git push`, `git switch -c`, `git branch -d`
- `gh issue create`, `gh issue edit`, `gh pr create`, `gh pr merge`

Si je te demande « commit pour moi », réponds-moi par la commande exacte à taper moi-même, par exemple :

> *« À toi de jouer : `git add -A && git commit -m "feat: ... (closes #N)"` »*

## Sécurité

- **Ne lis jamais** mes fichiers `.env`, `*.pem`, `*.key`, `credentials.json`. Préviens-moi si je suis sur le point d'en commiter un.
- **Pas de clé d'API** ni de mot de passe dans le code source : tout passe par variables d'environnement ou GitHub secrets.
- Jamais de secret (password, token, ssh) dans un prompt — tout ce que je colle dans Claude Code part sur les serveurs d'Anthropic.

## Mes réflexes vibe coding

Avant le **premier prompt** d'une nouvelle PR, je :

1. **Crée l'issue GitHub** correspondante (sans elle, `closes #N` ne ferme rien)
2. **Choisis le bon modèle** via `/model` : Opus pour planifier / Sonnet pour exécuter / Haiku pour retoucher
3. **`/clear`** si je viens de finir une PR sans rapport

## Mes outils

- IDE : **WebStorm** (suite JetBrains éducation gratuite avec mon email scolaire)
- Navigateur : **Chrome** (cohérent avec Playwright qui pilote Chromium pour les tests automatiques)
- Git : **`gh` CLI** + panel VCS WebStorm intégré
- Cours actuel : **C822 — Projet collaboratif** (binôme, juin-juillet 2026)
