import express from "express";
import multer from "multer";

const router = express.Router();

// Configure multer to handle FormData
const upload = multer();

// Simple proxy route - handles FormData from client
router.post("/submit", upload.none(), async (req, res) => {
    console.log("Received request:", req.method, req.url);
    console.log("Request body:", req.body);
    console.log("Content-Type:", req.headers["content-type"]);

    try {
        console.log("Proxying request to Google Apps Script...");

        // Check if we have data
        if (!req.body || Object.keys(req.body).length === 0) {
            console.log("No data received in request body");
            return res.status(400).json({ error: "No data received" });
        }

        // Forward the request to Google Apps Script
        const gasUrl =
            process.env.GOOGLE_APPS_SCRIPT_URL ||
            "https://script.google.com/macros/s/AKfycbyakUWSjJBj4raVzYCQ1EAZwML7e6ehk1SeiHvRX_aKXiYJvBTstrqxsOCbiK24gFOd/exec";

        console.log("Sending to GAS URL:", gasUrl);

        const response = await fetch(gasUrl, {
            method: "POST",
            body: req.body,
        });

        // console.log("GAS Response Status:", response.status);
        // console.log("GAS Response OK:", response.ok);

        // // Get the response from Google Apps Script
        const responseData = await response.text();
        // console.log("GAS Response Data:", responseData);

        // // Forward the exact response back to the client
        res.status(response.status).send(responseData);
    } catch (error) {
        console.error("Proxy error:", error);
        res.status(500).json({
            error: "Proxy request failed",
            message: error.message,
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        });
    }
});

// Test route to check if the router is working
router.get("/test", (req, res) => {
    console.log("Test route hit");
    res.json({
        message: "Form proxy router is working!",
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV || "development",
    });
});

export { router as FORMPROXYROUTER };
