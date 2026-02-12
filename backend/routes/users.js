const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const generateQR = require("../services/qrService");



// POST /api/register

router.post("/register", async (req, res) => {
    try {
        const { walletAddress } = req.body;

        if (!walletAddress) {
            return res.status(400).json({ error: "Wallet address required" });
        }

        // Check if user already exists
        const existingUser = await pool.query(
            "SELECT * FROM users WHERE wallet_address = $1",
            [walletAddress]
        );

        if (existingUser.rows.length > 0) {
            return res.json({
                message: "User already registered",
                user: existingUser.rows[0],
            });
        }

        // Generate QR
        const qrCode = await generateQR(walletAddress);

        // Insert into DB
        const newUser = await pool.query(
            "INSERT INTO users (wallet_address, qr_code) VALUES ($1, $2) RETURNING *",
            [walletAddress, qrCode]
        );

        res.status(201).json({
            message: "User registered successfully",
            user: newUser.rows[0],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
