import React from "react";
import { Switch, Route } from "react-router-dom";
import Container from "../components/container/Container";

const IndexRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Container} />
    </Switch>
  );
};

export default IndexRoutes;
