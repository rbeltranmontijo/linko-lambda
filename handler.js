const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const app = express();
const { dbConnection } = require("./src/config/database");
dbConnection().then();
const pkg = require("./package.json");
app.set("pkg", pkg);

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(cors());

// Health endpoint
app.get("/health", (req, res, next) => {
  return res.status(200).json({
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").version,
  });
});

//Routes
const authRoutes = require("./src/routes/auth.route").default;
const usersRoutes = require("./src/routes/users.route").default;

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", usersRoutes);

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
