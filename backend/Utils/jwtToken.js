import jwt from "jsonwebtoken";

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const sendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expire: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  user.password = undefined;
  res.status(statusCode).cookie("token", token, cookieOptions).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
