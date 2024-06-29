export const mountDetailPage = () => {
  const rootDiv = document.getElementById("container");

  const bodyContainer = document.createElement("div");
  const pageTitle = document.createElement("h1");
  pageTitle.innerHTML = "This is detail page";
  bodyContainer.appendChild(pageTitle);
  bodyContainer.style.cssText = `
    display: flex;
    justify-content: center;
    height: 60vh;
    align-items: center;
`;

  rootDiv.appendChild(bodyContainer);
};
