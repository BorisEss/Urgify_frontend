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
import {makeStyles} from 'tss-react/mui';

const useStyles = makeStyles()({
  bottomLabels: {
    display: 'flex',
    justifyContent: 'space-between',

    '& p': {
      fontSize: 16,
      lineHeight: '24px',
      color: '#2B364D',
      fontFamily: 'Poppins-semibold',
      fontWeight: 600,
    },
  },
});

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

const renderBottomLabels = (labels: string[]): React.ReactNode => {
  if (labels.length === 1) return <p>
    {labels[0]}
  </p>;
  return <>
    <p>{labels[0]}</p>
    <p>{labels[labels.length - 1]}</p>
  </>;
};

// const getNumberDate = (date: string): number => {
//   const numericDate = new Date(date).getTime();
//   return numericDate;
// }

type ChartItemDataType = {
  dateLabel: string;
  amount: number;
  payType: string;
  paidBy: string;
  email: string;
  phone: string;
}

type ChartDataType = Record<number, ChartItemDataType>

const respData: ChartDataType = {
  1641852000000: {
    dateLabel: '1/11/2022',
    amount: 250.11,
    payType: 'Visa *4589',
    paidBy: 'Brooklyn Simmons',
    email: 'test@test.gmail',
    phone: '(209) 123-0104',
  },
  1644530400000: {
    dateLabel: '2/11/2022',
    amount: 260.11,
    payType: 'Visa *4589',
    paidBy: 'Brooklyn Simmons',
    email: 'test@test.gmail',
    phone: '(209) 123-0104',
  },
  1668117600000: {
    dateLabel: '11/11/2022',
    amount: 240.11,
    payType: 'Visa *4589',
    paidBy: 'Brooklyn Simmons',
    email: 'brooklyn.simmons@gmail.com',
    phone: '(209) 123-0104',
  },
  1641938400000: {
    dateLabel: '1/12/2022',
    amount: 250.11,
    payType: 'Visa *4589',
    paidBy: 'Brooklyn Simmons',
    email: 'test@test.gmail',
    phone: '(209) 123-0104',
  },
  1677708000000: {
    dateLabel: '3/2/2023',
    amount: 259.11,
    payType: 'Visa *4589',
    paidBy: 'Brooklyn Simmons',
    email: 'brooklyn.simmons@gmail.com',
    phone: '(209) 123-0104',
  },
};

const labels: string[] = Object.keys(respData);

type Props = {};

