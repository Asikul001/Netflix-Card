const router = require("express").Router();
const auth = require("../middleware/auth");
const Movie = require("../models/Movie");
const User = require("../models/User");

router.get("/", auth, async (req, res) => {
  const { search } = req.query;
  const filter = search ? { title: { $regex: search, $options: "i" } } : {};
  const movies = await Movie.find(filter);
  res.json(movies);
});

router.get("/mylist", auth, async (req, res) => {
  const user = await User.findById(req.userId).populate("myList");
  res.json(user.myList);
});

router.post("/:id/list", auth, async (req, res) => {
  const user = await User.findById(req.userId);
  const id = req.params.id;
  const exists = user.myList.some((m) => m.toString() === id);

  if (exists) user.myList.pull(id);
  else user.myList.push(id);

  await user.save();
  res.json({ myList: user.myList, added: !exists });
});

module.exports = router;
