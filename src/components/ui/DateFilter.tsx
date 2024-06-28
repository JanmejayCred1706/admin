import { DownOutlined } from '@ant-design/icons';
import { DateField } from '@components/Component';
import { DateFilterProps } from 'src/interface/globalInterface';
import { Button, Dropdown, Form, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { disableFutureDates } from 'src/utils/functions/utils';

interface DateFilterCompProps {
  dateFilter: DateFilterProps;
  setDateFilter: React.Dispatch<React.SetStateAction<DateFilterProps>>;
}

const DateFilterComponent: React.FC<DateFilterCompProps> = ({
  dateFilter,
  setDateFilter,
}) => {
  const dateFormat = 'YYYY/MM/DD';
  const [visibility, setVisibility] = useState<boolean>(false);
  const [form] = Form.useForm();
  const from: Dayjs | undefined = Form.useWatch('from', form);
  const to: Dayjs | undefined = Form.useWatch('to', form);

  const subtractDaysFromDate = (daysToSubtract: number): void => {
    const endDate = dayjs().toISOString();
    const fromDate = daysToSubtract
      ? dayjs().subtract(daysToSubtract, 'days').toISOString()
      : dayjs().hour(23).toISOString();

    form.setFieldsValue({ from: dayjs(fromDate), to: dayjs(endDate) });
    setDateFilter({ startDate: fromDate, endDate: endDate });
    setVisibility(false);
  };

  const subtractMonthsFromDate = (monthsToSubtract: number): void => {
    const endDate = dayjs().toISOString();
    const fromDate = dayjs()
      .subtract(monthsToSubtract, 'months')
      .startOf('month')
      .toISOString();
    const actualEndDate =
      monthsToSubtract >= 1
        ? dayjs()
            .subtract(monthsToSubtract, 'months')
            .endOf('month')
            .toISOString()
        : endDate;

    form.setFieldsValue({
      from: dayjs(fromDate),
      to: dayjs(actualEndDate),
    });
    setDateFilter({ startDate: fromDate, endDate: actualEndDate });
    setVisibility(false);
  };

  const disableBeforeStartDate = (current: Dayjs | undefined): boolean => {
    if (dateFilter.startDate && from) {
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
    const initialDaysToSubtract = 30;
    subtractDaysFromDate(initialDaysToSubtract);

    const initialEndDate = dayjs().toISOString();
    const initialStartDate = dayjs()
      .subtract(initialDaysToSubtract, 'days')
      .toISOString();
    form.setFieldsValue({
      from: dayjs(initialStartDate),
      to: dayjs(initialEndDate),
    });
    setDateFilter({ startDate: initialStartDate, endDate: initialEndDate });
  }, [form, setDateFilter]);

  useEffect(() => {
    if (from && to) {
      const fromDate = from.toISOString();
      const toDate = to.toISOString();

      if (toDate < fromDate) {
        // toast.error('End date must be greater than Start date');
        form.setFieldsValue({ from: '', to: '' });
        return;
      }
      setDateFilter({ startDate: fromDate, endDate: toDate });
      setVisibility(false);
    }
  }, [from, to, form, setDateFilter]);

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
      onOpenChange={() => setVisibility(!visibility)}
      className="customBtn"
    >
      <a
        href=""
        onClick={(e) => e.preventDefault()}
        className="block px-4 py-2"
      >
        <Space>
          {dayjs(dateFilter.startDate).format(dateFormat)} -{' '}
          {dayjs(dateFilter.endDate).format(dateFormat)}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default React.memo(DateFilterComponent);
