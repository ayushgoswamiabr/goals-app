const asyncHandler = require("express-async-handler");
const Goal = require("../model/goalModel");
const User = require("../model/UserModel");
//@desc Get goals
//@route GET /api/goals
//@access Private
const getgoals = asyncHandler(async (req, res) => {
  const goal = await Goal.find({ user: req.user.id });
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
    user: req.user.id,
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
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  //Make sure the logged in user matched the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorised");
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
  //Check for User
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  //Make sure the logged in user matched the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorised");
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
