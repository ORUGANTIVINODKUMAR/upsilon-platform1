import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import { verifyWebsiteMailer } from "./config/websiteMail.js";

const PORT = process.env.PORT || 5000;

connectDB();
verifyWebsiteMailer();
console.log("NODE_ENV =", process.env.NODE_ENV);
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});