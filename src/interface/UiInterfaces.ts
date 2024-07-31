type ButtonType = 'primary' | 'dashed' | 'link' | 'text' | 'default';
type IconPosition = 'start' | 'end';
type ButtonSize = 'large' | 'middle' | 'small';

export interface LeftNavProps {}
export interface LayoutProps {
  children: React.ReactNode;
}
export interface leftNavProps {}
export interface TopNavProps {}
export interface BreadCrumbNavProps {}
export interface FooterNavProps {}
export interface ButtonCompProps {
  name: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  type?: ButtonType;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  loading?: boolean;
  size?: ButtonSize;
  link?: string;
  style?: React.CSSProperties;
  className?: string;
}
export interface ConfirmationCompProps {
  heading?: string;
  content: string;
  forSave?: string;
  forCancel?: string;
  cancelClick?: () => void;
  saveClick?: () => void;
}
