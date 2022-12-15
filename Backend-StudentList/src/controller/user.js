const userModel = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

module.exports = {
  createUser: async (req, res) => {
    try {
      let { email, password } = req.body;
      let uniqEmail = await userModel.findOne({ email });
      if (uniqEmail)
        return res
          .status(400)
          .send({ status: false, msg: "Email already registered." });

      let saltRound = 10;
      req.body.password = await bcrypt.hash(password, saltRound);
      let createUser = await userModel.create(req.body);
      res.status(201).send({ status: true, data: createUser });
    } catch (e) {
      res.status(500).send({ status: false, msg: e.message });
    }
  },

  login: async (req, res) => {
    try {
      let { email, password } = req.body;
      let loginUser = await userModel.findOne({email});
      if (!loginUser) {
        return res
          .status(400)
          .send({
            status: false,
            message: "This Email is not registered.",
          });
      }
      let passwordMatch = bcrypt.compareSync(password, loginUser.password);
      if (!passwordMatch) {
        return res
          .status(400)
          .send({
            status: false,
            message: "Invalid Credentials.",
          });
      }
      let token = jwt.sign({ userId: loginUser._id }, "This-is-a-secret-key", {
        expiresIn: "2d",
      });
      res.status(200).send({ status: true, token: token });
    } catch (e) {
      res.status(500).send({ status: false, msg: e.message });
    }
  },
};
