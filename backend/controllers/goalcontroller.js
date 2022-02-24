const asyncHandler = require("express-async-handler");
const Goal = require("../model/goalModel");
//@desc Get goals
//@route GET /api/goals
//@access Private
const getgoals = asyncHandler(async (req, res) => {
  const goal = await Goal.find();
  res.status(200).json(goal);
});

//@desc Set goal
//@route POST /api/goals
//@access Private
const setgoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Text is required");
  }
  const goal = await Goal.create({
    text: req.body.text,
  });
  res.status(200).json(goal);
});

//@desc Update goal
//@route PUT /api/goals/:id
//@access Private
const updategoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal now found");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

//@desc Delete goal
//@route DELETE /api/goals/:id
//@access Private
const deletegoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal Does not exists");
  }
  await Goal.findByIdAndRemove(req.params.id);
  res.status(200).json({ id: req.params.id });
});
module.exports = {
  getgoals,
  setgoal,
  updategoal,
  deletegoals,
};
