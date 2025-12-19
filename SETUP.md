# Configuration Guide - Setting Up Sepolia Network

## Problem
When running the deployment script, you encounter an error:
```
Configuration Variable "SEPOLIA_RPC_URL" not found
```

## Solution (Recommended: Using dotenv)

The project is already configured to support `.env` files! Just create a `.env` file and fill in the configuration.

### Step 1: Create .env file

Create a `.env` file in the project root directory:

```bash
# Copy the example file
cp .env.example .env
```

Or manually create a `.env` file with the following content:

```bash
# Sepolia Network Configuration
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
SEPOLIA_PRIVATE_KEY=0xYOUR_PRIVATE_KEY
```

### Step 2: Fill in actual values

Edit the `.env` file and replace the following values:

1. **SEPOLIA_RPC_URL**: Your Sepolia RPC endpoint
   - Infura: `https://sepolia.infura.io/v3/YOUR_PROJECT_ID`
   - Alchemy: `https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY`

2. **SEPOLIA_PRIVATE_KEY**: Your wallet private key (64-character hexadecimal string starting with 0x)

⚠️ **Important format tips**:
- ✅ **Correct format**: `SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your_key`
- ❌ **Wrong format**: `SEPOLIA_RPC_URL="https://..."` (do not use quotes)
- ❌ **Wrong format**: `SEPOLIA_RPC_URL=<https://...>` (do not use angle brackets)
- ❌ **Wrong format**: `SEPOLIA_RPC_URL= https://...` (no space after equals sign)

The `.env` file should be in plain text format, with values directly following the equals sign, without any quotes, angle brackets, or extra spaces.

### Step 3: Run deployment

```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

## Alternative Methods (Optional)

### Method 1: Using hardhat-keystore

```bash
npx hardhat keystore set SEPOLIA_RPC_URL
npx hardhat keystore set SEPOLIA_PRIVATE_KEY
```

### Method 2: Using environment variables (temporary)

```bash
export SEPOLIA_RPC_URL="https://sepolia.infura.io/v3/YOUR_PROJECT_ID"
export SEPOLIA_PRIVATE_KEY="0xYOUR_PRIVATE_KEY"
npx hardhat run scripts/deploy.ts --network sepolia
```

## How to Get Sepolia RPC URL

### Option 1: Infura (Free)
1. Visit https://infura.io/
2. Register an account and create a project
3. Select Sepolia network
4. Copy the HTTPS URL

### Option 2: Alchemy (Free)
1. Visit https://www.alchemy.com/
2. Register an account and create an app
3. Select Sepolia network
4. Copy the HTTP URL

### Option 3: Public RPC (Not recommended for production)
- https://rpc.sepolia.org
- https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161

## How to Get Sepolia ETH

Deploying contracts requires Sepolia ETH for gas fees. You can obtain it from the following faucets:

1. **Alchemy Sepolia Faucet**: https://sepoliafaucet.com/
2. **Infura Sepolia Faucet**: https://www.infura.io/faucet/sepolia
3. **QuickNode Faucet**: https://faucet.quicknode.com/ethereum/sepolia

## Security Tips

⚠️ **Important**:
- Never commit private keys to Git
- Do not use mainnet private keys in production
- The `.env` file is already in `.gitignore` and will not be committed
- Use testnet private keys for development

## Verify Configuration

After setup, run the deployment script to verify:

```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

If configured correctly, you should see:
- Deployment account address
- Account balance
- Contract deployment success message
- Contract address
