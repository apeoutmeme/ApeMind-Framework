import { SolanaToolsManager } from '../../src/index';
import { Buffer } from 'buffer';
import process from 'process';
import './polyfills';
import { generateMockAgents, generateMockMessage } from './mockData';
import { Agent, SimulationStats, ChatMessage } from '../../src/types/swarm';

window.global = window;
global.Buffer = Buffer;
global.process = process;

class SwarmSimulator {
  private manager: SolanaToolsManager;
  private isSimulating = false;
  private simulationInterval: NodeJS.Timeout | null = null;
  private currentPrice = 100; // Starting price
  private agents: Agent[] = [];
  private messages: ChatMessage[] = [];




  constructor() {
    this.manager = new SolanaToolsManager(
      "private_key",
      "rpc_url",
      "openai_api_key"
    );
    this.agents = generateMockAgents(500);

    this.initializeUI();
  }

  private initializeUI() {
    const mintInput = document.getElementById('mintAddress') as HTMLInputElement;
    const startButton = document.getElementById('startButton') as HTMLButtonElement;
    const statsDiv = document.getElementById('stats') as HTMLDivElement;
    const messagesDiv = document.getElementById('messages') as HTMLDivElement;

    startButton?.addEventListener('click', () => {
      if (this.isSimulating) {
        this.stopSimulation();
        startButton.textContent = 'Start Simulation';
      } else {
        this.startSimulation(mintInput.value);
        startButton.textContent = 'Stop Simulation';
      }
    });
  }

  private async startSimulation(tokenMint: string) {
    if (!tokenMint) return;
    this.isSimulating = true;

    try {
      const tokenData = await this.manager.getTokenData(tokenMint);
      console.log('Initial token data:', tokenData);

      this.simulationInterval = setInterval(() => {
        // Simulate price movement
        this.currentPrice *= (1 + (Math.random() - 0.5) * 0.02);
        
        // Generate messages from random agents
        const activeAgents = this.agents
          .sort(() => Math.random() - 0.5)
          .slice(0, 5);
        
        activeAgents.forEach(agent => {
          const message = generateMockMessage(agent, this.currentPrice);
          this.messages.push(message);
        });

        // Update UI
        this.updateStats();
        this.updateMessages();
      }, 1000);

    } catch (error) {
      console.error('Failed to start simulation:', error);
      this.stopSimulation();
    }
  }

  private stopSimulation() {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.isSimulating = false;
    }
  }

  private updateStats() {
    const statsDiv = document.getElementById('stats');
    if (statsDiv) {
      const stats: SimulationStats = {
        currentPrice: this.currentPrice,
        totalVolume: this.messages.length * this.currentPrice,
        activeTraders: this.agents.length,
        messageCount: this.messages.length
      };

      statsDiv.innerHTML = `
        <div style="margin: 10px 0; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 8px;">
          <div>Current Price: $${stats.currentPrice.toFixed(2)}</div>
          <div>Total Volume: $${stats.totalVolume.toFixed(2)}</div>
          <div>Active Traders: ${stats.activeTraders}</div>
          <div>Messages: ${stats.messageCount}</div>
        </div>
      `;
    }
  }





  private updateMessages() {
    const messagesDiv = document.getElementById('messages');
    if (messagesDiv) {
      const recentMessages = this.messages.slice(-100).reverse();
      messagesDiv.innerHTML = recentMessages.map(msg => `
        <div style="margin: 5px 0; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 4px;">
          <strong>${msg.persona}</strong> (${msg.agentId})<br/>
          ${msg.message}<br/>
          <small>${new Date(msg.timestamp).toLocaleTimeString()}</small>
        </div>
      `).join('');
      messagesDiv.scrollTop = 0;
    }
  }
}

  document.addEventListener('DOMContentLoaded', (): void => {
    new SwarmSimulator();
  });

// window.global = window;
// global.Buffer = Buffer;
// global.process = process;
// Initialize the manager
// const manager = new SolanaToolsManager(
//   // Use a valid private key or generate a new one
//   "4RkAueCZWtBafke42F8kkyeV2g48XkajDABcmzcCqRzVQhAY2YrKUgCYjf9DwsHiW9xFVzEXAZ9emDLMQFryaXkU",
//   // Use a different RPC endpoint with your API key
//   "https://mainnet.helius-rpc.com/?api-key=03227d28-b6de-4a36-9d90-cd0cc7c2f8eb",
//   // Your OpenAI API key
//   process.env.VITE_OPENAI_API_KEY || "your-openai-api-key"
// );

// function displayTokenData(response: any, resultDiv: HTMLElement) {
//     try {
//         // Check if the response contains data
//         if (!response) {
//             throw new Error('Invalid response structure: Missing data field');
//         }

//         // Display the entire response object in a readable format
//         resultDiv.textContent = JSON.stringify(response, null, 2);

//         // Log the full response for debugging
//         console.log('Full Response:', response);
//     } catch (error) {
//         // Handle errors gracefully and display them
//         const errorMessage = (error as Error).message || 'Failed to parse token data';
//         resultDiv.textContent = JSON.stringify({
//             status: 'error',
//             message: errorMessage,
//         }, null, 2);
//     }
// }
// // Token Data
// document.addEventListener('DOMContentLoaded', () => {
//     const mintInput = document.getElementById('mintAddress') as HTMLInputElement;
//     const resultDiv = document.getElementById('tokenResult')!;
//     const tokenButton = document.getElementById('getTokenData');

//     if (!mintInput || !resultDiv || !tokenButton) {
//         console.error('Required DOM elements not found');
//         return;
//     }

//     tokenButton.addEventListener('click', async () => {
//         try {
//             resultDiv.textContent = 'Loading...';

//             // Fetch the token price data
//             const response = await manager.getTokenPrice(mintInput.value);
//             console.log('Raw Response:', response);

//             // Display the full response
//             displayTokenData(response, resultDiv);
//         } catch (error: any) {
//             console.error('Error fetching token data:', error);

//             // Display error information
//             resultDiv.textContent = JSON.stringify({
//                 status: 'error',
//                 message: error.message || 'Failed to fetch token data',
//             }, null, 2);
//         }
//     });
// });

// // Domain Resolution
// document.getElementById('resolveDomain')?.addEventListener('click', async () => {
//     const domainInput = document.getElementById('domain') as HTMLInputElement;
//     const resultDiv = document.getElementById('domainResult')!;
    
//     try {
//         resultDiv.textContent = 'Loading...';
//         const data = await manager.resolveDomain(domainInput.value);
//         resultDiv.textContent = JSON.stringify(data, null, 2);
//     } catch (error: any) {
//         resultDiv.textContent = `Error: ${error.message}`;
//     }
// });




