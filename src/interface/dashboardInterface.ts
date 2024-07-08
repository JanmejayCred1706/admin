export type ChartTypeInterface =
  | 'area'
  | 'line'
  | 'bar'
  | 'pie'
  | 'donut'
  | 'radialBar'
  | 'scatter'
  | 'bubble'
  | 'heatmap'
  | 'candlestick'
  | 'boxPlot'
  | 'radar'
  | 'polarArea'
  | 'rangeBar'
  | 'rangeArea'
  | 'treemap';

  export interface DashboardDataInterface {
    header: string;
    type: string;
    count: string;
  }

  export type DashboardModuleInterface = {
    title: string;
    subTitleLeft: string;
    subTitleRight: string;
    dataArr: DashboardDataInterface[];
    chipArr: string[];
  };
