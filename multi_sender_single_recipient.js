require('dotenv').config();
const fs = require('fs');
const { ethers } = require('ethers');
const { mean, std: standardDeviation } = require('mathjs');

(async () => {
  const provider = new ethers.JsonRpcProvider(process.env.RPC);
  
  // A) Creates a new wallet (the Recipient)
  const recipient = ethers.Wallet.createRandom();
  const recipientWithProvider = recipient.connect(provider);
  console.log(`New Recipient Wallet Address: ${recipientWithProvider.address}`);

  // B) Parse the wallets.json file
  const walletsData = JSON.parse(fs.readFileSync('wallets.json', 'utf8'));
  let times = [];

  for (const walletData of walletsData) {
    const senderWallet = new ethers.Wallet(walletData.privateKey).connect(provider);
    
    // Start timer
    const startTime = process.hrtime();

    // Transfer 0.9 ETH to the Recipient and wait for confirmation
    const tx = await senderWallet.sendTransaction({
      to: recipientWithProvider.address,
      value: ethers.parseEther('0.9')
    });
    await tx.wait();

    // End timer
    const endTime = process.hrtime(startTime);
    const elapsedTime = endTime[0] * 1000 + endTime[1] / 1e6; // Convert to milliseconds
    times.push(elapsedTime);

    console.log(`Transaction from ${senderWallet.address} confirmed in ${elapsedTime} ms`);
  }

  // C) Print the average time and the standard deviation of the times taken for the transactions
  const timesMean = mean(times);
  const timesStdDev = standardDeviation(times);

  console.log(`Average confirmation time: ${timesMean} ms`);
  console.log(`Standard deviation of confirmation time: ${timesStdDev} ms`);
})();

