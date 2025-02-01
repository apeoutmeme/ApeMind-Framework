import React from 'react';
import { SwarmUI } from './components/SwarmUI';
import { SolanaToolsManager } from '../../src/index';

const manager = new SolanaToolsManager(
  // Use the same config from main.ts
  "private_key",
  "rpc_url",
  "openai_api_key"
);

function App() {
  return (
    <div>
      <SwarmUI solanaTools={manager} />
    </div>
  );
}

export default App;