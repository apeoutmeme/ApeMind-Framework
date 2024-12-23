# Solana Agent Kit - QuikStart Project [PNMP]

## What is Solana Agent Kit?
Connect AI agents to Solana protocols.
https://github.com/sendaifun/solana-agent-kit

## What is the Solana Agent Kit QuikStarter? 
An easy way to get started with the Solana Agent Kit if you are integrating it into your project and want to optimize for the best chances to get started quickly with no depedency issues etc.

This project is optimized to get install solana agent with no fuss/hassle!
Just clone, install and run.

# Efficient Package Management with pnpm

## Why Choose `pnpm`?

### 1. Disk-Space Efficiency
- `pnpm` is more disk-space efficient compared to `npm` or `yarn`.
- It creates a **single storage** for all package versions across projects, reducing duplication.

### 2. Faster Installation Times
- Enjoy faster dependency installation times compared to `npm`.

---

## Ready-to-Use Solana Integration

### Key Benefits:
- **Pre-Configured Setup**:
  - Easily connect AI agents to Solana protocols without hassle.
- **Time-Saving**:
  - Reduces initial setup time and minimizes configuration complexity.
- **Built-In Solana Protocol Compatibility**:
  - Seamlessly integrates with Solana-based systems.

---

## Developer-Friendly Setup

### Simple and Efficient:
- Install dependencies with a single command:
  `pnpm install`

- Run the project with:
`pnpm dev `



## Requirements
- Node.js >= 23.1.0
- pnpm >= 8.0.0

## Installation

```bash
pnpm install
```

Now you have several ways to work with the project:
1. Start the development server:
```bash
pnpm dev
```
2. Watch Mode (Auto-compile and restart on file changes)
```bash
pnpm watch
```
3. Build and run the project:
```bash
pnpm build
pnpm run
```
For active development, I recommend setting up your editor (VSCode or similar) with these extensions:

TypeScript support
ESLint
Prettier (for formatting)

## Quick development workflow tips:
1. Copy .env.example to .env and fill in your keys:
```bash
cp .env.example .env
```
2. Watch Mode (Auto-compile and restart on file changes)
```bash
pnpm watch
```
(In another terminal)
`pnpm dev`

3. Run tests while developing:

`pnpm test`

4. Build and run the project:
```bash
pnpm build
pnpm run
```

5. Generate documentation as needed:
```bash
pnpm docs
```


## License

ISC




## Trouleshooting and Initial Setup 
1. Make/check for these updates to your package.json:
```
{
  "scripts": {
    "build": "tsc",
    "docs": "typedoc src --out docs",
    "test": "ts-node test/index.ts",
    "generate": "ts-node src/utils/keypair.ts",
    "dev": "ts-node src/index.ts",      // New script for development
    "watch": "tsc --watch"              // New script for watch mode
  }
}
``` 
This enables you to run the project with `pnpm dev` and watch for changes with `pnpm watch`.

2. Error: 
```
ts-node: command not found
```
- Install ts-node 
`pnpm add -g ts-node`

- use the locally installed ts-node through pnpm exec
`pnpm exec ts-node src/index.ts`
 update the package.json scripts to use the local installation


Error #2
 ```
 ERR_PNPM_RECURSIVE_EXEC_FIRST_FAIL  Command failed with EACCES: src/index.ts
spawn src/index.ts EACCES
 ELIFECYCLE  Command failed with exit code 243.
```

Make sure the file has the right permissions:
`chmod +x src/index.ts`

Let's also ensure all dependencies are properly installed:
`pnpm install ts-node typescript @types/node --save-dev`

If still not working, try: 
Update the package.json scripts to use this:
```
"scripts": {
  "dev": "node -r ts-node/register ./src/index.ts"
}
```
The -r ts-node/register flag tells Node.js to:

-r: Require/preload a module
`ts-node/register`: Use ts-node's registration hook to process TypeScript files


## Demo 

Outputs: 
```
Token Data: {"status":"success","tokenData":{"address":"So11111111111111111111111111111111111111112","name":"Wrapped SOL","symbol":"SOL","decimals":9,"logoURI":"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png","tags":["community","strict","verified"],"daily_volume":2896590976.425787,"created_at":"2024-04-26T10:56:58.893768Z","freeze_authority":null,"mint_authority":null,"permanent_delegate":null,"minted_at":null,"extensions":{"coingeckoId":"wrapped-solana"}}}
```

## Reference 
```
Core Functions

deploy_token(agent, decimals?, name, uri, symbol, initialSupply?)
Deploy a new SPL token with optional initial supply. If not specified, decimals default to 9.

deploy_collection(agent, options)
Create a new NFT collection with customizable metadata and royalties.

mintCollectionNFT(agent, collectionMint, metadata, recipient?)
Mint a new NFT as part of an existing collection.

transfer(agent, to, amount, mint?)
Transfer SOL or SPL tokens to a recipient.

trade(agent, outputMint, inputAmount, inputMint?, slippageBps?)
Swap tokens using Jupiter Exchange integration.

get_balance(agent, token_address)
Check SOL or token balance for the agent's wallet.

lendAsset(agent, assetMint, amount, apiKey)
Lend idle assets to earn interest with Lulo.

stakeWithJup(agent, amount)
Stake SOL with Jupiter to earn rewards.

sendCompressedAirdrop(agent, mintAddress, amount, recipients, priorityFeeInLamports?, shouldLog?)
Send an SPL token airdrop to many recipients at low cost via ZK Compression.

console.log("Hello from Solana Agent Kit!");
```

## Demo 
Deploying Test Tokens
![Deploying Test Tokens](https://github.com/apeoutmeme/resources/blob/main/assets/Starter-Demo/Deploying-Test-Tokens.png?raw=true)

Get Token Data
![Get Token Data](https://github.com/apeoutmeme/resources/blob/main/assets/Starter-Demo/GetTokenData.png?raw=true)

Test Token Data Tool
![Test Token Data Tool](https://github.com/apeoutmeme/resources/blob/main/assets/Starter-Demo/GetTokenDataTest.png?raw=true)

Get Domain Tool 
![Get Domain Tool](https://github.com/apeoutmeme/resources/blob/main/assets/Starter-Demo/SolanaGetDomainTool.png?raw=true)
