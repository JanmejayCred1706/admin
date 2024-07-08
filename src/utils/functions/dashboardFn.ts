import { TopCardInterface } from '@interface/globalInterface';

export const dashboardCardFn = (data?: any): TopCardInterface[] => {
  const arr: TopCardInterface[] = [
    {
      count: 100,
      title: 'Active Retailers',
      link: '',
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
