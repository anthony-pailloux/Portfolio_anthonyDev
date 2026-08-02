# Déploiement — anthonydev.fr (o2switch)

Mise à jour du portfolio via **GitHub** + terminal SSH o2switch.

**Dossier serveur :** `~/anthonydev.fr` (ne pas utiliser `public_html`, `gunshotaim`, `cookileandco.fr`)

**Repo :** `git@github.com:anthony-pailloux/Portfolio_anthonyDev.git`

---

## Mise à jour (routine)

### 1. Sur votre PC

```bash
cd G:\AnthonyDev\laragon\www\Porfolio

git status
git add .
git commit -m "Description de la modification"
git push origin main
```

### 2. Sur o2switch (SSH)

```bash
cd ~/anthonydev.fr
git pull origin main
```

C'est tout.

---

## Vérifications rapides (optionnel)

```bash
curl -I https://anthonydev.fr/
curl -I https://anthonydev.fr/robots.txt
curl -I https://anthonydev.fr/assets/og-image.jpg
```

Testez aussi le formulaire de contact sur https://anthonydev.fr/

---

## Points importants

| Fichier | Dans Git ? | Note |
|---------|------------|------|
| `config.php` | Non | Reste uniquement sur le serveur — jamais écrasé par `git pull` |
| `google87272c8af91d367e.html` | Non | Vérif. Google Search Console — ne pas supprimer |
| `.well-known/` | Non | Certificats SSL |

---

## En cas de problème

### `git pull` refuse (fichiers locaux modifiés sur le serveur)

```bash
cd ~/anthonydev.fr
git status
git restore .
git pull origin main
```

### Forcer la version GitHub (efface les modifs locales sur fichiers trackés)

```bash
cd ~/anthonydev.fr
git fetch origin
git reset --hard origin/main
cp ~/config.php.backup config.php
```

> `config.php.backup` : refaire une sauvegarde si besoin avec `cp config.php ~/config.php.backup`

### SSH GitHub bloqué ou lent

La config SSH o2switch utilise le port 443 (`~/.ssh/config`). Test :

```bash
ssh -T git@github.com
```

### Premier déploiement / réinstallation Git

Voir la section « Première installation » dans [README.md](README.md).

---

## Ce qu'il ne faut pas toucher

```bash
~/gunshotaim
~/gunshotaim.com
~/cookileandco.fr
~/CookIleAndCo
~/public_html
```
