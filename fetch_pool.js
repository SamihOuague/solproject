const { Connection, PublicKey } = require('@solana/web3.js');
const { RAYDIUM_PROGRAM_ID, RAYDIUM_PROGRAM_ID_V2 } = require('@raydium-io/raydium-sdk');

// Define the Raydium program IDs
const RAYDIUM_V2_PROGRAM_ID = new PublicKey('4k3Dyj2BvdmTskP2GTwD2D6EXnqB2j9LExbP7ck5B5UB');

// Function to fetch pools
async function fetchRaydiumPools() {
    const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');
    const programId = RAYDIUM_V2_PROGRAM_ID;

    // Fetch all accounts owned by the Raydium program
    const { value: accounts } = await connection.getProgramAccounts(programId, {
        filters: [
            {
                dataSize: 165 // Size of the pool account data (this can vary)
            }
        ]
    });

    // Process and log pool information
    console.log('Raydium Pools:');
    for (const account of accounts) {
        const poolData = account.account.data;
        const poolAddress = account.pubkey.toBase58();
        
        // Decode and interpret the pool data here
        // For demonstration, we are simply printing out the raw data
        console.log(`Pool Address: ${poolAddress}`);
        console.log(`Pool Data (raw): ${poolData.toString('hex')}`);
        console.log('');
    }
}

fetchRaydiumPools().catch(err => {
    console.error('Error fetching Raydium pools:', err);
});