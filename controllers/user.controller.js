const createUser = (req, res) => {
  console.log(req.body);
  res.send("creating User");
};

export default createUser;
