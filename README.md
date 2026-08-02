# Portfolio — Anthony Pailloux

Site portfolio pour présenter le profil, les projets et le parcours d'Anthony Pailloux, développeur web & mobile full stack basé à Bordeaux.

**Front** : HTML, CSS, JavaScript vanilla  
**Contact** : PHP `mail()` via o2switch

## Structure des fichiers

```
Porfolio/
├── index.html
├── style.css
├── script.js              # Formulaire contact → send-mail.php (fetch)
├── send-mail.php          # Traitement serveur de l'envoi email
├── config.sample.php      # Modèle de configuration
├── config.php             # Configuration locale (non versionnée)
├── .htaccess              # HTTPS, redirections, sécurité
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── anthony-portrait.jpg
│   └── og-image.jpg       # Image Open Graph (partage LinkedIn / X)
└── README.md
```

## Lancer le site localement

- **Statique** : ouvrir `index.html` dans le navigateur (formulaire non fonctionnel sans PHP)
- **Avec PHP (Laragon)** : `http://localhost/Porfolio/` — le formulaire nécessite `config.php`

```bash
cp config.sample.php config.php
# Éditez config.php avec vos adresses email
```

## Déploiement sur o2switch

### Fichiers à mettre dans `public_html/`

| Fichier | Obligatoire |
|---------|-------------|
| `index.html` | oui |
| `style.css` | oui |
| `script.js` | oui |
| `send-mail.php` | oui |
| `.htaccess` | oui |
| `favicon.svg` | oui |
| `robots.txt` | oui |
| `sitemap.xml` | oui |
| `assets/anthony-portrait.jpg` | oui |
| `assets/og-image.jpg` | oui |
| `config.php` | oui (sur le serveur uniquement) |

**Ne pas uploader** : `.git/`, `.gitignore`, `.gitattributes`, `README.md`, `config.sample.php`

### Méthode 1 — FTP / Gestionnaire de fichiers cPanel

1. Connexion cPanel o2switch → **Gestionnaire de fichiers** → `public_html/`
2. Uploader ou remplacer les fichiers listés ci-dessus (conserver le dossier `assets/`)
3. **`config.php`** : ne pas écraser si déjà configuré sur le serveur. Sinon :
   ```bash
   cp config.sample.php config.php
   ```
   puis adapter `recipient` et `from_email` (adresse créée dans cPanel → Comptes de messagerie)
4. Vérifier les permissions : fichiers `644`, dossiers `755`

### Méthode 2 — Git (si dépôt cloné dans `public_html/`)

```bash
cd ~/public_html
git pull origin main
# config.php n'est pas dans le dépôt — le créer une fois à la main si absent
```

### Vérifications après déploiement

- [ ] https://anthonydev.fr/ — contenu à jour (projets, meta SEO)
- [ ] https://anthonydev.fr/robots.txt — accessible
- [ ] https://anthonydev.fr/sitemap.xml — accessible
- [ ] https://anthonydev.fr/assets/og-image.jpg — accessible
- [ ] https://www.anthonydev.fr/ — redirige vers https://anthonydev.fr/
- [ ] Formulaire de contact — envoi test OK
- [ ] [Google Search Console](https://search.google.com/search-console) — soumettre la sitemap

### Première installation

1. Créer une adresse email dans cPanel o2switch (`noreply@anthonydev.fr` ou `contact@anthonydev.fr`)
2. Copier `config.sample.php` → `config.php` et configurer les adresses
3. Uploader les fichiers dans `public_html/`
4. Tester le formulaire de contact en production

## Formulaire de contact

L'envoi passe par `send-mail.php` qui utilise la fonction PHP `mail()` native d'o2switch.

- Validation côté client (JavaScript) et serveur (PHP)
- Réponse JSON sans rechargement de page
- Champ honeypot anti-spam
- L'expéditeur (`from_email`) doit exister sur votre hébergement o2switch

## Fonctionnalités

- Navigation sticky avec menu burger sur mobile
- Scroll fluide vers les sections
- Apparition douce des blocs au scroll
- Formulaire de contact avec validation et envoi via PHP
- Design responsive (mobile, tablette, desktop)
- Accessibilité : contrastes, labels, navigation clavier, attributs ARIA

## Sécurité

- Aucun message stocké en base de données
- `config.php` protégé par `.htaccess`
- Validation et assainissement côté serveur
- Champ honeypot pour limiter le spam automatique
- HTTPS forcé en production

## Auteur

**Anthony Pailloux** — Développeur web & mobile full stack  
[LinkedIn](https://linkedin.com/in/anthony-pailloux) · [anthonypailloux.dev@gmail.com](mailto:anthonypailloux.dev@gmail.com)
