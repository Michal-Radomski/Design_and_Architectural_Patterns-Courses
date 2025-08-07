import React, { useRef, useEffect } from "react";

import { mount } from "marketing/MarketingApp";
// console.log("mount:", mount);

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  });

  return (
    <React.Fragment>
      <div ref={ref} />
    </React.Fragment>
  );
};
