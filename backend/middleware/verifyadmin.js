import jwt from "jsonwebtoken";

const verifyAdmin = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decodeToken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(403).json({
        success: false,
        message: "Invalid token or admin credentials",
      });
    }

    // next is a callback function executes when token has matching credentials with env
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default verifyAdmin;
