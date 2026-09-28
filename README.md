# 🩸 Blood Bank Management System (BBMS)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite-61DAFB?logo=react)](https://react.dev/)
[![NodeJS](https://img.shields.io/badge/Backend-Node.js%20v22%20%2B%20Express%205-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?logo=mongodb)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel)](https://vercel.com/)

An enterprise-grade digital health platform designed to modernize and streamline blood donations, hospital emergency requests, donor eligibility tracking, and inventory management. By replacing manual paperwork with a structured digital workflow, **Blood Bank MS** connects **Donors**, **Hospitals**, **Blood Labs**, and **System Administrators** into a unified ecosystem.

---

## 📌 Executive Summary

### The Challenge
Blood banks and hospitals traditionally suffer from fragmented records, manual documentation, and delayed communication during critical emergencies. Key issues include:
- **No real-time visibility** into localized blood group stocks.
- **Critical delays** when hospitals place emergency blood requests.
- **Donor tracking errors** leading to premature or unsafe donation intervals.
- **Lack of a unified audit trail** for verifying medical facility credentials.

### The Solution
**Blood Bank MS** provides a centralized, role-based platform that digitizes the complete blood supply lifecycle:
1. **Automated Donor Eligibility Engine**: Enforces a strict 90-day cooldown interval between blood donations.
2. **Emergency Hospital-to-Lab Request Pipeline**: Enables hospitals to send instant blood requests directly to blood laboratories with status tracking (`Pending` ➔ `Accepted` / `Rejected`).
3. **Admin Verification System**: Document verification workflow for onboarded hospitals and blood labs before granting access.
4. **Blood Camp & Community Drives**: Coordinate, schedule, and track attendance at blood donation drives.

---

## 🏛️ System Architecture

```
                       +-------------------------------+
                       |    React 19 + Vite Frontend   |
                       | (Responsive SPA + Tailwind v4)|
                       +---------------+---------------+
                                       |
                                 REST API (JWT)
                                       |
                       +---------------+---------------+
                       |  Node.js + Express 5 Backend  |
                       |  (Vercel Serverless / Node)   |
                       +---------------+---------------+
                                       |
                   +-------------------+-------------------+
                   |                   |                   |
        +----------v----------+ +------v------+ +----------v----------+
        |  MongoDB Atlas DB   | | JWT Auth    | | Swagger OpenAPI 3.0 |
        | (Mongoose Schemas)  | | Middleware  | | (/api/doc)          |
        +---------------------+ +-------------+ +---------------------+
```

---

## 👥 Ecosystem Roles & Key Features

### 🛡️ 1. System Administrator (`/admin`)
- **Facility Credential Verification**: Review registration documents submitted by new hospitals and labs.
- **Approval Workflow**: Approve or reject pending facilities with custom rejection reasons.
- **Global Audit Trail & Analytics**: Real-time overview of total registered donors, verified facilities, and system login histories.

### 🏥 2. Hospitals (`/hospital`)
- **Real-Time Inventory Tracking**: Monitor internal blood unit reserves across all 8 major blood types.
- **Emergency Blood Request Creation**: Send targeted blood unit requests to registered Blood Labs.
- **Request Tracking**: Real-time status updates on submitted requests (`Pending`, `Accepted`, `Rejected`).
- **Donation Camps Management**: Host, schedule, and manage blood donation camps.
- **Donor Directory**: Search verified blood donors filtered by city and blood group.

### 🔬 3. Blood Laboratories (`/lab`)
- **Stock & Unit Expiration Management**: Track individual blood unit deposits, stock additions, and expiration dates.
- **Request Fulfillment Engine**: Receive hospital blood requests, evaluate stock availability, and accept or reject requests.
- **Camp Operations**: Record actual donor turnouts and manage donation camp outcomes.

### 🩸 4. Donors (`/donor`)
- **Donor Profile & Health Tracking**: Store medical stats (age, weight, gender, blood group).
- **Automated 90-Day Cooldown Calculator**: Dynamic calculation enforcing standard 90-day intervals between donations.
- **Donation History**: Track personal donation logs and verified records.
- **Camp Discovery**: Search and explore upcoming blood donation camps nearby.

---

## 🛠️ Tech Stack

| Domain | Technology | Description |
|---|---|---|
| **Frontend** | React 19, Vite 7 | Modern, high-performance Single Page Application |
| **Styling** | Tailwind CSS v4 | Dynamic UI design system |
| **Icons & UI** | Lucide React, React Hot Toast | Icon sets and notifications |
| **Routing** | React Router v7 | Client-side routing and protected route guards |
| **Backend** | Node.js v22, Express 5 | High-throughput RESTful API architecture |
| **Database** | MongoDB Atlas, Mongoose ODM | Cloud document store with strict schema validation |
| **Security** | JWT, bcryptjs (12 salt rounds) | Token authentication and password hashing |
| **Documentation** | Swagger UI Express | Interactive API docs at `/api/doc` |
| **Deployment** | Vercel | Cloud serverless deployment |

---

## 🗄️ Database — `bloodbank` (MongoDB Atlas)

| Collection | Documents | Description |
|---|---|---|
| **admins** | 1 | Admin profile — Hasini |
| **donors** | 8 | All 8 blood groups (A+, A-, B+, B-, O+, O-, AB+, AB-) |
| **facilities** | 3 | 2 Hospitals + 1 Blood Lab |
| **bloods** | 16 | Blood stock inventory |
| **bloodrequests** | 6 | Inter-facility blood requests |
| **bloodcamps** | 5 | 3 Upcoming + 2 Completed camps |

### Schema Summary
- **`Admin`**: Administrator profiles, roles, and hashed credentials.
- **`Donor`**: Donor demographics, address, medical info, last donation timestamp.
- **`Facility`**: Unified model for `hospital` and `blood-lab` types, operating hours, activity logs.
- **`Blood`**: Unit-level inventory referencing a `bloodLab` or `hospital`, blood group, quantity, expiry.
- **`BloodRequest`**: Inter-facility requests linking `hospitalId` to `labId`, status, and notes.
- **`BloodCamp`**: Event schedules with venue, date, timing, expected vs actual donor turnouts.

---

## 🚀 API Endpoint Reference

### 🔐 Authentication (`/api/auth`)
- `POST /api/auth/register` — Unified registration for Donors & Facilities.
- `POST /api/auth/login` — Unified login returning JWT token & role.
- `GET /api/auth/profile` — Fetch current authenticated user profile.

### 🛡️ Admin Management (`/api/admin`)
- `GET /api/admin/facilities` — Fetch all facilities (filter by pending/approved).
- `PATCH /api/admin/facility/:id/status` — Approve or reject facility registration.
- `GET /api/admin/donors` — Retrieve global list of registered donors.

### 🏥 Hospital Operations (`/api/hospital`)
- `GET /api/hospital/stock` — Retrieve hospital blood stock inventory.
- `POST /api/hospital/request` — Create a blood request to a blood lab.
- `GET /api/hospital/requests` — View status of submitted blood requests.

### 🔬 Blood Lab Operations (`/api/blood-lab`)
- `GET /api/blood-lab/stock` — Fetch blood lab inventory.
- `POST /api/blood-lab/stock` — Add or update blood stock units.
- `GET /api/blood-lab/requests` — View incoming hospital requests.
- `PATCH /api/blood-lab/request/:id` — Accept or reject a hospital blood request.

---

## 🌐 Vercel Deployment Guide

This project is pre-configured for seamless deployment to **Vercel** as a full-stack application (Vite SPA Frontend + Express Serverless API).

### Step 1: Push to GitHub
```bash
git add .
git commit -m "deploy"
git push origin main
```

### Step 2: Import into Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard) → **Add New Project**
2. Select your repository `Blood-Bank`
3. **Root Directory** → `frontend`
4. **Framework** → Vite
5. **Build Command** → `npm run build`
6. **Output Directory** → `dist`

### Step 3: Environment Variables
Add these in Vercel → Settings → Environment Variables:

| Key | Value |
|---|---|
| `MONGO_URI` | `mongodb+srv://hasini_353:hasini333@cluster0.lx6tgen.mongodb.net/bloodbank?appName=Cluster0` |
| `JWT_SECRET` | `BBMS_2026_Auth_7xK9mP2vQ8rL5sN4zT6wY3uA1cD9fG` |

> ⚠️ Also go to **MongoDB Atlas → Network Access** and add `0.0.0.0/0` to allow Vercel's IPs.

### Step 4: Deploy!
Click **Deploy**. Vercel builds the frontend and deploys the serverless backend API automatically.

---

## 💻 Local Development Setup

### Prerequisites
- [Node.js v22+](https://nodejs.org/)
- MongoDB Atlas connection string

### 1. Clone & Install
```bash
git clone https://github.com/hasini353/Blood-Bank.git
cd Blood-Bank

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure Environment Variables
Create `backend/.env`:
```env
MONGO_URI=mongodb+srv://hasini_353:hasini333@cluster0.lx6tgen.mongodb.net/bloodbank?appName=Cluster0
JWT_SECRET=BBMS_2026_Auth_7xK9mP2vQ8rL5sN4zT6wY3uA1cD9fG
PORT=5000
```

### 3. Seed Database
```bash
cd backend
node seed.js
```

**Default Admin Credentials (after seed):**
- **Email**: `anuhasini353@gmail.com`
- **Password**: `hasini@admin`

### 4. Run Development Servers

**Backend** (port 5000):
```bash
cd backend
npm start
```

**Frontend** (port 5173):
```bash
cd frontend
npm run dev
```

---

## 🔑 Login Credentials (Seeded Data)

| Role | Email | Password |
|---|---|---|
| **Admin** | `anuhasini353@gmail.com` | `hasini@admin` |
| Donor | `arjun.sharma@gmail.com` | `donor@123` |
| Hospital | `apollo.bbms@gmail.com` | `facility@123` |
| Blood Lab | `rotary.bloodbank@gmail.com` | `facility@123` |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

Developed with ❤️ by **Hasini**.
