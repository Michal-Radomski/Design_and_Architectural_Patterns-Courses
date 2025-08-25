import React from "react";
import Router from "next/router";

import useRequest from "../../hooks/use-request";

const SignIn = (): JSX.Element => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const { doRequest, errors } = useRequest({
    url: "http://localhost:3000/api/users/signin",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <h1>Sign In</h1>
        <div className="form-group">
          <label>Email Address</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
        </div>
        {errors}
        <button className="btn btn-primary">Sign In</button>
      </form>
    </React.Fragment>
  );
};

export default SignIn;
