const { create } = require("ipfs-http-client");

const client = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
});

async function uploadToIPFS(data) {
    const result = await client.add(JSON.stringify(data));
    return result.path; // CID
}

module.exports = uploadToIPFS;
