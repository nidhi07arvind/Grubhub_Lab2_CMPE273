//OwnerALLORDERS
app.get("/all-orders", (req, res) => {
  console.log("Inside all orders");
  if (req.session.userEmail) {
    pool.getConnection((err, conn) => {
      if (err) {
        console.log("Error while creating connection");
        res.writeHead(500, {
          "Content-type": "text/plain"
        });
        res.end("Error while creating connection");
      } else {
        const sql1 =
          "SELECT r.restId from restaurants r, users u WHERE u.userId = r.userId and u.userEmail = " +
          mysql.escape(req.session.userEmail) +
          "and u.accountType = " +
          2;
        console.log("sql1---" + sql1);
        conn.query(sql1, (err, result1) => {
          if (err) {
            console.log("Error in retrieving Restaurant Id");
            res.writeHead(400, {
              "Content-type": "text/plain"
            });
            res.end("Error in retrieving Restaurant Id");
          } else {
            const sql2 =
              "SELECT o.*, u.userAddress, u.userName from orders o, users u where o.userEmail = u.userEmail and o.restId = " +
              mysql.escape(result1[0].restId);
            conn.query(sql2, (err, result2) => {
              if (err) {
                console.log(err);
                res.writeHead(400, {
                  "Content-type": "text/plain"
                });
                res.end("Error in displaying all orders");
              } else {
                res.writeHead(200, {
                  "Content-type": "application/json"
                });
                console.log("Displayed all orders");
                console.log(result2);

                var lookUp = {};
                var uniqueOrders = [];
                for (var item, j = 0; (item = result2[j++]); ) {
                  var orderIdTemp = item.orderId;

                  if (!(orderIdTemp in lookUp)) {
                    lookUp[orderIdTemp] = 1;
                    uniqueOrders.push(orderIdTemp);
                  }
                }
                console.log(uniqueOrders);

                var finalOrders = [];
                var temp = [];
                for (var k = 0; k < uniqueOrders.length; k++) {
                  for (var l = 0; l < result2.length; l++) {
                    if (uniqueOrders[k] === result2[l].orderId) {
                      temp.push(result2[l]);
                    }
                  }
                  if (!temp.length == 0) {
                    finalOrders.push({
                      orderId: uniqueOrders[k],
                      userOrder: temp
                    });
                    temp = [];
                  }
                }
                console.log(JSON.stringify(finalOrders));
                res.end(JSON.stringify(finalOrders));
              }
            });
          }
        });
      }
    });
  }
});
