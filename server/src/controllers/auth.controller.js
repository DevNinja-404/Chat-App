import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (err) {
    throw new Error(err);
  }
};

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) throw new Error("User Credentials are required");

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    const user = await User.create({ email, password });

    const createdUser = await User.findById(user?._id).select(
      "-password -refreshToken"
    );

    if (!createdUser)
      throw new Error("Something went wrong while creating the user");

    res
      .status(201)
      .json({ message: "User Registered Successfully", data: createdUser });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new Error("Email and password are required ");

    const user = await User.findOne({ email });
    if (!user) throw new Error("User Not Found");

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) throw new Error("Email and Password didn't match");

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ message: "Logged In Successfully", data: loggedInUser });
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    return await res
      .status(200)
      .json({ message: "Got the current user", data: req.user });
  } catch (err) {
    next(err);
  }
};

export const userController = { register, login, getCurrentUser };
