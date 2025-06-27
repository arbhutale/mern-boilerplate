import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import "./config/passport.js";
import routes  from "./routes/index.js";
dotenv.config();
const app = express();
// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api", routes );

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(5000,'0.0.0.0', () => console.log("🚀 Backend running on http://localhost:5000"));
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));
