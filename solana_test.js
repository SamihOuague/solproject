const { TOKEN_PROGRAM_ID } = require("@solana/spl-token");
const { clusterApiUrl, Connection } = require("@solana/web3.js");

(async () => {
	const MY_WALLET_ADDRESS = "FriELggez2Dy3phZeHHAdpcoEXkKQVkv6tx3zDtCVP8T";
	const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

	const accounts = await connection.getParsedProgramAccounts(
		TOKEN_PROGRAM_ID, // new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
		{
			filters: [
				{
					dataSize: 165, // number of bytes
				},
				{
					memcmp: {
						offset: 32, // number of bytes
						bytes: MY_WALLET_ADDRESS, // base58 encoded string
					},
				},
			],
	});
	console.log(`Found ${accounts.length} token account(s) for wallet ${MY_WALLET_ADDRESS}: `);
	accounts.forEach((account, i) => {
		console.log(`-- Token Account Address ${i + 1}: ${account.pubkey.toString()} --`);
		console.log(`Mint: ${account.account.data["parsed"]["info"]["mint"]}`);
		console.log(`Amount: ${account.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"]}`);
	});
});
