import { TopCardInterface } from '@interface/globalInterface';

interface DataItem {
  plan_sold: number;
  premium_collected: number;
}

export const dashboardCardFn = (data?: any): TopCardInterface[] => {
  const arr: TopCardInterface[] = [
    {
      count: 100,
      title: 'Active Retailers',
      link: '/admin/plans/all-plans',
    },
    {
      count: 100,
      title: 'All Retailers',
      link: '',
    },
    {
      count: 100,
      title: 'Dead Retailers',
      link: '',
    },
    {
      count: 100,
      title: 'Active Retailers',
      link: '',
    },
    {
      count: 100,
      title: 'Dead Retailers',
      link: '',
    },
  ];
  return arr;
};

function dataExtraction(data: { [key: string]: DataItem }) {
  if (!data) {
    console.log('No data provided.');
    return { keys: [], plansSoldArray: [], premiumCollected: [], sdpValue: [] };
  }
  const keys = Object.keys(data);
  const values = Object.values(data);
  const plansSoldArray: number[] = [];
  const premiumCollected: number[] = [];

  values.forEach((value) => {
    if (value && typeof value === 'object') {
      plansSoldArray.push(value.plan_sold);
      premiumCollected.push(value.premium_collected);
    }
  });

  return { keys, plansSoldArray, premiumCollected };
}

export const saleOrPremium = (data: any) => {
  console.log(data);
  const { keys, plansSoldArray, premiumCollected } = dataExtraction(data ?? {});

  const series = [
    {
      name: 'Plans Sold',
      type: 'column',
      data: plansSoldArray,
    },
    {
      name: 'Total Premium (in ₹)',
      type: 'line',
      data: premiumCollected,
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: 'line' as const,
    },
    stroke: {
      width: [0, 4],
    },
    title: {
      text: 'Plans Sale & Total Premium',
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: keys,
    xaxis: {
      type: 'category' as const,
    },
    yaxis: [
      {
        title: {
          text: 'Plan Sold',
        },
      },
      {
        opposite: true,
        title: {
          text: 'Total Premium (in ₹)',
        },
      },
    ],
  };

  return { series, options };
};

export const modelWiseSale = (data: any) => {
  const chartRowChartData = {
    series: [
      {
        name: 'SDP',
        data: sdpValues,
      },
      {
        name: 'CDP',
        data: cdpValues,
      },
      {
        name: 'EW',
        data: ewValues,
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
              style: {
                fontSize: '13px',
                fontWeight: 900,
              },
            },
          },
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      title: {
        text: 'Top Model Wise Plan Sales',
      },
      xaxis: {
        categories: modelWiseKeys,
        labels: {
          formatter: function (val) {
            return val;
          },
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40,
      },
    },
  };
  const { options, series } = chartRowChartData;
};
