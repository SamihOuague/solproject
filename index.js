const WebSocket = require('ws');

const ws = new WebSocket('wss://pumpportal.fun/api/data');

const apiKey = "9d44ptb7a1d3ecuba1mq4jkq85q70j28crv4rc2n9hbjykujcxtqmjvb6x8k0gbfat75mn2e714kgh37c9n2yw3k9n64gr9jdnc66jvh6d8n4bu98dv2pmbp9517gj3c9h6pjvana4yku9mr6pchked1pwgtj9hr5jd34a4b15prm3qe5q4amjcehw7ev9jd5bp2xan6h8kuf8"

let nbr = 0;

async function buyCoin(mint, amount) {
	const response = await fetch(`https://pumpportal.fun/api/trade?api-key=${apiKey}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			"action": "buy",            // "buy" or "sell"
			"mint": mint,     // contract address of the token you want to trade
			"amount": amount,             // amount of SOL or tokens to trade
			"denominatedInSol": "true", // "true" if amount is SOL, "false" if amount is tokens
			"slippage": 50,             // percent slippage allowed
			"priorityFee": 0.0005,       // amount to use as Jito tip or priority fee
			"pool": "pump"              // exchange to trade on. "pump" or "raydium"
		})
	});
	const data = await response.json();
	if(data.errors.length > 0){
		nbr = nbr - 1;
        	console.log(data.errors);
    	} else {
    		console.log("Buy Transaction: https://solscan.io/tx/" + data.signature)
		console.log("https://pump.fun/" + mint);
		/*setTimeout(async () => {
			const response = await fetch(`https://pumpportal.fun/api/trade?api-key=${apiKey}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					"action": "sell",            // "buy" or "sell"
					"mint": mint,     		// contract address of the token you want to trade
					"amount": "100%",             // amount of SOL or tokens to trade
					"denominatedInSol": "true", // "true" if amount is SOL, "false" if amount is tokens
					"slippage": 50,             // percent slippage allowed
					"priorityFee": 0.0005,       // amount to use as Jito tip or priority fee
					"pool": "pump"              // exchange to trade on. "pump" or "raydium"
				})
			});
			const data = await response.json();
			if(data.errors.length > 0){
        			console.log(data.errors);
    			} else {
        			console.log("Sell Transaction: https://solscan.io/tx/" + data.signature)
				nbr = nbr - 1;
			}
		}, 30000);*/
	}
}

async function scanProject(data)
{
	if (data.bounding)
		console.log(data);
}

ws.on('open', function open() {
  	// Subscribing to token creation events
	let payload = {
		method: "subscribeNewToken", 
	};
	ws.send(JSON.stringify(payload));
});


ws.on('message', function message(data) {
	let d = JSON.parse(data);
	
	if (d.mint)
	{
		scanProject(d);
		//buyCoin(d.mint, 0.01);
		nbr += 1;
	}
});
