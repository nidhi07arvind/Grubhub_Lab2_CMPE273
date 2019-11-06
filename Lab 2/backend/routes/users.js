const express = require("express");
const app = express.Router();

var MongoClient = require("mongodb").MongoClient;
var bcrypt = require("bcrypt");

var kafka = require("../kafka/client");

var passport = require("passport");
var jwt = require("jsonwebtoken");
var requireAuth = passport.authenticate("jwt", { session: false });
const secret = "secret";

//var cfg = require("./config.js");

const uri =
  "mongodb+srv://admin:admin@lab0-stjgi.mongodb.net/test?retryWrites=true&w=majority";

app.post("/login", function(req, res) {
  console.log("Inside login POST");
  console.log("Request Body: ", req.body);

  if (req.body.Profile === "Owner") {
    kafka.make_request("login", req.body, function(err, result) {
      console.log("in results login");
      console.log("results", result);
      if (err) {
        console.log("Invalid Credentials!!");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Invalid Credentials!!");
      } else {
        console.log("inside results login");
        console.log(result);

        if (result) {
          console.log(result);
          req.session.user = result;

          var token = jwt.sign(result, secret, {
            expiresIn: 10080
          });

          res.cookie("cookie", result.name, {
            maxAge: 360000,
            httpOnly: false,
            path: "/"
          });

          res.cookie("owner", 2, {
            maxAge: 360000,
            httpOnly: false,
            path: "/"
          });

          //localStorage.setItem("local storage", result);

          var Result = {
            name: result.name,
            accounttype: result.accounttype,
            Token: token
          };
          res.status(200).send(JSON.stringify(Result));
          //res.status(200).json({ success: true, token: "JWT" + token });
          console.log("Result", Result);
        } else {
          res.writeHead(401, {
            "Content-Type": "text/plain"
          });
          console.log("Invalid Credentials");
          res.end("Invalid Credentials");
        }
      }
    });
  } else if (req.body.Profile === "Buyer") {
    kafka.make_request("login", req.body, function(err, result) {
      console.log("in results login");
      console.log("results", result);
      if (err) {
        console.log("Invalid Credentials!!");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Invalid Credentials!!");
      } else {
        console.log("inside results login");
        console.log(result);
        console.log("-------------------");
        if (result) {
          console.log(result);
          req.session.user = result;
          console.log("############");

          var token = jwt.sign(result, secret, {
            expiresIn: 10080
          });

          res.cookie("cookie", result.name, {
            maxAge: 360000,
            httpOnly: false,
            path: "/"
          });

          res.cookie("buyer", 1, {
            maxAge: 360000,
            httpOnly: false,
            path: "/"
          });

          var Result = {
            name: result.name,
            accounttype: result.accounttype,
            Token: token
          };
          res.status(200).send(JSON.stringify(Result));
          console.log("Result", Result);
        } else {
          res.writeHead(401, {
            "Content-Type": "text/plain"
          });
          console.log("Invalid Credentials");
          res.end("Invalid Credentials");
        }
      }
    });
  }
});
//////////////////////////////////do not use///////////////////
/*var collection = client.db("grubhub").collection("buyer");
    var query = { email: req.body.Email };

    collection.findOne(query, function(err, result) {
      if (err) {
        console.log("Invalid Credentials!!");
      }
      if (result) {
        console.log("User Details", result);

        if (!bcrypt.compareSync(req.body.Password, result.password)) {
          console.log("Invalid Password!");
        } else {
          console.log(result);

          req.session.user = result;

          var token = jwt.sign(result, secret, {
            expiresIn: 10080
          });

          res.writeHead(200, {
            "Content-type": "text/plain"
          });

          var Result = {
            name: result.name,
            accounttype: result.accounttype,
            Token: token
          };

          // res.cookie("cookie", result.name, {
          //   maxAge: 360000,
          //   httpOnly: false,
          //   path: "/"
          // });
          // res.cookie("buyer", 1, {
          //   maxAge: 360000,
          //   httpOnly: false,
          //   path: "/"
          // });
          // req.session.user = result;

          console.log("Login successful!");
          res.end("Login successful!");
        }
      }
    });
    client.close();
  }
});*/

/*app.post("/login", function(req, res) {
  console.log("Inside login POST");
  console.log("Request Body: ", req.body);
  //Query
  if (req.body.Profile === "Buyer") {
    MongoClient.connect(uri, { useUnifiedTopology: true }, function(
      err,
      client
    ) {
      if (err) {
        console.log(
          "Error occurred while connecting to MongoDB Atlas...\n",
          err
        );
      } else {
        console.log("Connected to DB Success");

        var collection = client.db("grubhub").collection("buyer");
        var query = { email: req.body.Email };

        collection.findOne(query, function(err, result) {
          if (err) {
            console.log("Invalid Credentials!!");
          }
          if (result) {
            console.log("User Details", result);

            if (!bcrypt.compareSync(req.body.Password, result.password)) {
              console.log("Invalid Password!");
            } else {
              console.log(result);

              res.cookie("cookie", result.name, {
                maxAge: 360000,
                httpOnly: false,
                path: "/"
              });
              res.cookie("buyer", 1, {
                maxAge: 360000,
                httpOnly: false,
                path: "/"
              });
              req.session.user = result;

              console.log("Login successful!");
              res.end("Login successful!");
            }
          }
        });
        client.close();
      }
    });
  } else {
    MongoClient.connect(uri, { useUnifiedTopology: true }, function(
      err,
      client
    ) {
      if (err) {
        console.log(
          "Error occurred while connecting to MongoDB Atlas...\n",
          err
        );
      } else {
        console.log("Connected to DB Success");

        var collection = client.db("grubhub").collection("owner");
        var query = { email: req.body.Email };

        collection.findOne(query, function(err, result) {
          if (err) {
            console.log("Invalid Credentials!!");
          }
          if (result) {
            console.log("User Details", result);

            if (!bcrypt.compareSync(req.body.Password, result.password)) {
              console.log("Invalid Password!");
            } else {
              console.log(result);
              res.cookie("cookie", result.name, {
                maxAge: 360000,
                httpOnly: false,
                path: "/"
              });

              res.cookie("owner", 2, {
                maxAge: 360000,
                httpOnly: false,
                path: "/"
              });
              req.session.user = result;
              res.writeHead(200, {
                "Content-type": "text/plain"
              });
              console.log("Login successful!");
              res.end("Login successful!");
            }
          }
        });
        client.close();
      }
    });
  }
});*/

