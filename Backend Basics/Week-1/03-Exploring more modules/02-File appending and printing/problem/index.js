// Please do not change the prewritten code

import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
  //  Write your code here
  if (req.method === 'POST') {
    let requestBody = '';
    req.on('data', (chunk) => {
      requestBody += chunk.toString();
    });
    req.on('end', () => {
      fs.appendFileSync('data.txt', requestBody);
      const newData = fs.readFileSync('data.txt', 'utf-8');
      console.log(newData);
    });
  }

  res.end('data received');
});

export default server;
