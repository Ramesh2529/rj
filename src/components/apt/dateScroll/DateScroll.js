import React from 'react'


import {
    addMonths,
    format,
    getDay,
    getDaysInMonth,
    startOfMonth,
    subMonths,
  } from "date-fns";

  import  { useEffect, useState } from "react";
  import { Col, Row } from "react-bootstrap";
  import {
    MdOutlineArrowBackIosNew,
    MdOutlineArrowForwardIos,
  } from "react-icons/md";
  import "./DateScroll.scss";
  export function getDayName(dateStr, locale) {
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: "short" });
  }
  export const getSlashDate = (d) => {
    const allDaysInMonth = getDaysInMonth(d);
    const activeDate = format(d, "yyyy MMM");
    const dateArr = activeDate.split(" ");
    const activeYear = dateArr[0];
    const activeMonth = dateArr[1]?.toLowerCase();

    return {
        allDaysInMonth,
        activeDate,
        dateArr,
        activeYear,
        activeMonth,
      };
    };
    export const activeMonths = (selDate) => {
        let nextMonth = addMonths(selDate, 1);
        const currentDateInfo = getSlashDate(selDate);
        const nextDateInfo = getSlashDate(nextMonth);
        const currentMonthArray = [...Array(currentDateInfo.allDaysInMonth)].map(
            (elementInArray, index) => {
              const newArrayData = {
                day: index + 1,
                month: currentDateInfo.activeMonth,
                year: currentDateInfo.activeYear,
              };
              return newArrayData;
            }
          );
          const nextMonthArray = [...Array(nextDateInfo.allDaysInMonth)].map(
            (elementInArray, index) => {
              const newArrayData = {
                day: index + 1,
                month: nextDateInfo.activeMonth,
                year: nextDateInfo.activeYear,
              };
              return newArrayData;
            }
          );
          return [...currentMonthArray, ...nextMonthArray];
  // const blankDays = nextMonthArray.slice(0, firstDayOfMonth);
};


