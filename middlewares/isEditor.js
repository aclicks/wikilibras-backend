export async function isEditor(req, res, next) {
  try {
    if (req.currentUser.role !== "EDIT") {
      return res.status(401).json({ msg: "User unauthorized." });
    }

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}
