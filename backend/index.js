const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/collegeDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// WebSocket Connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("chatMessage", async (message) => {
    console.log("User message:", message);

    // Example: Fetching college info dynamically
    const collegeInfo = await fetchCollegeInfo(message);

    socket.emit("botResponse", { response: collegeInfo || "I don't know that yet!" });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// REST API for fetching data from MongoDB
app.get("/college-info/:query", async (req, res) => {
  const query = req.params.query;
  const data = await fetchCollegeInfo(query);
  res.json({ response: data || "No information found!" });
});

const fetchCollegeInfo = async (query) => {
  return "Example College Info Response";
};

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
