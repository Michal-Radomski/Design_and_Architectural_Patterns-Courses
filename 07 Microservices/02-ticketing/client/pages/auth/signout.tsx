import React from "react";
// import Router from "next/router";
import { useRouter } from "next/router";

import useRequest from "../../hooks/use-request";

const SignOut = (): JSX.Element => {
  const router = useRouter();

  const { doRequest } = useRequest({
    url: "http://localhost:3000/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => router.push("/"),
  });

  React.useEffect(() => {
    doRequest();
  }, [doRequest]);

  return <div>Signing you out...</div>;
};

export default SignOut;
