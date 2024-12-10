import jwt from "jsonwebtoken";

const verifyUser = (req, res, next) => {
  try {
    // getting token from headers
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // to verify token sent
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // The decoded token typically contains a payload with user-related information (e.g., id when created this token
    req.body.userId = decodeToken.id;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "error.message",
    });
  }
};

export default verifyUser;
