import { getGraphData } from './data.js';
import { currentStock } from './data.js';

let timeRange = ['1mo', '1y', '3mo', '5y'];

let currentRange = timeRange[0];

const chartSection = document.getElementById('chart');

export const plotTheGraph = async () => {
  const graphData = await getGraphData();
  let coordinatesObj;
  graphData.map((it) => {
    coordinatesObj = it[currentStock];
  });
  let { value, timeStamp } = coordinatesObj[currentRange];
  const convertedTimeStamp = convertTimeStamp(timeStamp);
  // Customize hover text with stock name and value
  let textData = value.map(
    (val, index) => `${currentStock}: $${val.toFixed(2)}`
  );
  let data = [
    {
      x: convertedTimeStamp,
      y: value,
      type: 'linear',
      text: textData, // Set custom hover text
      hovertemplate: '<b>%{text}</b>', // Customize hover tooltip
      line: { color: '#17BECF' },
      // hoverinfo: 'y', // Show both x and y values on hover
    },
  ];
  let layout = {
    xaxis: {
      visible: false, // Hide x-axis
      showspikes: true, // Show spikes on hover
      spikemode: 'across', // Show spike line across the plot
      spikethickness: 1, // Set the thickness of the spike line
      spikecolor: 'green', // Set the color of the spike line
    },
    yaxis: {
      visible: false, // Hide y-axis
    },
    plot_bgcolor: 'transparent', // Set transparent background
    paper_bgcolor: 'transparent', // Set transparent background
    hovermode: 'x', // Only show hover information along the x-axis
    hoverlabel: {
      bgcolor: 'white', // Set hover label background color
      bordercolor: 'black', // Set hover label border color
      font: { color: 'black' }, // Set hover label text color
      xanchor: 'auto', // Automatically set the x position of the hover label
      align: 'auto', // Automatically set the alignment of the hover label
      namelength: 0, // Display only date at the cursor position
    },
  };
  let config = {
    displayModeBar: false, // Hide default toolbar
  };
  Plotly.newPlot(chartSection, data, layout, config);
};

const convertTimeStamp = (timeStamp) => {
  const new_timestamp = timeStamp.map((it) =>
    new Date(it * 1000).toLocaleDateString()
  );
  return new_timestamp;
};

const timeBtn = document.querySelectorAll('.time_btn');

timeBtn.forEach((ele) => {
  ele.addEventListener('click', function () {
    currentRange = this.dataset.range;
    plotTheGraph();
  });
});
