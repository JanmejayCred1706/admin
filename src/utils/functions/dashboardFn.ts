import {
  DataObjInterface,
  ExtractionResult,
} from '@interface/dashboardInterface';
import { TopCardInterface } from '@interface/globalInterface';

export const dashboardCardFn = (data?: any): TopCardInterface[] => {
  // const arr: TopCardInterface[] = [
  //   {
  //     id: 0,
  //     count: 100,
  //     title: 'Active Retailers',
  //     link: '',
  //   },
  // ];
  let newArr = [];
  for (const key in data) {
    newArr.push({
      count: data[key],
      title: key,
    });
  }
  return newArr;
};
function dataExtraction(
  data: { [key: string]: DataObjInterface },
  arrKeys: { [key: string]: string }
): ExtractionResult {
  if (!data) {
    return {
      keys: [],
      ...Object.fromEntries(Object.keys(arrKeys).map((key) => [key, []])),
    };
  }

  const keys = Object.keys(data);
  const values = Object.values(data);

  const resultArrays: { [key: string]: any[] } = Object.fromEntries(
    Object.keys(arrKeys).map((key) => [key, []])
  );

  values.forEach((value) => {
    if (value && typeof value === 'object') {
      for (const [arr, key] of Object.entries(arrKeys)) {
        resultArrays[arr].push(value[key]);
      }
    }
  });

  return { keys, ...resultArrays };
}

export const saleOrPremium = (data: any) => {
  const arrKeys = {
    plansSoldArray: 'plan_sold',
    premiumCollected: 'premium_collected',
  };

  const { keys, plansSoldArray, premiumCollected } = dataExtraction(
    data ?? {},
    arrKeys
  );

  const series = [
    {
      name: 'Plans Sold',
      type: 'column' as const,
      data: plansSoldArray,
    },
    {
      name: 'Total Premium (in ₹)',
      type: 'line' as const,
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
  const arrKeys = {
    sdpValues: 'SDP',
    cdpValues: 'CDP',
    ewValues: 'EW',
  };
  const { keys, sdpValues, cdpValues, ewValues } = dataExtraction(
    data ?? {},
    arrKeys
  );
  const series = [
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
  ];

  const options = {
    chart: {
      type: 'bar' as const,
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
      categories: keys,
      labels: {
        formatter: function (val: string) {
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
        formatter: function (val: number) {
          return val.toString();
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
  };

  return { options, series };
};
export const topRetailer = (data: any) => {
  const arrKeys = {
    sdpValues: 'SDP',
    cdpValues: 'CDP',
    ewValues: 'EW',
  };

  const { keys, sdpValues, cdpValues, ewValues } = dataExtraction(
    data ?? {},
    arrKeys
  );

  const series = [
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
  ];

  const options = {
    chart: {
      type: 'bar' as const,
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
      text: 'Top Retailer Wise Plan Sold',
    },
    xaxis: {
      categories: keys,
      labels: {
        formatter: function (val: string) {
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
        formatter: function (val: number) {
          return val.toString();
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
  };

  return { options, series };
};
export const saleWithType = (data: any) => {
  const series = Object.values(data);
  const options = {
    chart: {
      height: 390,
      type: 'radialBar' as const,
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: '30%',
          background: 'transparent',
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
        barLabels: {
          enabled: true,
          useSeriesColors: true,
          margin: 8,
          fontSize: '16px',
          formatter: function (seriesName, opts) {
            return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex];
          },
        },
      },
    },
    colors: ['#1ab7ea', '#0084ff', '#39539E'],
    labels: Object.keys(data),
    title: {
      text: 'Plan Sale With Plans Type',
      align: 'left' as const,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false,
          },
        },
      },
    ],
  };

  return { options, series };
};

export const rangeWiseSold = (data: any) => {
  const arrKeys = {
    sdpValues: 'SDP',
    cdpValues: 'CDP',
    ewValues: 'EW',
  };

  const { keys, sdpValues, cdpValues, ewValues } = dataExtraction(
    data ?? {},
    arrKeys
  );

  const series = [
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
  ];

  const options = {
    chart: {
      type: 'bar' as const,
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
      text: 'Top Retailer Wise Plan Sold',
    },
    xaxis: {
      categories: keys,
      labels: {
        formatter: function (val: string) {
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
        formatter: function (val: number) {
          return val.toString();
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
  };

  return { options, series };
};

export const rangeContribution = (data: any) => {
  const arrKeys = {
    premiumCollected: 'premium_collected',
    percentContribution: 'percent_contribution',
  };

  const { keys, premiumCollected, percentContribution } = dataExtraction(
    data ?? {},
    arrKeys
  );

  const series = [
    {
      name: 'Premium Collected',
      type: 'column' as const,
      data: premiumCollected,
    },
    {
      name: 'Contribution (in %)',
      type: 'line' as const,
      data: percentContribution,
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
      text: 'Price Range Wise Premium Contribution',
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
