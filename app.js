
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors({
    origin: [
        "https://kanishghaa24.github.io",
        "http://localhost:3000",
        "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Static frontend files
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api/leaves", require("./routes/leaveRoutes"));

// Home route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Leave Management Backend is running"
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// Server
const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
}

startServer();
