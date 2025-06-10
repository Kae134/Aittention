# Aittention

## 🖥️ Frontend

Bienvenue sur le frontend du projet **Aittention**.
👉 [Accéder à la démo](https://aittention.vercel.app)

### Présentation

Aittention est une plateforme innovante visant à [décrire brièvement l'objectif du projet, par exemple : "faciliter la gestion intelligente de l'attention et des tâches grâce à l'IA"].  
Ce dépôt contient l'interface utilisateur développée en React/Next.js, offrant une expérience fluide et moderne.

---

### Stack Technique

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

### Prérequis

- [Node.js](https://nodejs.org/) (version recommandée : 18.x ou supérieure)
- [pnpm](https://pnpm.io/)

---

### Installation & Lancement en local

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

### Structure du projet

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

### Scripts Utiles

- `pnpm dev` : Démarre le serveur de développement (avec Turbopack)
- `pnpm build` : Build l'application pour la production
- `pnpm start` : Lance l'application en mode production
- `pnpm lint` : Analyse le code avec ESLint
- `pnpm test` : Lance les tests end-to-end Playwright
- `pnpm uitest` : Lance l'interface graphique de Playwright pour les tests

---

### Bonnes pratiques

- Respecter la structure des dossiers.
- Utiliser des noms de variables et fonctions explicites.
- Privilégier les hooks et composants fonctionnels.
- Documenter les fonctions complexes.
- Utiliser les scripts fournis pour le lint et le formatage.

---

### Liens utiles

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation React](https://fr.reactjs.org/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Playwright](https://playwright.dev/)

---

_Pour une UI toujours plus intuitive !_

## 🧠 AI, Cloud & Back-end

This part was developed as a collaborative effort combining **artificial intelligence**, **cloud computing**, and **backend infrastructure**.

---

### 👥 Team

- **Backend & Cloud Infrastructure**: [Jeck0v](https://github.com/Jeck0v)
- **AI & Image Processing**: [Kae](https://github.com/Kae134)

---

### ☁️ Cloud Stack

The project is fully hosted on **Google Cloud Platform** using a free trial account.  
Services used include:

- `IAM` (access management)
- `Budget` (cost tracking)
- `Compute Engine` (virtual machines)
- `Cloud Storage` (object storage)
- `VPC/Network` (routing, firewalls, public/private IPs…)

#### 🛠️ DevOps & CI/CD Tools

- **Terraform**: Infrastructure as Code (IaC) tool used to integrate GCP with Spacelift.
  > You may use **Pulumi** if you prefer TypeScript or Python over HCL.
- **Spacelift**: Used for CI/CD automation.

---

### 🧱 Backend Stack

The backend is built with:

- `FastAPI` a high-performance Python web framework for REST APIs
- `MongoDB` a NoSQL database
- `Nginx` reverse proxy to protect endpoints
- `Docker` & `Docker Compose` for containerization and local orchestration

---

### 🧠 IA

The model used is:

https://github.com/Arhosseini77/SUM

Check our readme in `the IA folder`, it will explain more simply what you need to have and do to use ia correctly.

### 🚀 Run Locally

Make sure you have `Docker` and `Docker Compose` installed.

1. Clone the repo:

   ```bash
   git clone https://github.com/Kae134/Aittention.git
   cd Aittention/backend
   ```

2. Start the project:

   ```bash
   docker compose up --build
   ```

3. To stop and clean up volumes:

   ```bash
   docker compose down -v
   ```

#### 📍 Local Access

- Swagger (API docs): [http://localhost:8000/docs](http://localhost:8000/docs)
- Mongo Express (MongoDB GUI): [http://localhost:8081/](http://localhost:8081/)

---

### 🌐 Online Access

- Swagger (production): [https://unfair-projects.com/docs](https://unfair-projects.com/docs)

---

### 📌 Notes

- The project is still under development. Some features may evolve over time.
- The integration between Terraform, Spacelift, and GCP enables automated deployment on each push.

### 🚧 Current Status & Future Plans

#### 💡 Ongoing Work and Project Outlook

Currently, the AI component is only **available locally**, as we are facing challenges hosting it on the cloud.
We explored several options, including **Google Cloud Platform with GPU via Vertex AI**, but the integration is complex and requires changes to the backend, which is time-consuming.
Other platforms like **Hugging Face** or **Modal.com** require special access or advanced configurations that are not easily accessible in a student context.

We are committed to delivering a **high-quality and professional** product, so we decided not to implement a temporary or unstable cloud solution. As of now, the AI runs locally, but we plan to:

- **Deploy the AI in the cloud with GPU support** (using a vm with an Nvidia card on GCP in particular).
- Possibly **train our own model** for better performance and control.

---

### 📌 Roadmap (Planned Features)

Once the AI is hosted online, we plan to implement several improvements to make the app more realistic and production-ready:

- 🔐 **Enhanced backend security** (authentication, access control, etc.).
- 💳 **Stripe integration** for payment management.
- 📬 **Connect Spacelift to Discord or Slack** via webhooks to receive real-time alerts on pushes and production updates.
- 🧹 **Codebase refactoring** for better readability, maintainability, and adherence to best practices.
- 🌐 **Cloud-based CDN integration** for optimized image storage and delivery (initial attempts were unsuccessful, still in progress).

---

### ⚠️ Issues Encountered

#### 🧠 AI Hosting

- Unable to access a **cloud GPU instance** within project time constraints.
- **Vertex AI (GCP)** was considered, but it would require significant backend modifications and time investment.
- Explored alternative solutions:
  - **Hugging Face**: Requires special GPU access requests, not practical for a short project.
  - **Modal.com**: Very promising, but professional-level access made it hard to use as students.
  - **Streamlit Cloud**: Not suited for our specific use case.
- **Vagrant** was considered to simulate a production environment locally, but was discarded in favor of real cloud deployment.

#### 🛠️ Backend

- No major issues on the backend side.

The main limitation remains the **inability to host the AI** due to GPU requirements, which prevents full integration of certain features.
