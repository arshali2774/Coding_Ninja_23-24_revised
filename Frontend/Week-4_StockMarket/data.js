// data.js

const graphDataApi = 'https://stocks3.onrender.com/api/stocks/getstocksdata';
const bookValueApi =
  'https://stocks3.onrender.com/api/stocks/getstockstatsdata';
const detailsApi =
  'https://stocks3.onrender.com/api/stocks/getstocksprofiledata';
export let stocks = [
  'AAPL',
  'MSFT',
  'GOOGL',
  'AMZN',
  'PYPL',
  'TSLA',
  'JPM',
  'NVDA',
  'NFLX',
  'DIS',
];
export let currentStock = stocks[0];
export const getGraphData = async () => {
  try {
    const res = await fetch(graphDataApi);
    const data = await res.json();
    return data.stocksData;
  } catch (error) {
    console.log(error);
  }
};

export const getBookValue = async () => {
  try {
    const res = await fetch(bookValueApi);
    const data = await res.json();
    return data.stocksStatsData;
  } catch (error) {
    console.log(error);
  }
};

export const getDetails = async () => {
  try {
    const res = await fetch(detailsApi);
    const data = await res.json();
    return data.stocksProfileData;
  } catch (error) {
    console.log(error);
  }
};

export const setCurrentStock = (stock) => {
  // Function to update currentStock
  currentStock = stock;
};
