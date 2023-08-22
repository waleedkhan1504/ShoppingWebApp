import { comparePassword, hashPassword } from "../helper/authHelper.js";
import User from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.json({
        message: "user with the email already exist please login",
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();

    if (user) {
      res.status(200).send({
        message: "user registered successfully",
        user: {
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
        },
      });
    }
  } catch (error) {
    res.status(422).send({
      success: false,
      message: "user registered failed",
      error,
    });
  }
};

//login Controller

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).send({
        success: false,
        message: "please fill all fields",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(422).send({
        success: false,
        message: "Email not registered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(422).send({ message: "invalid creds" });
    }
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "user login successfully",

      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(422).send({
      success: false,
      message: "user registered failed",
      error,
    });
  }
};

export const profileController = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.send({
        name: user.name,
        email: user.email,
        admin: user.isAdmin,
      });
    }
  } catch (error) {
    res.status(422).send({
      success: false,
      message: "user profile  failed",
      error,
    });
  }
};
export const UpdateProfileController = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findById(req.user._id);
  const hashedPassword = password ? await hashPassword(password) : undefined;
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: name || user.name,
      password: hashedPassword || user.password,
      email: email || user.email,
    },
    { new: true }
  );
  res.status(200).send({
    success: true,
    message: "Profile Updated SUccessfully",
    updatedUser,
  });
};
