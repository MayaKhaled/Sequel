const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const List = require("../models/wishlistModel");

require("dotenv").config();
const signup = async (req, res) => {
  try {
    const email = req.body.email;
    const user = req.body;
    const data = await User.findOne({
      email: email,
    });

    if (data) {
      return res
        .json({
          statusCode: 1,
          error: "invalid email",
        })
        .end();
    } else {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      const data = {
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        password: user.password,
      };
      const newUser = await User.create(data);
      const userlist = await List.create({
        user: newUser._id,
        list: [],
      });
      return res
        .json({
          statusCode: 0,
          message: "Signed Up",
        })
        .end();
    }
  } catch (exception) {
    console.log(exception, "excep");
    return res.json({
      statusCode: 1,
      error: "Server Error",
    });
  }
};
const signin = async (req, res) => {
  const email = req.body.Email;
  const password = req.body.Password;
  try {
    const data = await User.findOne({ email: email });
    if (data) {
      const validPassword = await bcrypt.compare(password, data.password);
      if (validPassword) {
        const token = jwt.sign(
          {
            id: data._id,
            email: data.email,
            password: data.password,
          },
          "" + process.env.SECRET,
          {
            expiresIn: "5h",
          }
        );
        res.set("auth", token);
        return res.json({
          statusCode: 0,
          message: "Success",
          data: data,
          token,
        });
      } else {
        return res.status(401).send("Incorrect password").end();
      }
    } else {
      return res.status(401).send("Invalid E-mail").end();
    }
  } catch (exception) {
    return res.status(500).send("Server error").end();
  }
};

const addMovie = async (req, res) => {
  let list = await List.findOne({ user: req.payload.id });
  let newlist = list.list;
  newlist.push(req.body.movie);
  List.findOneAndUpdate(
    { user: req.payload.id },
    {
      $set: {
        user: req.payload.id,
        list: newlist,
      },
    }
  ).exec((error, list) => {
    if (error)
      return res.json({
        statusCode: 1,
        error: "Error",
      });
    if (list) {
      return res.json({
        statusCode: 0,
        message: "Movie added to favorites",
        data: req.body.movie,
      });
    }
  });
};

const removeMovie = async (req, res) => {
  let list = await List.findOne({ user: req.payload.id });
  let oldlist = list.list;
  let newlist = [];
  for (let j = 0; j < oldlist.length; j++) {
    if (oldlist[j].title !== req.body.title) {
      newlist.push(oldlist[j]);
    }
  }
  List.findOneAndUpdate(
    { user: req.payload.id },
    {
      $set: {
        user: req.payload.id,
        list: newlist,
      },
    }
  ).exec((error, list) => {
    if (error)
      return res.json({
        statusCode: 1,
        error: "Error",
      });
    if (list) {
      return res.json({
        statusCode: 0,
        message: "Movie removed from favorites",
      });
    }
  });
};

const getList = (req, res) => {
  List.findOne({ user: req.payload.id }).exec((error, list) => {
    if (error)
      return res.json({
        statusCode: 1,
        error: "Error",
      });
    if (list) {
      return res.json({
        statusCode: 0,
        message: "List Retrieved",
        data: list.list,
      });
    }
  });
};

module.exports = { signin, signup, addMovie, removeMovie, getList };
