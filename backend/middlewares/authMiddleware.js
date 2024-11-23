import jwt from "jsonwebtoken";
import User from "../models/userModels.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract and verify token
      token = req.headers.authorization.split(" ")[1];
      console.log("Received Token:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded);

      // Attach user to the request
      req.user = await User.findById(decoded.userId).select("-password");
      console.log("Authenticated User:", req.user);

      next();
    } catch (error) {
      console.error("Token verification failed:", error.message);
      return res.status(401).json({ message: "Token is invalid or expired." });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Authorization token missing." });
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as an admin." });
  }
};

export { authenticate, authorizeAdmin };
