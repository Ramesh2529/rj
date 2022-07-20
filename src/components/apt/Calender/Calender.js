import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Calendar = ({ onSelectedDate, startDate, onChangeDate }) => {


  return (
    <DatePicker selected={startDate} dateFormat="dd/MM/yyyy" className="form-control"
      onChange={(date) => onChangeDate(date)} />
  );
};

export default Calendar