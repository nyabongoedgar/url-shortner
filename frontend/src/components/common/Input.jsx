import React from "react";
import PropTypes from "prop-types";

const Input = ({ type, name, placeholder, onChange, required, value }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      value={value}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default Input;
