import React from "react";
import { render } from "react-dom";
import { CodeTapAcademy } from "./component/App/App.jsx";

const tagId = "#react-will-render-here";

render(<CodeTapAcademy />, document.querySelector(tagId));
