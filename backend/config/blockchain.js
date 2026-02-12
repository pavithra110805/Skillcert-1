const { ethers } = require("ethers");



let contract;

try {
    const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

    // Only initialize if PRIVATE_KEY looks like a private key (starts with 0x and long enough)
    if (process.env.PRIVATE_KEY && process.env.PRIVATE_KEY.startsWith("0x") && process.env.PRIVATE_KEY.length > 60) {
        const wallet = new ethers.Wallet(
            process.env.PRIVATE_KEY,
            provider
        );

        const abi = require("../abi/SkillCert.json").abi;

        contract = new ethers.Contract(
            process.env.CONTRACT_ADDRESS,
            abi,
            wallet
        );
        console.log("Blockchain connected successfully.");
    } else {
        console.warn("⚠️ Blockchain NOT connected: invalid or missing PRIVATE_KEY in .env");
        // Mock contract for development/testing if keys are missing
        contract = {
            issueCertificate: async () => {
                console.log("MOCK: issueCertificate called (Blockchain disabled)");
                return { wait: async () => ({ hash: "0xMOCK_TRANSACTION_HASH" }) };
            }
        };
    }
} catch (error) {
    console.error("Failed to initialize blockchain connection:", error.message);
    contract = {
        issueCertificate: async () => {
            throw new Error("Blockchain connection unavailable");
        }
    };
}

module.exports = contract;
