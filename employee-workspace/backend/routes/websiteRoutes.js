import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import websiteTransporter from "../config/websiteMail.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RESOURCE_FILES = {
  "offshoring-guide": {
    file: "resources/choose-if-offshoring-fits-your-firm.pdf",
    label: "Choose If Offshoring Fits Your Firm",
  },

  "pilot-playbook": {
    file: "resources/offshore-accounting-pilot-playbook.pdf",
    label: "Offshore Accounting Pilot Playbook",
  },
};

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(email = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

/**
 * POST /api/contact
 * Company website contact form
 */
router.post("/contact", async (req, res) => {
  try {
    const {
      fullName,
      firmName,
      email,
      phone,
      service,
      country,
      message,
    } = req.body;

    if (!fullName?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required.",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    await websiteTransporter.sendMail({
      from: `"Upsilon Website" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      replyTo: email.trim(),
      subject: "New Website Inquiry - Upsilon Services",

      text: `
New Website Inquiry

Full Name: ${fullName}
Firm Name: ${firmName || "Not provided"}
Email: ${email}
Phone: ${phone || "Not provided"}
Service: ${service || "Not selected"}
Country / Region: ${country || "Not provided"}

Message:
${message}
      `,

      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Website Inquiry</h2>

          <p>
            <strong>Full Name:</strong>
            ${escapeHtml(fullName)}
          </p>

          <p>
            <strong>Firm Name:</strong>
            ${escapeHtml(firmName || "Not provided")}
          </p>

          <p>
            <strong>Email:</strong>
            ${escapeHtml(email)}
          </p>

          <p>
            <strong>Phone:</strong>
            ${escapeHtml(phone || "Not provided")}
          </p>

          <p>
            <strong>Service:</strong>
            ${escapeHtml(service || "Not selected")}
          </p>

          <p>
            <strong>Country / Region:</strong>
            ${escapeHtml(country || "Not provided")}
          </p>

          <p><strong>Message:</strong></p>

          <p>
            ${escapeHtml(message).replaceAll("\n", "<br>")}
          </p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Submitted successfully. We will contact you soon.",
    });
  } catch (error) {
    console.error("Contact email error:", {
      message: error.message,
      code: error.code,
      response: error.response,
    });

    return res.status(500).json({
      success: false,
      message:
        "Your message could not be sent. Please try again in a few minutes.",
    });
  }
});

/**
 * POST /api/download-resource
 * Emails the selected PDF to the website visitor
 */
router.post("/download-resource", async (req, res) => {
  try {
    const { name, email, company, phone, resource } = req.body;

    if (
      !name?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !resource?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, email, phone, and resource are required.",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    const resourceInfo = RESOURCE_FILES[resource];

    if (!resourceInfo) {
      return res.status(400).json({
        success: false,
        message: "Requested resource was not found.",
      });
    }

    /*
      Current file:
      employee-workspace/backend/routes/websiteRoutes.js

      PDF location:
      company-website/public/resources/...
    */
    const filePath = path.resolve(
      __dirname,
      "../../../company-website/public",
      resourceInfo.file
    );

    if (!fs.existsSync(filePath)) {
      console.error("Resource file not found:", filePath);

      return res.status(404).json({
        success: false,
        message: "The requested resource file is currently unavailable.",
      });
    }

    await websiteTransporter.sendMail({
      from: `"Upsilon Services" <${process.env.EMAIL_FROM}>`,
      to: email.trim(),
      replyTo: process.env.EMAIL_TO,
      subject: `Your requested download: ${resourceInfo.label}`,

      text: `
Hello ${name},

Thank you for your interest.

Your requested resource, "${resourceInfo.label}", is attached to this email.

If you have any questions, reply to this email and our team will help.

Upsilon Services
      `,

      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Thanks for your interest, ${escapeHtml(name)}!</h2>

          <p>
            Your requested resource,
            <strong>${escapeHtml(resourceInfo.label)}</strong>,
            is attached to this email.
          </p>

          <p>
            If you have any questions, reply to this email and our team will
            help.
          </p>

          <p>Upsilon Services</p>
        </div>
      `,

      attachments: [
        {
          filename: path.basename(resourceInfo.file),
          path: filePath,
        },
      ],
    });

    await websiteTransporter.sendMail({
      from: `"Upsilon Website" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      replyTo: email.trim(),
      subject: `New resource download - ${resourceInfo.label}`,

      text: `
New Resource Download

Resource: ${resourceInfo.label}
Name: ${name}
Company: ${company || "Not provided"}
Email: ${email}
Phone: ${phone}
      `,

      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Resource Download</h2>

          <p>
            <strong>Resource:</strong>
            ${escapeHtml(resourceInfo.label)}
          </p>

          <p>
            <strong>Name:</strong>
            ${escapeHtml(name)}
          </p>

          <p>
            <strong>Company:</strong>
            ${escapeHtml(company || "Not provided")}
          </p>

          <p>
            <strong>Email:</strong>
            ${escapeHtml(email)}
          </p>

          <p>
            <strong>Phone:</strong>
            ${escapeHtml(phone)}
          </p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message:
        "Submitted successfully. The resource has been sent to your email.",
    });
  } catch (error) {
    console.error("Resource download email error:", {
      message: error.message,
      code: error.code,
      response: error.response,
    });

    return res.status(500).json({
      success: false,
      message:
        "We could not send the resource. Please try again in a few minutes.",
    });
  }
});

/**
 * GET /api/health
 */
router.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Upsilon platform server is running.",
  });
});

export default router;