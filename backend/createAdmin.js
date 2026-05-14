/* eslint-disable no-undef */
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Admin from "./models/Admin.js";

const username = process.env.ADMIN_USERNAME || "admin";
const password = process.env.ADMIN_PASSWORD || "admin123";

const createAdmin = async () => {
  try {
    await connectDB();

    const hashedPassword = await bcrypt.hash(password, 10);
    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      console.log(`Admin "${username}" password updated successfully.`);
    } else {
      await Admin.create({ username, password: hashedPassword });
      console.log(`Admin "${username}" created successfully.`);
    }
  } catch (error) {
    console.error("Failed to create admin:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

createAdmin();
