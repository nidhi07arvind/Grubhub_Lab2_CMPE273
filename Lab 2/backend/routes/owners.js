const express = require("express");
const pool = require("../ConnectionPooling");
var mysql = require("mysql");
var MongoClient = require("mongodb").MongoClient;
const app = express.Router();
var bcrypt = require("bcrypt");

var kafka = require("../kafka/client");

const { getConnectionMongo } = require("../dbs/index");

const uri =
  "mongodb+srv://admin:admin@lab0-stjgi.mongodb.net/test?retryWrites=true&w=majority";

app.post("/additem", function(req, res) {
  console.log("Inside AddItems POST");
  console.log("Request Body: ", req.body);

  console.log(req.session.user);

  var key1 = "res_id";
  var value1 = req.session.user.res_id;

  var key2 = "res_name";
  var value2 = req.session.user.res_name;

  //var res_name = req.session.user.res_name;

  req.body[key1] = value1;
  req.body[key2] = value2;

  console.log("new Request Body: ", req.body);

  // new_req = {
  //   res_id : req.session.user.res_id,
  //   res_name : req.session.user.res_name,
  //   name : req.body.name,
  //   description: req.body.description,
  //   section : req.body.section,
  //   price : req.body.price,
  //   image : req.body.image,
  //   cuisine : req.body.
  // }
  //var res_id;

  if (req.session.user) {
    kafka.make_request("additem", req.body, function(err, results) {
      console.log("in results additem");
      console.log(results);
      if (err) {
        console.log("Error in adding items");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in adding items");
      } else {
        console.log("Adding a Item successful!");
        res.writeHead(200, {
          "Content-type": "text/plain"
        });
        res.end("Adding a Item successful!");
      }
    });
  }
});

/*app.post("/additem", function(req, res) {
  console.log("Inside AddItems POST");
  console.log("Request Body: ", req.body);

  console.log(req.session.user);
  //var res_id;

  if (req.session.user) {
    var res_id = req.session.user.res_id;
    var res_name = req.session.user.res_name;

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

        /*var collection = client.db("grubhub").collection("owner");
        var query = { email: req.session.user.email };
        console.log(query);

        collection.find(query).toArray(function(err, result) {
          if (err) {
            console.log("Invalid Credentials!!");
          } else {
            console.log(result);
            console.log("ResID", result[0].res_id);
            var res_id = result[0].res_id;
            console.log("Assigned to variable ResID", res_id);
          }
        });

        console.log("Res ID final:", res_id);

        client.close();
      }
    });

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
        console.log("Res ID final 2:", res_id);*/

/*var collection = client.db("grubhub").collection("item");

        const item_id = Math.floor(Math.random() * 1000);

        console.log("Item ID final:", item_id);

        var item = {
          res_id: res_id,
          res_name: res_name,
          item_id: item_id,
          item_name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          cuisine: req.body.cuisine,
          section: req.body.section,
          image: req.body.image
        };

        console.log("item", item);

        collection.insertOne(item, function(err, result) {
          if (err) {
            res.writeHead(400, {
              "Content-Type": "text/plain"
            });
            console.log("Error in adding items");
            res.end("Error in adding items");
          } else {
            console.log("Item added successfully");
            // res.writeHead(200, {
            //   "Content-type": "text/plain"
            // });
            res.end("Item added successfully!");
          }
        });

        client.close();
      }
    });
  }
})*/
app.get("/owner-dashboard-details", async function(req, res) {
  console.log("Inside Owner Dashboard Details GET!");
  const userSession = req.session.user;

  var key1 = "res_id";
  var value1 = req.session.user.res_id;

  req.body[key1] = value1;

  console.log("new Request Body: ", req.body);

  if (req.session.user) {
    kafka.make_request("ownerdashboard", req.body, function(err, results) {
      console.log("in results dashboard");
      console.log(results);
      if (err) {
        console.log("Error in fetching dashboard details");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in adding items");
      } else {
        console.log("Items in Dashboard loaded successfully");

        res.status(200).send(JSON.stringify(results));
      }
    });
  }
});

