interface UserI {
  id: string;
  email: string;
}

interface TicketI {
  id: string;
  title: string;
  price: number;
}

interface OrderI {
  expiresAt: number;
  id: string;
  ticket: TicketI;
  status: string;
}
