// console.log("Hello from Solana Agent Kit!");

// import { SolanaAgentKit, createSolanaTools } from "solana-agent-kit";

// // Initialize with private key and optional RPC URL
// const agent = new SolanaAgentKit(
//   "private_key",
//   "rpc_url",
//   "openai_api_key"
// );

// console.log(agent);

// // Create LangChain tools
// const tools = createSolanaTools(agent);

// console.log(tools);

// // Test the token data tool
// const WRAPPED_SOL_MINT = "So11111111111111111111111111111111111111112";
// const tokenTool = tools.find(tool => tool.name === "solana_token_data");

// // Use the tool to fetch token data
// if (tokenTool) {
//   tokenTool.call(WRAPPED_SOL_MINT)
//     .then(result => console.log("Token Data:", result))
//     .catch(error => console.error("Error:", error));
// }


import { SolanaAgentKit, createSolanaTools } from "solana-agent-kit";
import { fetchWithProxy } from "./utils/api";

export class SolanaToolsManager {
  private agent: SolanaAgentKit;
  private tools: any[];
  private PROXY_URL = 'http://localhost:3001';


  constructor(privateKey: string, rpcUrl: string, openaiKey: string) {
    this.agent = new SolanaAgentKit(
      privateKey, 
      rpcUrl, 
      openaiKey,
    );
    const originalFetch = global.fetch;
    global.fetch = async (url: string | URL | Request, init?: RequestInit): Promise<Response> => {
      if (typeof url === 'string' && url.includes('tokens.jup.ag')) {
        return fetchWithProxy(url) as Promise<Response>;
      }
      return originalFetch(url, init);
    };
    this.tools = createSolanaTools(this.agent);
    
  }

  

  private async getToolByName(name: string) {
    const tool = this.tools.find(t => t.name === name);
    if (!tool) {
      throw new Error(`Tool ${name} not found`);
    }
    return tool;
  }

  async getTokenData(mintAddress: string) {
    const tokenTool = await this.getToolByName("solana_token_data");
    return tokenTool.call(mintAddress);
  }

  async getTokenPrice(tokenId: string) {
    const priceTool = await this.getToolByName("solana_fetch_price");
    return priceTool.call(tokenId);
  }

  async resolveDomain(domain: string) {
    const domainTool = await this.getToolByName("solana_resolve_domain");
    return domainTool.call(domain);
  }

  async getDomainByAccount(account: string) {
    const getDomainTool = await this.getToolByName("solana_get_domain");
    return getDomainTool.call(account);
  }

  async stakeSOL(amount: number) {
    const stakeTool = await this.getToolByName("solana_stake");
    return stakeTool.call(JSON.stringify({ amount }));
  }

  async createWhirlpool(params: {
    depositTokenAmount: number;
    depositTokenMint: string;
    otherTokenMint: string;
    initialPrice: number;
    maxPrice: number;
    feeTier: number;
  }) {
    const whirlpoolTool = await this.getToolByName("create_orca_single_sided_whirlpool");
    return whirlpoolTool.call(JSON.stringify(params));
  }

  async airdropTokens(params: {
    mintAddress: string;
    amount: number;
    decimals: number;
    recipients: string[];
    priorityFeeInLamports?: number;
    shouldLog?: boolean;
  }) {
    const airdropTool = await this.getToolByName("solana_compressed_airdrop");
    return airdropTool.call(JSON.stringify(params));
  }

  async createRaydiumPool(params: {
    mint1: string;
    mint2: string;
    configId: string;
    mintAAmount: number;
    mintBAmount: number;
    startTime: number;
  }) {
    const cpmmTool = await this.getToolByName("raydium_create_cpmm");
    return cpmmTool.call(JSON.stringify(params));
  }
}

// Example usage
async function main() {
  const manager = new SolanaToolsManager(
    "private_key",
    "rpc_url",
    "openai_api_key"
  );

  try {
    // Example 1: Get token data and price
    const WRAPPED_SOL_MINT = "So11111111111111111111111111111111111111112";
    const tokenData = await manager.getTokenData(WRAPPED_SOL_MINT);
    console.log("Wrapped SOL Data:", tokenData);

    const tokenPrice = await manager.getTokenPrice(WRAPPED_SOL_MINT);
    console.log("Wrapped SOL Price:", tokenPrice);

    // // Example 2: Domain resolution
    // const domainAddress = await manager.resolveDomain("bonfida.sol");
    // console.log("Bonfida Domain Address:", domainAddress);

    // Example 3: Create a Raydium pool (ensure you have the correct parameters)
    const poolParams = {
      mint1: "mint1Address",
      mint2: "mint2Address",
      configId: "configIdAddress",
      mintAAmount: 1000000,
      mintBAmount: 1000000,
      startTime: Math.floor(Date.now() / 1000)
    };
    // const poolResult = await manager.createRaydiumPool(poolParams);
    // console.log("Raydium Pool Creation Result:", poolResult);

    // Example 4: Stake SOL
    // const stakeResult = await manager.stakeSOL(1);
    // console.log("Stake Result:", stakeResult);

  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the example
main().catch(console.error);