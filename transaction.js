const apiKey = "9d44ptb7a1d3ecuba1mq4jkq85q70j28crv4rc2n9hbjykujcxtqmjvb6x8k0gbfat75mn2e714kgh37c9n2yw3k9n64gr9jdnc66jvh6d8n4bu98dv2pmbp9517gj3c9h6pjvana4yku9mr6pchked1pwgtj9hr5jd34a4b15prm3qe5q4amjcehw7ev9jd5bp2xan6h8kuf8";
async function test()
{
	const response = await fetch(`https://pumpportal.fun/api/trade?api-key=${apiKey}`, {
                                method: "POST",
                                headers: {
                                        "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                        "action": "sell",            // "buy" or "sell"
                                        "mint": "9hTeb4bwrAbn6Xb1wbTyEm36WfW16BEybHwyNJqzxbbQ",                   // contract address of the token you want to trade
                                        "amount": "100%",             // amount of SOL or tokens to trade
                                        "denominatedInSol": "true", // "true" if amount is SOL, "false" if amount is tokens
                                        "slippage": 2,             // percent slippage allowed
                                        "priorityFee": 0.0003,       // amount to use as Jito tip or priority fee
                                        "pool": "pump"              // exchange to trade on. "pump" or "raydium"
                                })
                        });
                        const data = await response.json();
                        if(data.errors.length > 0){
                                console.log(data.errors);
                        } else {
                                console.log("Sell Transaction: https://solscan.io/tx/" + data.signature)
                        }
}
test();
