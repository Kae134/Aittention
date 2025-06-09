# 🧠 Aittention — AI, Cloud & Back-end

This part was developed as a collaborative effort combining **artificial intelligence**, **cloud computing**, and **backend infrastructure**.

---

## 👥 Team

- **Backend & Cloud Infrastructure**: [Jeck0v](https://github.com/Jeck0v)  
- **AI & Image Processing**: [Kae](https://github.com/Kae134)

---

## ☁️ Cloud Stack
The project is fully hosted on **Google Cloud Platform** using a free trial account.  
Services used include:

- `IAM` (access management)
- `Budget` (cost tracking)
- `Compute Engine` (virtual machines)
- `Cloud Storage` (object storage)
- `VPC/Network` (routing, firewalls, public/private IPs…)

### 🛠️ DevOps & CI/CD Tools

- **Terraform**: Infrastructure as Code (IaC) tool used to integrate GCP with Spacelift.  
  > You may use **Pulumi** if you prefer TypeScript or Python over HCL.
- **Spacelift**: Used for CI/CD automation.

---

## 🧱 Backend Stack

The backend is built with:

- `FastAPI` a high-performance Python web framework for REST APIs
- `MongoDB` a NoSQL database
- `Nginx` reverse proxy to protect endpoints
- `Docker` & `Docker Compose`  for containerization and local orchestration

---
## 🧠 IA
The model used is:
https://github.com/Arhosseini77/SUM <br>
Check our readme in `the IA folder`, it will explain more simply what you need to have and do to use ia correctly.

## 🚀 Run Locally

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

### 📍 Local Access

- Swagger (API docs): [http://localhost:8000/docs](http://localhost:8000/docs)
- Mongo Express (MongoDB GUI): [http://localhost:8081/](http://localhost:8081/)

---

## 🌐 Online Access

- Swagger (production): [https://unfair-projects.com/docs](https://unfair-projects.com/docs)


---

## 📌 Notes

- The project is still under development. Some features may evolve over time.
- The integration between Terraform, Spacelift, and GCP enables automated deployment on each push.

## 🚧 Current Status & Future Plans

### 💡 Ongoing Work and Project Outlook

Currently, the AI component is only **available locally**, as we are facing challenges hosting it on the cloud. 
We explored several options, including **Google Cloud Platform with GPU via Vertex AI**, but the integration is complex and requires changes to the backend, which is time-consuming. <br>
Other platforms like **Hugging Face** or **Modal.com** require special access or advanced configurations that are not easily accessible in a student context.

We are committed to delivering a **high-quality and professional** product, so we decided not to implement a temporary or unstable cloud solution. As of now, the AI runs locally, but we plan to:

- **Deploy the AI in the cloud with GPU support** (using a vm with an Nvidia card on GCP in particular).
- Possibly **train our own model** for better performance and control.

---

## 📌 Roadmap (Planned Features)

Once the AI is hosted online, we plan to implement several improvements to make the app more realistic and production-ready:

- 🔐 **Enhanced backend security** (authentication, access control, etc.).
- 💳 **Stripe integration** for payment management.
- 📬 **Connect Spacelift to Discord or Slack** via webhooks to receive real-time alerts on pushes and production updates.
- 🧹 **Codebase refactoring** for better readability, maintainability, and adherence to best practices.
- 🌐 **Cloud-based CDN integration** for optimized image storage and delivery (initial attempts were unsuccessful, still in progress).

---

## ⚠️ Issues Encountered

### 🧠 AI Hosting

- Unable to access a **cloud GPU instance** within project time constraints.
- **Vertex AI (GCP)** was considered, but it would require significant backend modifications and time investment.
- Explored alternative solutions:
  - **Hugging Face**: Requires special GPU access requests, not practical for a short project.
  - **Modal.com**: Very promising, but professional-level access made it hard to use as students.
  - **Streamlit Cloud**: Not suited for our specific use case.
- **Vagrant** was considered to simulate a production environment locally, but was discarded in favor of real cloud deployment.

### 🛠️ Backend

- No major issues on the backend side. <br>

The main limitation remains the **inability to host the AI** due to GPU requirements, which prevents full integration of certain features.

