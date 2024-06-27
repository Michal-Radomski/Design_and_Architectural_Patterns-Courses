import { createHeader } from "../components/header.js";
import { cssStyle } from "../components/constant.js";

const rootDiv = document.getElementById("root");

const header = createHeader();

const bodyContainer = document.createElement("div");
const pageTitle = document.createElement("h1");
pageTitle.innerHTML = "This is home page";
bodyContainer.appendChild(pageTitle);
bodyContainer.style.cssText = cssStyle;

rootDiv.appendChild(header);
rootDiv.appendChild(bodyContainer);
