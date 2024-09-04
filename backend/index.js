const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");
const cookieParser = require("cookie-parser");

// Connecting Database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database is connected");
  } catch (e) {
    console.log("error", e);
  }
};
// Middlewares
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static("images"));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, "images"); // Directory where files will be stored
  },
  filename: (req, file, fn) => {
    fn(null, req.body.img);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  // console.log(req.body)
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Checking if  error during upload
  if (req.fileValidationError) {
    return res.status(400).json({ error: req.fileValidationError });
  }

  //  send a success response if ok
  res.status(200).json({ message: "Image has been uploaded successfully!" });
});
app.listen(process.env.PORT, () => {
  connectDB();
  console.log("App is running on port 5000");
});
