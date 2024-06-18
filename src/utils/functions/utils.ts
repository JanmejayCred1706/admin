import { Dayjs } from 'dayjs';

export const disableFutureDates = (current: Dayjs | null): boolean => {
  return current ? current.isAfter(new Date()) : false;
};
