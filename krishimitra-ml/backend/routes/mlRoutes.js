const express = require("express")
const axios = require("axios")
const fs = require("fs")
const FormData = require("form-data")
const multer = require("multer")

const router = express.Router()

const ML_API = "http://127.0.0.1:8000"

const upload = multer({ dest: 'uploads/' })

// Landing page
router.get("/", (req, res) => {
    res.render("index")
})

// Auth routes
router.get("/login", (req, res) => {
    res.render("login")
})

router.get("/register", (req, res) => {
    res.render("register")
})

// Dashboard
router.get("/dashboard", (req, res) => {
    res.render("dashboard")
})

// Crop Analysis
router.get("/analysis", (req, res) => {
    res.render("analysis")
})

router.post("/detect", upload.single('image'), async (req, res) => {
    try {
        const form = new FormData()
        form.append(
            "file",
            fs.createReadStream(req.file.path)
        )

        const result = await axios.post(
            `${ML_API}/predict-disease`,
            form,
            { headers: form.getHeaders() }
        )

        fs.unlinkSync(req.file.path)

        res.render("disease", { data: result.data })
    } catch (e) {
        console.log(e)
        if (req.file && req.file.path) {
            fs.unlinkSync(req.file.path)
        }
        res.send("Prediction error")
    }
})

// Weather
router.get("/weather", (req, res) => {
    res.render("weather")
})

// Market
router.get("/market", (req, res) => {
    res.render("market")
})

router.get("/price", async (req, res) => {
    const crop = req.query.crop

    try {
        const result = await axios.get(
            `${ML_API}/predict-price/${crop}`
        )
        res.render("price", { data: result.data })
    } catch (e) {
        // Mock response if ML API is not available
        res.render("price", {
            data: {
                crop: crop,
                today_price: 1200,
                forecast: [
                    { day: 1, price: 1150 },
                    { day: 2, price: 1180 },
                    { day: 3, price: 1220 },
                    { day: 4, price: 1250 },
                    { day: 5, price: 1280 },
                    { day: 6, price: 1300 },
                    { day: 7, price: 1320 }
                ]
            }
        })
    }
})

// History
router.get("/history", (req, res) => {
    res.render("history")
})

// Profile
router.get("/profile", (req, res) => {
    res.render("profile")
})

module.exports = router

