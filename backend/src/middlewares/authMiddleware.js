import jwt from "jsonwebtoken";
import jsonResponse from "../helpers/jsonResponse";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err)
        return jsonResponse(
          res,
          401,
          "Access Token expired",
          "AccessTokenExpiredException"
        );
      req.user = decoded;
      return next();
    });
  } catch (error) {
    return jsonResponse(res, 500, "Something went wrong, please try again");
  }
};
export default authMiddleware;
