// DatePicker.jsx
import React, { useState } from 'react';
import { format, addDays, eachDayOfInterval } from 'date-fns';
import './DatePicker.css';

const DatePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const highlightedDays = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const daysBetween = eachDayOfInterval({ start, end });

      // بازگرداندن یک آرایه از روزهای هایلایت شده به صورت yyyy-MM-dd
      return daysBetween.map((day) => format(day, 'yyyy-MM-dd'));
    }
    return [];
  };

  const isHighlighted = (date) => highlightedDays().includes(date);

  return (
    <div className="date-picker-container">
      <label htmlFor="startDatePicker">تاریخ شروع:</label>
      <input
        type="date"
        id="startDatePicker"
        value={startDate}
        onChange={handleStartDateChange}
      />

      <label htmlFor="endDatePicker">تاریخ پایان:</label>
      <input
        type="date"
        id="endDatePicker"
        value={endDate}
        onChange={handleEndDateChange}
      />

      <div>
        {[...Array(31).keys()].map((_, index) => {
          const currentDate = addDays(new Date(startDate), index);
          const formattedDate = format(currentDate, 'yyyy-MM-dd');
          const highlightClass = isHighlighted(formattedDate) ? 'highlighted-day' : '';

          return (
            <span key={formattedDate} className={highlightClass}>
              {formattedDate}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default DatePicker;
