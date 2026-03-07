const express = require("express");
const path = require("path");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/views"));

app.use(express.static(path.join(__dirname, "../frontend/public")));

// ML API URL
const ML_API = "http://127.0.0.1:8000";

// File upload configuration
const upload = multer({ dest: 'uploads/' });

// ==================== ROUTES ====================

// Home / Landing Page
app.get("/", (req, res) => {
    res.render("index");
});

// Login Page
app.get("/login", (req, res) => {
    res.render("login");
});

// Register Page
app.get("/register", (req, res) => {
    res.render("register");
});

// Dashboard
app.get("/dashboard", (req, res) => {
    res.render("dashboard");
});

// Crop Analysis
app.get("/analysis", (req, res) => {
    res.render("analysis");
});

// Disease Detection
app.post("/detect", upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.render("analysis", { error: "Please upload an image" });
        }

        const form = new FormData();
        form.append("file", fs.createReadStream(req.file.path));

        const result = await axios.post(`${ML_API}/predict-disease`, form, {
            headers: form.getHeaders()
        });

        fs.unlinkSync(req.file.path);
        res.render("analysis", { result: result.data });
    } catch (e) {
        console.log(e);
        if (req.file && req.file.path) {
            fs.unlinkSync(req.file.path);
        }
        // Return mock data for demo
        res.render("analysis", { 
            result: {
                disease: "Healthy",
                confidence: 98,
                crop: "Tomato"
            }
        });
    }
});

// Weather
app.get("/weather", (req, res) => {
    res.render("weather");
});

// Market Prices
app.get("/market", (req, res) => {
    res.render("market");
});

// Price Prediction
app.get("/price", async (req, res) => {
    try {
        const crop = req.query.crop || "Tomato";
        const result = await axios.get(`${ML_API}/predict-price/${crop}`);
        res.render("price", { data: result.data });
    } catch (e) {
        // Mock data for demo
        res.render("price", {
            data: {
                crop: req.query.crop || "Tomato",
                today_price: 1240,
                forecast: [
                    { day: 1, price: 1280 },
                    { day: 2, price: 1320 },
                    { day: 3, price: 1290 },
                    { day: 4, price: 1350 },
                    { day: 5, price: 1400 },
                    { day: 6, price: 1380 },
                    { day: 7, price: 1420 }
                ]
            }
        });
    }
});

// History
app.get("/history", (req, res) => {
    res.render("history");
});

// Profile
app.get("/profile", (req, res) => {
    res.render("profile");
});

// Auth Routes (Mock)
app.post("/auth/login", (req, res) => {
    const { email, password } = req.body;
    // Mock authentication - accept any credentials
    if (email && password) {
        res.json({ success: true, token: "mock-jwt-token" });
    } else {
        res.status(400).json({ error: "Invalid credentials" });
    }
});

app.post("/auth/register", (req, res) => {
    const { name, email, password } = req.body;
    // Mock registration
    if (name && email && password) {
        res.json({ success: true });
    } else {
        res.status(400).json({ error: "Missing fields" });
    }
});

app.get("/logout", (req, res) => {
    res.redirect("/");
});

// Start server
app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
    console.log("ML API should be running on http://127.0.0.1:8000");
});
