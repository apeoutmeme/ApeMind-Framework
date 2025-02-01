const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(cors());

// Proxy for Jupiter API
app.use('/jupiter', createProxyMiddleware({
  target: 'https://tokens.jup.ag',
  changeOrigin: true,
  pathRewrite: {
    '^/jupiter': ''
  },
  onProxyReq: (proxyReq) => {
    proxyReq.setHeader('Origin', 'https://tokens.jup.ag');
  }
}));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});