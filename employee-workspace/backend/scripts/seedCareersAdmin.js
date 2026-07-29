import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import CareersAdmin from "../models/CareersAdmin.js";
import connectDB from "../config/db.js";

dotenv.config();

/*
  Usage:
  node scripts/seedCareersAdmin.js "Name" admin@example.com "Password123!"

  Falls back to CAREERS_ADMIN_* env vars, then to a default
  account that must be changed after first login.
*/
const [, , argName, argEmail, argPassword] = process.argv;

const name = argName || process.env.CAREERS_ADMIN_NAME || "Careers Admin";
const email = (
  argEmail ||
  process.env.CAREERS_ADMIN_EMAIL ||
  "careers-admin@upsilonservices.com"
)
  .toLowerCase()
  .trim();
const password =
  argPassword || process.env.CAREERS_ADMIN_PASSWORD || "ChangeMe123!";

const seedCareersAdmin = async () => {
  try {
    await connectDB();

    const existing = await CareersAdmin.findOne({ email });

    if (existing) {
      console.log(`Careers admin already exists: ${email}`);
      process.exit();
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await CareersAdmin.create({
      name,
      email,
      passwordHash,
      isActive: true,
    });

    console.log("Careers admin created:");
    console.log(`  Email:    ${email}`);
    console.log(`  Password: ${password}`);
    console.log("Log in and treat this password as sensitive.");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedCareersAdmin();
