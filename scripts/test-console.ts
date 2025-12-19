import { network } from "hardhat";

// Test connection to sepolia network
const { viem } = await network.connect({
  network: "sepolia",
});

const publicClient = await viem.getPublicClient();
const blockNumber = await publicClient.getBlockNumber();

console.log("Current block number:", blockNumber);

