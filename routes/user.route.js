// import express from "express";
// import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import { singleUpload } from "../middlewares/mutler.js";
 
// const router = express.Router();

// router.route("/register").post(singleUpload,register);
// router.route("/login").post(login);
// router.route("/logout").get(logout);
// router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);

// export default router;
// routes/user.route.js
import express from "express";
const router = express.Router();

// 🔹 Route 1: Test route
router.get("/", (req, res) => {
  res.send("User API is working");
});

// 🔹 Route 2: Register a user
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // For now, just return dummy response (DB logic can be added later)
  res.status(201).json({
    message: "User registered successfully",
    user: { name, email }
  });
});

// 🔹 Route 3: Login a user
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "test@example.com" && password === "123456") {
    res.json({ message: "Login successful", token: "dummy_token_123" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// 🔹 Route 4: Get user by ID
router.get("/profile/:id", (req, res) => {
  const userId = req.params.id;

  res.json({
    id: userId,
    name: "Sample User",
    email: "sample@example.com"
  });
});

export default router;


