# CanvasCraft 🎨

**A Full-Stack Collaborative Drawing Application**

CanvasCraft is a modern web application that allows users to create, save, and manage digital canvases. It features a robust drawing engine on the frontend and a secure, scalable REST API on the backend.

**🚀 [Live Demo**](https://canvas-craft-nu.vercel.app/

---

## 🛠 Tech Stack

| Layer | Technology |
| --- | --- |
| **Frontend** | React.js, Vite, CSS3, Lucide React (Icons) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (NoSQL) |
| **Authentication** | JSON Web Tokens (JWT), Bcrypt.js |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## ✨ Features

* **Advanced Drawing Engine:** Custom canvas implementation with support for various brush sizes and colors.
* **User Authentication:** Secure Login and Sign-up functionality using JWT.
* **Cloud Persistence:** Save your artwork to a MongoDB database and access it from any device.
* **Full CRUD Functionality:** Create, Read, Update, and Delete your canvases.
* **Responsive Design:** Fully optimized for desktop and tablet experiences.
* **Secure API:** Protected routes requiring valid authentication tokens.

---

## 🏗 System Architecture

The project is structured as a **Monorepo**, separating concerns between the client-side experience and the server-side logic.

### Project Structure
```
CanvasCraft/
├── backend/                        # Node.js & Express API
│   ├── src/
│   │   ├── config/                 # Configuration (db.js)
│   │   ├── controllers/            # Logic for auth, canvas, and health
│   │   ├── middleware/             # Error handling, validation, & JWT auth
│   │   ├── models/                 # Mongoose Schemas (User & Canvas)
│   │   ├── routes/                 # API endpoint definitions
│   │   └── server.js               # Database connection & server start logic
│   ├── app.js                      # Express middleware & route mounting
│   └── package.json
│
├── frontend/                       # React.js SPA (Vite)
│   ├── public/                     # Static assets (logo.svg)
│   ├── src/
│   │   ├── components/             # Reusable UI (Canvas, Menu, styles.css)
│   │   ├── navigation/             # Global nav components
│   │   ├── pages/                  # Route-level views (Login, Gallery, etc.)
│   │   ├── services/               # API abstraction (fetch/axios calls)
│   │   ├── App.jsx                 # Routing and global state
│   │   └── Main.jsx                # React entry point
│   ├── index.html                  # HTML template
│   ├── vercel.json                 # SPA routing configuration
│   └── package.json
└── README.md
```
---
## 🧠 Key Implementation Details

### Canvas Persistence
The most challenging part of this project was efficiently saving drawing data.

* **The Process:** The canvas drawing is captured as a Base64 data URL using the browser's Canvas API.

* **The Solution**: This string is sent to the Node.js backend via a POST request. To handle the large string size of high-resolution drawings, the Express body-parser limit was increased to 50MB.

### Authentication Flow
* **Security:** Passwords are encrypted using Bcrypt.js before being stored in MongoDB.

* **Session Management:** Upon a successful login, the server issues a JWT (JSON Web Token).

* **Frontend Persistence:** The token is stored in localStorage and automatically attached to the Authorization header for all protected CRUD operations (Create, Update, Delete).
---
## 🛡 Technical Challenges & Solutions

### 1. Single Page Application (SPA) Routing

**Challenge:** Refreshing the page on Vercel resulted in a 404 error because the server looked for physical files instead of letting React Router handle the URL.
**Solution:** Implemented a `vercel.json` rewrite configuration to redirect all server requests back to `index.html`.

### 2. Cross-Origin Resource Sharing (CORS)

**Challenge:** The frontend on Vercel was blocked from communicating with the backend on Render due to security policies.
**Solution:** Configured dynamic CORS middleware in Express using environment variables (`CLIENT_URL`) to securely whitelist the production domain.

### 3. Large Data Handling

**Challenge:** Saving complex canvas data (Base64 strings) often exceeded the default Express JSON limit.
**Solution:** Increased the `payload limit` to **50MB** in the Express middleware to allow for high-resolution canvas saves.

---
## 🚀 Future Improvements
Since CanvasCraft is built on a modular architecture, I plan to implement the following features in upcoming versions:

### 1. Real-time Collaboration (WebSockets)
Implementing Socket.io to allow multiple users to draw on the same canvas simultaneously, with real-time updates across all connected clients.

### 2. AI-Powered Prompt Generator
Integrating an AI Agent (using OpenAI or a local LLM) that generates creative drawing prompts or provides "AI-assisted finishing" for rough sketches.

### 3. Advanced Layer Management
Adding a Photoshop-style layers system, allowing users to toggle visibility, reorder, and lock specific parts of their drawing.

### 4. Version History (Undo/Redo)
Implementing a stack-based Data Structure (DSA) to track drawing states, enabling a robust undo/redo system for a better user experience.

### 5. Export Options
Allowing users to export their work directly as .png, .jpg, or .pdf with custom resolution settings.

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Noman-Ahmad25/CanvasCraft.git
cd CanvasCraft

```
### 2. Backend Setup

```bash
cd backend
npm install

```

Create a `.env` file in the `backend` folder:

```env
PORT=5000
Mongo_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173

```

Run the backend: `npm start`

### 3. Frontend Setup

```bash
cd ../frontend
npm install

```

Create a `.env` file in the `frontend` folder:

```env
VITE_API_URL=http://localhost:5000/api

```

Run the frontend: `npm run dev`

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
