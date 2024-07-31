const { PythConnection, getPythClusterApiUrl, parsePriceData } = require('@pythnetwork/client');
const { clusterApiUrl, Connection } = require('@solana/web3.js');

// Connect to the Solana mainnet cluster
const connection = new Connection(clusterApiUrl('mainnet-beta'));

async function main() {
    // Create a Pyth connection
    const pythConnection = new PythConnection(connection, getPythClusterApiUrl('mainnet-beta'));

    // Subscribe to price updates
    pythConnection.onPriceChange((product, price) => {
        console.log(`Product: ${product.symbol}: ${price.price}`);
    });

    // Start listening
    await pythConnection.start();

    console.log('Listening for price updates...');
}

main().catch((err) => {
    console.error(err);
});