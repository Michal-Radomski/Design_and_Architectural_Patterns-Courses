import React from "react";

import useRequest from "../../hooks/use-request";

const SignUp = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
    },
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    doRequest();
  };

  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <h1>Sign Up</h1>
        <div className="form-group">
          <label>Email Address</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
        </div>
        {errors}
        <button className="btn btn-primary">Sign Up</button>
      </form>
    </React.Fragment>
  );
};

export default SignUp;
