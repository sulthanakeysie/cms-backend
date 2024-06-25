import pkg from 'jsonwebtoken';
const { verify } = pkg;

export default function (req, res, next) {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ message: "Unauthorized. Access Denied" });

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}
