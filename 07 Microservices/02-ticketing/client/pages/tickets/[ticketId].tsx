import React from "react";
import Router from "next/router";
import { AxiosInstance } from "axios";

import useRequest from "../../hooks/use-request";

const TicketShow = ({ ticket }: { ticket: TicketI }): JSX.Element => {
  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) => Router.push("/orders/[orderId]", `/orders/${order.id}`),
  });

  return (
    <React.Fragment>
      <div>
        <h1>{ticket.title}</h1>
        <h4>Price: {ticket.price}</h4>
        {errors}
        <button onClick={() => doRequest()} className="btn btn-primary">
          Purchase
        </button>
      </div>
    </React.Fragment>
  );
};

TicketShow.getInitialProps = async (context: { query: { ticketId: string } }, client: AxiosInstance) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};

export default TicketShow;
