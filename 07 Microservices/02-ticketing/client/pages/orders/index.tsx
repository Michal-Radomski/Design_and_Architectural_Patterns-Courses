import React from "react";
import { AxiosInstance } from "axios";
import { AppContext } from "next/app";

const OrderIndex = ({ orders }: { orders: OrderI[] }): JSX.Element => {
  return (
    <React.Fragment>
      <ul>
        {orders.map((order: OrderI) => {
          return (
            <li key={order.id}>
              {order.ticket.title} - {order.status}
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

OrderIndex.getInitialProps = async (_context: AppContext, client: AxiosInstance) => {
  const { data } = await client.get("/api/orders");

  return { orders: data };
};

export default OrderIndex;
