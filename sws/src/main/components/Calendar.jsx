import { useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styled from 'styled-components';

const Calendar = ({ selectedRange, onSelect }) => {
  return (
    <CalendarContainer>
      <StyledDayPicker
        mode="range"
        locale={ko}
        selected={selectedRange}
        onSelect={onSelect}
        numberOfMonths={1}
        footer={null}
        formatters={{
          formatCaption: (date) => format(date, 'yyyy.MM', { locale: ko }),
        }}
        modifiersClassNames={{
          selected: 'selected',
          range_middle: 'range-middle',
          range_start: 'range-start',
          range_end: 'range-end',
        }}
      />
    </CalendarContainer>
  );
};

export default Calendar;

const CalendarContainer = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 20px;
  width: 100%;
`;

const StyledDayPicker = styled(DayPicker)`
  .rdp-caption {
    font-size: 18px;
    font-weight: 600;
    justify-content: center;
  }

  .rdp-head {
    font-weight: bold;
    font-size: 14px;
    color: #222;
  }

  .rdp-day {
    border-radius: 0;
    width: 36px;
    height: 36px;
  }

  .rdp-day_selected,
  .rdp-day_range_start,
  .rdp-day_range_end {
    background-color: #007a5c;
    color: white;
  }

  .rdp-day_range_middle {
    background-color: #d2f0e7;
    color: #007a5c;
  }

  .rdp-day_range_start {
    border-top-left-radius: 9999px;
    border-bottom-left-radius: 9999px;
  }

  .rdp-day_range_end {
    border-top-right-radius: 9999px;
    border-bottom-right-radius: 9999px;
  }
`;
