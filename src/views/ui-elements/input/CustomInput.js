import React from "react";
import Form from "react-bootstrap/Form";

const CustomInput = ({
  placeholder,
  type,
  value,
  name,
  onChange,
  ...props
}) => {
  return (
    <div>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default CustomInput;
