"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const { getConnectionMongo } = require("../dbs/index");
const secret = "secret";

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
  };
  passport.use(
    new JwtStrategy(opts, async function(jwt_payload, callback) {
      const { connection, client } = await getConnectionMongo();

      // db.findUser(
      //   { username: jwt_payload.username },
      //   function(res) {
      //     var user = res;
      //     delete user.password;
      //     callback(null, user);
      //   },
      //   function(err) {
      //     return callback(err, false);
      //   }
      // );

      connection
        .collection("owner")
        .findOne({ name: jwt_payload.name }, (err, res) => {
          if (res) {
            var user = res;
            delete user.Password;
            callback(null, user);
          } else {
            callback(err, false);
          }
        });
    })
  );
};
