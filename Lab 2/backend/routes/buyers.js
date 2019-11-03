const express = require("express");
const pool = require("../ConnectionPooling");
var mysql = require("mysql");
//var MongoClient = require("mongodb").MongoClient;
const app = express.Router();
var bcrypt = require("bcrypt");
//var regex = require("regex");

var kafka = require("../kafka/client");

const { getConnectionMongo } = require("../dbs/index");

// const uri =
//   "mongodb+srv://admin:admin@lab0-stjgi.mongodb.net/test?retryWrites=true&w=majority";

app.post("/search", function(req, res) {
  console.log("Inside SEARCH POST!");
  console.log("Request Body:", req.body);

  if (req.session.user) {
    kafka.make_request("search", req.body, function(err, result) {
      console.log("in results search");
      console.log(result);
      if (err) {
        console.log("Error in searching items");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in searching items");
      } else {
        console.log("Searching successful!");
        console.log("inside", result);
        res.writeHead(200, {
          "Content-type": "text/plain"
        });
        res.end(JSON.stringify(result));
        console.log("stringify", JSON.stringify(result));
      }
    });
  }
});

/*app.post("/search", function(req, res) {
  console.log("Inside SEARCH POST!");
  console.log("Request Body:", req.body);

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

        // User.find(username: {$regex: "/^" + req.params.data + "/"});

        //var query = { item_name: { $regex: "/^" + req.body.searchText + "/" } };
        //console.log(query);

        collection.find({ item_name: "Pizza" }).toArray(function(err, result) {
          if (err) console.log("Error in fetching items");
          else {
            console.log("Search Items loaded successfully");
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

/*    pool.getConnection(function(err, conn) {
      if (err) {
        console.log("Error in establishing connection!");
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in establishing connection!");
      } else {
        console.log("Connection established successfully");
        console.log("Request search text:", req.body.searchText);
        const iname = req.body.searchText;
        //var sql = "SELECT * from item where item_name LIKE ?";

        conn.query(
          //"SELECT * from item where item_name LIKE?",
          //"%" + iname + "%",
          "SELECT t1.*,t2.* FROM item t1, restaurant t2 where t1.res_id=t2.res_id AND t1.item_name LIKE?",
          "%" + iname + "%",
          function(err, result) {
            if (err) {
              console.log("Error in searching items!");
              res.json({ data: "Error in gettings items" });
            } else {
              console.log("Items loaded successfully");
              console.log(result);
              console.log(JSON.stringify(result));
              res.status(200).send(JSON.stringify(result));
            }
          }
        );
      }
    });
  }
});*/
app.post("/restaurant-display", function(req, res) {
  console.log("Inside Restaurant Details POST!");
  console.log(req.body);

  if (req.session.user) {
    kafka.make_request("restaurantdisplay", req.body, function(err, result) {
      console.log("in results restaurantdisplay");
      console.log(result);
      if (err) {
        console.log("Error in searching restaurants");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in searching restaurants");
      } else {
        console.log("Searching successful!");
        console.log("inside", result);
        res.writeHead(200, {
          "Content-type": "text/plain"
        });
        res.end(JSON.stringify(result));
        console.log("stringify", JSON.stringify(result));
      }
    });
  }
});
/*app.post("/restaurant-display", function(req, res) {
  console.log("Inside Restaurant Details POST!");
  console.log(req.body);
  const res_num = parseInt(req.body.res_id);
  console.log(res_num);

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

        var query = { res_id: res_num };

        collection.find(query).toArray(function(err, result) {
          if (err) console.log("Error in fetching profile details");
          else {
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
app.post("/cuisine-display", function(req, res) {
  console.log("Inside Cuisine Details POST!");
  console.log(req.body);

  if (req.session.user) {
    kafka.make_request("cuisinedisplay", req.body, function(err, result) {
      console.log("in results restaurantdisplay");
      console.log(result);
      if (err) {
        console.log("Error in searching restaurants");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in searching restaurants");
      } else {
        console.log("Searching successful!");
        console.log("inside", result);
        res.writeHead(200, {
          "Content-type": "text/plain"
        });
        res.end(JSON.stringify(result));
        console.log("stringify", JSON.stringify(result));
      }
    });
  }
});

/*app.post("/cuisine-display", function(req, res) {
  console.log("Inside Restaurant Details POST!");
  console.log(req.body);
  const cuisine = req.body.cuisine;

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

        var query = { cuisine: cuisine };

        collection.find(query).toArray(function(err, result) {
          if (err) console.log("Error in fetching profile details");
          else {
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

app.get("/breakfast-details", function(req, res) {
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
            'SELECT * from item where section="Dinner" AND res_id = ' +
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

app.post("/addtocart", function(req, res) {
  console.log("Inside addtocart POST");
  console.log("Request Body: ", req.body);

  var key1 = "buyer";
  var value1 = req.session.user.email;

  req.body[key1] = value1;

  console.log("new Request Body: ", req.body);

  if (req.session.user) {
    kafka.make_request("addtocart", req.body, function(err, results) {
      console.log("in results signup");
      console.log(results);
      if (err) {
        console.log("Error in adding to cart");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in adding to cart");
      } else {
        console.log("Added to cart");
        res.writeHead(200, {
          "Content-type": "text/plain"
        });
        res.end("Added to cart");
      }
    });
  }
});

/*app.post("/addtocart", function(req, res) {
  console.log("Inside addtocart POST");
  console.log("Request Body: ", req.body);
  //console.log("Request Body: ", req.body.item_id);
  const userSession = req.session.user;

  if (req.session.user) {
    //const item_id = req.body.item_id;

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

        var collection = client.db("grubhub").collection("cart");
        var cart_item = {
          item_id: req.body.item_id,
          item_name: req.body.item_name,
          res_id: req.body.res_id,
          res_name: req.body.res_name,
          buyer: req.session.user.email,
          price: req.body.price
        };
        //console.log("Query:", query);

        collection.insertOne(cart_item, function(err, result) {
          if (err) console.log("Error in adding item to cart");
          else {
            console.log("Item added successfully");

            res.writeHead(200, {
              "Content-type": "application/json"
            });
            res.end("Item added successfully");
          }
        });

        client.close();
      }
    });
  }
});*/

