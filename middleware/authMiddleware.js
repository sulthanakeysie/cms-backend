import pkg from "jsonwebtoken";
import User from "../models/user.schema.js";
import { sendResponse } from "../helpers/Response.js";
const { verify } = pkg;

export default async function (req, res, next) {
  let token = req?.header("Authorization");
  if (!token)
    return sendResponse(res, 401, null, "Unauthorized. Access Denied");
  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    return sendResponse(res, 401, null, "Invalid token");
  }
}
