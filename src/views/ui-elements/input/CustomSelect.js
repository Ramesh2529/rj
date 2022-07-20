import React from "react";
import Form from "react-bootstrap/Form";

const CustomSelect = ({
  value,
  name,
  onChange,
  defaultValue,
  selectData,
  ...props
}) => {
  return (
    <Form.Select name={name} value={value} onChange={onChange} {...props}>
      <option>{defaultValue}</option>
      {selectData.map((item, idx) => {
        return (
          <option key={idx} value={item.value}>
            {item.name}
          </option>
        );
      })}
    </Form.Select>
  );
};

export default CustomSelect;