app.get("/owner-dashboard-details", async function(req, res) {
  console.log("Inside Owner Dashboard Details GET!");
  const userSession = req.session.user;

  if (req.session.user) {
    var res_id = req.session.user.res_id;

    const { connection, client } = await getConnectionMongo();

    connection
      .collection("item")
      .find({ res_id: res_id })
      .toArray(function(err, result) {
        if (err) console.log("Error in fetching profile details");
        else {
          console.log("inside new");
          console.log("Items in Dashboard loaded successfully");
          console.log(result);

          console.log(JSON.stringify(result));
          res.status(200).send(JSON.stringify(result));
        }
      });

    client.close();
  }
});

app.post("/delete-item", function(req, res) {
  console.log("Inside delete item from menu POST");
  console.log("Request Body: ", req.body);
  const userSession = req.session.user;

  if (req.session.user) {
    kafka.make_request("deleteitems", req.body, function(err, results) {
      console.log("in results deleteitem");
      console.log(results);
      if (err) {
        console.log("Error in deleting items");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in deleting items");
      } else {
        console.log("Deleting a Item successful!");
        res.writeHead(200, {
          "Content-type": "text/plain"
        });
        res.end("Deleting a Item successful!");
      }
    });
  }
});

/*app.post("/delete-item", function(req, res) {
  console.log("Inside delete item from menu POST");
  console.log("Request Body: ", req.body);
  const userSession = req.session.user;

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
        console.log("Connected to DB Success");

        var collection = client.db("grubhub").collection("item");
        var query = {
          item_id: req.body.item_id
        };

        collection.deleteMany(query, function(err, result) {
          if (err) {
            console.log("Error in deleting items");
          } else {
            console.log("Deleted item successful!");
            res.writeHead(200, {
              "Content-type": "text/plain"
            });
            res.end("Deleted item successful!");
          }
        });
        client.close();
      }
    });
  }
});
*/

/*app.get("/breakfast-details", function(req, res) {
  console.log("Inside Breakfast Details GET!");
  const userSession = req.session.user;

  pool.getConnection(function(err, conn) {
    if (err) {
      console.log("Error in creating connection!");
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in creating connection!");
    } else {
      var presql =
        "SELECT r.res_id from restaurant as r inner join owner as o where r.res_id=o.res_id and o.owner_id=" +
        mysql.escape(userSession.owner_id);

      conn.query(presql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-type": "text/plain"
          });
          console.log("Error in getting restaurant id");
          res.end("Error in getting restaurant id");
        } else {
          const res_id = result[0].res_id;
          console.log(res_id);
          console.log("Got restaurant id successful!");
          const section = "Dinner";
          //const item_id = Math.floor(Math.random() * 1000);
          var sql =
            'SELECT * from item where section="Breakfast" AND res_id = ' +
            mysql.escape(res_id);
          // +
          // "and section = " +
          // mysql.escape(section);

          conn.query(sql, function(err, result) {
            if (err) {
              // res.writeHead(400, {
              //   "Content-type": "text/plain"
              // });
              console.log("Error in getting  items");
              res.json({ data: "Error in getting items" });
            } else {
              console.log("Items in Dashboard loaded successfully");
              console.log(result);
              // res.writeHead(200, {
              //   "Content-type": "application/json"
              // });
              console.log(JSON.stringify(result));
              //res.end({ data: result });

              res.send(200, JSON.stringify(result));
            }
          });
        }
      });
    }
  });
});

app.get("/lunch-details", function(req, res) {
  console.log("Inside Lunch Details GET!");
  const userSession = req.session.user;

  pool.getConnection(function(err, conn) {
    if (err) {
      console.log("Error in creating connection!");
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in creating connection!");
    } else {
      var presql =
        "SELECT r.res_id from restaurant as r inner join owner as o where r.res_id=o.res_id and o.owner_id=" +
        mysql.escape(userSession.owner_id);

      conn.query(presql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-type": "text/plain"
          });
          console.log("Error in getting restaurant id");
          res.end("Error in getting restaurant id");
        } else {
          const res_id = result[0].res_id;
          console.log(res_id);
          console.log("Got restaurant id successful!");

          var sql =
            'SELECT * from item where section="lunch" AND res_id = ' +
            mysql.escape(res_id);
          // +
          // "and section = " +
          // mysql.escape(section);

          conn.query(sql, function(err, result) {
            if (err) {
              // res.writeHead(400, {
              //   "Content-type": "text/plain"
              // });
              console.log("Error in getting  items");
              res.json({ data: "Error in getting items" });
            } else {
              console.log("Items in Dashboard loaded successfully");
              console.log(result);
              // res.writeHead(200, {
              //   "Content-type": "application/json"
              // });
              console.log(JSON.stringify(result));
              //res.end({ data: result });

              res.send(200, JSON.stringify(result));
            }
          });
        }
      });
    }
  });
});
app.get("/dinner-details", function(req, res) {
  console.log("Inside Dinner Details GET!");
  const userSession = req.session.user;

  pool.getConnection(function(err, conn) {
    if (err) {
      console.log("Error in creating connection!");
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in creating connection!");
    } else {
      var presql =
        "SELECT r.res_id from restaurant as r inner join owner as o where r.res_id=o.res_id and o.owner_id=" +
        mysql.escape(userSession.owner_id);

      conn.query(presql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-type": "text/plain"
          });
          console.log("Error in getting restaurant id");
          res.end("Error in getting restaurant id");
        } else {
          const res_id = result[0].res_id;
          console.log(res_id);
          console.log("Got restaurant id successful!");
          const section = "Dinner";
          //const item_id = Math.floor(Math.random() * 1000);
          var sql =
            'SELECT * from item where section="dinner" AND res_id = ' +
            mysql.escape(res_id);
          // +
          // "and section = " +
          // mysql.escape(section);

          conn.query(sql, function(err, result) {
            if (err) {
              // res.writeHead(400, {
              //   "Content-type": "text/plain"
              // });
              console.log("Error in getting  items");
              res.json({ data: "Error in getting items" });
            } else {
              console.log("Items in Dashboard loaded successfully");
              console.log(result);
              // res.writeHead(200, {
              //   "Content-type": "application/json"
              // });
              console.log(JSON.stringify(result));
              //res.end({ data: result });

              res.send(200, JSON.stringify(result));
            }
          });
        }
      });
    }
  });
});*/

