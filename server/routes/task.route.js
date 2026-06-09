const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();
router.use(authMiddleware);

const {
  getTasks,
  createTask,
  updateTask,
  updateStatus,
  deleteTask,
} = require("../controllers/task.controller");

router.get("/", getTasks);
router.post("/", createTask);
router.delete("/:id", deleteTask);
router.put("/:id", updateTask);
router.patch("/:id/status", updateStatus);

module.exports = router;
