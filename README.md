# 📝 MERN Stack Task Manager

A full-stack task management application built to help users organize, track, and manage their daily activities. This is a complete MERN stack application featuring secure user authentication, responsive UI, and seamless CRUD operations.

vercel deployment : https://urtaskmanager.vercel.app/login
render deployment : https://task-manager-m2sy.onrender.com

---

## ✨ Features

- **🔐 Secure Authentication:** User registration and login using JSON Web Tokens (JWT) stored safely in HTTP-only cookies.
- **📊 Interactive Dashboard:** View real-time statistics (Total, Completed, In Progress, Pending tasks).
- **🔍 Search & Filter:** Instantly find tasks using the search bar or filter them by their current status.
- **✏️ Full CRUD Functionality:** Create, Read, Update, and Delete tasks effortlessly.
- **🎨 Modern UI:** Glassmorphism design built completely with Tailwind CSS.
- **🔒 Protected Routes:** Frontend routes are protected so only authenticated users can access the dashboard.

---

## 🛠️ Tech Stack

**Frontend (Client):**

- React.js (Vite)
- Tailwind CSS (Styling)
- Axios (API requests)
- React Router DOM (Navigation)

**Backend (Server):**

- Node.js & Express.js
- MongoDB & Mongoose (Database)
- JSON Web Tokens (JWT) & bcryptjs (Auth & Security)
- CORS & Cookie-Parser

---

## 🚀 Local Setup & Installation

To run this project locally on your machine, follow these steps:

### 1. Clone the repository

### 2. Setup the Backend (Server)

Open a terminal and navigate to the server directory:

Bash
cd server
npm install
Create a .env file in the server/src (or root of server, depending on your setup) directory and add the following variables:

Code snippet
PORT=8000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
Start the backend server:

Bash
node server.js

# or 'npm run dev' if you have nodemon setup

### 3. Setup the Frontend (Client)

Open a new terminal and navigate to the client directory:

Bash
cd client
npm install
Create a .env file in the client directory and add your backend API URL:

Code snippet
VITE_API_URL=http://localhost:8000/api
Start the Vite development server:

Bash
npm run dev

### 🌐 Deployment Details

Frontend: Deployed on Vercel. Environment variable VITE_API_URL points to the live backend.

Backend: Deployed on Render. Configured with CORS to only accept requests from the Vercel frontend URL.

Database: Hosted on MongoDB Atlas.

### 👨‍💻 Author

Created by Kshitij Datta