const DateScroll =()=> {
    const [activeDays, setActiveDays] = useState([]);
    const [date, setDate] = useState(new Date());
    const [currentMonthArrays, setCurrentMonthArrays] = useState([]);
    const [activeMonthArrays, setActiveMonthArrays] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeMonthCount, setActiveMonthCount] = useState(
      getDaysInMonth(new Date())
    );

    const [isPrev, setIsPrev] = useState(true);

    const firstDayOfMonthSu = getDay(startOfMonth(date));
  const firstDayOfMonth = firstDayOfMonthSu === 0 ? 6 : firstDayOfMonthSu - 1;

  useEffect(() => {
    setCurrentMonthArrays(activeMonths(date));
    setActiveMonthArrays(activeMonths(date));
    // activeMonths(date);
  }, []);


  const onActiveMonthChange = (activeDate) => {
    let today = activeDate.toLocaleDateString();
    const dateArr = today.split("/");
    const day = dateArr[1];

    const todayIndex = activeMonthArrays.findIndex(
      (item, idx) => item.day === Number(day)
    );
    const tempCurrentMonths = [...activeMonthArrays];
    const tempDaysArray = tempCurrentMonths.slice(todayIndex, todayIndex + 1);
    setActiveIndex(todayIndex + 1);
    setActiveDays(tempDaysArray);
  };

  useEffect(() => {
    if (activeMonthArrays.length > 0) {
      onActiveMonthChange(date);
    }
  }, [activeMonthArrays]);


  const onNextMonth = (selDate) => {
    let nextMonth = addMonths(selDate, 1);
    const currentDateInfo = getSlashDate(selDate);
    const nextDateInfo = getSlashDate(nextMonth);
    setDate(selDate);

    const currentMonthArray = [...Array(currentDateInfo.allDaysInMonth)].map(
      (elementInArray, index) => {
        const newArrayData = {
          day: index + 1,
          month: currentDateInfo.activeMonth,
          year: currentDateInfo.activeYear,
        };
        return newArrayData;
      }
    );
    const nextMonthArray = [...Array(nextDateInfo.allDaysInMonth)].map(
      (elementInArray, index) => {
        const newArrayData = {
          day: index + 1,
          month: nextDateInfo.activeMonth,
          year: nextDateInfo.activeYear,
        };
        return newArrayData;
      }
    );
    const tempCurrentMonths = [...currentMonthArray, ...nextMonthArray];

    const tempDaysArray = tempCurrentMonths.slice(0, 1);

    setActiveIndex(1);
    setActiveDays(tempDaysArray);
    setIsPrev(true);
    setCurrentMonthArrays([...currentMonthArray, ...nextMonthArray]);
  };


  const onPrevMonth = (subMonthDate) => {
    console.log("subMonthDate....", subMonthDate);
    let nextMonth = addMonths(subMonthDate, 1);
    const prevMonthArray = getSlashDate(subMonthDate);
    const nextDateInfo = getSlashDate(nextMonth);
    setDate(subMonthDate);

    const prevMonthArr = [...Array(prevMonthArray.allDaysInMonth)].map(
      (elementInArray, index) => {
        const newArrayData = {
          day: index + 1,
          month: prevMonthArray.activeMonth,
          year: prevMonthArray.activeYear,
        };
        return newArrayData;
      }
    );
    const nextMonthArr = [...Array(nextDateInfo.allDaysInMonth)].map(
      (elementInArray, index) => {
        const newArrayData = {
          day: index + 1,
          month: nextDateInfo.activeMonth,
          year: nextDateInfo.activeYear,
        };
        return newArrayData;
      }
    );

    const tempCurrentMonths = [...nextMonthArr, ...prevMonthArr];

    console.log(
      "tempCurrentMonths",
      tempCurrentMonths[tempCurrentMonths.length - 1]
    );

    const backNum = prevMonthArray.allDaysInMonth;
    setActiveIndex(backNum - 1);
    setActiveDays([tempCurrentMonths[tempCurrentMonths.length - 1]]);
    setIsPrev(false);
    setCurrentMonthArrays([...prevMonthArr, ...nextMonthArr]);
  };

  const onNext = () => {
    if (activeIndex >= activeMonthCount) {
      onNextMonth(addMonths(date, 1));
      setActiveMonthCount(getDaysInMonth(addMonths(date, 1)));
    } else {
      const tempCurrentMonths = [...currentMonthArrays];
      const tempDaysArray = tempCurrentMonths.slice(
        activeIndex,
        activeIndex + 1
      );
      setActiveIndex(activeIndex + 1);
      setActiveDays(tempDaysArray);
      setIsPrev(true);
    }
  };
  const onPrev = () => {
    const tempCurrentMonths = [...currentMonthArrays];
    if (activeIndex === 0) {
      onPrevMonth(subMonths(date, 1));
    } else {
      let tempDaysArray = [];
      if (isPrev) {
        tempDaysArray = tempCurrentMonths.slice(
          activeIndex - 2,
          activeIndex - 1
        );
        setActiveIndex(activeIndex - 2);
        setActiveDays(tempDaysArray);
        setIsPrev(false);
      } else {
        tempDaysArray = tempCurrentMonths.slice(activeIndex - 1, activeIndex);
        if (activeIndex === 1) {
          setActiveIndex(0);
        } else {
          setActiveIndex(activeIndex - 1);
        }
        setActiveDays(tempDaysArray);
        setIsPrev(false);
      }
    }
};

console.log("activeIndex...", activeDays);

  // setDate(addMonths(date, 1))

  console.log('format(date, "MMMM yyyy")...', getDayName(`30/jun/2022`));







  return (
    <fieldset className="ne_data_scroll text-center mt-3">
      <Row>
        <Col md={1} onClick={onPrev}>
          <MdOutlineArrowBackIosNew className="ne_arrow" onClick={onPrev} />
        </Col>
        {activeDays.map((item, idx) => {
          return (
            <Col key={idx}>
              <span className="ne_time-slot_day">
                {getDayName(`${item.day}/${item.month}/${item.year}`)}{" "}
                {item.day} {format(date, "MMMM yyyy")}
              </span>
            </Col>
          );
        })}

        <Col md={1} onClick={onNext}>
          <MdOutlineArrowForwardIos className="ne_arrow" />
        </Col>
      </Row>
      {/* {isDateInput && <Calendar onChange={onChange} value={value} />} */}
    </fieldset>
  );
};


export default DateScroll;
