import React from "react";

import buildClient from "../api/build-client";
import { NextRequest } from "next/server";

const LandingPage = ({ currentUser }: { currentUser: UserI }): JSX.Element => {
  return <React.Fragment>{currentUser ? <h1>You are signed in</h1> : <h1>You are NOT signed in</h1>}</React.Fragment>;
};

LandingPage.getInitialProps = async (context: { req: NextRequest }): Promise<UserI> => {
  console.log("Landing Page!");
  const client = buildClient(context);
  const url = "/api/users/currentuser";
  const { data } = await client.get(url); //* currentUser
  // console.log("data:", data);

  return data;
};

export default LandingPage;
