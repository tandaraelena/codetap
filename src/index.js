import React from "react";
import { render } from "react-dom";
import { CodeTapAcademy } from "./component/app/App.jsx";
import "./index.css";

const tagId = "#react-will-render-here";

render(<CodeTapAcademy />, document.querySelector(tagId));
