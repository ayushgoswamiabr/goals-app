const express = require("express");
const router = express.Router();
const {
  getgoals,
  setgoal,
  updategoal,
  deletegoals,
} = require("../controllers/goalcontroller");
// router.get("/", getgoals);

// router.post("/", setgoal);
router.route("/").post(setgoal).get(getgoals);

// router.put("/:id", updategoal);

// router.delete("/:id", deletegoals);

router.route("/:id").put(updategoal).delete(deletegoals);

module.exports = router;
