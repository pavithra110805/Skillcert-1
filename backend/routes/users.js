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

// GET /api/profile/:wallet
router.get("/profile/:wallet", async (req, res) => {
    try {
        const { wallet } = req.params;

        // Check if user exists
        const userResult = await pool.query(
            "SELECT * FROM users WHERE wallet_address = $1",
            [wallet]
        );

        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        // Fetch certificates linked to wallet
        const certsResult = await pool.query(
            "SELECT * FROM certificates WHERE wallet_address = $1 ORDER BY created_at DESC",
            [wallet]
        );

        res.json({
            user: userResult.rows[0],
            certificates: certsResult.rows,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch profile" });
    }
});

module.exports = router;
