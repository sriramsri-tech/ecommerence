const mongoose = require("mongoose");
const app = require("./app");
const path = require("path");
const connectionDatabase = require("./config/database");

const multer = require("multer");

connectionDatabase();

const PORT = process.env.PORT || 8000; // Use the environment variable or default to 8000

const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to unhandled rejection");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to uncaught exception");
  server.close(() => {
    process.exit(1);
  });
});
