require('dotenv').config();
const { ethers } = require('ethers');

(async () => {
  try {
    const prefunded_key = process.env.PREFUNDED_KEY;
    const rpc = process.env.RPC;

    // Connect to the Ethereum network
    const provider = new ethers.JsonRpcProvider(rpc);

    // Create a new wallet instance using the prefunded account's private key
    const prefundedWallet = new ethers.Wallet(prefunded_key, provider);

    // Fetch the balance of the prefunded account
    const balance = await provider.getBalance(prefundedWallet.address);

    // Print the balance in ether
    console.log(`Balance of the prefunded account is: ${ethers.formatEther(balance)} ETH`);
  } catch (error) {
    console.error(error);
  }
})();

