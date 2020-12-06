const jwt = require("jsonwebtoken");
//import jwt from 'jsonwebtoken';

const generateToken = (id, username) => {
  const expiration = process.env.DB_ENV === "development" ? 100 : 604800000;
  const token = jwt.sign({ id, username }, process.env.SECRET, {
    expiresIn: process.env.DB_ENV === "development" ? "1d" : "7d",
  });
  return { token, expiration };
};
module.exports = generateToken;

// generateToken.js file
