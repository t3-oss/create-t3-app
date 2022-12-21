---
title: Vercel
description: Déploiement sur Vercel
layout: ../../../layouts/docs.astro
lang: fr
---

Nous vous recommandons de déployer votre application sur [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss). Ce service facilite le déploiement d'application Next.js.

## Configuration du projet

Vercel va certainement configurer les commandes de génération et publier le répertoire automatiquement. Cependant, vous pouvez également spécifier ces informations manuellement avec vos propres configurations en créant un fichier appelé [`vercel.json`](https://vercel.com/docs/project-configuration) et en incluant les informations suivantes. **La plus part des projets ne le requiert pas.**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

## Utilisation du tableau de bord Vercel

1. Après avoir envoyer votre code sur GitHub, Inscrivez-vous sur [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss) avec GitHub et cliquez ensuite sur **Add New Project**.

![Nouveau projet sur Vercel](/images/vercel-new-project.webp)

2. Importez votre projet GitHub.

![Importation de votre projet](/images/vercel-import-project.webp)

3. Ajoutez vos variables d'environnement.

![Ajoutez vos variables d'environnement](/images/vercel-env-vars.webp)

4. Cliquez sur **Deploy**. À partir de maintenant, à chaque fois que vous pousserez une modification, Vercel redéploiera automatiquement votre application !

## Utilisation de Vercel CLI

Pour déployer à partir de la ligne de commande, vous devez d'abord [installer la CLI Vercel globalement](https://vercel.com/docs/cli#installing-vercel-cli).

```bash
npm i -g vercel
```

Exécutez la commande [`vercel`](https://vercel.com/docs/cli/deploying-from-cli) pour déployer votre projet.

```bash
vercel
```

Ajoutez l'argument `--env DATABASE_URL=YOUR_DATABASE_URL_HERE` pour ajouter une variable d'environnement comme la chaîne de connexion à la base de données. Utilisez `--yes` si vous souhaitez ignorer les questions lors des déploiements et donner une réponse par défaut.

```bash
vercel --env DATABASE_URL=YOUR_DATABASE_URL_HERE --yes
```

Après le premier déploiement, cette commande déploiera sur une branche de prévisualisation. Vous deverez ajouter l'argument `--prod` pour pousser votre changement directement sur la production.

```bash
vercel --prod
```
