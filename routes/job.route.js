// import express from "express";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

// const router = express.Router();

// router.route("/post").post(isAuthenticated, postJob);
// router.route("/get").get(isAuthenticated, getAllJobs);
// router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
// router.route("/get/:id").get(isAuthenticated, getJobById);

// export default router;
import express from "express";
import { Job } from "../models/job.model.js"; // make sure this exists

const router = express.Router();

// ✅ GET /api/v1/job
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ postedAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching jobs" });
  }
});

// ✅ POST /api/v1/job
router.post("/", async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({ message: "Job added successfully", job });
  } catch (err) {
    res.status(500).json({ message: "Failed to add job", error: err.message });
  }
});

export default router;
