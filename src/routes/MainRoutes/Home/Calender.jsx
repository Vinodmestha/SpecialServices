import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import addYears from 'date-fns/addYears'
import addMonths from 'date-fns/addMonths'
import "react-datepicker/dist/react-datepicker.css";

export default function DateSelect() {
    const [startDate, setStartDate] = useState(addYears(new Date(), -60));
    const [startDate1, setStartDate1] = useState();
    const [startDate2, setStartDate2] = useState();
    return (
        <div>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                // minDate={new Date()}
                maxDate={addYears(new Date(), -60)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
            />
            <DatePicker
                selected={startDate1}
                onChange={(date) => setStartDate1(date)}
                minDate={addYears(new Date(), -12)}
                maxDate={addYears(new Date(), -2)}
                // peekNextMonth
                showMonthDropdown
                showYearDropdown
            // dropdownMode="select"
            />


            {/* two years range and 1month remove back */}
            <DatePicker
                selected={startDate2}
                onChange={(date) => setStartDate2(date)}
                minDate={addYears(new Date(), -2)}
                maxDate={addMonths(new Date(), -1)}
                // selectsRange
                // minDate={new Date()}
                // peekNextMonth
                showMonthDropdown
                showYearDropdown
            // dropdownMode="select"
            />
        </div>
    );
}

