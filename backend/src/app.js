const express = require("express");
const cors = require("cors");

const app = express();

// Browsers block cross-origin requests unless backend explicitly allows it via:
app.use(cors());
// since backend is running on port 3000 and frontend on port 5173, we need to allow CORS requests from frontend

// middleware to parse JSON request bodies
app.use(express.json());

// routes
const annotationRoutes = require("./routes/annotationRoutes");
const contentRoutes = require("./routes/contentRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api", annotationRoutes);
app.use("/api", contentRoutes);
app.use("/api", authRoutes);

// test root
app.get("/", (req, res) => {
  res.send("Product API running");
});

// run the express app and opens a server on port 3000
    // run node app.js in src directory to start the server
    // API is live at http://localhost:3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
