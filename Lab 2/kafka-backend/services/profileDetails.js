const { getConnectionMongo } = require("../dbs/index");

async function handle_request(message, callback) {
  console.log("Inside Kafka Backend Profile Details");
  console.log("Message: ", message);

  const { connection, client } = await getConnectionMongo();

  if (message.accounttype === 1) {
    connection
      .collection("buyer")
      .find({ email: message.email })
      .toArray(function(err, result) {
        if (err) callback(err, "Error");
        else {
          callback(null, result);
        }
      });
  } else {
    connection
      .collection("owner")
      .find({ email: message.email })
      .toArray(function(err, result) {
        if (err) callback(err, "Error");
        else {
          callback(null, result);
        }
      });
  }

  client.close();
}

/*if (req.session.user.accounttype === 1) {
    var collection = client.db("grubhub").collection("buyer");
    var query = { email: userSession.email };
  } else {
    var collection = client.db("grubhub").collection("owner");
    var query = { owner_id: userSession.owner_id };
  }
  console.log("Query is", query);
  collection.find(query).toArray(function(err, result) {
    if (err) callback(err, "Error");
    else {
      callback(null, result);
    }
  });

  client.close();
}*/

exports.handle_request = handle_request;
