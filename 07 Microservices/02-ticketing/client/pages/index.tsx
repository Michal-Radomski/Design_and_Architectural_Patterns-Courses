import React from "react";

export default function LandingPage({ color }: { color: string }): JSX.Element {
  return (
    <React.Fragment>
      <h1 style={{ color: color }}>Landing Page</h1>
    </React.Fragment>
  );
}

LandingPage.getInitialProps = async () => {
  return { color: "red" };
};
