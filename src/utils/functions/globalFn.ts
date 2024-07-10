import {
  InputDateProps,
  NotificationContextType,
} from '@interface/globalInterface';
import { getCookies } from '@utils/cookies';
import dayjs from 'dayjs';
import { NextRequest } from 'next/server';
import { createContext } from 'react';

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);
export const modifyListingData = (
  listingData: any[],
  keys: string[],
  defColumn: any
) => {
  const columns = keys
    .map((key) => defColumn.find((column: any) => column.key === key))
    .filter(Boolean);

  // Filter data based on the provided keys
  const data =
    listingData?.length &&
    listingData.map((item) => {
      const filteredItem: any = { key: item.id };
      keys.forEach((key) => {
        if (item[key] !== undefined) {
          filteredItem[key] = item[key];
        }
      });
      return filteredItem;
    });

  return { columns, data };
};

export const dateFormatter = (val: InputDateProps, format?: string): string => {
  if (val && format) {
    return dayjs(val).format(format);
  } else {
    return dayjs().format('DD/MM/YYYY'); // Default format if either val or format is missing
  }
};

export const formatCurrency = (amount: number): string => {
  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0, // Optional: Adjust as needed
    maximumFractionDigits: 0, // Optional: Adjust as needed
  }).format(amount);

  return formattedAmount;
};

export const chipColors = {
  'Partially Approved': {
    bgColor: 'bg-[#E4EEFC]',
    textColor: 'text-[#229EEF]',
  },
  'Settlement Completed': {
    bgColor: 'bg-[#E4EEFC]',
    textColor: 'text-[#229EEF]',
  },
  Approved: { bgColor: 'bg-[#EDFFF2]', textColor: 'text-[#2BB256]' },
  'Claim Initiated': { bgColor: 'bg-[#E4EEFC]', textColor: 'text-[#229EEF]' },
  Closed: { bgColor: 'bg-[#FFF0F2]', textColor: 'text-[#E20F0F]' },
  'Need more documents': {
    bgColor: 'bg-yellow',
    textColor: 'text-[#E20F0F]',
  },
};
export const fetchToken = async (req: NextRequest): Promise<string | null> => {
  console.log(req, 'req');
  const cookie = await getCookies('token', req);
  return cookie;
};
