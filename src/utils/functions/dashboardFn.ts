interface DataItem {
  [key: string]: number | string | any; // Adjust as per your actual data structure
}

interface ExtractionResult {
  keys: string[];
  [key: string]: any;
}

function dataExtraction(
  data: { [key: string]: DataItem },
  arrKeys: { [key: string]: string }
): ExtractionResult {
  if (!data) {
    console.log('No data provided.');
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
  console.log(data, 'any');
  const arrKeys = {
    sdpValues: 'SDP',
    cdpValues: 'CDP',
    ewValues: 'EW',
  };
  console.log(data);
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
export const topRetailerData = (data: any) => {
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
