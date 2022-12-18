// import type {Theme} from '@mui/material';
// import {makeStyles} from 'tss-react/mui';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

// const useStyles = makeStyles()((theme: Theme) => ({
//   title: {
//     fontFamily: 'Poppins-semibold',
//     fontWeight: 600,
//     fontSize: 32,
//     color: '#2B364D',

//     [theme.breakpoints.down('sm')]: {
//       fontFamily: 'Poppins-regular',
//       fontWeight: 600,
//       fontSize: 24,
//       lineHeight: '34px',
//     },
//   },

//   links: {
//     color: '#666666',
//     cursor: 'pointer',

//     '&:hover': {
//       textDecoration: 'underline',
//     },
//   },
// }));

const getOrCreateTooltip = (chart:any) => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
    tooltipEl.style.borderRadius = '3px';
    tooltipEl.style.color = 'white';
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.transform = 'translate(-50%, 0)';
    tooltipEl.style.transition = 'all .1s ease';

    const table = document.createElement('table');
    table.style.margin = '0px';

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

const externalTooltipHandler = (context: any) => {
  // Tooltip Element
  const {chart, tooltip} = context;
  const tooltipEl = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map((b: any) => b.lines);
    console.log(bodyLines)

    const tableHead = document.createElement('thead');

    titleLines.forEach((title: any) => {
      const tr = document.createElement('tr');
      tr.style.borderWidth = '0';

      const th = document.createElement('th');
      th.style.borderWidth = '0';
      const text = document.createTextNode(title);

      th.appendChild(text);
      tr.appendChild(th);
      tableHead.appendChild(tr);
    });

    const tableBody = document.createElement('tbody');
    bodyLines.forEach((body: any, i: number) => {
      const colors = tooltip.labelColors[i];

      const span = document.createElement('span');
      span.style.background = colors.backgroundColor;
      span.style.borderColor = colors.borderColor;
      span.style.borderWidth = '2px';
      span.style.marginRight = '10px';
      span.style.height = '10px';
      span.style.width = '10px';
      span.style.display = 'inline-block';

      const tr = document.createElement('tr');
      tr.style.backgroundColor = 'inherit';
      tr.style.borderWidth = '0';

      const td = document.createElement('td');
      td.style.borderWidth = '0';

      const text = document.createTextNode(body);

      td.appendChild(span);
      td.appendChild(text);
      tr.appendChild(td);
      tableBody.appendChild(tr);
    });

    const tableRoot = tooltipEl.querySelector('table');

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tableHead);
    tableRoot.appendChild(tableBody);
  }

  const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.background = 'rgb(255, 255, 255)';
  tooltipEl.style.borderColor = 'rgb(43, 54, 77)';
  tooltipEl.style.borderWidth = '2px';
  tooltipEl.style.borderRadius = '0';
  tooltipEl.style.borderStyle = 'solid';
  tooltipEl.style.boxShadow = '0px 5px 15px rgba(0, 0, 0, 0.15)';
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options = {
  options: {
    legend: {
      display: false,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      enabled: false,
      position: 'nearest',
      external: externalTooltipHandler,
    },
  },
  scales: {
    x: {
      ticks: {
        display: false
      },
      grid: {
        display: false
      }
    },
    y: {
      ticks: {
        display: false
      },
      grid: {
        display: false
      }
    }
  }
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

type Props = {};

const Chart: React.FC<Props> = () => {
  // const {classes} = useStyles();
  const chartRef = React.useRef(null);
  const [gradient, setGradient] = React.useState('rgb(47, 199, 123)')

  React.useEffect(() => {
    const chart = chartRef.current;

    if (chart) {
      // @ts-ignore
      var grad = chart.ctx.createLinearGradient(0, 0, 0, 400);
      grad.addColorStop(0, 'rgb(47, 199, 123)');
      grad.addColorStop(0.75, 'rgba(255, 255, 255, 0)');
      setGradient(grad);
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      setGradient(grad);
    }
  }, []);

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        data: labels.map(() => Math.random()),
        borderColor: 'transparent',
        backgroundColor: gradient,
      },
    ],
  };
  return (
    // @ts-ignore
    <Line ref={chartRef} options={options} data={data} />
  );
};

export default Chart;
