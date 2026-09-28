/**
 * ═══════════════════════════════════════════════════════════════
 *   Blood Bank Management System — Full Database Seed
 *   Database : bloodbank (MongoDB Atlas)
 *   Run      : node backend/seed.js
 * ═══════════════════════════════════════════════════════════════
 *
 *  Collections created:
 *   ├── admins           (1 admin account)
 *   ├── donors           (8 donors — all blood groups)
 *   ├── facilities       (2 hospitals + 1 blood lab)
 *   ├── bloods           (blood stock inventory — lab + hospitals)
 *   ├── bloodrequests    (hospital → lab blood requests)
 *   └── bloodcamps       (upcoming + completed donation camps)
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
dotenv.config({ path: join(__dirname, ".env") });

// ── Connect ───────────────────────────────────────────────────────────────────
const MONGO_URI = process.env.MONGO_URI;
console.log(`\n🔗 Connecting to: ${MONGO_URI.replace(/:[^:@]+@/, ":****@")}`);
await mongoose.connect(MONGO_URI);
console.log("✅ Connected to MongoDB Atlas → database: bloodbank\n");

// ── Drop old indexes that cause conflicts ─────────────────────────────────────
const dropIdx = async (col, idx) => {
  try { await mongoose.connection.collection(col).dropIndex(idx); console.log(`   🗑  Dropped ${col}.${idx}`); }
  catch { /* index might not exist */ }
};
await dropIdx("facilities", "registrationNumber_1");
await dropIdx("donors",     "email_1");
await dropIdx("facilities", "email_1");
await dropIdx("admins",     "email_1");

// ── Helper schemas (mirror exact project models) ──────────────────────────────
const h = async (p) => bcrypt.hash(p, 10);
const pastDate = (d) => { const x = new Date(); x.setDate(x.getDate() - d); return x; };
const futureDate = (d) => { const x = new Date(); x.setDate(x.getDate() + d); return x; };

// Admin
const adminSchema = new mongoose.Schema({
  name: String, email: { type: String, lowercase: true }, password: { type: String, select: false },
  role: { type: String, default: "admin" }, isActive: { type: Boolean, default: true }, lastLogin: Date,
}, { timestamps: true });
adminSchema.pre("save", async function(next) { if (this.isModified("password")) this.password = await bcrypt.hash(this.password, 12); next(); });

// Donor
const donorSchema = new mongoose.Schema({
  fullName: String, email: { type: String, lowercase: true }, password: { type: String, select: false },
  phone: String, role: { type: String, default: "donor" }, bloodGroup: String, age: Number,
  gender: String, weight: Number, lastDonationDate: Date, eligibleToDonate: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true },
  address: { street: String, city: String, state: String, pincode: String },
  donationHistory: { type: Array, default: [] },
}, { timestamps: true });
donorSchema.pre("save", async function(next) { if (this.isModified("password")) this.password = await bcrypt.hash(this.password, 10); next(); });

// Facility
const facilitySchema = new mongoose.Schema({
  name: String, email: { type: String, lowercase: true }, password: { type: String, select: false },
  phone: String, emergencyContact: String, role: String, facilityType: String, facilityCategory: String,
  registrationNumber: String,
  documents: { registrationProof: { url: String, filename: String } },
  address: { street: String, city: String, state: String, pincode: String },
  operatingHours: { open: String, close: String, workingDays: Array },
  is24x7: Boolean, emergencyServices: Boolean,
  status: { type: String, default: "approved" }, isActive: { type: Boolean, default: true },
  history: { type: Array, default: [] }, lastLogin: Date,
}, { timestamps: true });
facilitySchema.pre("save", async function(next) { if (this.isModified("password")) this.password = await bcrypt.hash(this.password, 10); next(); });

// Blood Stock
const bloodSchema = new mongoose.Schema({
  bloodGroup: { type: String, enum: ["A+","A-","B+","B-","O+","O-","AB+","AB-"] },
  quantity: Number, expiryDate: Date,
  bloodLab: { type: mongoose.Schema.Types.ObjectId, ref: "Facility" },
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Facility" },
}, { timestamps: true });

