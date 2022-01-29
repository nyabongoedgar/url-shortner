import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../common/Button";

const NotFound = () => {
  const history = useHistory();
  return (
    <div className="not-found">
      <div className="not-found-inner-content layout vertical center-center center-justified block-el">
        <span className="not-found-title pr-10">404</span>
        <span className="white pr-10">
          Oops, we can't find the page that you are looking for!
        </span>
        <div className="pr-10">
          <Button className="link-btn" onClick={() => history.push('/')} text="GO BACK" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
