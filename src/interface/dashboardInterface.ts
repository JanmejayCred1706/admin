export type ChartTypeInterface = 'line' | 'bar' | 'pie' | 'radialBar'; // Define the expected chart types

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
export interface ExtractionResult {
  keys: string[];
  [key: string]: any;
}
export interface DataObjInterface {
  [key: string]: number | string | any; // Adjust as per your actual data structure
}
