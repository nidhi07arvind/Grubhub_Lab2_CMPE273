const { getConnectionMongo } = require("../dbs/index");
var bcrypt = require("bcrypt");

async function handle_request(message, callback) {
  console.log("Inside Kafka Backend login");
  console.log("Message: ", message);

  const { connection, client } = await getConnectionMongo();

  connection
    .collection("owner")
    .findOne({ email: message.Email }, function(err, result) {
      if (err) {
        console.log("Invalid Credentials!!", err);
        callback(err, null);
      } else {
        if (result) {
          console.log("User Details", result);
          console.log("got result");

          if (!bcrypt.compareSync(message.Password, result.password)) {
            console.log("Invalid Password!");
            callback(null, null);
          } else {
            console.log("result", result);
            console.log("not invalid password");
            callback(null, result);
          }
        } else {
          callback(null, null);
        }
      }
    });
}

//message.session.user = result;

//   res.cookie("cookie", result.name, {
//     maxAge: 360000,
//     httpOnly: false,
//     path: "/"
//   });
//   res.cookie("buyer", 1, {
//     maxAge: 360000,
//     httpOnly: false,
//     path: "/"
//   });
//message.session.user = result;

// var token = jwt.sign(result, secret, {
//   expiresIn: 10080
// });

// res.writeHead(200, {
//   "Content-type": "text/plain"
// });

// var Result = {
//   name: result.name,
//   accounttype: result.accounttype,
//   Token: token
// };

//         }
//       }
//     });
//   client.close();
// }

exports.handle_request = handle_request;
