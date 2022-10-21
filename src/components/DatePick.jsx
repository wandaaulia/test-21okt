import React, { useState, forwardRef } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getMonth, getYear } from 'date-fns';
import { MdDateRange, MdKeyboardArrowUp } from "react-icons/md";


const DatePic = ({ date, isWeekday, handleChangeDate }) => {

  return (
    <div className='flex flex-row'>
      <DatePicker
        showPopperArrow={false}
        selected={date} filterDate={isWeekday} dateFormat="d MMMM yyyy" onChange={handleChangeDate} />
      <div>
        <MdKeyboardArrowUp size={24} className='text-[#7186A7] ml-[8px]' />
      </div>
    </div>
  )
}

export default DatePic
