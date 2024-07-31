const { WebSocket, WebSocketServer } = require("ws");
const fs = require('node:fs');

const BITQUERY_WS_URL = "wss://streaming.bitquery.io/eap?token=ory_at_mLJPr16Fr8-u-g1vxmcL5wSsnQ9PALyTjTZzsx72NtQ.PXHJICl_POdZtSQGdAbGFC3tVHdAcjM_Xzb4Rl0QlK0";

const bitqueryConnection = new WebSocket(
  BITQUERY_WS_URL,
  ["graphql-ws"],
  {
    headers: {
      "Sec-WebSocket-Protocol": "graphql-ws",
      "Content-Type": "application/json",
    },
  }
);

let history = [];

bitqueryConnection.on("open", () => {
  console.log("Connected to Bitquery.");

  // Send initialization message
  const initMessage = JSON.stringify({ type: "connection_init" });
  bitqueryConnection.send(initMessage);

  // After initialization, send the actual subscription message
  setTimeout(() => {
    const message = JSON.stringify({
      id: "1",
      type: "start",
      payload: {
        query: `
        subscription {
          Solana {
            DEXTradeByTokens(
            limit: {count: 1}
            orderBy: {descending: Block_Time}
            where: {Trade: {Currency: {MintAddress: {is: "So11111111111111111111111111111111111111112"}}, Side: {Currency: {MintAddress: {is: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"}}}}}
            ) {
              Block {
                Time
              }
              Trade {
                Price
              }
            }
          }
        }
        `
      },
    });
    bitqueryConnection.send(message);
  }, 1000);
});

bitqueryConnection.on("message", (data) => {
  const response = JSON.parse(data);
  if (response.type == "data") {
    // Broadcast the data to all connected clients of your local server
    let info = response.payload.data.Solana.DEXTradeByTokens;
    //console.log({"Time": Date.parse(info[0].Block.Time), "Price": info[0].Trade.Price});
    history = [...history, {"Time": Date.parse(info[0].Block.Time), "Price": info[0].Trade.Price}]
    if (Date.parse(info[0].Block.Time) % 60000 == 0 && !fs.existsSync(`./charts/${info[0].Block.Time}.json`)) { 
      fs.writeFile(`./charts/${info[0].Block.Time}.json`, JSON.stringify(history), (err) => {
        if (err)
          console.log("Error while writing !");
        else
          console.log(`${info[0].Block.Time}.json created.`);
      });
      history = [];
    }
    // Close the connection after receiving data
    //bitqueryConnection.close();
  }
});

bitqueryConnection.on("close", () => {
  console.log("Disconnected from Bitquery.");
});

bitqueryConnection.on("error", (error) => {
  console.error("WebSocket Error:", error);
});
