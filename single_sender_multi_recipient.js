require('dotenv').config();
const { ethers } = require('ethers');
const { mean, std: standardDeviation } = require('mathjs');
const fs = require('fs');

(async () => {
  rpc = process.env.RPC
  prefunded_key = process.env.PREFUNDED_KEY
  
  // Connect to the Ethereum network
  const provider = new ethers.JsonRpcProvider(rpc); // Change to your local node RPC URL

  // Create The Sender wallet
  const theSender = ethers.Wallet.createRandom().connect(provider);

  // Transfer 110 ETH from the prefunded wallet to The Sender
  const prefundedWallet = new ethers.Wallet(prefunded_key, provider);
 
  let tx = await prefundedWallet.sendTransaction({
    to: theSender.address,
    value: ethers.parseEther('110')
  });
  await tx.wait();

  // Create 100 more wallet addresses
  const wallets = Array.from({ length: 100 }, () => ethers.Wallet.createRandom());

  // Prepare the wallet data to be JSON-serialized
  const walletData = wallets.map(wallet => {
    return {
      address: wallet.address,
      privateKey: wallet.privateKey
    };
  });

  // Convert the wallet data to a JSON string
  const walletDataJson = JSON.stringify(walletData, null, 2);

  // Write the JSON string to a local file named 'wallets.json'
  fs.writeFileSync('wallets.json', walletDataJson);

  console.log('Wallets and private keys have been saved to wallets.json');

  // Transfer 1 ETH to each wallet and measure the time
  let times = [];
  for (const wallet of wallets) {
    const startTime = process.hrtime();
    tx = await theSender.sendTransaction({
      to: wallet.address,
      value: ethers.parseEther('1')
    });
    await tx.wait();
    const endTime = process.hrtime(startTime);
    const elapsedTime = endTime[0] * 1000 + endTime[1] / 1e6; // Convert to milliseconds
    times.push(elapsedTime);
    console.log(`Transaction to ${wallet.address} confirmed in ${elapsedTime} ms`);
  }

  // Calculate mean and standard deviation
  const timesMean = mean(times);
  const timesStdDev = standardDeviation(times);

  console.log(`Mean confirmation time: ${timesMean} ms`);
  console.log(`Standard deviation of confirmation time: ${timesStdDev} ms`);
})();