app.get("/cart-details", function(req, res) {
  console.log("Inside Cart Details GET!");

  var key1 = "email";
  var value1 = req.session.user.email;

  req.body[key1] = value1;

  if (req.session.user) {
    kafka.make_request("cartdetails", req.body, function(err, results) {
      console.log("in results cartdetails");
      console.log(results);
      if (err) {
        console.log("Error in fetching cartdetails");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in fetching cartdetails");
      } else {
        console.log("Cart Details loaded successfully");
        res.status(200).send(JSON.stringify(results));
      }
    });
  }
});

/*app.get("/cart-details", function(req, res) {
  console.log("Inside Cart Details GET!");

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
        var collection = client.db("grubhub").collection("cart");

        var query = { buyer: userSession.email };

        collection.find(query).toArray(function(err, result) {
          if (err) console.log("Error in fetching cart details");
          else {
            console.log("Cart Details loaded successfully");
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

app.get("/buyer-order", function(req, res) {
  console.log("Inside Buyer Order Details GET!");

  var key1 = "email";
  var value1 = req.session.user.email;

  req.body[key1] = value1;

  if (req.session.user) {
    kafka.make_request("buyerorder", req.body, function(err, results) {
      console.log("in results dashboard");
      console.log(results);
      if (err) {
        console.log("Error in fetching buyerorder details");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in fetching buyerorder details");
      } else {
        console.log("Buyer Orders loaded successfully");

        res.status(200).send(JSON.stringify(results));
      }
    });
  }
});
/*app.get("/buyer-order", function(req, res) {
  console.log("Inside Buyer Order Details GET!");
  const userSession = req.session.user;
  console.log(req.session.user);

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

        var query = { email: req.session.user.email };

        collection.find(query).toArray(function(err, result) {
          if (err) console.log("Error in fetching profile details");
          else {
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

app.get("/past-order", function(req, res) {
  console.log("Inside Buyer Past Order Details GET!");
  const userSession = req.session.user;
  console.log(req.session.user);

  pool.getConnection(function(err, conn) {
    if (err) {
      console.log("Error in creating connection!");
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in creating connection!");
    } else {
      console.log("Established connection");
      var sql =
        'SELECT * from orders WHERE status ="completed" AND email = ' +
        mysql.escape(userSession.email);

      conn.query(sql, function(err, result) {
        if (err) {
          console.log("Error in getting order details");

          res.json({ data: "Error in getting order details" });
        } else {
          console.log("Orders loaded successfully");
          console.log(result);
          console.log(JSON.stringify(result));

          res.send(JSON.stringify(result));
        }
      });
    }
  });
});

app.post("/place-order", function(req, res) {
  console.log("Inside Place Order GET");
  console.log("Request Body:", req.body);
  console.log("Res_id:", req.body[0].res_id);
  console.log("Req Length: ", req.body.length);

  if (req.session.user) {
    kafka.make_request("placeorder", req.body, function(err, results) {
      console.log("in results placeorder");
      console.log(results);
      if (err) {
        console.log("Error in placing order");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in placing order");
      } else {
        console.log("Order Placed");
        res.writeHead(200, {
          "Content-type": "text/plain"
        });
        res.end("Order Placed");
      }
    });
  }
});

/*app.post("/place-order", function(req, res) {
  console.log("Inside Place Order GET");
  console.log("Request Body:", req.body);
  console.log("Res_id:", req.body[0].res_id);
  console.log("Req Length: ", req.body.length);

  if (req.session.user) {
    const order_id = Math.floor(Math.random() * 1000);
    const res_id = req.body[0].res_id;
    const email = req.body[0].buyer;

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

        var items = [];
        for (var index = 0; index < req.body.length; index++)
          items.push({
            item_id: req.body[index].item_id,
            item_name: req.body[index].item_name
          });

        console.log("Items array:", items);
        var order = {
          order_id: order_id,
          res_id: res_id,
          email: email,
          items: items,
          status: "new"
        };
        console.log("Order", order);

        collection.insertOne(order, function(err, result) {
          if (err) {
            res.writeHead(400, {
              "Content-Type": "text/plain"
            });
            console.log("Error in placing order");
            res.end("Error in placing order");
          } else {
            console.log("Order successful");
            res.end("Order successful");
          }
        });

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
        var collection = client.db("grubhub").collection("cart");
        var query = {
          buyer: req.session.user.email
        };

        collection.deleteMany(query, function(err, result) {
          if (err) {
            console.log("Error in deleting items");
          } else {
            console.log("Deleted item successful!");
            res.end("Deleted item successful!");
          }
        });
        client.close();
      }
    });
  }
});*/

