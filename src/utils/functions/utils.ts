import { Dayjs } from 'dayjs';
import { cookies } from 'next/headers';

export const disableFutureDates = (current: Dayjs | null): boolean => {
  return current ? current.isAfter(new Date()) : false;
};


