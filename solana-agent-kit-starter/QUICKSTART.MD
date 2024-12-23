# Quick Start Guide

This guide will help you get started with Solana Agent Kit quickly.

## 1. Basic Setup

First, ensure you have all prerequisites installed and your environment configured:
```
pnpm install
cp .env.example .env
```


## 2. Configure Environment

Add the following to your `.env` file:
```
SOLANA_PRIVATE_KEY=your_private_key_here
OPENAI_API_KEY=your_openai_api_key_here
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```


## 3. Basic Usage

Here's a simple example to get started:
```
import { SolanaAgentKit, createSolanaTools } from "solana-agent-kit";
// Initialize the agent
const agent = new SolanaAgentKit(
process.env.SOLANA_PRIVATE_KEY,
process.env.SOLANA_RPC_URL,
process.env.OPENAI_API_KEY
);
// Create LangChain tools
const tools = createSolanaTools(agent);
// Example: Fetch token data
const WRAPPED_SOL_MINT = "So11111111111111111111111111111111111111112";
const tokenTool = tools.find(tool => tool.name === "solana_token_data");
if (tokenTool) {
const tokenData = await tokenTool.call(WRAPPED_SOL_MINT);
console.log("Token Data:", tokenData);
}
```


## 4. Available Tools

The kit provides several tools out of the box:
- Token Data Fetching
- (List other available tools here)

## 5. Common Operations

### Fetching Token Data
```
const tokenTool = tools.find(tool => tool.name === "solana_token_data");
const tokenData = await tokenTool.call(mintAddress);
```

### (Add other common operations)

## 6. Next Steps

- Explore the documentation in the `docs/` directory
- Check out the test files for more usage examples
- Join our community (Add community links)

## 7. Troubleshooting

Common issues and their solutions:
1. RPC Connection Issues: Ensure your RPC URL is correct and accessible
2. Authentication Errors: Verify your API keys are properly set in .env
3. (Add other common issues)

For more detailed information, refer to the full documentation.