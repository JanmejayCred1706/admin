import {
  InputDateProps,
  NotificationContextType,
} from '@interface/globalInterface';
import { getCookies, getCookiesFrom } from '@utils/cookies';
import dayjs from 'dayjs';
import { NextRequest } from 'next/server';
// import { createContext } from 'react';

// export const NotificationContext = createContext<
//   NotificationContextType | undefined
// >(undefined);
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

interface InputDateProps {
  date: string;
}
export const dateFormatter = (
  val: InputDateProps,
  format: string = 'DD/MM/YYYY'
): string => {
  const { date } = val;
  if (date) {
    return dayjs(date).format(format);
  } else {
    return dayjs().format('DD/MM/YYYY'); // Default format if date is missing
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
interface ChipColor {
  bgColor: string;
  textColor: string;
}
export const chipColors: Record<string, ChipColor> = {
  'Partially Approved': {
    bgColor: 'bg-[#E4EEFC]',
    textColor: 'text-[#229EEF]',
  },
  'Settlement Completed': {
    bgColor: 'bg-[#E4EEFC]',
    textColor: 'text-[#229EEF]',
  },
  Approved: { bgColor: 'bg-[#EDFFF2]', textColor: 'text-[#2BB256]' },
  'Claim Initiated': { bgColor: 'bg-[yellow]', textColor: 'text-[#229EEF]' },
  Closed: { bgColor: 'bg-[#FFF0F2]', textColor: 'text-[#E20F0F]' },
  BER: { bgColor: 'bg-[#FFF0F2]', textColor: 'text-[#E20F0F]' },
  'BER-Repair': { bgColor: 'bg-[#FFF0F2]', textColor: 'text-[#E20F0F]' },
  'Need more documents': {
    bgColor: 'bg-[#E4EEFC]',
    textColor: 'text-[#E20F0F]',
  },
  'Claim Submitted': {
    bgColor: 'bg-[#E4EEFC]',
    textColor: 'text-[#229EEF]',
  },
  'Documents Verified': {
    bgColor: 'bg-[#E4EEFC]',
    textColor: 'text-[#229EEF]',
  },
};
export const fetchToken = async (req: NextRequest): Promise<string | null> => {
  const cookie = await getCookies('token', req);
  return cookie;
};
export const getTodaysDate = () => {
  const today = new Date();
  const date = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${date}/${month}/${year}`;
};

export let allRoutes = {
  Home: '/admin/dashboard',
  Analytics: '/admin/dashboard/analytics',
  Wallet: '/admin/dashboard/wallet',
  'All Plans': '/admin/dashboard/all-plans',
  'Cancelled Plans': '/admin/plans/cancel-plans',
  'Active Retailers': '/admin/retailers/active-retailers',
  'All Retailers': '/admin/retailers/all-retailers',
  'All Service Centers': '/admin/service-center/all-service-center',
  'Billing Report': '/admin/finance/billing-report',
  'Waterfall Report': '/admin/finance/waterfall-report',
  Franchise: '/admin/finance/franchise',
  Invoice: '/admin/finance/invoice',
  'All Claims': '/admin/claims/all-claims',
};
type Role = 'franchise' | 'admin' | 'vivo_head';
type Routes = string[];
export const isRole = (userType: string): userType is Role => {
  return ['franchise', 'admin', 'vivo_head', 'state_head'].includes(userType);
};

export const findUserRole = (userType: string): Routes | undefined => {
  const obj: Record<Role, Routes> = {
    franchise: [
      'Home',
      'Wallet',
      'All Plans',
      'Active Retailers',
      'All Retailers',
    ],
    admin: [
      'Home',
      'Analytics',
      'All Plans',
      'Cancelled Plans',
      'Active Retailers',
      'All Retailers',
      'All Service Centers',
      'Billing Report',
      'Waterfall Report',
      'Franchise',
      'Invoice',
      'All Claims',
    ],
    vivo_head: [
      'Home',
      'Analytics',
      'All Plans',
      'Active Retailers',
      'All Retailers',
      'All Service Centers',
      'All Claims',
    ],
    state_head: [
      'Home',
      'Analytics',
      'All Plans',
      'Active Retailers',
      'All Retailers',
      'All Service Centers',
      'All Claims',
    ],
  };

  if (isRole(userType)) {
    return obj[userType];
  } else {
    return undefined;
  }
};

