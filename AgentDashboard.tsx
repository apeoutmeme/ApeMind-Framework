import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  Typography, 
  Button,
  Box,
  CircularProgress
} from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ApeMind, SentimentAgent, RiskManager } from 'apemind';

const AgentDashboard = () => {
  const { publicKey } = useWallet();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const SAMPLE_AGENTS = [
    {
      id: 'sentiment',
      name: 'Sentiment Analyzer',
      description: 'Analyzes social media sentiment',
      status: 'active'
    },
    {
      id: 'risk',
      name: 'Risk Manager',
      description: 'Monitors trading risk exposure',
      status: 'active'
    }
  ];

  useEffect(() => {
    const initializeAgents = async () => {
      if (publicKey) {
        const apemind = new ApeMind({
          network: 'devnet',
          publicKey: publicKey.toString()
        });

        const availableAgents = await apemind.getAgents();
        setAgents(availableAgents);
        setLoading(false);
      }
    };

    initializeAgents();
  }, [publicKey]);

  if (!publicKey) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h4" gutterBottom>
          Connect your wallet to start
        </Typography>
        <WalletMultiButton />
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        AI Agents Dashboard
      </Typography>

      <Grid container spacing={3}>
        {SAMPLE_AGENTS.map((agent) => (
          <Grid item xs={12} md={6} key={agent.id}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6">{agent.name}</Typography>
              <Typography color="textSecondary">
                {agent.description}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button 
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    // You implement more agent deployment logic here
                    console.log(`Deploying ${agent.name}`);
                  }}
                >
                  Deploy Agent
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AgentDashboard;
