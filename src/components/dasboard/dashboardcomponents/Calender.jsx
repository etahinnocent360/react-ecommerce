import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
function Calender() {
  const [value, onChange] = useState(new Date());

  return (
    <div className="cal">
      <Calendar onChange={onChange} value={value} className="calender" />
    </div>
  );
}

export default Calender;
