export const getUser = async (req, res) => {
  res.json({ user: req.user });
};
