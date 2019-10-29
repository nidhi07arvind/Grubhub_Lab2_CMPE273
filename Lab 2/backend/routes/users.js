const express = require("express");
const pool = require("../ConnectionPooling");
var mysql = require("mysql");
var MongoClient = require("mongodb").MongoClient;
const app = express.Router();
var bcrypt = require("bcrypt");

const uri =
  "mongodb+srv://admin:admin@lab0-stjgi.mongodb.net/test?retryWrites=true&w=majority";
//login
app.post("/login", function(req, res) {
  console.log("Inside login POST");
  console.log("Request Body: ", req.body);

  // const hashedPassword = bcrypt.hashSync(req.body.Password, 10);
  // console.log(hashedPassword);

  //Query

  MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {
    if (err) {
      console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
    } else {
      console.log("Connected to DB Success");

      //if (req.body.Profile === "Buyer") {
      var collection = client.db("grubhub").collection("buyer");
      var query = { email: req.body.Email };
      //console.log("Buyer Collection");
      // } else {
      //   var collection = client.db("grubhub").collection("owner");
      //   var query = { owner_id: req.body.Email };
      // }

      collection.findOne(query, function(err, result) {
        if (err) {
          console.log("Invalid Credentials!!");
        }
        if (!result) {
          console.log("Not Found!");
        }
        if (!bcrypt.compareSync(req.body.Password, result.password)) {
          console.log("Invalid Password!");

          if (req.body.Profile === "Buyer") {
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
            res.writeHead(200, {
              "Content-type": "text/plain"
            });
            console.log("Login successful!");
            res.end("Login successful!");
          } else {
            console.log(result);
            res.cookie("cookie", result.name, {
              maxAge: 360000,
              httpOnly: false,
              path: "/"
            });
            //res.cookie("accounttype", result[0].accounttype, {
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
});

/*  pool.getConnection(function(err, conn) {
    if (err) {
      console.log("Error in creating connection!");
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in creating connection!");
    } else {
      if (req.body.Profile === "Buyer") {
        //Login validation query
        var sql =
          "SELECT * from buyer WHERE email = " + mysql.escape(req.body.Email);
        conn.query(sql, function(err, result) {
          if (err) {
            res.writeHead(400, {
              "Content-Type": "text/plain"
            });
            res.end("Invalid Credentials!");
          } else {
            //compare hashed passwords
            if (
              result.length == 0 ||
              !bcrypt.compareSync(req.body.Password, result[0].password)
            ) {
              res.writeHead(401, {
                message: "Invalid Credentials"
              });
              console.log("Invalid Credentials!");
              res.end("Invalid Credentials!");
            } else {
              console.log(result);
              res.cookie("cookie", result[0].name, {
                maxAge: 360000,
                httpOnly: false,
                path: "/"
              });
              res.cookie("buyer", 1, {
                maxAge: 360000,
                httpOnly: false,
                path: "/"
              });
              req.session.user = result[0];
              res.writeHead(200, {
                "Content-type": "text/plain"
              });
              console.log("Login successful!");
              res.end("Login successful!");
            }
          }
        });
      } else {
        var sql =
          "SELECT * from owner WHERE email = " + mysql.escape(req.body.Email);
        conn.query(sql, function(err, result) {
          if (err) {
            res.writeHead(400, {
              "Content-Type": "text/plain"
            });
            res.end("Invalid Credentials!");
          } else {
            if (
              result.length == 0 ||
              !bcrypt.compareSync(req.body.Password, result[0].password)
            ) {
              res.writeHead(401, {
                "Content-type": "text/plain"
              });
              console.log("Invalid Credentials!");
              res.end("Invalid Credentials!");
            } else {
              console.log(result);
              res.cookie("cookie", result[0].name, {
                maxAge: 360000,
                httpOnly: false,
                path: "/"
              });
              //res.cookie("accounttype", result[0].accounttype, {
              res.cookie("owner", 2, {
                maxAge: 360000,
                httpOnly: false,
                path: "/"
              });
              req.session.user = result[0];
              res.writeHead(200, {
                "Content-type": "text/plain"
              });
              console.log("Login successful!");
              res.end("Login successful!");
            }
          }
        });
      }
    }
  });
});*/

app.post("/signup", function(req, res) {
  console.log("Inside Signup POST");
  console.log("Request Body: ", req.body);

  MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {
    if (err) {
      console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
    } else {
      console.log("Connected...Success");
      const collection = client.db("grubhub").collection("buyer");
      const hashedPassword = bcrypt.hashSync(req.body.Password, 10);

      var buyer = {
        name: req.body.FirstName,
        email: req.body.Email,
        password: hashedPassword,
        accounttype: req.body.Accounttype
      };

      collection.insertOne(buyer, function(err, result) {
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

      client.close();
    }
  });
});

app.post("/ownersignup", function(req, res) {
  console.log("Inside Owner Signup POST");
  console.log("Request Body: ", req.body);

  //User creation query

  var res_id = Math.floor(Math.random() * 100);
  console.log(res_id);

  MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {
    if (err) {
      console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
    } else {
      console.log("Connected to DB Successfully");

      const collection = client.db("grubhub").collection("restaurant");

      var restaurant = {
        res_id: res_id,
        res_name: req.body.RestaurantName,
        zipcode: req.body.ZipCode
      };

      collection.insertOne(restaurant, function(err, result) {
        if (err) {
          console.log("Error in adding restaurant");
        } else {
          console.log("Added restaurant successfully");
        }
      });

      client.close();
    }
  });

  MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {
    if (err) {
      console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
    } else {
      console.log("Connected to DB successfully");

      const collection = client.db("grubhub").collection("owner");

      var owner_id = Math.floor(Math.random() * 1000);
      const hashedPassword = bcrypt.hashSync(req.body.Password, 10);

      var owner = {
        name: req.body.FirstName,
        owner_id: owner_id,
        res_id: res_id,
        email: req.body.Email,
        password: hashedPassword,
        accounttype: req.body.Accounttype
      };

      collection.insertOne(owner, function(err, result) {
        if (err) {
          console.log("Error in adding owner");
        } else {
          console.log("Added owner successfully");
        }
      });

      client.close();
    }
  });
});

app.get("/profile-details", function(req, res) {
  console.log("Inside profile GET");
  console.log("Request Body:", req.body);
  const userSession = req.session.user;
  console.log(userSession);

  if (req.session.user) {
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
});

app.post("/update-profile", function(req, res) {
  console.log("Inside Update Profile POST!");
  console.log("Request Body: ", req.body);
  console.log("Req Session:", req.session.user.accounttype);
  console.log("Email:", req.session.user.email);

  if (req.session.user) {
    pool.getConnection(function(err, conn) {
      if (err) {
        console.log("Error in creating connection!");
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in creating connection!");
      } else {
        if (
          req.session.user.accounttype === 1 ||
          req.session.user.accounttype === 3
        ) {
          var sql =
            "UPDATE buyer set " +
            "name = " +
            mysql.escape(req.body.name) +
            "," +
            "email = " +
            mysql.escape(req.body.email) +
            "," +
            "phone = " +
            mysql.escape(req.body.phone) +
            "," +
            "aboutme= " +
            mysql.escape(req.body.aboutme) +
            "," +
            "country = " +
            mysql.escape(req.body.country) +
            "," +
            "city = " +
            mysql.escape(req.body.city) +
            "," +
            "gender = " +
            mysql.escape(req.body.gender) +
            "," +
            "company = " +
            mysql.escape(req.body.company) +
            "," +
            "profileimage = " +
            mysql.escape(req.body.profileimage) +
            " WHERE email = " +
            req.session.user.email;
        } else {
          var sql =
            "UPDATE owner set " +
            "name = " +
            mysql.escape(req.body.name) +
            "," +
            "email = " +
            mysql.escape(req.body.email) +
            "," +
            "phone = " +
            mysql.escape(req.body.phone) +
            "," +
            "aboutme= " +
            mysql.escape(req.body.aboutme) +
            "," +
            "country = " +
            mysql.escape(req.body.country) +
            "," +
            "city = " +
            mysql.escape(req.body.city) +
            "," +
            "gender = " +
            mysql.escape(req.body.gender) +
            "," +
            "company = " +
            mysql.escape(req.body.company) +
            "," +
            "ProfileImage = " +
            mysql.escape(req.body.profileimage) +
            " WHERE owner_id = " +
            req.session.user.owner_id;
        }
        conn.query(sql, function(err, result) {
          if (err) {
            console.log("Error in updating profile data");
            res.writeHead(400, {
              "Content-type": "text/plain"
            });
            res.end("Error in updating profile data");
          } else {
            console.log("Profile data update complete!");
            res.writeHead(200, {
              "Content-type": "text/plain"
            });
            res.end("Profile data update complete!");
          }
        });
      }
    });
  }
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
