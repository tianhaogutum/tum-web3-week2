// scripts/read-counter.ts
import { network } from "hardhat";

async function main() {
  // Get contract address from command line arguments
  // Hardhat will pass "run" as an argument, so we need to find the address starting with "0x"
  // Or pass it through the CONTRACT_ADDRESS environment variable
  let contractAddress = process.env.CONTRACT_ADDRESS || "0xf4d4c8553c9765bed5745ce95dd97cb657fad3ef";
  
  // Find if there's an address starting with "0x" in command line arguments
  const addressArg = process.argv.find(arg => arg.startsWith("0x") && arg.length === 42);
  if (addressArg) {
    contractAddress = addressArg;
  }
  
  console.log("🔍 Reading Counter contract state...");
  console.log("📝 Contract address:", contractAddress);
  
  // Connect to network
  const { viem } = await network.connect();
  
  // Get instance of deployed contract
  try {
    const counter = await viem.getContractAt("Counter", contractAddress as `0x${string}`);
    
    // Read the x value from the contract
    const xValue = await counter.read.x();
    
    console.log("✅ Read successful!");
    console.log("📊 Current value of x =", xValue.toString());
    
    // Get network name from command line arguments, or default to sepolia
    const networkIndex = process.argv.indexOf("--network");
    const networkName = networkIndex !== -1 && process.argv[networkIndex + 1] 
      ? process.argv[networkIndex + 1] 
      : "sepolia";
    
    // Output Etherscan link
    const explorerUrl = networkName === "sepolia" 
      ? `https://sepolia.etherscan.io/address/${contractAddress}`
      : `https://etherscan.io/address/${contractAddress}`;
    
    console.log("\n🌐 View contract on Etherscan:");
    console.log(explorerUrl);
  } catch (error: any) {
    console.error("❌ Read failed:", error.message);
    console.error("\nPossible causes:");
    console.error("1. Contract address is incorrect");
    console.error("2. Network configuration is incorrect");
    console.error("3. Contract does not exist or has been self-destructed");
    console.error("4. RPC URL configuration error or network connection issue");
    process.exit(1);
  }
}

// Execute main function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Execution failed:", error);
    process.exit(1);
  });
