// details.js

import { getBookValue, getDetails, currentStock } from './data.js';

const detailsSection = document.getElementById('detail_section');

export const createDetails = (
  stockNameDetails,
  stockProfitDetails,
  stockValueDetails,
  stockSummary
) => {
  detailsSection.innerHTML = '';
  const stockName = document.createElement('h2');
  stockName.classList.add('stock_name_details');
  stockName.textContent = stockNameDetails;
  const profit = document.createElement('p');
  profit.classList.add('profit_details');
  profit.textContent = stockProfitDetails + '%';

  const bookValue = document.createElement('p');
  bookValue.classList.add('book_value_details');
  bookValue.textContent = '$' + stockValueDetails;

  const details = document.createElement('p');
  details.classList.add('details');
  details.textContent = stockSummary;
  if (stockProfitDetails > 0) {
    profit.style.color = '#AAFF00';
  } else {
    profit.style.color = 'red';
  }
  detailsSection.appendChild(stockName);
  detailsSection.appendChild(profit);
  detailsSection.appendChild(bookValue);
  detailsSection.appendChild(details);
};

export const addDetails = async () => {
  const stockValueData = await getBookValue();
  const stockDetails = await getDetails();
  let stockProfit, stockBookValue, stockSummary;
  stockValueData.map((it) => {
    const { bookValue, profit } = it[currentStock];
    stockProfit = profit;
    stockBookValue = bookValue;
  });
  stockDetails.map((it) => {
    const { summary } = it[currentStock];
    stockSummary = summary;
  });
  createDetails(currentStock, stockProfit, stockBookValue, stockSummary);
};
