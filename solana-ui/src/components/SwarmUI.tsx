import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  LinearProgress,
  useTheme,
} from '@mui/material';
import { SolanaToolsManager } from '../../../src/index';
import { 
  SimulationStats, 
  ChatMessage, 
  SimulationReport 
} from '../../../src/types/swarm';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
  color: 'white',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)'
}));

const MessageBox = styled(Box)(({ theme }) => ({
  padding: '12px',
  marginBottom: '8px',
  borderRadius: '8px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.1)'
}));

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  '& .MuiLinearProgress-bar': {
    background: 'linear-gradient(90deg, #4f46e5, #3b82f6)'
  }
}));

interface SwarmUIProps {
  solanaTools: SolanaToolsManager;
}

export const SwarmUI: React.FC<SwarmUIProps> = ({ solanaTools }) => {
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [stats, setStats] = useState<SimulationStats | null>(null);
  const [tokenMint, setTokenMint] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [report, setReport] = useState<SimulationReport | null>(null);
  
  const simulationInterval = useRef<NodeJS.Timeout | null>(null);
  const theme = useTheme();

  useEffect(() => {
    return () => {
      if (simulationInterval.current) {
        clearInterval(simulationInterval.current);
      }
    };
  }, []);

  const startSimulation = async () => {
    if (!tokenMint) return;
    
    setIsSimulating(true);
    setProgress(0);

    try {
      // Initial token data fetch
      const tokenData = await solanaTools.getTokenData(tokenMint);
      console.log('Initial token data:', tokenData);

      simulationInterval.current = setInterval(async () => {
        try {
          // Get latest price
          const priceData = await solanaTools.getTokenPrice(tokenMint);
          
          // Update progress and stats
          setProgress(prev => (prev + 1) % 100);
          setStats(prev => ({
            currentPrice: parseFloat(priceData.price),
            totalVolume: (prev?.totalVolume || 0) + Math.random() * 1000,
            activeTraders: Math.floor(Math.random() * 500),
            messageCount: messages.length
          }));

          // Add simulated chat message
          const newMessage: ChatMessage = {
            agentId: `agent-${Math.floor(Math.random() * 500)}`,
            persona: 'TRADER',
            message: `Analyzing ${tokenMint.slice(0, 6)}... Volume patterns look interesting.`,
            timestamp: Date.now()
          };
          setMessages(prev => [...prev, newMessage].slice(-100));

        } catch (error) {
          console.error('Simulation error:', error);
          stopSimulation();
        }
      }, 1000);

    } catch (error) {
      console.error('Failed to start simulation:', error);
      setIsSimulating(false);
    }
  };

  const stopSimulation = () => {
    if (simulationInterval.current) {
      clearInterval(simulationInterval.current);
      setIsSimulating(false);
      setProgress(0);

      // Generate final report
      const finalReport: SimulationReport = {
        totalAgents: 500,
        activeTraders: stats?.activeTraders || 0,
        totalTrades: messages.length,
        personaDistribution: {
          TRADER: 200,
          PROFESSIONAL: 50,
          BUSINESS_OWNER: 100,
          STUDENT: 50,
          TECH_ENTHUSIAST: 50,
          INFLUENCER: 50
        },
        topTraders: Array.from({ length: 10 }).map((_, i) => ({
          id: `agent-${i}`,
          volume: Math.random() * 10000,
          persona: 'TRADER'
        })),
        averageHoldingTime: Math.random() * 3600 * 24 // Average holding time in seconds
      };

      setReport(finalReport);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <StyledCard sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Solana Trading Swarm
          </Typography>

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Token Mint Address"
              value={tokenMint}
              onChange={(e) => setTokenMint(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255,255,255,0.23)'
                  }
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255,255,255,0.7)'
                }
              }}
            />
          </Box>

          <Button
            variant="contained"
            onClick={isSimulating ? stopSimulation : startSimulation}
            disabled={!tokenMint}
            sx={{
              mb: 3,
              background: isSimulating ? 
                'linear-gradient(135deg, #ef4444, #dc2626)' :
                'linear-gradient(135deg, #4f46e5, #3b82f6)',
              '&:hover': {
                background: isSimulating ?
                  'linear-gradient(135deg, #dc2626, #ef4444)' :
                  'linear-gradient(135deg, #3b82f6, #4f46e5)'
              }
            }}
          >
            {isSimulating ? "Stop Simulation" : "Start Simulation"}
          </Button>

          {isSimulating && (
            <ProgressBar 
              variant="determinate" 
              value={progress} 
              sx={{ mb: 3 }}
            />
          )}

          {stats && (
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} md={3}>
                <StyledCard>
                  <CardContent>
                    <Typography variant="subtitle2">Current Price</Typography>
                    <Typography variant="h5">
                      ${stats.currentPrice.toFixed(4)}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <StyledCard>
                  <CardContent>
                    <Typography variant="subtitle2">Total Volume</Typography>
                    <Typography variant="h5">
                      ${stats.totalVolume.toLocaleString()}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <StyledCard>
                  <CardContent>
                    <Typography variant="subtitle2">Active Traders</Typography>
                    <Typography variant="h5">
                      {stats.activeTraders}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <StyledCard>
                  <CardContent>
                    <Typography variant="subtitle2">Messages</Typography>
                    <Typography variant="h5">
                      {stats.messageCount}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            </Grid>
          )}

          <StyledCard>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Agent Chat Feed
              </Typography>
              <Box sx={{ 
                height: '400px', 
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  width: '8px'
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px'
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '4px',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.3)'
                  }
                }
              }}>
                {messages.map((msg, index) => (
                  <MessageBox key={index}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {msg.persona} Agent
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {msg.message}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.6 }}>
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </Typography>
                  </MessageBox>
                ))}
              </Box>
            </CardContent>
          </StyledCard>

          {report && (
            <StyledCard sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Simulation Report
                </Typography>
                <pre style={{ 
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}>
                  {JSON.stringify(report, null, 2)}
                </pre>
              </CardContent>
            </StyledCard>
          )}
        </CardContent>
      </StyledCard>
    </Box>
  );
};