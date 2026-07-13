const User = require("../modals/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class usercontroller {
  constructor() {}

  async Signup(req, res) {
    try {
          console.log("BODY =", req.body);
      const { fullname, email, password, contact ,role} = req.body;
      if (!fullname || !email || !password || !contact) {
        return res.status(400).json({ message: "all fields are required" });
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "password must contain more than 5 characters" });
      }
      if (!email.includes("@") || !email.includes(".")) {
        return res.status(400).json({ message: "invalid email format" });
      }
      const existinguser = await User.findOne({ email });
      if (existinguser) {
        return res.status(400).json({ message: "user already exists" });
      }

      const hashedpassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        fullname,
        email,
        password: hashedpassword,
        contact,
        role
      });

      await newUser.save();

      const key = process.env.JWT_SECRET_KEY;

      const payload = {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
      };

      const options = {
        expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
      };

      const token = jwt.sign(payload, key, options);
      res.header(process.env.JWT_TOKEN_HEADER, token);

      return res.status(201).json({
        message: "user regestered successfully!!",
        token: token,
        user: newUser,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  }

  async Login(req, res) {
  try {
    const { email, password } = req.body;

    const currentuser = await User.findOne({ email });

    if (!currentuser) {
      return res.status(400).json({ message: "Invalid email & password" });
    }

    const isMatch = await bcrypt.compare(password, currentuser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email & password" });
    }

    const payload = {
      _id: currentuser._id,
      fullname: currentuser.fullname,
      email: currentuser.email,
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: Number(process.env.JWT_TOKEN_EXPIRES_IN),
      }
    );

    res.header(process.env.JWT_TOKEN_HEADER, token);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: currentuser,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}

  async GetById(req, res) {
    try {
      const id = req.params.id;
      const found = await User.findById(id);
      if (!found) {
        return res.status(404).json({ message: "not found" });
      }
      return res.status(200).json(found);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  async Update(req, res) {
    try {
      const id = req.params.id;
      const update = await User.findByIdAndUpdate(id, req.body, { new: true });
      if (!update) {
        return res.status(400).json({ message: "not found" });
      }
      return res.status(200).json(update);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  }

  async Delete(req, res) {
    try {
      const id = req.params.id;
      const deleted = await User.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(400).json({ message: "not found" });
      }
      return res.status(200).json(deleted);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new usercontroller();
