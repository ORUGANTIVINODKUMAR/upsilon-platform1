import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import websiteRoutes from "./routes/websiteRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import reimbursementRoutes from "./routes/reimbursementRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
const app = express();
import holidayRoutes from "./routes/holidayRoutes.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = [
  "https://upsilonservices.com",
  "https://www.upsilonservices.com",
  "https://workspace.upsilonservices.com",
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests without an Origin header (e.g. Postman)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Origin not allowed by CORS: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/leave", leaveRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reimbursements", reimbursementRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/profile", profileRoutes);;
app.use("/api/holidays", holidayRoutes);
app.use("/api", websiteRoutes);
app.use("/api/teams", teamRoutes);
const companyFrontendPath = path.resolve(
  __dirname,
  "../../company-website/dist"
);

const workspaceFrontendPath = path.resolve(
  __dirname,
  "../frontend/dist"
);

const companyStatic = express.static(companyFrontendPath);
const workspaceStatic = express.static(workspaceFrontendPath);

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.path.startsWith("/api/") || req.path.startsWith("/uploads/")) {
      return next();
    }

    const hostname = req.hostname.toLowerCase();

    const isWorkspaceDomain =
      hostname === "workspace.upsilonservices.com" ||
      hostname.includes("workspace");

    if (isWorkspaceDomain) {
      return workspaceStatic(req, res, next);
    }

    return companyStatic(req, res, next);
  });

  app.get(/.*/, (req, res, next) => {
    if (req.path.startsWith("/api/") || req.path.startsWith("/uploads/")) {
      return next();
    }

    const hostname = req.hostname.toLowerCase();

    const isWorkspaceDomain =
      hostname === "workspace.upsilonservices.com" ||
      hostname.includes("workspace");

    const indexFile = isWorkspaceDomain
      ? path.join(workspaceFrontendPath, "index.html")
      : path.join(companyFrontendPath, "index.html");

    res.sendFile(indexFile, (error) => {
      if (error) next(error);
    });
  });
} else {
  app.get("/", (req, res) => {
    res.json({
      success: true,
      message: "Upsilon Platform API Running",
    });
  });
}

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

export default app;