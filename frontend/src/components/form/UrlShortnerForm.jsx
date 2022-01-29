import React from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import PropTypes from "prop-types";

const Form = ({ handleChange, value, handleSubmit, loading, error }) => {
  return (
    <form onSubmit={handleSubmit} className="url-form">
      <div className="url-form-pair">
        <Input
          type="text"
          name="value"
          placeholder="Simplify your URL"
          onChange={handleChange}
          required
          value={value}
        />
        <Button
          type="submit"
          className="button"
          disabled={loading}
          text={loading ? "Generating Link..." : "Generate"}
        />
      </div>

      <div className="layout-center">
        <span className="white bold pr-10">{error}</span>
      </div>
    </form>
  );
};

Form.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.string,
  handleSubmit: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default Form;
