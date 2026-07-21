import nodemailer from "nodemailer";

const requiredVariables = [
  "EMAIL_HOST",
  "EMAIL_PORT",
  "EMAIL_USER",
  "EMAIL_PASS",
  "EMAIL_FROM",
  "EMAIL_TO",
];

const missingVariables = requiredVariables.filter(
  (variableName) => !process.env[variableName]
);

if (missingVariables.length > 0) {
  console.warn(
    `Website email variables missing: ${missingVariables.join(", ")}`
  );
}

const websiteTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT || 587),
  secure: Number(process.env.EMAIL_PORT) === 465,
  requireTLS: Number(process.env.EMAIL_PORT || 587) === 587,

  auth: {
    user: process.env.EMAIL_USER?.trim(),
    pass: process.env.EMAIL_PASS?.trim(),
  },

  tls: {
    minVersion: "TLSv1.2",
  },
});

export const verifyWebsiteMailer = async () => {
  if (missingVariables.length > 0) {
    console.warn("Website SMTP verification skipped.");
    return;
  }

  try {
    await websiteTransporter.verify();
    console.log("Website SMTP connection successful");
  } catch (error) {
    console.error("Website SMTP connection failed:", {
      message: error.message,
      code: error.code,
      response: error.response,
      responseCode: error.responseCode,
      command: error.command,
    });
  }
};

export default websiteTransporter;