const QRCode = require("qrcode");

async function generateQR(walletAddress) {
    const url = `http://localhost:3000/profile/${walletAddress}`;
    return await QRCode.toDataURL(url);
}

module.exports = generateQR;
