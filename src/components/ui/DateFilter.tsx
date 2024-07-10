'use client';
import { DownOutlined } from '@ant-design/icons';
import { DateField } from '@components/Component';
import { useAppStore } from '@utils/Store';
import { Button, Dropdown, Form, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { disableFutureDates } from 'src/utils/functions/utils';

interface DateFilterCompProps {
  moduleKey: string;
}

const DateFilterComponent: React.FC<DateFilterCompProps> = ({ moduleKey }) => {
  const dateFormat = 'YYYY/MM/DD';
  const [visibility, setVisibility] = useState<boolean>(false);
  const [form] = Form.useForm();
  const from: Dayjs | undefined = Form.useWatch('from', form);
  const to: Dayjs | undefined = Form.useWatch('to', form);

  const { dateFilters, setDateFilter } = useAppStore();

  const subtractDaysFromDate = (daysToSubtract: number): void => {
    const endDate = dayjs();
    const fromDate = daysToSubtract
      ? dayjs().subtract(daysToSubtract, 'days')
      : dayjs().hour(23);

    form.setFieldsValue({ from: fromDate, to: endDate });
    setDateFilter(moduleKey, fromDate.toISOString(), endDate.toISOString());
    setVisibility(false);
  };

  const subtractMonthsFromDate = (monthsToSubtract: number): void => {
    const endDate = dayjs();
    const fromDate = dayjs()
      .subtract(monthsToSubtract, 'months')
      .startOf('month');
    const actualEndDate =
      monthsToSubtract >= 1
        ? dayjs().subtract(monthsToSubtract, 'months').endOf('month')
        : endDate;

    form.setFieldsValue({
      from: fromDate,
      to: actualEndDate,
    });
    setDateFilter(
      moduleKey,
      fromDate.toISOString(),
      actualEndDate.toISOString()
    );
    setVisibility(false);
  };

  const disableBeforeStartDate = (current: Dayjs | undefined): boolean => {
    if (dateFilters[moduleKey]?.startDate && from) {
      const fromDate = dayjs(from);

      if (!fromDate.isValid()) {
        return current ? current.isAfter(dayjs()) : false;
      }

      return current
        ? current.isBefore(fromDate) || current.isAfter(dayjs())
        : false;
    }

    return current ? current.isAfter(dayjs()) : false;
  };

  useEffect(() => {
    const initialDaysToSubtract = 0;
    const initialEndDate = dayjs();
    const initialStartDate = dayjs().subtract(initialDaysToSubtract, 'days');

    form.setFieldsValue({
      from: initialStartDate,
      to: initialEndDate,
    });
    setDateFilter(
      moduleKey,
      initialStartDate.toISOString(),
      initialEndDate.toISOString()
    );
  }, [form, setDateFilter, moduleKey]);

  useEffect(() => {
    if (from && to) {
      const fromDate = from.toISOString();
      const toDate = to.toISOString();

      if (toDate < fromDate) {
        form.setFieldsValue({ from: '', to: '' });
        return;
      }
      setDateFilter(moduleKey, fromDate, toDate);
      setVisibility(false);
    }
  }, [from, to, form, setDateFilter, moduleKey]);

  const items = [
    {
      label: (
        <Form form={form} className="relative top-2 flex gap-x-2">
          <div className="flex flex-col">
            <p>From</p>
            <DateField
              name="from"
              width="8rem"
              disabledDate={disableFutureDates}
              isDisabledDate={true}
            />
          </div>
          <div className="flex flex-col">
            <p>To</p>
            <DateField
              name="to"
              width="8rem"
              disabledDate={disableBeforeStartDate}
              isDisabledDate={true}
            />
          </div>
        </Form>
      ),
      key: '0',
      bifurcate: 'Hourly',
    },
    {
      label: (
        <Button onClick={() => subtractDaysFromDate(0)} block>
          Today
        </Button>
      ),
      key: '1',
      bifurcate: 'Hourly',
    },
    {
      label: (
        <Button onClick={() => subtractDaysFromDate(1)} block>
          Yesterday
        </Button>
      ),
      key: '2',
      bifurcate: 'Hourly',
    },
    {
      label: (
        <Button onClick={() => subtractDaysFromDate(7)} block>
          Last 7 Days
        </Button>
      ),
      key: '3',
      bifurcate: 'Daily',
    },
    {
      label: (
        <Button onClick={() => subtractMonthsFromDate(0)} block>
          This Month
        </Button>
      ),
      key: '4',
      bifurcate: 'Weekly',
    },
    {
      label: (
        <Button onClick={() => subtractMonthsFromDate(1)} block>
          Past Month
        </Button>
      ),
      key: '5',
      bifurcate: 'Weekly',
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      trigger={['click']}
      open={visibility}
      onOpenChange={(open) => setVisibility(open)}
      className="customBtn"
    >
      <a href="" onClick={(e) => e.preventDefault()} className="block p-3">
        <Space>
          {dayjs(dateFilters[moduleKey]?.startDate).format(dateFormat)} -{' '}
          {dayjs(dateFilters[moduleKey]?.endDate).format(dateFormat)}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default React.memo(DateFilterComponent);
