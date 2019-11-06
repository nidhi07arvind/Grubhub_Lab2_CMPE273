"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const { getConnectionMongo } = require("../dbs/index");
const secret = "secret";

module.exports = function(passport) {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"), //ExtractJwt.fromAuthHeaderAsBearerToken(), //req => req.cookie("owner"), //ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
  };
  passport.use(
    new JwtStrategy(opts, async function(jwt_payload, callback) {
      const { connection, client } = await getConnectionMongo();

      connection
        .collection("owner")
        .findOne({ name: jwt_payload.cookie }, (err, res) => {
          if (res) {
            var user = res;
            console.log("user found passport auth", user);
            delete user.Password;
            callback(null, user);
          } else {
            callback(err, false);
          }
        });
    })
  );
};
