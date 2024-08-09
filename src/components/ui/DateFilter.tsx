'use client';
import { DownOutlined } from '@ant-design/icons';
import { useAppStore } from '@utils/Store';
import { Button, DatePicker, Dropdown, Menu, MenuProps, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState, useCallback, useMemo } from 'react';

interface DateFilterCompProps {
  moduleKey: string;
}

const DateFilterComponent: React.FC<DateFilterCompProps> = ({ moduleKey }) => {
  const dateFormat = 'DD/MM/YYYY';
  const { setDateFilter } = useAppStore();
  const [selectedDates, setSelectedDates] = useState<[Dayjs, Dayjs] | null>([
    dayjs().startOf('day'),
    dayjs().endOf('day'),
  ]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const { RangePicker } = DatePicker;

  // Callback for handling date range change
  const handleRangeChange = useCallback((dates: [Dayjs, Dayjs] | null) => {
    setSelectedDates(dates);
  }, []);

  // Callback for applying filters
  const handleApply = useCallback(() => {
    if (selectedDates && selectedDates[0] && selectedDates[1]) {
      setDropdownVisible(false);
    }
  }, [selectedDates, setDateFilter]);

  // Callback for handling menu item click
  const handleMenuClick = useCallback(
    (key: string) => {
      const today = dayjs();
      let newDates: [Dayjs, Dayjs] | null = null;

      switch (key) {
        case '0': // Today
          newDates = [today.startOf('day'), today.endOf('day')];
          break;
        case '1': // Yesterday
          newDates = [
            today.subtract(1, 'day').startOf('day'),
            today.subtract(1, 'day').endOf('day'),
          ];
          break;
        case '2': // This Week
          newDates = [today.startOf('week'), today.endOf('week')];
          break;
        case '3': // This Month
          newDates = [today.startOf('month'), today.endOf('month')];
          break;
        case '4': // Last Week
          newDates = [
            today.subtract(1, 'week').startOf('week'),
            today.subtract(1, 'week').endOf('week'),
          ];
          break;
        case '5': // Last Month
          newDates = [
            today.subtract(1, 'month').startOf('month'),
            today.subtract(1, 'month').endOf('month'),
          ];
          break;
        default:
          break;
      }

      if (newDates) {
        setSelectedDates(newDates);
        setDropdownVisible(false);
      }
    },
    [setDateFilter]
  );

  // Memoize the items for the dropdown menu
  const items: MenuProps['items'] = useMemo(
    () => [
      {
        label: (
          <>
            <div onClick={(e) => e.stopPropagation()}>
              <RangePicker
                onChange={() => handleRangeChange}
                format={dateFormat}
                value={selectedDates}
                disabledDate={(current) =>
                  current && current > dayjs().endOf('day')
                }
              />
            </div>
            <Button
              type="primary"
              onClick={handleApply}
              style={{ marginTop: '8px' }}
            >
              Apply Filters
            </Button>
          </>
        ),
        key: '6',
      },
      {
        label: (
          <p className="dateClass" onClick={() => handleMenuClick('0')}>
            Today
          </p>
        ),
        key: '0',
      },
      {
        label: (
          <p className="dateClass" onClick={() => handleMenuClick('1')}>
            Yesterday
          </p>
        ),
        key: '1',
      },
      {
        label: (
          <p className="dateClass" onClick={() => handleMenuClick('2')}>
            This Week
          </p>
        ),
        key: '2',
      },
      {
        label: (
          <p className="dateClass" onClick={() => handleMenuClick('3')}>
            This Month
          </p>
        ),
        key: '3',
      },
      {
        label: (
          <p className="dateClass" onClick={() => handleMenuClick('4')}>
            Last Week
          </p>
        ),
        key: '4',
      },
      {
        label: (
          <p className="dateClass" onClick={() => handleMenuClick('5')}>
            Last Month
          </p>
        ),
        key: '5',
      },
    ],
    [handleRangeChange, handleApply, handleMenuClick, selectedDates, dateFormat]
  );
  console.log(selectedDates, 'dates');
  return (
    <div className="relative">
      <Dropdown
        overlay={
          <div onClick={(e) => e.stopPropagation()}>
            <Menu items={items} />
          </div>
        }
        trigger={['click']}
        visible={dropdownVisible}
        onVisibleChange={setDropdownVisible}
        className="customBtn"
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            {selectedDates
              ? `${selectedDates[0].format(dateFormat)} - ${selectedDates[1].format(
                  dateFormat
                )}`
              : 'Select Date Range'}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default React.memo(DateFilterComponent);
