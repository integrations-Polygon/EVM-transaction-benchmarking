require('dotenv').config();
const { ethers } = require('ethers');

(async () => {
  try {
    // Connect to the Ethereum network
    const provider = new ethers.JsonRpcProvider(process.env.RPC);

    // Create a new wallet instance using the prefunded account's private key
    const prefundedWallet = new ethers.Wallet('ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', provider);

    // Fetch the balance of the prefunded account
    const balance = await provider.getBalance(prefundedWallet.address);

    // Print the balance in ether
    console.log(`Balance of the prefunded account is: ${ethers.formatEther(balance)} ETH`);
  } catch (error) {
    console.error(error);
  }
})();

