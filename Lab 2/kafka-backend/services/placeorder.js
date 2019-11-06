const { getConnectionMongo } = require("../dbs/index");

async function handle_request(message, callback) {
  console.log("Inside Kafka Backend Owner Dashboard");
  console.log("Message: ", message);

  const { connection, client } = await getConnectionMongo();
  const order_id = Math.floor(Math.random() * 1000);
  const res_id = message[0].res_id;
  const email = message[0].buyer;

  var items = [];
  for (var index = 0; index < message.length; index++)
    items.push({
      item_id: message[index].item_id,
      item_name: message[index].item_name
    });

  console.log("Items array:", items);
  var order = {
    order_id: order_id,
    res_id: res_id,
    email: email,
    items: items,
    status: "new",
    chats: {
      buyer_msg: {
        bm: []
      },
      owner_msg: {
        om: []
      }
    }
  };
  console.log("Order", order);

  connection.collection("orders").insertOne(order, function(err, result) {
    if (err) {
      callback(err, "Error");
    } else {
      callback(null, []);
    }
  });

  connection
    .collection("cart")
    .deleteMany({ buyer: email }, function(err, result) {
      if (err) callback(err, "Error");
      else {
        callback(null, []);
      }
    });

  client.close();
}

exports.handle_request = handle_request;
