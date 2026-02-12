


const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/users");
const certificateRoutes = require("./routes/certificates");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", certificateRoutes);

app.get("/", (req, res) => {
    res.json({ message: "SkillCertChain Backend Running 🚀" });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
