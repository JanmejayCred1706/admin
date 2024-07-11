import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

export const useFormat: string = 'DD/MM/YYYY';
export const disableFutureDates = (current: Dayjs | null): boolean => {
  return current ? current.isAfter(new Date()) : false;
};

export const getDateFormat = (type?: string): string => {
  let date: string;

  if (type) {
    date = dayjs(type).format(useFormat);
  } else {
    date = dayjs().format(useFormat);
  }

  return date;
};
