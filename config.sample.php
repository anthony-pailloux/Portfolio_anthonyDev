<?php
/**
 * Configuration du formulaire de contact — o2switch
 *
 * Copiez ce fichier en config.php et adaptez les valeurs avant le déploiement.
 */

return [
    // Adresse qui recevra les messages du portfolio
    'recipient' => 'anthonypailloux.dev@gmail.com',

    // Expéditeur : créez cette adresse dans cPanel o2switch (Comptes de messagerie)
    // Exemple : noreply@votredomaine.fr ou contact@votredomaine.fr
    'from_email' => 'noreply@anthonydev.fr',

    'from_name' => 'Portfolio Anthony Pailloux',

    // Préfixe ajouté au sujet des emails reçus
    'subject_prefix' => '[Portfolio]',
];
