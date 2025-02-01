import { Agent, AgentPersona, ChatMessage } from '../../../src/types/swarm';
import { Keypair } from '@solana/web3.js';

const PERSONA_TYPES = {
  TRADER: { weight: 0.4, risk: 0.8, tradingStyle: 'aggressive' },
  PROFESSIONAL: { weight: 0.1, risk: 0.4, tradingStyle: 'conservative' },
  BUSINESS_OWNER: { weight: 0.2, risk: 0.6, tradingStyle: 'moderate' },
  STUDENT: { weight: 0.1, risk: 0.9, tradingStyle: 'experimental' },
  TECH_ENTHUSIAST: { weight: 0.1, risk: 0.7, tradingStyle: 'technical' },
  INFLUENCER: { weight: 0.1, risk: 0.5, tradingStyle: 'trend-following' }
};

export function generateMockAgents(count: number): Agent[] {
  return Array.from({ length: count }, (_, i) => {
    const personaType = selectRandomPersona();
    return {
      id: `agent-${i}`,
      wallet: {
        keypair: Keypair.generate(),
        balance: Math.random() * 1000
      },
      persona: {
        type: personaType,
        ...PERSONA_TYPES[personaType as keyof typeof PERSONA_TYPES]
      },
      holdings: new Map(),
      tradingHistory: []
    };
  });
}

export function generateMockMessage(agent: Agent, price: number): ChatMessage {
  const messages = [
    `Analyzing price movement at $${price.toFixed(2)}...`,
    `Volume patterns suggest ${price > 100 ? 'bullish' : 'bearish'} trend`,
    `Technical indicators showing ${Math.random() > 0.5 ? 'buy' : 'sell'} signal`,
    `Market sentiment appears ${Math.random() > 0.5 ? 'positive' : 'negative'}`,
    `Considering ${Math.random() > 0.5 ? 'entry' : 'exit'} position`
  ];

  return {
    agentId: agent.id,
    persona: agent.persona.type,
    message: messages[Math.floor(Math.random() * messages.length)],
    timestamp: Date.now()
  };
}

function selectRandomPersona(): string {
  const personas = Object.entries(PERSONA_TYPES);
  const totalWeight = personas.reduce((sum, [_, data]) => sum + data.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const [persona, data] of personas) {
    random -= data.weight;
    if (random <= 0) return persona;
  }
  
  return personas[0][0];
}