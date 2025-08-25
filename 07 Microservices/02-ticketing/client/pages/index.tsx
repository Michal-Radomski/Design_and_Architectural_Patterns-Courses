import React from "react";

import buildClient from "../api/build-client";
import { NextRequest } from "next/server";

export default function LandingPage({ currentUser }: { currentUser: UserI }): JSX.Element {
  return <React.Fragment>{currentUser ? <h1>You are signed in</h1> : <h1>You are NOT signed in</h1>}</React.Fragment>;
}

LandingPage.getInitialProps = async (context: { req: NextRequest }): Promise<UserI> => {
  console.log("Landing Page!");
  const client = buildClient(context);
  const { data } = await client.get("http://localhost:3000/api/users/currentuser"); //* currentUser
  // console.log("data:", data);

  return data;
};
