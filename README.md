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


## Default Login Credentials

- **Admin**: `anuhasini353@gmail.com` / `hasini@admin`
- **Donor**: `arjun.sharma@gmail.com` / `donor@123`
- **Hospital**: `apollo.bbms@gmail.com` / `facility@123`
- **Blood Lab**: `rotary.bloodbank@gmail.com` / `facility@123`

## Recent Major Architectural Changes

- Redesigned Login interface with support for password recovery via Email and SMS.
- Simplified Donor and Facility registration flows into clean, single-page forms with flexible operating hours.
- Configured repository structure for direct full-stack deployment on Vercel.
