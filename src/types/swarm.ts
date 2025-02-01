import { Keypair } from '@solana/web3.js';

export interface AgentPersona {
  type: string;
  risk: number;
  tradingStyle: string;
  weight: number;
}

export interface AgentWallet {
  keypair: Keypair;
  balance: number;
}

export interface TradeHistory {
  action: 'buy' | 'sell';
  token: string;
  amount: number;
  price: number;
  timestamp: number;
}

export interface Agent {
  id: string;
  wallet: AgentWallet;
  persona: AgentPersona;
  holdings: Map<string, number>;
  tradingHistory: TradeHistory[];
}

export interface SimulationStats {
  currentPrice: number;
  totalVolume: number;
  activeTraders: number;
  messageCount: number;
}

export interface ChatMessage {
  agentId: string;
  persona: string;
  message: string;
  timestamp: number;
}

export interface SimulationReport {
  totalAgents: number;
  activeTraders: number;
  totalTrades: number;
  personaDistribution: Record<string, number>;
  topTraders: Array<{
    id: string;
    volume: number;
    persona: string;
  }>;
  averageHoldingTime: number;
}