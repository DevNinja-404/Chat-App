import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req?.header("Authorization")?.replace("Bearer", "");

    if (!token) throw new Error("Authorization Failed");

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // I have to add here token expiry check so that i can throw the expiry error message

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );
    if (!user) throw new Error("Invalid Access Token");
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
