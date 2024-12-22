# Quick Start Guide - ApeMind Framework

## Installation
Install the framework
`npm install apemind-framework
`

Install peer dependencies
`npm install @solana/web3.js @solana/wallet-adapter-react @mui/material
`


## Basic Implementation (5 minutes)

1. **Create a new React project**
   ```
   npx create-react-app my-ai-agents
    cd my-ai-agents
    ```

2. **Create your first agent dashboard**

src/components/QuickStartDashboard.jsx
```

import React, { useState } from 'react';
import { ApeMind, BasicAgent } from 'apemind-framework';
import {
Box,
Button,
Card,
Container,
Typography
} from '@mui/material';

const QuickStartDashboard = () => {
const [agentStatus, setAgentStatus] = useState('inactive');
const deployBasicAgent = async () => {
try {
// Initialize ApeMind
const apemind = new ApeMind({
network: 'devnet',
agentType: 'basic'
});

// Deploy a basic agent
const agent = await apemind.deployAgent({
name: 'My First Agent',
config: {
riskLevel: 'low',
tradingPairs: ['SOL/USDC']
}
});
setAgentStatus('active');
} catch (error) {
console.error('Failed to deploy agent:', error);
}
};

return (
<Container maxWidth="sm">
<Box sx={{ py: 4 }}>
<Typography variant="h4" gutterBottom>
My First AI Agent
</Typography>
<Card sx={{ p: 3, mt: 2 }}>
<Typography variant="body1" gutterBottom>
Status: {agentStatus}
</Typography>
<Button
variant="contained"
onClick={deployBasicAgent}
disabled={agentStatus === 'active'}
>
Deploy Agent
</Button>
</Card>
</Box>
</Container>
);
};
export default QuickStartDashboard;
```

src/App.jsx
3. **Set up your main App**
```

import { WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import QuickStartDashboard from './components/QuickStartDashboard';

// Required for wallet styling
require('@solana/wallet-adapter-react-ui/styles.css');

function App() {

return (
<WalletProvider wallets={[]} autoConnect>
<WalletModalProvider>
<QuickStartDashboard />
</WalletModalProvider>
</WalletProvider>
);
}

export default App;
```

src/config/agent.config.js
## Basic Agent Configuration
```

export const agentConfig = {
// Basic configuration
basic: {
riskLevel: 'low',
maxTradeSize: 0.1, // in SOL
tradingPairs: ['SOL/USDC'],
stopLoss: 5, // 5%
takeProfit: 10 // 10%
},
// Advanced configuration (premium features)
advanced: {
// Contact us for advanced features
}
};
```

## Running Your First Agent
1. Start your development server:
   `npm start`

2. Open `http://localhost:3000`
3. Connect your wallet
4. Click "Deploy Agent"

## Next Steps

1. Explore more agent types:
   - Sentiment Analysis Agent
   - Risk Management Agent
   - Price Prediction Agent


