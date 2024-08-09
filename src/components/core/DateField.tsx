import { useFormat } from '@functions/utils';
import { DatePicker, Form } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

interface DateFieldProps {
  label?: string;
  name: string;
  required?: boolean;
  width?: string;
  disabled?: boolean;
  disabledDate?: (current: Dayjs) => boolean;
  isDisabledDate?: boolean;
  border?: boolean;
}

const DateField: React.FC<DateFieldProps> = ({
  label,
  name,
  required = false,
  width,
  disabled = false,
  disabledDate,
  isDisabledDate = false,
  border = false,
}) => {
  console.log('>>>dateField');
  return (
    <Form.Item
      label={label}
      name={name}
      // className="p-0"
      // style={{ borderBottom: '1px solid #D4D4D4' }}
      rules={[
        {
          required: required,
          message: 'This field is required.',
        },
      ]}
    >
      <DatePicker
        format={useFormat}
        disabledDate={(current) => {
          if (isDisabledDate && disabledDate) {
            return disabledDate(current);
          } else {
            let customDate = dayjs().format(useFormat);
            return current
              ? current.isAfter(dayjs(customDate, useFormat))
              : false;
          }
        }}
        // style={{ padding: '0', width: width || '18rem' }}
        disabled={disabled}
      />
    </Form.Item>
  );
};

export default React.memo(DateField);
