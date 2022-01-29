import React from "react";
import PropTypes from "prop-types";

const Button = (props) => {
  const { text, className } = props;
  return (
    <button {...props} className={`btn-primary ${className}`}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  icon: PropTypes.element,
};

export default Button;
