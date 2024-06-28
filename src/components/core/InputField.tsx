import { InputFieldProps } from '@interface/CoreInterface';
import { Form, Input, InputNumber } from 'antd';
import React, { FC } from 'react';

const InputField: FC<InputFieldProps> = ({
  label,
  name,
  placeholder,
  required = false,
  message = 'This field is required.',
  pattern,
  width,
  min,
  max,
  type,
  disabled = false,
  formatter,
}) => {
  return (
    <>
      {type ? (
        <Form.Item
          label={label}
          name={name}
          className="p-0"
          rules={[
            {
              required,
              message,
            },
          ]}
        >
          <InputNumber
            placeholder={placeholder}
            bordered={false}
            formatter={formatter}
            style={{
              borderBottom: '1px solid #D4D4D4',
              borderRadius: '0',
              padding: '0 0 0px 0',
              width: width ?? '18rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            disabled={disabled}
            min={min}
            max={max}
          />
        </Form.Item>
      ) : (
        <Form.Item
          label={label}
          name={name}
          className="p-0"
          rules={[
            {
              required,
              message,
            },
            {
              pattern,
              message: 'Enter the valid format',
            },
          ]}
        >
          <Input
            placeholder={placeholder}
            bordered={false}
            style={{
              borderBottom: '1px solid #D4D4D4',
              borderRadius: '0',
              padding: '0 0 0px 0',
              width: width ?? '18rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            disabled={disabled}
            maxLength={max ?? 100}
          />
        </Form.Item>
      )}
    </>
  );
};

export default React.memo(InputField);
