const createProperty = (req, res) => {
  console.log(req.body);
  res.send("creating Property");
};

export default createProperty;
