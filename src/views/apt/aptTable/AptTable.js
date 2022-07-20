import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import React, { forwardRef, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Favicon from "react-favicon";
import { validate } from "../../../helper/Validation";
import MyCalender from "../../../components/apt/Calender/Calender";
import { tbodyList, tdata } from "../../../data/tableData";
import { matchArrays } from "../../../components/apt/helper/search";
//import Hover from "./Hovermodal";
import "./AptTable.css";
import CustomModal from "../../ui-elements/input/Modal";
import firstNameList from "../../../components/apt/AutoComplete/Data.json";

const initialState = {
  tableId: "",
  cellId: "",
  activeColumnId: "",
  duration: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  heard: "",
  service: "",
  room: "",
  startTime: "",
  endTime: "",
  start: "",
  length: "",
  with: "",
};

const autoFields = {
  lastName: "",
  phone: "",
  email: "",
  heard: "",
  service: "",
  room: "",
  endTime: "",
  start: "",
  length: "",
  with: "",
};

const aptError = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
};

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const AptTable = () => {
  const [activeDotor, setActiveDoc] = useState(null);
  const [defaultTime, setdefaultTime] = useState(tbodyList);
  const [tableDatastate, setTableDatasState] = useState(tbodyList);
  const [appointmentData, setAppointmentData] = useState(initialState);
  const [aptDataError, setAptDataError] = useState(aptError);
  const [activeTime, setActiveTime] = useState("08:00");
  const [selectedDay, setSelectedDay] = useState(null);
  const [sliceValue, setSliceValue] = useState(5);
  const [allTdata, setAllTData] = useState(tdata);
  const [allTdData, setAllTdData] = useState(tbodyList);
  const [tdataState, setTdataState] = useState(tdata);
  const [selectedDate, setSelectedDate] = useState("DD/MM/YYYY");
  const [startDate, setStartDate] = useState(new Date());
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [isFieldOpen, setIsFieldOpen] = useState({
    isSuggestion: false,
    isOtherFields: false,
  });
  const [show, setShow] = useState(false);
  const [fsList, setFsList] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeCreds = (event) => {
    if (event.target.name === "firstName") {
      setAppointmentData({
        ...appointmentData,
        firstName: event.target.value,
      });

      const fsSuggestions = matchArrays(event.target.value, firstNameList);
      if (fsSuggestions.length > 0) {
        setFsList(fsSuggestions);
        setIsFieldOpen({
          ...isFieldOpen,
          isSuggestion: true,
        });
      } else {
        setIsFieldOpen({
          ...isFieldOpen,
          isSuggestion: false,
        });
      }
      if (event.target.value.length > 2) {
        setIsFieldOpen({
          ...isFieldOpen,
          isOtherFields: true,
        });
      }
      setAppointmentData({
        tableId: appointmentData.tableId,
        cellId: appointmentData.cellId,
        activeColumnId: appointmentData.activeColumnId,
        duration: appointmentData.duration,
        startTime: appointmentData.startTime,
        ...autoFields,
      });
    } else {
      setAppointmentData({
        ...appointmentData,
        [event.target.name]: event.target.value,
      });
    }
    setAptDataError({
      ...aptDataError,
      [event.target.name]: validate(event.target.name, event.target.value),
    });
  };

  const onFsListItem = (item) => {
    setAppointmentData({
      ...appointmentData,
      firstName: item.value,
      email: item.email,
      endTime: item.endTime,
      heard: item.heard,
      lastName: item.lastName,
      length: item.length,
      phone: item.phone,
      room: item.room,
      service: item.service,
      start: item.start,
      value: item.value,
      with: item.with,
    });

    setIsFieldOpen({
      ...isFieldOpen,
      isSuggestion: false,
      isOtherFields: true,
    });
  };

  const onOutSideClick = () => {
    setIsFieldOpen({
      ...isFieldOpen,
      isSuggestion: false,
    });
  };

  const onAppointMentBook = (tableDataIdx, tCellIdx, tdItem) => {
    setActiveTime(tdItem.info.timeId);
    setActiveDoc(tdata[tCellIdx].docName);
    setShow(true);
    setAppointmentData({
      ...appointmentData,
      startTime: tdItem.info.timeId,
      tableId: tableDataIdx,
      cellId: tCellIdx,
      activeColumnId: tdItem.info.tCellInfo[tCellIdx].itemId,
    });
  };

  const onSubmit = () => {
    let validationErrors = {};
    Object.keys(appointmentData).forEach((name) => {
      const error = validate(name, appointmentData[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      setAptDataError(validationErrors);
      return;
    }

    const tempTdata = [...tableDatastate];
    const tempTdataInfo = [
      ...tableDatastate[appointmentData.tableId].info.tCellInfo,
    ];
    const selectedTableList = [...tableDatastate];

    let rowCount = [];

    selectedTableList.map((sRow, roxIdx) => {
      sRow.info.tCellInfo.map((tsRow, tsIdx) => {
        if (tsRow.itemId === appointmentData.activeColumnId) {
          if (
            tsRow.cellTimeId <= appointmentData.endTime &&
            tsRow.cellTimeId > appointmentData.startTime
          ) {
            rowCount.push(1);
            return (tsRow.isDelete = true);
          }
        }
      });
    });

    const filTempTdata = tempTdataInfo.map((tdIn, tdInx) => {
      if (tdInx === appointmentData.cellId) {
        return (tdIn = {
          isBookAppointment: true,
          itemId: tdIn.itemId,
          rowSpan: rowCount.length + 1,
          title: appointmentData.name,
          startTime: appointmentData.startTime,
          endTime: appointmentData.endTime,
          Name: appointmentData.name,
          Servics: appointmentData.service,
          Duration: appointmentData.duration,
          Notes: appointmentData.notes,
        });
      } else {
        return (tdIn = tdIn);
      }
    });

    tempTdata[appointmentData.tableId].info.tCellInfo = filTempTdata;
    setShow(false);
  };

  const onTcellhover = (id) => {
    // console.log("tableDatastate", tableDatastate);
  };

  const onSelectedDate = (e) => {
    const randomNum = randomIntFromInterval(3, 5);
    const tempTableDataState = [...allTdData];
    const filteredTdData = tempTableDataState.map((tdItem, idx) => {
      tdItem.info.tCellInfo.slice(2, randomNum);
      const info = {
        id: tdItem.id,
        info: {
          time: tdItem.info.time,
          timeId: tdItem.info.timeId,
          tCellInfo: tdItem.info.tCellInfo.slice(2, randomNum),
        },
      };
      return info;
    });
    setTableDatasState(filteredTdData);
    setSelectedDay(e);
    setSliceValue(randomIntFromInterval(3, 5));
    const tempSliceList = [...allTdata];
    const sliceTdata = tempSliceList.slice(2, randomNum);
    setTdataState(sliceTdata);
    setAllTData(tdata);
  };

  const onCalendar = (e) => {
    const year = e.target.value.substring(0, 4);
    const month = e.target.value.substring(5, 7);
    const day = e.target.value.substring(8, 10);
    setSelectedDate(`${day}/${month}/${year}`);
    onSelectedDate();
    // console.log(`${day}/${month}/${year}`)
  };
  const onChangeDate = (date) => {
    onSelectedDate();
    setStartDate(date);
  };

  return (
    <div>
      <Favicon url="http://londondermatologyclinic.com/wp-content/uploads/2020/02/cropped-favicon2-192x192.png" />
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <ul id="MiniLeftNav">
            <li>
              <a class="navtext" href="#">
                <i class="fa fa-search"></i> <span>Search </span>
              </a>
            </li>
          </ul>
          <ul id="MiniLeftNav">
            <li>
              <a class="navtext" href="#">
                <i class="fa-solid fa-user"></i>
                <span>Recalls</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="d-flex justify-content-center align-items-center w-100 my-3">
          <div className="mx-1 ">
            <div>
              <MyCalender startDate={startDate} onChangeDate={onChangeDate} />
            </div>
          </div>
        </div>
      </div>
      <CustomModal
        handleClose={handleClose}
        handleShow={handleShow}
        activeDotor={activeDotor}
        defaultTime={defaultTime}
        show={show}
        setShow={setShow}
        activeTime={activeTime}
        appointmentData={appointmentData}
        changeCreds={changeCreds}
        onSubmit={onSubmit}
        aptDataError={aptDataError}
        isFieldOpen={isFieldOpen}
        setIsFieldOpen={setIsFieldOpen}
        fsList={fsList}
        onFsListItem={onFsListItem}
        onOutSideClick={onOutSideClick}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>15 July 2022</th>
            {tdataState.map((item, idx) => {
              return (
                <th key={idx}>
                  <div className="docName d-flex justify-content-center flex-column align-items-center">
                    <div className="mb-1">{item.docName}</div>
                    <Avatar sx={{ bgcolor: deepPurple[500] }}>
                      {item.docAva}
                    </Avatar>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="table-data">
          {tableDatastate.map((tItem, tIdx) => {
            return (
              <tr key={tIdx}>
                <td style={{ width: "150px" }}>{tItem.info.time}</td>
                {tItem.info.tCellInfo.map((tdItem, tdx) => {
                  return (
                    <>
                      {!tdItem.isDelete && (
                        <td
                          className="table-data"
                          style={
                            tdItem.isBookAppointment
                              ? { background: "green" }
                              : {}
                          }
                          rowSpan={tdItem?.rowSpan}
                          key={tdx}
                          onMouseOver={() => setTooltipOpen(true)}
                          onMouseLeave={() => setTooltipOpen(false)}
                          onClick={() =>
                            !tdItem.isBookAppointment
                              ? onAppointMentBook(tIdx, tdx, tItem)
                              : onTcellhover(tIdx)
                          }
                        >
                          <div className="text-white">
                            {" "}
                            {tdItem.title} {tdItem.startTime}{" "}
                            {tdItem.endTime?.length > 0 && "-"} {tdItem.endTime}
                          </div>
                        </td>
                      )}
                    </>
                  );
                })}
              </tr>
            );
          })}

          {/* <Hover /> */}

          {/* {
            tooltipOpen && (
              <div className='modal-tooltip'>
                hhhhhh
              </div>
            )
          } */}
        </tbody>
      </Table>
    </div>
  );
};
export default AptTable;
