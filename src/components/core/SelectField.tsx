import { Form, Select } from 'antd';
import React from 'react';
import type { DefaultOptionType } from 'antd/es/select';

interface SelectFieldProps {
  selectArr: Array<string | Record<string, any>>;
  selectedValue?: string;
  selectedName?: string;
  name: string;
  label?: string;
  width?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  secondName?: string;
  requiredDyn?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  selectArr,
  selectedValue,
  selectedName,
  name,
  label,
  width,
  placeholder,
  required,
  disabled,
  secondName,
}) => {
  const checkType = selectArr?.length > 0 ? typeof selectArr[0] : '';

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: !!required,
          message: 'This field is required',
        },
      ]}
    >
      {checkType === 'string' ? (
        <Select
          showSearch
          allowClear
          defaultActiveFirstOption
          bordered={false}
          placeholder={placeholder}
          disabled={!!disabled}
          style={{
            borderBottom: '1px solid #D4D4D4',
            borderRadius: '0',
            marginTop: '-1rem',
            marginLeft: '0px',
            width: width || '18rem',
          }}
        >
          {selectArr?.map((cur, index) => (
            <Select.Option value={cur as string} key={index}>
              {cur as string}
            </Select.Option>
          ))}
        </Select>
      ) : (
        <Select
          showSearch
          allowClear
          defaultActiveFirstOption
          bordered={false}
          placeholder={placeholder}
          disabled={!!disabled}
          style={{
            borderBottom: '1px solid #D4D4D4',
            borderRadius: '0',
            marginTop: '-1rem',
            marginLeft: '0px',
            width: width || '18rem',
          }}
          filterOption={(inputValue, option) => {
            const optionChildren = option?.children as string | undefined;
            return optionChildren
              ? optionChildren.toLowerCase().includes(inputValue.toLowerCase())
              : false;
          }}
        >
          {selectArr?.map((cur, index) => {
            const item = cur as Record<string, any>;
            return (
              <Select.Option value={item[selectedValue!]} key={index}>
                {item[selectedName!]} {secondName && `(${item[secondName]})`}
              </Select.Option>
            );
          })}
        </Select>
      )}
    </Form.Item>
  );
};

export default React.memo(SelectField);
