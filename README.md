# 🩸 Blood Bank Management System (BBMS)

A centralized digital healthcare platform designed to bridge the gap between **Blood Donors**, **Hospitals**, and **Blood Banks**. The system streamlines emergency blood requests, manages real-time blood inventory, tracks donor eligibility, and coordinates community donation drives to ensure life-saving blood reaches patients without critical delays.

---

## 💡 About The Project

During medical emergencies, surgeries, and trauma cases, every second counts. Traditional blood bank workflows often suffer from fragmented communication, lack of real-time inventory visibility, and manual record-keeping.

**BBMS** addresses these challenges by providing a connected, role-based platform where:
- Hospitals can check availability and request blood units immediately from nearby blood banks.
- Blood banks manage their stock levels, track expiry dates, and fulfill emergency hospital requests.
- Donors can register, verify their health eligibility, and find donation camps.
- Administrators ensure trust and security by verifying healthcare facilities before granting platform access.

---

## 👥 How It Works: The 4 Key Roles

### 🩸 1. Donors
- **Single-Page Registration**: Quick registration with personal details, blood group, and address lookup across all Indian states and union territories.
- **Eligibility Engine**: Automatically tracks donation dates and enforces standard 90-day cooldown periods to ensure safe donor recovery.
- **Donation History**: Keeps a personal record of past blood donations.
- **Blood Camps**: Discover upcoming community blood donation drives and camps nearby.

### 🏥 2. Hospitals
- **Inventory Monitoring**: Live tracking of the hospital's internal blood reserve across all 8 blood types (A+, A-, B+, B-, O+, O-, AB+, AB-).
- **Emergency Requests**: Send immediate, priority blood requests to connected blood banks and laboratories when reserves run low.
- **Request Tracking**: Monitor status updates in real time (`Pending` ➔ `Accepted` / `Rejected`).
- **Camp Hosting**: Schedule and organize blood donation camps to replenish supplies.

### 🔬 3. Blood Banks & Laboratories
- **Stock Management**: Track stock deposits, unit quantities, and expiration dates for every blood group.
- **Request Fulfillment**: Review incoming emergency blood requests from hospitals and accept or reject based on current stock availability.
- **Drive Coordination**: Record donor turnouts and manage donation outcomes from blood drives.

### 🛡️ 4. System Administrator
- **Facility Verification**: Review submitted credentials, licensing details, and registration proofs from newly registered hospitals and blood labs.
- **Approval Workflow**: Approve verified medical facilities or reject incomplete registrations to protect platform integrity.
- **Global Overview**: Real-time analytics on total registered donors, verified facilities, active donation camps, and system activity.

---

## 🌟 Core Highlights

- **Emergency Blood Request Pipeline**: Fast hospital-to-lab communication to eliminate delays during critical surgeries and emergencies.
- **All 8 Blood Groups Covered**: Dedicated inventory management for A+, A-, B+, B-, O+, O-, AB+, and AB-.
- **Medical Cooldown Protection**: Protects donor health by preventing premature donations.
- **Full Indian Geography Support**: Pre-loaded with all 28 states and 8 union territories for seamless local search.
- **Role-Based Access**: Secure, personalized dashboards tailored to each stakeholder's responsibilities.

---

## 🔑 Demo & Testing Accounts

Use these pre-configured accounts to test each role in the system:

| Role | Email | Password | Access / Purpose |
|---|---|---|---|
| **Admin** | `anuhasini353@gmail.com` | `hasini@admin` | Approves hospitals & labs, system overview |
| **Hospital** | `apollo.bbms@gmail.com` | `facility@123` | Requests blood units, manages hospital stock |
| **Blood Lab** | `rotary.bloodbank@gmail.com` | `facility@123` | Fulfills blood requests, manages inventory |
| **Donor** | `arjun.sharma@gmail.com` | `donor@123` | Views eligibility, donation camps & history |
