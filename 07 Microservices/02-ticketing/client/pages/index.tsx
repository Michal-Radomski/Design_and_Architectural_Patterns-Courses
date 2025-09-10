import React from "react";
import Link from "next/link";
import { AxiosInstance } from "axios";
import { AppContext } from "next/app";

const LandingPage = ({ currentUser, tickets }: { currentUser: UserI; tickets: TicketI[] }): JSX.Element => {
  console.log("currentUser:", currentUser);

  const ticketList: React.JSX.Element[] = tickets.map((ticket: TicketI) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            View
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <React.Fragment>
      <div>
        <h1>Tickets</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>{ticketList}</tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

LandingPage.getInitialProps = async (_context: AppContext, client: AxiosInstance) => {
  const { data } = await client.get("/api/tickets");

  return { tickets: data };
};

export default LandingPage;
