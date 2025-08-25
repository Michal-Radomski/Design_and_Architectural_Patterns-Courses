import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import type { AppContext, AppProps } from "next/app";

import "@/styles/globals.scss";
import buildClient from "@/api/build-client";
import { NextRequest } from "next/server";

interface CustomAppProps extends AppProps {
  currentUser: UserI;
}

const AppComponent = ({ Component, pageProps, currentUser }: CustomAppProps): JSX.Element => {
  return (
    <React.Fragment>
      <div>
        <h1>Header! {currentUser?.email}</h1>
        <Component {...pageProps} />
      </div>
    </React.Fragment>
  );
};

AppComponent.getInitialProps = async (appContext: AppContext) => {
  const client = buildClient(appContext.ctx as unknown as { req: NextRequest });
  const { data } = await client.get("http://localhost:3000/api/users/currentuser");

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  // console.log("pageProps:", pageProps);

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
