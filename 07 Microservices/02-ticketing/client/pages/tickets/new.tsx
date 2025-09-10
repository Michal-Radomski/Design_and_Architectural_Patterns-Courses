import React from "react";
import Router from "next/router";

import useRequest from "../../hooks/use-request";

const NewTicket = (): JSX.Element => {
  const [title, setTitle] = React.useState<string>("");
  const [price, setPrice] = React.useState<string>("");

  const { doRequest, errors } = useRequest({
    url: "/api/tickets", //* http://localhost:3002/api/tickets
    method: "post",
    body: {
      title,
      price,
    },
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    doRequest();
  };

  const onBlur = (): void => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  return (
    <React.Fragment>
      <div>
        <h1>Create a Ticket</h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input value={price} onBlur={onBlur} onChange={(e) => setPrice(e.target.value)} className="form-control" />
          </div>
          {errors}
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default NewTicket;
