
const { Connection, PublicKey } = require("@solana/web3.js");
const { LIQUIDITY_STATE_LAYOUT_V4 } = require("@raydium-io/raydium-sdk");

const SOL_USDC_POOL_ID = "3DmorHzCLbqq9urh6qA4LX2Zqoie6DR4LvMXzBnety1S"; // Your pool ID

async function getTokenBalance(connection, vault, decimals) {
  const balance = await connection.getTokenAccountBalance(vault);
  return parseFloat(balance.value.amount) / Math.pow(10, decimals); // Adjust the balance for the token's decimals
}

async function parsePoolInfo() {
	const connection =  new Connection("https://api.mainnet-beta.solana.com", "confirmed");
	const info = await connection.getAccountInfo(new PublicKey(SOL_USDC_POOL_ID));
  	
	if (!info) return;
  	// Assuming the structure was successfully decoded
	const poolState = LIQUIDITY_STATE_LAYOUT_V4.decode(info.data);

  	// Directly use the specific decimals for SOL and USDC
	const baseTokenDecimals = poolState.baseDecimal.toString(10); // Decimals for SOL
	const quoteTokenDecimals = poolState.quoteDecimal.toString(10); // Decimals for USDC
  
	const baseTokenBalance = await getTokenBalance(connection, poolState.baseVault, baseTokenDecimals);
	const quoteTokenBalance = await getTokenBalance(connection, poolState.quoteVault, quoteTokenDecimals);
  
  	// The calculation remains the same, but the clarification is that these decimals are now hardcoded
	const priceOfBaseInQuote = quoteTokenBalance / baseTokenBalance;
	console.log(`Price: ${1 / priceOfBaseInQuote.toFixed(4)}`); // Adjusted for decimals
}

parsePoolInfo();
