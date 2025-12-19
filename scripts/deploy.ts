// scripts/deploy.ts
import { network } from "hardhat";

async function main() {
  console.log("Starting deployment of Counter contract to Sepolia network...");

  // 1. Connect to network (using the network specified at startup)
  const { viem } = await network.connect();
  
  // 2. Get deployment account information
  const [deployer] = await viem.getWalletClients();
  console.log("Deployment account address:", deployer.account.address);
  
  // 3. Check account balance
  const publicClient = await viem.getPublicClient();
  const balance = await publicClient.getBalance({
    address: deployer.account.address,
  });
  console.log("Account balance:", balance.toString(), "wei");
  
  // 4. Deploy contract (this is the key step!)
  // deployContract will automatically wait for transaction confirmation
  console.log("Deploying contract...");
  const counter = await viem.deployContract("Counter");
  
  // 5. Output contract address (important!)
  console.log("✅ Contract deployed successfully!");
  console.log("📝 Contract address:", counter.address);
  
  // 6. Verify deployment - confirm deployment success by reading contract state
  console.log("Verifying deployment...");
  const currentValue = await counter.read.x();
  console.log("📊 Contract initial value x =", currentValue.toString());
  
  // 7. Output Etherscan link for easy viewing
  console.log("\n🌐 View contract on Etherscan:");
  console.log(`https://sepolia.etherscan.io/address/${counter.address}`);
}

// Execute main function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });