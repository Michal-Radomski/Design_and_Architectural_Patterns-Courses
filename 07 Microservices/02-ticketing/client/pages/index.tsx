import React from "react";

const LandingPage = ({ currentUser }: { currentUser: UserI }): JSX.Element => {
  return <React.Fragment>{currentUser ? <h1>You are signed in</h1> : <h1>You are NOT signed in</h1>}</React.Fragment>;
};

LandingPage.getInitialProps = async (): Promise<object> => {
  return {};
};

export default LandingPage;
