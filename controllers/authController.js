import { sendResponse } from "../helpers/Response.js";
import User from "../models/user.schema.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return sendResponse(res, 401, null, "Invalid credentials");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return sendResponse(res, 200, { token }, "Login successfull");
  } catch (error) {
    return sendResponse(res, 500, null, "Server error");
  }
};
