const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");
const e = require("express");

async function authentication(req, res, next) {
  try {
    let access_token = req.headers.access_token;
    if (access_token !== "undefined" && access_token) {
      let getData = verifyToken(access_token);
      let foundUser = await User.findOne({
        where: {
          email: getData.email,
        },
      });
      if (foundUser) {
        req.userData = getData;
        next();
      } else {
        throw 401;
      }
    } else {
      throw 401;
    }
  } catch (err) {
    if (err === 401) {
      next({ status: 401, message: "Please login first" });
    } else console.log(err);
  }
}

module.exports = authentication;
