import pkg from "jsonwebtoken";
import User from "../models/user.schema.js";
const { verify } = pkg;

export default async function (req, res, next) {
  let token = req?.header("Authorization");
  if (!token)
    return res.status(401).json({ message: "Unauthorized. Access Denied" });

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}
