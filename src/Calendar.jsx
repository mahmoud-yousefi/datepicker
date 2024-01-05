import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './Calendar.css';
// import { render } from '@testing-library/react';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [calendarContent, setCalendarContent] = useState(null);
  const [selectedDay, setSelectedDay] = useState();
  const [goDate, setGoDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleDayClick = (day) => {
    // console.log(day);
    setSelectedDay(day);
  };

  const handleInputChange = (d) => {
    if(!goDate){
      setGoDate(d);
    }else {
      setReturnDate(d);
    }
    // if(goDate && returnDate && returnDate < goDate){
    //   setGoDate(d);
    //   setReturnDate(null);
    // }
  };

  const handleDisplayCalendar = () => {
    if(showCalendar){
      setShowCalendar(false);
    }else {
      setShowCalendar(true);
    }
  }

  useEffect(() => {
    renderCalendar();
  }, [currentMonth]);

  useEffect(() => {
    // هر بار که currentMonth تغییر کند، جدول را بازسازی کنید
    renderCalendar();
    // if(showCalendar){
    //   handleDisplayCalendar();
    // }
  }, [selectedDay]);

  useEffect(() => {
    if(moment(returnDate).isBefore(moment(goDate))){
      setGoDate(returnDate);
      setReturnDate("");
      // renderCalendar();
      // setSelectedDay(goDate);
      // setReturnDate(null);
    }
    renderCalendar();
  }, [goDate, returnDate]);

  // useEffect(() => {

  // }, [goDate]);

  const renderCalendar = () => {
    const startDay = currentMonth.clone().startOf('month').startOf('week');
    const endDay = currentMonth.clone().endOf('month').endOf('week');
    // const daysInMonth = currentMonth.daysInMonth();

    let rows = [];
    let cells = [];

    // افزودن هدر روزهای هفته
    const weekDays = moment.weekdaysShort();
    let headerRow = weekDays.map(day => (
      <th key={day} className='text-lg text-blue-400'>{day}</th>
    ));
    rows.push(<tr key="header-row">{headerRow}</tr>);

    for (let d = startDay; d.isBefore(endDay) || d.isSame(endDay, 'day'); d.add(1, 'day')) {
      // console.log('Day:', d.format('YYYY-MM-DD')); 
      const day = d.date();
      const isCurrentDay = d.isSame(moment(), 'day');
      const isInMonth = d.isSame(currentMonth, 'month');
      const formattedDate = d.format('YYYY-MM-DD');
      const isPastDay = d.isBefore(moment(), 'day');
      const isoWeekday = d.isoWeekday();
      const isHoliday = isoWeekday === 7;
      const goDateSelect = goDate === d.format('YYYY-MM-DD');
      const returnDateSelect = returnDate === d.format('YYYY-MM-DD');
      console.log(goDate, returnDate, d.format('YYYY-MM-DD'));
      const isHilight = goDate !== null && returnDate !== null && (moment(goDate).isBefore(d) && d.isBefore(moment(returnDate)));
      // console.log(isHoliday);

      cells.push(
        <td
          key={formattedDate}
          className={`${
            isCurrentDay ? 'font-bold outline outline-gray-400 outline-1 rounded-lg' : ''
          } ${
            isInMonth && !isHoliday? 'text-black' : 'text-gray-500'
          } ${
            selectedDay === formattedDate && !isPastDay && 'bg-blue-500 rounded-lg' 
          } ${
            (goDateSelect || returnDateSelect)? 'bg-blue-500 rounded-lg' : ''
          } ${
            !isPastDay ? 'enable-hover-select' : '' // افزودن کلاس جدید برای روزهای امروز و آینده
          } ${
            isHoliday? 'text-red-600' : ''
          }  ${
            isHilight? 'bg-blue-300' : ''
          }`}
          onClick={() => {
            if(!isPastDay){
              handleDayClick(formattedDate);
              handleInputChange(formattedDate);
            }
          }}
        >
            <span>{day}</span> 
        </td>
      );

      if (d.day() === 6) {
        // console.log('Row:', rows);
        rows.push(<tr key={d}>{cells}</tr>);
        cells = [];
      }
    }

    // تنظیم کردن محتوای جدول به عنوان state
    setCalendarContent(<table id="calendar-table"><tbody>{rows}</tbody></table>);
  };

  const datepicker = () => {
    return (
      <>
            <div id='container' className="container rounded-xl mx-auto p-4 bg-white"
              style={{ display: showCalendar ? 'block' : 'none' }}
            >
                {/* نمایش ماه و سال */}
                <div className="calendar-header mb-4">
                <h2 className='text-4xl font-bold'>{currentMonth.format('YYYY')}</h2>
                  <button onClick={() => {
                    const now = currentMonth.clone().subtract(1, 'month');
                    console.log(now);
                    if(!now.isBefore(moment().format('YYYY-MM-DD'))){
                    setCurrentMonth(currentMonth.clone().subtract(1, 'month'))
                    }}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                  <h2 className='text-4xl font-bold'>{currentMonth.format('MMMM')}</h2>
                  <button onClick={() => setCurrentMonth(currentMonth.clone().add(1, 'month'))}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                  </button>
                </div>

                {/* مثال: نمایش جدول با استفاده از استایل */}
                <div>
                  {calendarContent}
                </div>
                <div className='flex-wrap mt-5'>
                  <button onClick={handleDisplayCalendar} className='w-1/2 text-blue-500 hover:text-blue-300 font-bold py-2 px-4 rounded-md'>
                    انصراف
                  </button>
                  <button disabled={!goDate || !returnDate} onClick={() => {
                    handleDisplayCalendar();
                    setConfirm(true);
                    alert(`تاریخ رفت ${moment(goDate).format('MMMM D')} و تاریخ برگشت ${moment(returnDate).format('MMMM D')} است.`);
                  }} className={`${!goDate || !returnDate? 'bg-blue-300 cursor-not-allowed':' bg-blue-700'} w-1/2 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-md`}>
                    تایید
                  </button>
                </div>
              </div>
      </>
    )
  };

  return (
    <>
      <div className="mt-4 flex-wrap text-center">
        <input
          autoComplete='off'
          type="text"
          name="goDate"
          value={goDate}
          placeholder={'تاریخ رفت'}
          readOnly
          onClick={() => {
            handleDisplayCalendar();
          }}
          // onChange={handleDisplayCalendar}
          className="w-28 mt-1 p-2 text-md font-bold text-gray-800 border border-gray-300 rounded-r-lg focus:outline-none focus:ring focus:border-grey-300"
        />
        <input
          autoComplete='off'
          type="text"
          name="returnDate"
          value={returnDate}
          placeholder='تاریخ برگشت'
          readOnly
          // onClick={handleDisplayCalendar}
          // onChange={handleDisplayCalendar}
          className="w-28 mt-1 p-2 text-md font-bold text-gray-800 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:border-grey-300"
        />
       {/* {confirm? 
          <span className='text-white text-center font-bold text-2xl mt-2'>{`تاریخ رفت ${moment(goDate).format('YYYY MM')}`}</span>
      : ''} */}
      </div>
      {datepicker()}
    </>
  );
};

export default Calendar;
