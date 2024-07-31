const { Connection, PublicKey, clusterApiUrl } = require('@solana/web3.js');
const { AccountLayout } = require('@solana/spl-token');
const bs58 = require('bs58');

async function main() {
    // Replace with your token account public key
    const TOKEN_ACCOUNT_PUBLIC_KEY = new PublicKey('So11111111111111111111111111111111111111112');

    // Connect to the Solana devnet cluster via WebSocket
    const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');

    // Subscribe to token account changes
    connection.onAccountChange(TOKEN_ACCOUNT_PUBLIC_KEY, (updatedAccountInfo, context) => {
         const accountData = Buffer.from(updatedAccountInfo.data);
        const accountInfo = AccountLayout.decode(accountData);

        // Extract the token balance
        const tokenBalance = accountInfo.amount;

        console.log('Token account updated. New balance:', tokenBalance.toString());
        console.log('Context:', context);
    });

    console.log('Subscribed to token account changes for:', TOKEN_ACCOUNT_PUBLIC_KEY.toString());
}

main().catch((err) => {
    console.error(err);
});