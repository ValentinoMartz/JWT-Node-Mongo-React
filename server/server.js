const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/connectDB");

const app = express();
const PORT = process.env.PORT || 5000;

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(cors());

//defining routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
