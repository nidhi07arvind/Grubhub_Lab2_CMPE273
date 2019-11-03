const { getConnectionMongo } = require("../dbs/index");
//var regex = require("regex");

async function handle_request(message, callback) {
  console.log("Inside Kafka Backend Search");
  console.log("Message: ", message);

  const searchProperties = message;
  console.log("searchProperties", searchProperties);
  console.log("searchProperties.searchText", searchProperties.searchText);

  const { connection, client } = await getConnectionMongo();
  //User.find(username: {$regex: "/^" + req.params.data + "/"});

  //   connection
  //     .collection("item")
  //     .find({ item_name: { $regex: "/^" + searchProperties.searchText + "/" } })
  //     .toArray
  connection
    .collection("item")
    .find({ item_name: searchProperties.searchText })
    .toArray(function(err, result) {
      if (err) {
        callback(err, "Error");
      } else {
        callback(null, result);
      }
    });
  client.close();
}

exports.handle_request = handle_request;
