const jwt = require("jsonwebtoken");

const genToken = (res, userID) => {
  const token = jwt.sign({ id: userID }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};

module.exports = genToken;
