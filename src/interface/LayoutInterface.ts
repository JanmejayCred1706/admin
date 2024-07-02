export interface StateInterfaceProps {
  id: string | number;
  name: string;
  code: string;
  category: string;
}
export interface MenuItem {
  label: string;
  key: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}
export interface MenuItemData {
  label: string;
  key: string;
  icon?: React.ReactNode;
  children?: MenuItemData[];
}
export const getItem = (
  label: string,
  key: string,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem => {
  return { label, key, icon, children };
};
