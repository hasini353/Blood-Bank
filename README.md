This is a modern, clean, scalable, and production-ready MERN Stack application. The project is a fully functional JavaScript-based MERN architecture designed for blood donation and hospital inventory management.

## Project Structure

```
project-root/
├── frontend/             # React JS + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── components/   # Modular React components (Header, Footer, About, Contact)
│   │   ├── pages/        # Route pages (Landing, Login, Register, Dashboards)
│   │   ├── context/      # React context (Auth)
│   │   ├── App.jsx       # Routing
│   │   └── main.jsx      # Entry point
│   └── package.json      # Frontend dependencies
│
└── backend/              # Node.js + Express backend
    ├── models/           # Mongoose schemas (Admin, Donor, Facility, Blood, etc.)
    ├── controllers/      # Route controllers
    ├── routes/           # Express API routes
    ├── middlewares/      # Auth middlewares
    ├── server.js         # Entry point
    └── package.json      # Backend dependencies
```

## Features

- **Role-Based Portals**: Dedicated interfaces and dashboards for Donors, Hospitals, Blood Labs, and Administrators.
- **Donor Eligibility Tracking**: Enforces standard interval cooldowns between blood donations.
- **Emergency Blood Requests**: Hospital-to-lab communication pipeline with real-time status updates (Pending / Accepted / Rejected).
- **MERN Backend**: Express server seamlessly integrated with MongoDB Atlas and Mongoose schemas.
- **All Indian States & Cities**: Full coverage across all 28 states and 8 union territories for facility and donor address lookup.

## Setup Instructions

### 1. Backend Setup

Navigate into the backend/ directory:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
PORT=5000
MONGO_URI=mongodb+srv://hasini_353:hasini333@cluster0.lx6tgen.mongodb.net/bloodbank?appName=Cluster0
JWT_SECRET=BBMS_2026_Auth_7xK9mP2vQ8rL5sN4zT6wY3uA1cD9fG
```

Seed initial data (optional):

```bash
node seed.js
```

Start the backend development server:

```bash
npm start
```

### 2. Frontend Setup

Open a new terminal and navigate to the frontend/ directory:

```bash
cd frontend
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will be accessible at: http://localhost:5173/

## Default Login Credentials

- **Admin**: `anuhasini353@gmail.com` / `hasini@admin`
- **Donor**: `arjun.sharma@gmail.com` / `donor@123`
- **Hospital**: `apollo.bbms@gmail.com` / `facility@123`
- **Blood Lab**: `rotary.bloodbank@gmail.com` / `facility@123`

## Recent Major Architectural Changes

- Redesigned Login interface with support for password recovery via Email and SMS.
- Simplified Donor and Facility registration flows into clean, single-page forms with flexible operating hours.
- Configured repository structure for direct full-stack deployment on Vercel.
