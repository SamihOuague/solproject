const { WebSocket } = require("ws");
const bs58 = require("bs58")
const { LIQUIDITY_STATE_LAYOUT_V4 } = require("@raydium-io/raydium-sdk");
const { PublicKey } = require("@solana/web3.js");

const uri = "api.mainnet-beta.solana.com";
const solanaConnection = new WebSocket(`ws://${uri}`, {
	headers: {
		"Content-Type": "application/json",
	},
});

async function getTokenBalance(vault, decimals) {
	const balance = await (await fetch(`https://${uri}`, {
  		method: "POST",
  		headers: {
  			"Content-Type": "application/json"
  		},
  		body: JSON.stringify({
    			jsonrpc: "2.0", id: 1,
    			method: "getTokenAccountBalance",
    			params: [vault.toString()]
		}),
  	})).json();
	console.log(balance);
	return parseFloat(balance.result.value.amount) / Math.pow(10, decimals); // Adjust the balance for the token's decimals*/
}


async function parsePoolInfo(data) {  
  	// Assuming the structure was successfully decoded
	const poolState = LIQUIDITY_STATE_LAYOUT_V4.decode(data);
  
  	// Directly use the specific decimals for SOL and USDC
	const baseTokenDecimals = 9; // Decimals for SOL
	const quoteTokenDecimals = 6; // Decimals for USDC
	//console.log(poolState.swapBaseInAmount); 
	//const baseTokenBalance = await getTokenBalance(poolState.baseVault, baseTokenDecimals);
	//const quoteTokenBalance = await getTokenBalance(poolState.quoteVault, quoteTokenDecimals);
  
	// The calculation remains the same, but the clarification is that these decimals are now hardcoded
	//  const priceOfBaseInQuote = quoteTokenBalance / baseTokenBalance;
  
	//  console.log("Decoded Pool Data:", poolState);
	//console.log(`Price of 1 SOL in USDC: ${priceOfBaseInQuote.toFixed(4)}`); // Adjusted for decimals
}

solanaConnection.on("open", () => {
	console.log("Connected to solana websocket.");
	const message = {
		jsonrpc: "2.0",
		id: 1,
		method: "programSubscribe",
		params: [
			"CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK",
			{
				encoding: "jsonParsed",
			}
		]
	};
	solanaConnection.send(JSON.stringify(message));
});

solanaConnection.on("message", (response) => {
	let data = JSON.parse(response);

	console.log(data);
	if (data.params)
		console.log("2", data.params);
		//parsePoolInfo(Buffer.from(data.params.result.value.account.data[0], "base64"));
});

solanaConnection.on("close", () => {
	console.log("Connection closed.");
});

solanaConnection.on("error", (err) => {
	console.log("Websocket Error:", err);
});
