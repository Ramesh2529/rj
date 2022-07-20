import { forwardRef, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Divider from "@mui/material/Divider";
import Btn from "../../../components/apt/Togglebutton/Togglebutton";
import data from "../../../components/apt/AutoComplete/Data.json";
//import { useForm } from "react-hook-form";
import "./Modal.scss";
import CustomInput from "../input/CustomInput";
import CustomSelect from "../input/CustomSelect";
import Autocomplete from "../../../components/apt/AutoComplete/AutoComplete";
//import withClickOutside from "../../WithClickOutside/WidthClickOutside";
import { useDetectOutsideClick } from "../../../components/apt/helper/useDetectOutsideClick";

const consultData = [
  { name: "Consult Room 1", value: "room 1" },
  { name: "Consult Room 2", value: "room 2" },
  { name: "Consult Room 3", value: "room 3" },
  { name: "Consult Room 4", value: "room 4" },
  { name: "Consult Room 5", value: "room 5" },
  { name: "Consult Room 6", value: "room 6" },
];
const aptType = [
  { name: "Radio", value: "radio" },
  { name: "Twitter", value: "twitter" },
  { name: "WhatClinic", value: "clinic" },
];
const assitData = [
  { name: "Select Assistant 1", value: "1" },
  { name: "Select Assistant 2", value: "2" },
  { name: "Select Assistant 3", value: "3" },
  { name: "Select Assistant 4", value: "4" },
  { name: "Select Assistant 5", value: "5" },
];

const CustomModal = (props) => {
  const {
    show,
    setShow,
    handleClose,
    handleShow,
    activeDotor,
    appointmentData,
    changeCreds,
    onSubmit,
    defaultTime,
    activeTime,
    aptDataError,
    isFieldOpen,
    fsList,
    onFsListItem,
    onOutSideClick,
  } = props;

  // const [open, setOpen] = useState({
  //   firstName: false,
  // });

  const handleClick = (event) => {
    setShow(true);
  };
  const modalRef = useRef(null);

  useDetectOutsideClick(modalRef, onOutSideClick);

  // const onTextChange = e => {
  //   const val = e.target.value;
  //   let tempSuggestion = [];
  //   if (val.length > 0) {
  //     const regex = new RegExp(`^${val}`, "i");
  //     tempSuggestion = suggestionOptions.sort().filter(v => regex.test(v.label));
  //   }

  //   return setSuggestions(tempSuggestion)
  // };
  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col md={12}>
              <span className="mr-1 fw-bold">Appointment for:</span>
              <span>{activeDotor}</span>
            </Col>
            <Col md={12}>
              <span className="mr-1 fw-bold">Book Time:</span>
              <span>
                {appointmentData.startTime} - {appointmentData.startTime}
              </span>
            </Col>
          </Row>
          <Form>
            <Form.Group className="mb-3 firstName">
              <Form.Label htmlFor="firstName">First Name:</Form.Label>
              <CustomInput
                type="text"
                name="firstName"
                value={appointmentData.firstName}
                onChange={changeCreds}
              />
              {isFieldOpen.isSuggestion && (
                <div className="firstName-dropdown" ref={modalRef}>
                  <Autocomplete type={fsList} onFsListItem={onFsListItem} />
                </div>
              )}
              <small className="text-danger">{aptDataError.firstName}</small>
            </Form.Group>
            {isFieldOpen.isOtherFields && (
              <div>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="lastName">Last Name: </Form.Label>
                  <CustomInput
                    type="text"
                    name="lastName"
                    value={appointmentData.lastName}
                    onChange={changeCreds}
                  />
                  <small className="text-danger">{aptDataError.lastName}</small>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="phone">Mobile: </Form.Label>
                  <CustomInput
                    type="text"
                    name="phone"
                    value={appointmentData.phone}
                    onChange={changeCreds}
                    // className={`form-control ${errors.phone && "invalid"}`}
                  />

                  <small className="text-danger">{aptDataError.phone}</small>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="email">Email: </Form.Label>
                  <CustomInput
                    type="text"
                    name="email"
                    value={appointmentData.email}
                    onChange={changeCreds}
                    // className={`form-control ${errors.phone && "invalid"}`}
                  />
                  <small className="text-danger">{aptDataError.email}</small>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="heard">How Heard: </Form.Label>
                  <CustomSelect
                    value={appointmentData.heard}
                    name="heard"
                    onChange={changeCreds}
                    defaultValue="Select"
                    selectData={aptType}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="service">Service: </Form.Label>
                  <CustomInput
                    type="text"
                    name="service"
                    onChange={changeCreds}
                    value={appointmentData.service}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="room">Room: </Form.Label>
                  <CustomSelect
                    value={appointmentData.room}
                    name="room"
                    onChange={changeCreds}
                    defaultValue="Select"
                    selectData={consultData}
                  />
                </Form.Group>
                <Row>
                  <Col md={6} sm={12}>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="startTime">Start : </Form.Label>
                      <CustomInput
                        type="time"
                        ampm={false}
                        label="24 hours"
                        name="startTime"
                        format="HH:mm"
                        // value={activeTime}
                        value={appointmentData.startTime}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} sm={12}>
                    <Form.Label htmlFor="endTime">End :</Form.Label>
                    <CustomInput
                      type="time"
                      name="endTime"
                      onChange={changeCreds}
                      value={appointmentData.endTime}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col md={7} sm={12}>
                    <Form.Group className="d-flex align-items-center">
                      <Form.Label htmlFor="length" className="mx-1">
                        Start :{" "}
                      </Form.Label>
                      <CustomInput
                        type="text"
                        name="length"
                        value={appointmentData.length}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={5} sm={12}>
                    <Form.Group className="d-flex align-items-center">
                      <Form.Label htmlFor="allDay" className="mx-1">
                        All Day:{" "}
                      </Form.Label>
                      <Btn />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="with">With: </Form.Label>
                  <CustomSelect
                    value={appointmentData.with}
                    name="with"
                    onChange={changeCreds}
                    defaultValue="Select"
                    selectData={assitData}
                  />
                </Form.Group>
                <h6>Notes</h6>
                <Divider /> <br />
                <textarea
                  cols="60"
                  rows="3"
                  name="notes"
                  className="form-control"
                  value={appointmentData.notes}
                  onChange={changeCreds}
                  style={{ width: "100%", marginTop: "-10px" }}
                >
                  Enter Notes
                </textarea>
              </div>
            )}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomModal;
