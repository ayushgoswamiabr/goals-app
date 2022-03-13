const express = require("express");
const router = express.Router();
const {
  getgoals,
  setgoal,
  updategoal,
  deletegoals,
} = require("../controllers/goalcontroller");
const { protect } = require("../middleware/authMiddleware");
// router.get("/", getgoals);

// router.post("/", setgoal);
router.route("/").post(protect, setgoal).get(protect, getgoals);

// router.put("/:id", updategoal);

// router.delete("/:id", deletegoals);

router.route("/:id").put(protect, updategoal).delete(protect, deletegoals);

module.exports = router;
