export interface InputFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  width?: string;
  min?: number;
  max?: number;
  type?: string;
  disabled?: boolean;
  formatter?: (value: number | string | undefined) => string | undefined;
}
