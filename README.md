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
├── .htaccess              # HTTPS, sécurité, protection config
├── assets/
│   └── anthony-portrait.jpg
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

1. Créer une adresse email dans cPanel o2switch (`noreply@votredomaine.fr`)
2. Copier `config.sample.php` → `config.php` et configurer les adresses
3. Uploader les fichiers dans `public_html/` (inclure `assets/anthony-portrait.jpg`)
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
