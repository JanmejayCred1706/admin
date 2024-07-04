import {
  DesktopOutlined,
  IssuesCloseOutlined,
  MoneyCollectOutlined,
  PieChartOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  MenuItem,
  MenuItemData,
  StateInterfaceProps,
  getItem,
} from '@interface/LayoutInterface';

export const states: StateInterfaceProps[] = [
  { id: 'all', name: 'All State', code: 'allState', category: 'all' },
  { id: 12, name: 'Gujarat', code: 'GJ', category: 'gj' },
  { id: 14, name: 'Himachal Pradesh', code: 'HP', category: 'hp' },
  { id: 33, name: 'Uttar Pradesh', code: 'UP', category: 'up' },
  { id: 29, name: 'Rajasthan', code: 'RJ', category: 'rj' },
  { id: 20, name: 'Madhya Pradesh', code: 'MP', category: 'mp' },
];

export const allowedLabels = [
  'Dashboard',
  'Plans',
  'Retailers',
  'Service Centers',
  'Finance',
  'Claims',
  'Settings',
];

const data: MenuItemData[] = [
  {
    label: 'Dashboard',
    key: '1',
    icon: <PieChartOutlined />,
    children: [
      { label: 'Home', key: '/admin/dashboard' },
      { label: 'Analytics', key: '/admin/dashboard/analytics' },
    ],
  },
  {
    label: 'Plans',
    key: '2',
    icon: <DesktopOutlined />,
    children: [
      { label: 'All Plans', key: '/admin/plans/all-plans' },
      { label: 'Cancelled Plans', key: '/admin/plans/cancel-plans' },
    ],
  },
  {
    label: 'Retailers',
    key: '3',
    icon: <UserOutlined />,
    children: [
      { label: 'Active Retailers', key: '/admin/retailers/active-retailers' },
      { label: 'All Retailers', key: '/admin/retailers/all-retailers' },
    ],
  },
  {
    label: 'Service Centers',
    key: '4',
    icon: <TeamOutlined />,
    children: [
      {
        label: 'All Service Centers',
        key: '/admin/service-center/all-service-center',
      },
    ],
  },
  {
    label: 'Finance',
    key: '5',
    icon: <MoneyCollectOutlined />,
    children: [
      { label: 'Billing Report', key: '/admin/finance/billing-report' },
      { label: 'Waterfall Report', key: '/admin/finance/waterfall-report' },
      { label: 'Franchise', key: '/admin/finance/franchise' },
      { label: 'Invoice', key: '/admin/finance/invoice' },
    ],
  },
  {
    label: 'Claims',
    key: '6',
    icon: <IssuesCloseOutlined />,
    children: [{ label: 'All Claims', key: '/admin/claims/all-claims' }],
  },
  {
    label: 'Settings',
    key: '7',
    icon: <SettingOutlined />,
    children: [
      { label: 'Users', key: '71' },
      { label: 'Config', key: '72' },
      { label: 'Roles', key: '73' },
    ],
  },
];

const mapDataToItems = (data: MenuItemData[]): MenuItem[] => {
  return data.map((item) =>
    getItem(
      item.label,
      item.key,
      item.icon,
      item.children ? mapDataToItems(item.children) : undefined
    )
  );
};

const filterMenuItems = (
  data: MenuItemData[],
  allowedLabels: string[]
): MenuItemData[] => {
  return data
    .map((item) => {
      if (allowedLabels.includes(item.label)) {
        return item;
      }
      if (item.children) {
        const filteredChildren = filterMenuItems(item.children, allowedLabels);
        if (filteredChildren.length > 0) {
          return { ...item, children: filteredChildren };
        }
      }
      return null;
    })
    .filter((item) => item !== null) as MenuItemData[];
};

export const navMenuItem = (allowedLabels: string[]): MenuItem[] => {
  const filteredData = filterMenuItems(data, allowedLabels);
  return mapDataToItems(filteredData);
};