/*app.post("/update-owner-order", function(req, res) {
  console.log("Inside Update Order POST");
  console.log("Request Body:", req.body);
  console.log("Res_id:", req.body[0].res_id);
  console.log("Req Length: ", req.body.length);

  const res_id = req.body[0].res_id;
  const email = req.body[0].email;
  // const order_id = 101;
  // const res_id = 1;
  // const email = "nidhi@gmail.com";
  pool.getConnection(function(err, conn) {
    if (err) {
      console.log("Error in establishing connection!");
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in establishing connection!");
    } else {
      /*var sql2 =
        "UPDATE orders (status) VALUES(" +
        mysql.escape(status) +
        ");";

      conn.query(sql2, function(err, result) {
        if (err) {
          console.log("Error in adding order");
          res.writeHead(400, {
            "Content-type": "text/plain"
          });
          res.end("Error in adding an order");
        } else {
          console.log("Adding order successful!");
          // res.writeHead(200, {
          //   "Content-type": "text/plain"
          // });
          res.end("Adding order successful!");
        }
      });*/

/*for (var index = 0; index < req.body.length; index++) {
        var sql3 =
          "UPDATE orders set " +
          "status = " +
          mysql.escape(req.body[index].status) +
          " WHERE order_id = " +
          mysql.escape(req.body[index].order_id);

        conn.query(sql3, function(err, result) {
          if (err) {
            console.log("Error in updating order");
          } else {
            console.log("Order updated successfully!", index);
            res.end("Order updated successfully!");
          }
        });
      }
    }
  });
});*/

app.post("/item-details", function(req, res) {
  console.log("Inside item details POST");
  console.log("Request Body:", req.body);

  if (req.session.user) {
    kafka.make_request("itemdetails", req.body, function(err, results) {
      console.log("in results itemdetails");
      console.log(results);
      if (err) {
        console.log("Error in fetching items");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in fetching items");
      } else {
        console.log("Item details loaded successful!");
        console.log("inside", results);
        res.writeHead(200, {
          "Content-type": "text/plain"
        });
        res.end(JSON.stringify(results[0]));
        console.log("stringify", JSON.stringify(results));
      }
    });
  }
});

