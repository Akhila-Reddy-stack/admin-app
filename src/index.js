import "axios-progress-bar/dist/nprogress.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "./styles/index.css";
import "./styles/userstyle.scss";
import App from "./components/App";
import { SnackbarProvider } from "notistack";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import * as serviceWorker from "./serviceWorker";

render(
  <SnackbarProvider maxSnack={1} preventDuplicate>
    {" "}
    <Router>
      {" "}
      <App />{" "}
    </Router>{" "}
  </SnackbarProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
