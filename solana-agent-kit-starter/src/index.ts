console.log("Hello from Solana Agent Kit!");

import { SolanaAgentKit, createSolanaTools } from "solana-agent-kit";

// Initialize with private key and optional RPC URL
const agent = new SolanaAgentKit(
  "your-wallet-private-key",
  "https://api.mainnet-beta.solana.com",
  "your-openai-api-key"
);

console.log(agent);

// Create LangChain tools
const tools = createSolanaTools(agent);

console.log(tools);

// Test the token data tool
const WRAPPED_SOL_MINT = "So11111111111111111111111111111111111111112";
const tokenTool = tools.find(tool => tool.name === "solana_token_data");

// Use the tool to fetch token data
if (tokenTool) {
  tokenTool.call(WRAPPED_SOL_MINT)
    .then(result => console.log("Token Data:", result))
    .catch(error => console.error("Error:", error));
}
