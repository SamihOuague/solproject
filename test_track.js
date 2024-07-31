const WebSocket = require('ws');

const ws = new WebSocket('wss://pumpportal.fun/api/data');

ws.on('open', function open() {
  // Subscribing to trades made by accounts
/*  payload = {
      method: "subscribeAccountTrade",
      keys: ["AArPXm8JatJiuyEffuC1un2Sc835SULa4uQqDcaGpAjV"] // array of accounts to watch
    }
  ws.send(JSON.stringify(payload));
*/
  // Subscribing to trades on tokens
  payload = {
      method: "subscribeTokenTrade",
      keys: ["3bRTivrVsitbmCTGtqwp7hxXPsybkjn4XLNtPsHqa3zR"] // array of token CAs to watch
    }
  ws.send(JSON.stringify(payload));
});

ws.on('message', function message(data) {
  console.log(JSON.parse(data));
});
