
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/leaves", require("./routes/leaveRoutes"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

const PORT = 3000;

async function startServer() {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

startServer();