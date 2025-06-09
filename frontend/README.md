# Aittention Frontend

Bienvenue sur le frontend du projet **Aittention**.
👉 [Accéder à la démo](https://aittention.vercel.app)

## Présentation

Aittention est une plateforme innovante visant à [décrire brièvement l'objectif du projet, par exemple : "faciliter la gestion intelligente de l'attention et des tâches grâce à l'IA"].  
Ce dépôt contient l'interface utilisateur développée en React/Next.js, offrant une expérience fluide et moderne.

---

## Stack Technique

- **Framework principal** : [Next.js](https://nextjs.org/) (React)
- **Langage** : TypeScript / JavaScript
- **Gestion d'état** : [Zustand](https://zustand-demo.pmnd.rs/)
- **UI Kit** : [Shadcn UI](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)
- **Formulaires & Validation** : [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **Effets & Animation** : [Motion](https://motion.dev/), [clsx](https://github.com/lukeed/clsx), [class-variance-authority](https://cva.style/)
- **3D & Graphismes** : [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction), [tsparticles](https://particles.js.org/)
- **Upload & Drag & Drop** : [react-dropzone](https://react-dropzone.js.org/)
- **Tests** : [Playwright](https://playwright.dev/) (e2e)
- **Linting & Formatage** : ESLint, Prettier
- **Styles** : [Tailwind CSS](https://tailwindcss.com/),
- **Déploiement** : [Vercel](https://vercel.com/) ([aittention.vercel.app](https://aittention.vercel.app))

---

## Prérequis

- [Node.js](https://nodejs.org/) (version recommandée : 18.x ou supérieure)
- [pnpm](https://pnpm.io/)

---

## Installation & Lancement en local

1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/votre-utilisateur/aittention.git
   cd aittention/frontend
   ```

2. **Installer les dépendances**

   ```bash
   pnpm install
   ```

3. **Lancer le serveur de développement**

   ```bash
   pnpm dev
   ```

4. **Accéder à l'application**

   Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## Structure du projet

frontend/
app/ # Pages et routes Next.js (app router)
components/ # Composants réutilisables
hooks/ # Hooks personnalisés
lib/ # Fonctions utilitaires
public/ # Fichiers statiques (images, etc.)
schemas/ # Schémas de validation
stores/ # Gestion d'état globale
types/ # Types TypeScript partagés
tests/ # Tests end-to-end (Playwright)

---

## Scripts Utiles

- `pnpm dev` : Démarre le serveur de développement (avec Turbopack)
- `pnpm build` : Build l'application pour la production
- `pnpm start` : Lance l'application en mode production
- `pnpm lint` : Analyse le code avec ESLint
- `pnpm test` : Lance les tests end-to-end Playwright
- `pnpm uitest` : Lance l'interface graphique de Playwright pour les tests

---

## Bonnes pratiques

- Respecter la structure des dossiers.
- Utiliser des noms de variables et fonctions explicites.
- Privilégier les hooks et composants fonctionnels.
- Documenter les fonctions complexes.
- Utiliser les scripts fournis pour le lint et le formatage.

---

## Liens utiles

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation React](https://fr.reactjs.org/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Playwright](https://playwright.dev/)

---

_Pour une UI toujours plus intuitive !_
