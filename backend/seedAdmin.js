import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/adminModel.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb+srv://admin:admin123@login.r8hpvmw.mongodb.net/bloodbank?appName=login";
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected ✅");

    // Remove existing admin
    await Admin.deleteMany({ email: "anuhasini353@gmail.com" });

    // Create Hasini admin
    const admin = new Admin({
      name: "Hasini",
      email: "anuhasini353@gmail.com",
      password: "hasini@admin", // will be hashed automatically
      role: "admin",
    });

    await admin.save();
    console.log("Admin seeded successfully ✅");
    console.log("  Email    : anuhasini353@gmail.com");
    console.log("  Password : hasini@admin");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
