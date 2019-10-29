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
});

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
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Error in adding Owner");
        } else {
          console.log("Adding a owner successful!");
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
