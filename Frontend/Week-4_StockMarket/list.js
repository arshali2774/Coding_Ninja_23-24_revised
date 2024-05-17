// list.js

import { plotTheGraph } from './chart.js';
import { getBookValue, stocks, setCurrentStock } from './data.js';
import { addDetails } from './details.js';
const listSection = document.getElementById('list_section');

export const createList = (stockNameData, bookValueData, profitData) => {
  const stockName = document.createElement('button');
  stockName.classList.add('stock_btn');
  stockName.dataset.stockName = stockNameData;
  stockName.addEventListener('click', function () {
    setCurrentStock(this.dataset.stockName);
    addDetails();
    plotTheGraph();
  });
  stockName.textContent = stockNameData;
  const bookValueAmt = document.createElement('p');
  bookValueAmt.classList.add('book_value_amt');
  bookValueAmt.textContent = '$' + bookValueData;
  const profit = document.createElement('p');
  profit.classList.add('profit');
  profit.textContent = profitData.toFixed(2) + '%';
  if (profitData > 0) {
    profit.style.color = '#AAFF00';
  } else {
    profit.style.color = 'red';
  }
  listSection.appendChild(stockName);
  listSection.appendChild(bookValueAmt);
  listSection.appendChild(profit);
};

export const addBookValues = async () => {
  const data = await getBookValue();
  stocks.forEach((stock) => {
    data.map((it) => {
      const { bookValue, profit } = it[stock];
      createList(stock, bookValue, profit);
    });
  });
};