/*app.post("/item-details", function(req, res) {
  console.log("Inside item details POST");
  console.log("Request Body:", req.body);
  const userSession = req.session.user;
  const item_num = parseInt(req.body.item_id);
  console.log(item_num);

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

        var collection = client.db("grubhub").collection("item");
        var query = { item_id: item_num };
        console.log("Query:", query);

        collection.find(query).toArray(function(err, result) {
          if (err) console.log("Error in fetching profile details");
          else {
            console.log("Item Data loaded successfully");
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

app.post("/update-item", function(req, res) {
  console.log("Inside UPDATE ITEM POST");
  console.log("Request Body:", req.body);
  const userSession = req.session.user;
  const item_num = parseInt(req.body.item_id);
  console.log(item_num);

  if (req.session.user) {
    kafka.make_request("updateitems", req.body, function(err, results) {
      console.log("in results updateitems");
      console.log(results);
      if (err) {
        console.log("Error in updating items");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in updating items");
      } else {
        console.log("Items updated successful!");
        res.writeHead(200, {
          "Content-type": "text/plain"
        });
        res.end("Items updated successful!");
      }
    });
  }
});

/*app.post("/update-item", function(req, res) {
  console.log("Inside UPDATE ITEM POST");
  console.log("Request Body:", req.body);
  const userSession = req.session.user;
  const item_num = parseInt(req.body.item_id);
  console.log(item_num);

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
        console.log("Connected to DB Success");
        var collection = client.db("grubhub").collection("item");
        var query = {
          item_id: item_num
        };
        console.log("Query", query);

        var newitem = {
          $set: {
            item_name: req.body.item_name,
            description: req.body.description,
            price: req.body.price
            //section: req.body.section,
            // image: req.body.image
          }
        };

        collection.updateOne(query, newitem, function(err, result) {
          if (err) {
            console.log("Error in updating profile");
          } else {
            console.log("Updating item successful!");
            res.writeHead(200, {
              "Content-type": "text/plain"
            });
            res.end("Updating item successful!");
          }
        });
        client.close();
      }
    });
  }
});*/

app.get("/owner-order-details", function(req, res) {
  console.log("Inside Owner Order Details GET!");

  var key1 = "res_id";
  var value1 = req.session.user.res_id;

  req.body[key1] = value1;

  console.log("new Request Body: ", req.body);

  if (req.session.user) {
    kafka.make_request("ownerorder", req.body, function(err, results) {
      console.log("in results ownerorder");
      console.log(results);
      if (err) {
        console.log("Error in fetching ownerorder details");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in adding items");
      } else {
        console.log("ownerorder loaded successfully");

        res.status(200).send(JSON.stringify(results));
      }
    });
  }
});

/*

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
        console.log("Connected to DB Success");
        var collection = client.db("grubhub").collection("orders");
        var query = { res_id: req.session.user.res_id };

        collection.find(query).toArray(function(err, result) {
          if (err) {
            console.log("Error in fetching profile details");
          } else {
            console.log("Items in Dashboard loaded successfully");
            console.log(result);

            console.log(JSON.stringify(result));
            res.status(200).send(JSON.stringify(result));
          }
        });

        client.close();
      }
    });
  }
});*/

/*app.post("/send-chat", async function(req, res) {
  console.log("Inside Buyer nids Chats POST!");

  console.log(req.session.user);

  var res_id;

  if (req.session.user) {
    const { connection, client } = await getConnectionMongo();

    connection
      .collection("orders")
      .find({ email: req.session.user.email })
      .toArray(function(err, result) {
        if (err) console.log("Error in fetching profile details");
        else {
          console.log("Items in Dashboard loaded successfully");
          console.log(result);
          res_id = result[0].res_id;
          console.log(res_id);

          console.log(JSON.stringify(result));
          res.status(200).send(JSON.stringify(result));
        }
      });

    console.log("outside loop", res_id);

    var chat = {
      buyer: req.session.user.email,
      res_id: res_id,
      message: req.body.type_message
    };

    connection.collection("chats").insertOne(chat, function(err, result) {
      if (err) {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        console.log("Error in adding items");
        res.end("Error in adding items");
      } else {
        console.log("Item added successfully");
        // res.writeHead(200, {
        //   "Content-type": "text/plain"
        // });
        res.end("Message added successfully!");
      }
    });

    client.close();
  }
});*/

module.exports = app;