app.post("/signup", function(req, res) {
  console.log("Inside Signup POST");
  console.log("Request Body: ", req.body);

  kafka.make_request("signup", req.body, function(err, results) {
    console.log("in results signup");
    console.log(results);
    if (err) {
      console.log("Error in adding User");
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Error in adding User");
    } else {
      console.log("Adding a user successful!");
      res.writeHead(200, {
        "Content-type": "text/plain"
      });
      res.end("Adding a user successful!");
    }
  });
});

app.post("/ownersignup", function(req, res) {
  console.log("Inside Owner Signup POST");
  console.log("Request Body: ", req.body);

  kafka.make_request("ownersignup", req.body, function(err, results) {
    console.log("in results ownersignup");
    console.log(results);
    if (err) {
      console.log("Error in adding Owner");
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Error in adding Owner");
    } else {
      console.log("Adding a Owner successful!");
      res.writeHead(200, {
        "Content-type": "text/plain"
      });
      res.end("Adding a Owner successful!");
    }
  });
});

app.get("/profile-details", requireAuth, function(req, res) {
  console.log("Inside profile GET");
  console.log("Request Body:", req.body);
  var key1 = "accounttype";
  var value1 = req.session.user.accounttype;

  req.body[key1] = value1;

  var key2 = "email";
  var value2 = req.session.user.email;

  req.body[key2] = value2;

  kafka.make_request("profiledetails", req.body, function(err, results) {
    console.log("in results profiledetails");
    console.log(results);
    if (err) {
      console.log("Error in fetching profile details ");
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Error in fetching profile details");
    } else {
      console.log("Profile Data loaded successfully");
      res.writeHead(200, {
        "Content-type": "text/plain"
      });
      res.end(JSON.stringify(results[0]));
    }
  });
});

/*app.get("/profile-details", requireAuth, function(req, res) {
  console.log("Inside profile GET");
  console.log("Request Body:", req.body);
  const userSession = req.session.user;
  console.log(userSession);

  /*kafka.make_request("profiledetails", req.body, function(err, results) {
    console.log("in results profiledetails");
    console.log(results);
    if (err) {
      console.log("Error in fetching profile details ");
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Error in fetching profile details");
    } else {
      console.log("Profile Data loaded successfully");
      res.writeHead(200, {
        "Content-type": "text/plain"
      });
      res.end("Profile Data loaded successfully");
    }
  });
});*/

/*if (req.session.user) {
    MongoClient.connect(uri, { useUnifiedTopology: true }, function(
      err,
      client
    ) {
      if (err) {
        console.log(
          "Error occurred while connecting to MongoDB Atlas...\n",
          err
        );
      } else {
        console.log("Connected to DB Successfully");

        if (req.session.user.accounttype === 1) {
          var collection = client.db("grubhub").collection("buyer");
          var query = { email: userSession.email };
        } else {
          var collection = client.db("grubhub").collection("owner");
          var query = { owner_id: userSession.owner_id };
        }
        console.log("Query is", query);
        collection.find(query).toArray(function(err, result) {
          if (err) console.log("Error in fetching profile details");
          else {
            console.log("Profile Data loaded successfully");
            console.log(result);
            res.writeHead(200, {
              "Content-type": "application/json"
            });
            res.end(JSON.stringify(result[0]));
            console.log(JSON.stringify(result));
          }
        });

        client.close();
      }
    });
  }
});*/

app.post("/update-profile", function(req, res) {
  console.log("Inside Update Profile POST!");
  console.log("Request Body: ", req.body);
  console.log("Req Session:", req.session.user.accounttype);
  console.log("Email:", req.session.user.email);

  MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {
    if (err) {
      console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
    } else {
      console.log("Connected to DB Success");

      if (req.session.user.accounttype === 1) {
        var collection = client.db("grubhub").collection("buyer");
      } else {
        var collection = client.db("grubhub").collection("owner");
      }

      var query = { email: req.session.user.email };
      console.log("Query", query);
      var newquery = {
        $set: {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          aboutme: req.body.aboutme,
          country: req.body.country,
          city: req.body.city,
          gender: req.body.gender,
          company: req.body.company,
          profileimage: req.body.profileimage
        }
      };

      console.log("NewQuery:", newquery);

      collection.updateOne(query, newquery, function(err, result) {
        if (err) {
          console.log("Error in updating profile");
        } else {
          console.log("Updating profile successful!");
          res.writeHead(200, {
            "Content-type": "text/plain"
          });
          res.end("Updating profile successful!");
        }
      });
      client.close();
    }
  });
});

app.post("/logout", function(req, res) {
  console.log("POST Logout!");
  res.clearCookie("cookie");
  res.clearCookie("owner");
  res.clearCookie("buyer");
  req.session.user = undefined;
  res.writeHead(200, {
    "Content-type": "text/plain"
  });
  res.end("Back to login!");
});

module.exports = app;
