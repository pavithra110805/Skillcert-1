const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const uploadToIPFS = require("../services/ipfsService");
const contract = require("../config/blockchain");

// POST /api/certificates/issue
router.post("/certificates/issue", async (req, res) => {
    try {
        const { walletAddress, issuerName, courseName } = req.body;

        if (!walletAddress || !issuerName || !courseName) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // 1️⃣ Create metadata
        const metadata = {
            student: walletAddress,
            issuer: issuerName,
            course: courseName,
            issuedAt: new Date().toISOString(),
        };

        // 2️⃣ Upload to IPFS
        const cid = await uploadToIPFS(metadata);

        // 3️⃣ Call Smart Contract
        const tx = await contract.issueCertificate(walletAddress, cid);
        const receipt = await tx.wait();

        // 4️⃣ Save to Database
        const result = await pool.query(
            `INSERT INTO certificates 
       (wallet_address, issuer, cid, tx_hash, status) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
            [walletAddress, issuerName, cid, receipt.hash, "valid"]
        );

        res.status(201).json({
            message: "Certificate issued successfully",
            certificate: result.rows[0],
            blockchainTx: receipt.hash,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Certificate issuance failed" });
    }
});

module.exports = router;
