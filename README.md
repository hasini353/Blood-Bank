# Blood Bank Management System (BBMS)

This is a modern, clean, scalable, and production-ready MERN Stack application. The project has been completely built as a fully functional JavaScript-based MERN architecture with role-based access control for Donors, Hospitals, Blood Labs, and Administrators.

---

## Project Structure

```
project-root/
├── frontend/                        # React JS + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── components/              # Modular React components
│   │   │   ├── Header.jsx           # Navigation with role-aware links
│   │   │   ├── Footer.jsx           # Minimal footer
│   │   │   ├── about/              # About page component
│   │   │   └── contact/            # Contact page component
│   │   ├── pages/                  # Route-level pages
│   │   │   ├── Landing.jsx          # Home page (dark red theme)
│   │   │   ├── auth/               # Login, DonorRegister, FacultyRegister
│   │   │   ├── donor/              # Donor dashboard pages
│   │   │   ├── hospital/           # Hospital dashboard pages
│   │   │   ├── lab/                # Blood lab dashboard pages
│   │   │   └── admin/              # Admin panel pages
│   │   ├── context/                # React context (Auth)
│   │   ├── App.jsx                  # Routing and protected routes
│   │   └── main.jsx                 # Entry point
│   └── package.json                 # Frontend dependencies
│
└── backend/                         # Node.js + Express backend
    ├── models/                      # Mongoose schemas
    │   ├── adminModel.js            # Admin schema
    │   ├── donorModel.js            # Donor schema
    │   ├── facilityModel.js         # Hospital and Blood Lab schema
    │   ├── bloodModel.js            # Blood stock inventory schema
    │   ├── bloodRequestModel.js     # Inter-facility blood request schema
    │   └── bloodCampModel.js        # Blood donation camp schema
    ├── controllers/                 # Route handler logic
    ├── routes/                      # Express route definitions
    ├── middlewares/                  # JWT auth middleware
    ├── openapi/                     # Swagger API documentation
    ├── server.js                    # Backend entry point
    ├── seed.js                      # Full database seed script
    ├── seedAdmin.js                 # Admin-only seed script
    └── package.json                 # Backend dependencies
```

---

## Features

- **Role-Based Access Control**: Four distinct roles — Donor, Hospital, Blood Lab, and Admin — each with their own protected dashboard.
- **Unified Authentication**: Single login and registration flow handles all roles via JWT tokens.
- **Donor Eligibility Engine**: Enforces a 90-day cooldown interval between blood donations.
- **Emergency Blood Request Pipeline**: Hospitals send direct blood unit requests to blood labs with real-time status tracking (Pending / Accepted / Rejected).
- **Admin Verification Workflow**: Admin reviews and approves or rejects facility registrations before granting access.
- **Blood Inventory Management**: Track blood stock by type, quantity, and expiry date per facility.
- **Blood Donation Camps**: Schedule, manage, and track attendance for community blood drives.
- **All 36 Indian States + Cities**: State and city dropdowns covering all states and union territories.
- **Flexible Operating Hours**: Hospitals and labs can set their own open/close times and working days.
- **Forgot Password Flow**: Login page supports forgot password via Email or SMS (demo-ready).
- **Dark Red Theme**: Full blood-red themed UI across all landing and public pages.

---

## Setup Instructions

### 1. Backend Setup

Navigate into the backend/ directory:

```
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```
MONGO_URI=mongodb+srv://hasini_353:hasini333@cluster0.lx6tgen.mongodb.net/bloodbank?appName=Cluster0
JWT_SECRET=BBMS_2026_Auth_7xK9mP2vQ8rL5sN4zT6wY3uA1cD9fG
PORT=5000
```

Seed the database with sample data:

```
node seed.js
```

Start the backend development server:

```
npm start
```

Backend runs at: http://localhost:5000

---

### 2. Frontend Setup

Open a new terminal and navigate to the frontend/ directory:

```
cd frontend
npm install
```

Start the Vite development server:

```
npm run dev
```

Frontend runs at: http://localhost:5173

---

## Default Login Credentials (After Seeding)

| Role     | Email                        | Password       |
|----------|------------------------------|----------------|
| Admin    | anuhasini353@gmail.com       | hasini@admin   |
| Donor    | arjun.sharma@gmail.com       | donor@123      |
| Hospital | apollo.bbms@gmail.com        | facility@123   |
| Lab      | rotary.bloodbank@gmail.com   | facility@123   |

---

## Database

- **Database Name**: bloodbank
- **Platform**: MongoDB Atlas (Cluster0)
- **Collections**: admins, donors, facilities, bloods, bloodrequests, bloodcamps

---

## Deployment (Vercel)

The project includes a `vercel.json` at the root configured for full-stack deployment.

Add these environment variables in Vercel dashboard before deploying:

```
MONGO_URI=mongodb+srv://hasini_353:hasini333@cluster0.lx6tgen.mongodb.net/bloodbank?appName=Cluster0
JWT_SECRET=BBMS_2026_Auth_7xK9mP2vQ8rL5sN4zT6wY3uA1cD9fG
```

Also enable Network Access for all IPs (0.0.0.0/0) in MongoDB Atlas before deploying.

---

## Recent Major Changes

- Redesigned Login page with Email/Phone label, show/hide password, and Forgot Password (Email + SMS options).
- Redesigned Donor Registration as a single-page flat form with all 36 Indian states and cities.
- Redesigned Facility Registration as a single-page flat form with flexible operating hours and working day checkboxes.
- Fixed facility registration backend — removed required constraints on registrationNumber and document URL fields.
- Dropped stale unique index on registrationNumber from MongoDB to unblock facility registration.
- Redesigned Landing page with full dark red theme (red-950 / red-900 / red-800 backgrounds).
- Replaced black SVG wave divider with smooth gradient fade between sections.
- Redesigned Contact page with real Indian blood bank contacts (Rotary, KEM, Sankalp).
- Redesigned About page — removed team section, unified ecosystem block, and call-to-action.
- Footer reduced to copyright line only.
- Admin Panel link added to Header navbar.
- Database migrated from bbms to bloodbank on Cluster0.
- All seed data updated with Hasini as admin.

---

Developed by Hasini.
