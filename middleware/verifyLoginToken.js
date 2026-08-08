const jwt = require("jsonwebtoken");
const verifyLoginToken = (req, res , next) => {
  const token = req.cookies.Token;
  if (!token) {
   return  res.status(404).json({
      message: "Token Expired LoginIn again",
    });
  }
  try {
    const validateToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user=validateToken;
    next();
  } catch (error) {
    res.status(401).json({
      message: "failed to verify token ",
      error: error.message,
    });
  }
};
module.exports=verifyLoginToken;