app.get("/get-chats", function(req, res) {
  console.log("Inside Buyer Chats GET!");
  var key1 = "email";
  var value1 = req.session.user.email;
  req.body[key1] = value1;

  if (req.session.user) {
    kafka.make_request("getchat", req.body, function(err, results) {
      console.log("in results sendchat");
      console.log(results);
      if (err) {
        console.log("Error in updating items");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in updating items");
      } else {
        console.log("getchat success!");
        console.log(
          "Json result",
          JSON.stringify(results[0].chats.buyer_msg.bm)
        );
        res.status(200).send(JSON.stringify(results[0].chats.buyer_msg.bm));
      }
    });
  }
}); /*
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

        var query = { email: req.session.user.email };

        collection.find(query).toArray(function(err, result) {
          if (err) console.log("Error in fetching profile details");
          else {
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

app.post("/send-chat", async function(req, res) {
  console.log("Inside Buyer Chats POST!");
  var key1 = "email";
  var value1 = req.session.user.email;
  req.body[key1] = value1;

  console.log("new Request Body: ", req.body);

  if (req.session.user) {
    kafka.make_request("sendchat", req.body, function(err, results) {
      console.log("in results sendchat");
      console.log(results);
      if (err) {
        console.log("Error in updating items");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in updating items");
      } else {
        console.log("sendchat success!");
        res.writeHead(200, {
          "Content-type": "text/plain"
        });
        res.end("sendchat success!");
      }
    });
  }
});
/* const { connection, client } = await getConnectionMongo();

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

/*MongoClient.connect(uri, { useUnifiedTopology: true }, function(
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
        console.log("inside second query", res_id);

        var collection = client.db("grubhub").collection("chats");

        collection.find(query).toArray(function(err, result) {
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

        client.close();
      }
    });
  }
});*/

module.exports = app;