// Blood Request
const bloodRequestSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Facility" },
  labId:      { type: mongoose.Schema.Types.ObjectId, ref: "Facility" },
  bloodType: { type: String, enum: ["A+","A-","B+","B-","O+","O-","AB+","AB-"] },
  units: Number,
  status: { type: String, enum: ["pending","accepted","rejected"], default: "pending" },
  processedAt: Date, notes: String,
}, { timestamps: true });

// Blood Camp
const bloodCampSchema = new mongoose.Schema({
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Facility" },
  title: String, description: String, date: Date,
  time: { start: String, end: String },
  location: { venue: String, city: String, state: String, pincode: String },
  expectedDonors: { type: Number, default: 0 },
  actualDonors:   { type: Number, default: 0 },
  status: { type: String, enum: ["Upcoming","Ongoing","Completed","Cancelled"], default: "Upcoming" },
}, { timestamps: true });

// Register models
const Admin        = mongoose.models.Admin        || mongoose.model("Admin",        adminSchema);
const Donor        = mongoose.models.Donor        || mongoose.model("Donor",        donorSchema);
const Facility     = mongoose.models.Facility     || mongoose.model("Facility",     facilitySchema);
const Blood        = mongoose.models.Blood        || mongoose.model("Blood",        bloodSchema);
const BloodRequest = mongoose.models.BloodRequest || mongoose.model("BloodRequest", bloodRequestSchema);
const BloodCamp    = mongoose.models.BloodCamp    || mongoose.model("BloodCamp",    bloodCampSchema);

// ── Clear ALL existing data in bloodbank db ───────────────────────────────────
await Promise.all([
  Admin.deleteMany({}), Donor.deleteMany({}), Facility.deleteMany({}),
  Blood.deleteMany({}), BloodRequest.deleteMany({}), BloodCamp.deleteMany({}),
]);
console.log("🗑  Cleared all collections in bloodbank\n");

// ══════════════════════════════════════════════════════════════════════════════
//   1. ADMIN
// ══════════════════════════════════════════════════════════════════════════════
const admin = new Admin({ name: "Hasini", email: "anuhasini353@gmail.com", password: "hasini@admin", role: "admin", isActive: true });
await admin.save();
console.log(`✅ [Admin]     ${admin.name} — ${admin.email}`);

// ══════════════════════════════════════════════════════════════════════════════
//   2. DONORS  (all 8 blood groups, realistic Indian names & addresses)
// ══════════════════════════════════════════════════════════════════════════════
const donorsData = [
  { fullName: "Arjun Sharma",    email: "arjun.sharma@gmail.com",    phone: "9876543210", bloodGroup: "O+",  age: 28, gender: "Male",   weight: 72, address: { street: "12 MG Road",          city: "Bengaluru",  state: "Karnataka",     pincode: "560001" }, lastDonationDate: pastDate(100), eligibleToDonate: true  },
  { fullName: "Priya Nair",      email: "priya.nair@gmail.com",      phone: "8765432109", bloodGroup: "A+",  age: 25, gender: "Female", weight: 55, address: { street: "45 Anna Salai",        city: "Chennai",    state: "Tamil Nadu",    pincode: "600002" }, lastDonationDate: pastDate(200), eligibleToDonate: true  },
  { fullName: "Rahul Verma",     email: "rahul.verma@gmail.com",     phone: "7654321098", bloodGroup: "B+",  age: 32, gender: "Male",   weight: 80, address: { street: "8 Connaught Place",    city: "New Delhi",  state: "Delhi",         pincode: "110001" }, lastDonationDate: null,          eligibleToDonate: true  },
  { fullName: "Sneha Patil",     email: "sneha.patil@gmail.com",     phone: "9543210987", bloodGroup: "AB+", age: 29, gender: "Female", weight: 60, address: { street: "22 FC Road",            city: "Pune",       state: "Maharashtra",   pincode: "411004" }, lastDonationDate: pastDate(45),  eligibleToDonate: false },
  { fullName: "Vikram Singh",    email: "vikram.singh@gmail.com",    phone: "9432109876", bloodGroup: "O-",  age: 35, gender: "Male",   weight: 85, address: { street: "7 Civil Lines",         city: "Jaipur",     state: "Rajasthan",     pincode: "302006" }, lastDonationDate: pastDate(110), eligibleToDonate: true  },
  { fullName: "Meera Reddy",     email: "meera.reddy@gmail.com",     phone: "8321098765", bloodGroup: "A-",  age: 23, gender: "Female", weight: 52, address: { street: "33 Jubilee Hills",      city: "Hyderabad",  state: "Telangana",     pincode: "500033" }, lastDonationDate: null,          eligibleToDonate: true  },
  { fullName: "Karthik Menon",   email: "karthik.menon@gmail.com",   phone: "7210987654", bloodGroup: "B-",  age: 30, gender: "Male",   weight: 70, address: { street: "5 Marine Drive",        city: "Mumbai",     state: "Maharashtra",   pincode: "400020" }, lastDonationDate: pastDate(150), eligibleToDonate: true  },
  { fullName: "Ananya Gupta",    email: "ananya.gupta@gmail.com",    phone: "9109876543", bloodGroup: "AB-", age: 27, gender: "Female", weight: 58, address: { street: "18 Hazratganj",         city: "Lucknow",    state: "Uttar Pradesh", pincode: "226001" }, lastDonationDate: pastDate(92),  eligibleToDonate: false },
];

