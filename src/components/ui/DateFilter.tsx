'use client';
import { DownOutlined } from '@ant-design/icons';
import DateField from '@components/core/DateField';
import { useAppStore } from '@utils/Store';
import { Button, Dropdown, Form, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { disableFutureDates, getDateFormat } from 'src/utils/functions/utils';
import { createPortal } from 'react-dom';

interface DateFilterCompProps {
  moduleKey: string;
}

const DateFilterComponent: React.FC<DateFilterCompProps> = ({ moduleKey }) => {
  const dateFormat = 'YYYY/MM/DD';
  const [form] = Form.useForm();
  const [visibility, setVisibility] = useState<boolean>(false);
  const [tempFrom, setTempFrom] = useState<Dayjs | undefined>();
  const [tempTo, setTempTo] = useState<Dayjs | undefined>();
  const { dateFilters, setDateFilter } = useAppStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const disableBeforeStartDate = useCallback(
    (current: Dayjs | undefined): boolean => {
      if (tempFrom) {
        const fromDate = dayjs(tempFrom);
        return current
          ? current.isBefore(fromDate) || current.isAfter(dayjs())
          : false;
      }
      return current ? current.isAfter(dayjs()) : false;
    },
    [tempFrom]
  );

  const setFormDates = useCallback(
    (fromDate: Dayjs, toDate: Dayjs) => {
      form.setFieldsValue({ from: fromDate, to: toDate });
      setDateFilter(
        moduleKey,
        getDateFormat(fromDate.toISOString()),
        getDateFormat(toDate.toISOString())
      );
      setVisibility(false);
    },
    [form, setDateFilter, moduleKey]
  );

  const subtractDaysFromDate = useCallback(
    (daysToSubtract: number): void => {
      const endDate = dayjs();
      const fromDate = daysToSubtract
        ? dayjs().subtract(daysToSubtract, 'days')
        : dayjs().hour(23);

      setFormDates(fromDate, endDate);
    },
    [setFormDates]
  );

  const subtractMonthsFromDate = useCallback(
    (monthsToSubtract: number): void => {
      const endDate = dayjs();
      const fromDate = dayjs()
        .subtract(monthsToSubtract, 'months')
        .startOf('month');
      const actualEndDate =
        monthsToSubtract >= 1
          ? dayjs().subtract(monthsToSubtract, 'months').endOf('month')
          : endDate;

      setFormDates(fromDate, actualEndDate);
    },
    [setFormDates]
  );

  useEffect(() => {
    const initialDaysToSubtract = 0;
    const initialEndDate = dayjs();
    const initialStartDate = dayjs().subtract(initialDaysToSubtract, 'days');

    setFormDates(initialStartDate, initialEndDate);
  }, [setFormDates]);

  const handleApply = () => {
    if (tempFrom && tempTo) {
      const fromDate = getDateFormat(tempFrom.toISOString());
      const toDate = getDateFormat(tempTo.toISOString());

      if (toDate < fromDate) {
        form.setFieldsValue({ from: '', to: '' });
        return;
      }
      setDateFilter(moduleKey, fromDate, toDate);
      setVisibility(false);
    }
  };

  const items = useMemo(
    () => [
      {
        label: (
          <div
            className="bg-white p-4 shadow-lg rounded"
            style={{ backgroundColor: '#d7d7d7' }}
          >
            <Form form={form} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <p>From</p>
                <DateField
                  name="from"
                  width="12rem"
                  disabledDate={disableFutureDates}
                  isDisabledDate={true}
                  onChange={(date) => setTempFrom(date)}
                />
              </div>
              <div className="flex flex-col">
                <p>To</p>
                <DateField
                  name="to"
                  width="12rem"
                  disabledDate={disableBeforeStartDate}
                  isDisabledDate={true}
                  onChange={(date) => setTempTo(date)}
                />
              </div>
              <Button type="primary" onClick={handleApply}>
                Apply
              </Button>
            </Form>
          </div>
        ),
        key: '0',
        bifurcate: 'Custom',
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
    ],
    [
      form,
      disableBeforeStartDate,
      subtractDaysFromDate,
      subtractMonthsFromDate,
      tempFrom,
      tempTo,
    ]
  );

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setVisibility(!visibility);
  };

  const dropdownMenu = useMemo(() => {
    return (
      <div
        ref={dropdownRef}
        className="mt-2 bg-white p-4 shadow-lg rounded w-64 absolute z-10"
      >
        {items[0].label}
        {items.slice(1).map((item) => (
          <div key={item.key} className="mb-2">
            {item.label}
          </div>
        ))}
      </div>
    );
  }, [items]);

  return (
    <div className="relative">
      <Dropdown
        overlay={dropdownMenu}
        trigger={['click']}
        open={visibility}
        onOpenChange={(open) => setVisibility(open)}
        className="customBtn"
      >
        <a href="" onClick={handleDropdownClick} className="block p-3">
          <Space>
            {dateFilters[moduleKey]?.startDate} -{' '}
            {dateFilters[moduleKey]?.endDate}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
      {visibility && createPortal(dropdownMenu, document.body)}
    </div>
  );
};

export default React.memo(DateFilterComponent);
