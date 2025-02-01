const PROXY_URL = 'http://localhost:3001';

export const fetchWithProxy = async (url: string) => {
  // Replace the Jupiter API URL with our proxy URL
  const proxyUrl = url.replace('https://tokens.jup.ag', `${PROXY_URL}/jupiter`);
  const response = await fetch(proxyUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};