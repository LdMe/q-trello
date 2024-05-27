import jwt from "jsonwebtoken";
import userController from "../controllers/users/userController.js";

const verifyToken = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ error: "no hay token jwt" });
  }

  try {
    const token = authorization.includes("Bearer")? authorization.split("Bearer ")[1] : authorization;
    console.log("token", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userController.getById(decoded._id);
    if (!user) {
      return res.status(400).json({ error: "No existe el usuario" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "ha habido un error" });
  }
};

const isAuthenticated = async (req, res, next) => {
  await verifyToken(req, res, next);
};

const isAdmin = async (req, res, next) => {
  await verifyToken(req, res, next);
  if (req.user.role !== "admin") {
    return res.status(401).json({ error: "No estás autorizado" });
  }
  next();
};

export { isAuthenticated, isAdmin };