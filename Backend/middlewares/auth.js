import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.json({
        message: "Login Please",
      });
    }

    const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    if (!decode) {
      return res.json({
        message: "Unauthorized Access",
        error: true,
        success: false,
      });
    }

    req.userId = decode.id;

    next();
  } catch (error) {
    return res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export default auth;
