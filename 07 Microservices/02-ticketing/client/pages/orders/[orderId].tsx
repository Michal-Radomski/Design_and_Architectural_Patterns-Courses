import React from "react";
import StripeCheckout from "react-stripe-checkout";
import Router from "next/router";
import { AxiosInstance } from "axios";

import useRequest from "../../hooks/use-request";

const OrderShow = ({ order, currentUser }: { order: OrderI; currentUser: UserI }): JSX.Element => {
  const [timeLeft, setTimeLeft] = React.useState<number>(0);

  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push("/orders"),
  });

  React.useEffect(() => {
    const findTimeLeft = (): void => {
      const msLeft: number = new Date(order.expiresAt).getTime() - new Date().getTime();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId: NodeJS.Timeout = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  return (
    <React.Fragment>
      <div>
        Time left to pay: {timeLeft} seconds
        <StripeCheckout
          token={({ id }) => doRequest({ token: id })}
          stripeKey={process.env.NEXT_PUBLIC_STRIPE_API_KEY as string} //* Public Key
          amount={order.ticket.price * 100}
          email={currentUser.email}
        />
        {errors}
      </div>
    </React.Fragment>
  );
};

OrderShow.getInitialProps = async (context: { query: { orderId: string } }, client: AxiosInstance) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