const Chart: React.FC<Props> = () => {
  const {classes} = useStyles();
  const chartRef = React.useRef(null);
  const [gradient, setGradient] = React.useState('rgb(47, 199, 123)');

  // chart tooltip
  const getOrCreateTooltip = (chart:any) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div.tooltip__wrapper');

    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.classList.add('tooltip__wrapper');
      tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
      tooltipEl.style.color = 'black';
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = 'none';
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.transform = 'translate(-50%, 0)';
      tooltipEl.style.transition = 'all .1s ease';

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

      const wrapperContent = document.createElement('div');
      wrapperContent.classList.add('tooltip__content');

      titleLines.forEach((title: string) => {
        if (title && respData[+title]) {
          const dataItem = respData[+title];

          const dateLabelEl = document.createElement('p');
          dateLabelEl.classList.add('tooltip__date-label');
          dateLabelEl.appendChild(document.createTextNode(dataItem.dateLabel));
          dateLabelEl.style.fontSize = '12px';
          dateLabelEl.style.lineHeight = '18px';
          dateLabelEl.style.color = '#666666';
          dateLabelEl.style.fontFamily = 'Poppins-regular';
          dateLabelEl.style.fontWeight = '400';

          const amountEl = document.createElement('p');
          amountEl.classList.add('tooltip__amount');
          amountEl.appendChild(document.createTextNode(`$${dataItem.amount}`));
          amountEl.style.marginTop = '8px';
          amountEl.style.fontSize = '16px';
          amountEl.style.lineHeight = '24px';
          amountEl.style.color = '#2B364D';
          amountEl.style.fontFamily = 'Poppins-semibold';
          amountEl.style.fontWeight = '600';

          const paidByEl = document.createElement('p');
          paidByEl.classList.add('tooltip__paid-by');
          paidByEl.appendChild(document.createTextNode('Paid by'));
          paidByEl.style.borderTop = 'solid #DBDBDB 1px';
          paidByEl.style.paddingTop = '8px';
          paidByEl.style.marginTop = '8px';
          paidByEl.style.marginBottom = '8px';
          paidByEl.style.fontSize = '12px';
          paidByEl.style.lineHeight = '18px';
          paidByEl.style.color = '#666666';
          paidByEl.style.fontFamily = 'Poppins-regular';
          paidByEl.style.fontWeight = '400';

          const paidByNameEl = document.createElement('p');
          paidByNameEl.classList.add('tooltip__paid-by-name');
          paidByNameEl.appendChild(document.createTextNode(dataItem.paidBy));
          paidByNameEl.style.fontSize = '12px';
          paidByNameEl.style.lineHeight = '18px';
          paidByNameEl.style.color = '#2B364D';
          paidByNameEl.style.fontFamily = 'Poppins-semibold';
          paidByNameEl.style.fontWeight = '600';
          paidByNameEl.style.whiteSpace = 'nowrap';

          const emailEl = document.createElement('p');
          emailEl.classList.add('tooltip__email');
          emailEl.appendChild(document.createTextNode(dataItem.email));
          emailEl.style.marginTop = '6px';
          emailEl.style.marginBottom = '6px';
          emailEl.style.fontSize = '12px';
          emailEl.style.lineHeight = '18px';
          emailEl.style.color = '#666666';
          emailEl.style.fontFamily = 'Poppins-regular';
          emailEl.style.fontWeight = '400';
          emailEl.style.textDecorationLine = 'underline';

          const phoneEl = document.createElement('p');
          phoneEl.classList.add('tooltip__phone');
          phoneEl.appendChild(document.createTextNode(dataItem.phone));
          phoneEl.style.marginBottom = '6px';
          phoneEl.style.fontSize = '12px';
          phoneEl.style.lineHeight = '18px';
          phoneEl.style.color = '#666666';
          phoneEl.style.fontFamily = 'Poppins-regular';
          phoneEl.style.fontWeight = '400';

          const cardEl = document.createElement('p');
          cardEl.classList.add('tooltip__card');
          cardEl.appendChild(document.createTextNode(dataItem.payType));
          cardEl.style.fontSize = '12px';
          cardEl.style.lineHeight = '18px';
          cardEl.style.color = '#666666';
          cardEl.style.fontFamily = 'Poppins-regular';
          cardEl.style.fontWeight = '400';

          wrapperContent.appendChild(dateLabelEl);
          wrapperContent.appendChild(amountEl);
          wrapperContent.appendChild(paidByEl);
          wrapperContent.appendChild(paidByNameEl);
          wrapperContent.appendChild(emailEl);
          wrapperContent.appendChild(phoneEl);
          wrapperContent.appendChild(cardEl);
        }
      });

      // Remove old children
      while (tooltipEl.firstChild) {
        tooltipEl.firstChild.remove();
      }

      // Add new children
      tooltipEl.appendChild(wrapperContent);
      // tableRoot.appendChild(tableBody);
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
    tooltipEl.style.left = positionX + tooltip.caretX - (tooltipEl.offsetWidth / 2) + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = '8px';
  };

  // chartTooltip
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
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
  };

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
        data: Object.values(respData).map(item => item.amount),
        borderColor: 'transparent',
        backgroundColor: gradient,
      },
    ],
  };
  return (
    <>
      {/* @ts-ignore */}
      <Line ref={chartRef} options={options} data={data} />
      <div className={classes.bottomLabels}>
        {labels.length ? renderBottomLabels(Object.values(respData).map(item => item.dateLabel)) : <p>Here will be displayed payment data </p>}
      </div>
    </>
  );
};

export default Chart;