const createdDonors = [];
for (const d of donorsData) {
  const donor = new Donor({ ...d, password: "donor@123" });
  await donor.save();
  createdDonors.push(donor);
  console.log(`✅ [Donor]     ${donor.fullName.padEnd(20)} ${donor.bloodGroup.padEnd(4)} — ${donor.email}`);
}

// ══════════════════════════════════════════════════════════════════════════════
//   3. FACILITIES  (2 hospitals + 1 blood lab)
// ══════════════════════════════════════════════════════════════════════════════
const facilitiesData = [
  {
    name: "Apollo Hospitals", email: "apollo.bbms@gmail.com",
    phone: "9800000001", emergencyContact: "9800000002",
    role: "hospital", facilityType: "hospital", facilityCategory: "Private",
    registrationNumber: "HOSP-AP-2024-001",
    documents: { registrationProof: { url: "https://example.com/apollo-cert.pdf", filename: "apollo-cert.pdf" } },
    address: { street: "21 Greams Road", city: "Chennai", state: "Tamil Nadu", pincode: "600006" },
    operatingHours: { open: "00:00", close: "23:59", workingDays: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"] },
    is24x7: true, emergencyServices: true, status: "approved",
  },
  {
    name: "AIIMS New Delhi", email: "aiims.bbms@gmail.com",
    phone: "9800000003", emergencyContact: "9800000004",
    role: "hospital", facilityType: "hospital", facilityCategory: "Government",
    registrationNumber: "HOSP-AI-2024-002",
    documents: { registrationProof: { url: "https://example.com/aiims-cert.pdf", filename: "aiims-cert.pdf" } },
    address: { street: "Ansari Nagar East", city: "New Delhi", state: "Delhi", pincode: "110029" },
    operatingHours: { open: "00:00", close: "23:59", workingDays: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"] },
    is24x7: true, emergencyServices: true, status: "approved",
  },
  {
    name: "Rotary Blood Bank", email: "rotary.bloodbank@gmail.com",
    phone: "9800000005", emergencyContact: "9800000006",
    role: "blood-lab", facilityType: "blood-lab", facilityCategory: "Trust",
    registrationNumber: "LAB-RB-2024-003",
    documents: { registrationProof: { url: "https://example.com/rotary-cert.pdf", filename: "rotary-cert.pdf" } },
    address: { street: "1 Tughlak Road", city: "New Delhi", state: "Delhi", pincode: "110011" },
    operatingHours: { open: "08:00", close: "20:00", workingDays: ["Mon","Tue","Wed","Thu","Fri","Sat"] },
    is24x7: false, emergencyServices: false, status: "approved",
  },
];

const createdFacilities = [];
for (const f of facilitiesData) {
  const facility = new Facility({ ...f, password: "facility@123" });
  await facility.save();
  createdFacilities.push(facility);
  console.log(`✅ [Facility]  ${facility.name.padEnd(22)} ${facility.role.padEnd(10)} — ${facility.email}`);
}

const apollo  = createdFacilities[0];
const aiims   = createdFacilities[1];
const rotary  = createdFacilities[2];

// ══════════════════════════════════════════════════════════════════════════════
//   4. BLOOD STOCK
//      - Rotary Blood Lab: has all 8 blood groups (main inventory)
//      - Apollo Hospital:  has 4 blood groups (in-house reserve)
//      - AIIMS Hospital:   has 4 blood groups (in-house reserve)
// ══════════════════════════════════════════════════════════════════════════════
const BLOOD_GROUPS = ["A+","A-","B+","B-","O+","O-","AB+","AB-"];

// Lab stock (all 8 groups)
const labStockQty    = [18, 5, 24, 3, 40, 9, 12, 2];
const labExpiryDays  = [30, 12, 28, 15, 35, 20, 25, 40];
const labStock = BLOOD_GROUPS.map((bg, i) => ({
  bloodGroup: bg, quantity: labStockQty[i],
  expiryDate: futureDate(labExpiryDays[i]),
  bloodLab: rotary._id,
}));
await Blood.insertMany(labStock);
console.log(`\n✅ [Blood]     Lab stock — 8 groups seeded for ${rotary.name}`);

// Apollo stock (4 groups)
const apolloStock = [
  { bloodGroup: "O+",  quantity: 8,  expiryDate: futureDate(20), hospital: apollo._id },
  { bloodGroup: "A+",  quantity: 6,  expiryDate: futureDate(18), hospital: apollo._id },
  { bloodGroup: "B+",  quantity: 4,  expiryDate: futureDate(25), hospital: apollo._id },
  { bloodGroup: "AB+", quantity: 2,  expiryDate: futureDate(15), hospital: apollo._id },
];
await Blood.insertMany(apolloStock);
console.log(`✅ [Blood]     Hospital stock — 4 groups seeded for ${apollo.name}`);

// AIIMS stock (4 groups)
const aiimsStock = [
  { bloodGroup: "O-",  quantity: 5,  expiryDate: futureDate(22), hospital: aiims._id },
  { bloodGroup: "A-",  quantity: 3,  expiryDate: futureDate(10), hospital: aiims._id },
  { bloodGroup: "B-",  quantity: 2,  expiryDate: futureDate(30), hospital: aiims._id },
  { bloodGroup: "O+",  quantity: 10, expiryDate: futureDate(28), hospital: aiims._id },
];
await Blood.insertMany(aiimsStock);
console.log(`✅ [Blood]     Hospital stock — 4 groups seeded for ${aiims.name}`);

// ══════════════════════════════════════════════════════════════════════════════
//   5. BLOOD REQUESTS  (hospitals requesting from Rotary lab)
// ══════════════════════════════════════════════════════════════════════════════
const requests = [
  { hospitalId: apollo._id, labId: rotary._id, bloodType: "O-",  units: 5, status: "accepted",  processedAt: pastDate(3),  notes: "Urgent surgery patient" },
  { hospitalId: apollo._id, labId: rotary._id, bloodType: "A+",  units: 3, status: "pending",   notes: "Elective surgery scheduled next week" },
  { hospitalId: aiims._id,  labId: rotary._id, bloodType: "AB-", units: 2, status: "accepted",  processedAt: pastDate(1),  notes: "Cancer patient — chemo treatment" },
  { hospitalId: aiims._id,  labId: rotary._id, bloodType: "B+",  units: 4, status: "rejected",  processedAt: pastDate(5),  notes: "Insufficient stock at the time" },
  { hospitalId: apollo._id, labId: rotary._id, bloodType: "O+",  units: 6, status: "pending",   notes: "Road accident victims — ICU" },
  { hospitalId: aiims._id,  labId: rotary._id, bloodType: "A-",  units: 2, status: "accepted",  processedAt: pastDate(2),  notes: "Dialysis patient" },
];
await BloodRequest.insertMany(requests);
console.log(`\n✅ [BloodRequest]  ${requests.length} requests seeded (accepted/pending/rejected)`);

// ══════════════════════════════════════════════════════════════════════════════
//   6. BLOOD CAMPS
// ══════════════════════════════════════════════════════════════════════════════
const camps = [
  {
    hospital: apollo._id, title: "World Blood Donor Day Camp",
    description: "Annual mega blood donation drive open to all. Free health checkup included.",
    date: futureDate(12), time: { start: "09:00", end: "17:00" },
    location: { venue: "Apollo Convention Hall", city: "Chennai", state: "Tamil Nadu", pincode: "600006" },
    expectedDonors: 200, actualDonors: 0, status: "Upcoming",
  },
  {
    hospital: aiims._id, title: "AIIMS Blood Donation Drive",
    description: "Monthly blood donation camp for AIIMS staff, students, and public.",
    date: futureDate(5), time: { start: "08:00", end: "14:00" },
    location: { venue: "AIIMS Auditorium", city: "New Delhi", state: "Delhi", pincode: "110029" },
    expectedDonors: 150, actualDonors: 0, status: "Upcoming",
  },
  {
    hospital: apollo._id, title: "Independence Day Blood Camp",
    description: "Patriotic blood donation event held on Independence Day.",
    date: pastDate(40), time: { start: "08:00", end: "16:00" },
    location: { venue: "Apollo Community Hall", city: "Chennai", state: "Tamil Nadu", pincode: "600001" },
    expectedDonors: 100, actualDonors: 118, status: "Completed",
  },
  {
    hospital: aiims._id, title: "Emergency Blood Reserve Drive",
    description: "Emergency collection event following critical shortage alert.",
    date: pastDate(15), time: { start: "10:00", end: "18:00" },
    location: { venue: "AIIMS Main Gate Area", city: "New Delhi", state: "Delhi", pincode: "110029" },
    expectedDonors: 80, actualDonors: 73, status: "Completed",
  },
  {
    hospital: apollo._id, title: "Corporate Blood Donation Drive",
    description: "Partnership with IT companies for quarterly donation. 10+ companies participating.",
    date: futureDate(30), time: { start: "09:00", end: "15:00" },
    location: { venue: "OMR Tech Park", city: "Chennai", state: "Tamil Nadu", pincode: "600119" },
    expectedDonors: 300, actualDonors: 0, status: "Upcoming",
  },
];
await BloodCamp.insertMany(camps);
console.log(`✅ [BloodCamp]     ${camps.length} camps seeded (3 upcoming, 2 completed)`);

// ══════════════════════════════════════════════════════════════════════════════
//   SUMMARY
// ══════════════════════════════════════════════════════════════════════════════
const totalBlood = labStock.length + apolloStock.length + aiimsStock.length;
console.log("\n" + "═".repeat(60));
console.log("  🎉  DATABASE SEED COMPLETE — bloodbank");
console.log("═".repeat(60));
console.log(`  Collection       Documents   Details`);
console.log(`  ─────────────────────────────────────────────────────`);
console.log(`  admins           1           anuhasini353@gmail.com`);
console.log(`  donors           ${createdDonors.length}           All 8 blood groups`);
console.log(`  facilities       ${createdFacilities.length}           2 hospitals + 1 blood lab`);
console.log(`  bloods           ${totalBlood}          Lab + 2 hospitals stock`);
console.log(`  bloodrequests    ${requests.length}           accepted/pending/rejected`);
console.log(`  bloodcamps       ${camps.length}           3 upcoming, 2 completed`);
console.log("═".repeat(60));
console.log("\n🔑  Login Credentials:");
console.log("  Admin    → anuhasini353@gmail.com      / hasini@admin");
console.log("  Donor    → arjun.sharma@gmail.com       / donor@123");
console.log("  Hospital → apollo.bbms@gmail.com        / facility@123");
console.log("  Lab      → rotary.bloodbank@gmail.com   / facility@123");
console.log("\n🌐  Live URLs:");
console.log("  Frontend  → http://localhost:5173");
console.log("  Backend   → http://localhost:5000");
console.log("  Admin     → http://localhost:5173/login  (then auto-redirects to /admin)");
console.log("  Donor     → http://localhost:5173/donor");
console.log("  Hospital  → http://localhost:5173/hospital");
console.log("  Lab       → http://localhost:5173/lab\n");

await mongoose.disconnect();
process.exit(0);
