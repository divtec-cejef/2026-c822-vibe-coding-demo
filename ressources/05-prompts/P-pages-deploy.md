# P-pages — Déploiement automatique sur GitHub Pages

> Branche : `feat/github-pages` · Issue : #4
>
> 1 prompt. Bref. Mais c'est ce qui fait que ton site va exister sur Internet.

## Avant de démarrer

```bash
git switch main && git pull
git switch -c feat/github-pages
```

Attribue-toi **l'issue #4** sur GitHub (`gh issue edit 4 --add-assignee @me`). Elle a été créée à l'[Étape 0 du README](../../README.md#étape-0--créer-les-4-issues-github-avant-le-1er-prompt).

> ⚠️ **Activer GitHub Pages côté GitHub avant le push** : Settings → Pages → Source : **GitHub Actions**. Sinon le workflow va échouer.

---

## P-pages.1 — Le workflow de déploiement

```
Crée @.github/workflows/pages.yml qui déploie le site sur GitHub Pages
à chaque push sur main, avec les actions officielles :
- actions/configure-pages@v5
- actions/upload-pages-artifact@v3
- actions/deploy-pages@v4

L'artefact à uploader = la racine du dépôt (le site est statique, pas
de build). On exclut @node_modules/, @tests/, @playwright/,
@playwright.config.js, @package.json, @package-lock.json, @CLAUDE.md,
@DESIGN.md, @SPEC.md.

Permissions du workflow : pages:write + id-token:write.

Respecte @CLAUDE.md (pas de secret, pas de CDN — site purement
statique).

Critère de succès : après merge sur main, l'Action « pages » tourne
verte, et le site est accessible sur
https://<ton-handle>.github.io/<ton-repo>/.

Commit en français : `feat: déploiement automatique sur GitHub Pages (closes #4)`.
```

→ **Test** : après merge sur main, l'Action « pages » tourne → site live sur `https://<ton-handle>.github.io/<ton-repo>/`.
→ **Commit** : `feat: déploiement automatique sur GitHub Pages (closes #4)`

> 💡 **Ce que tu obtiens** : ton site est en ligne, sans rien faire de plus que `git push`. C'est ce que tu mettras en place sur ton vrai projet C822 cette semaine (mais avec Infomaniak/FTP au lieu de Pages).

---

## Avant de merger ta PR

```markdown
- [ ] Settings → Pages → Source = GitHub Actions (configuré côté GitHub)
- [ ] Le workflow `pages.yml` est syntaxiquement valide (YAML)
- [ ] J'ai relu moi-même chaque ligne du diff
- [ ] L'Action `test.yml` reste verte (rien cassé)
- [ ] Aucun secret, aucun CDN externe dans le diff
- [ ] La PR cible `main` et traite UNE seule tâche (déploiement Pages)
```

Merge → vérifie que l'Action « pages » tourne sur main → ouvre l'URL live → `/clear`.

Puis attaque la **PR 3 en autonomie** (voir le README du dépôt).
