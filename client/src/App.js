import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import TestPage from "./components/views/TestPage/TestPage";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/test" component={TestPage} />
      </Switch>
    </Suspense>
  );
}

export default App;
