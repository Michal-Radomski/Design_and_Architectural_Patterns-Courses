//@ Guards

interface Transaction {
  id: string;
  type: string;
  status: string;
  method: string;
  amount: string;
}

main();

function main() {
  const transactions: Transaction[] = [
    {
      id: "t1",
      type: "PAYMENT",
      status: "OPEN",
      method: "CREDIT_CARD",
      amount: "23.99",
    },
    {
      id: "t2",
      type: "PAYMENT",
      status: "OPEN",
      method: "PAYPAL",
      amount: "100.43",
    },
    {
      id: "t3",
      type: "REFUND",
      status: "OPEN",
      method: "CREDIT_CARD",
      amount: "10.99",
    },
    {
      id: "t4",
      type: "PAYMENT",
      status: "CLOSED",
      method: "PLAN",
      amount: "15.99",
    },
  ];

  processTransactions(transactions);
}

function processTransactions(transactions: Transaction[]) {
  if (!transactions || transactions.length === 0) {
    console.log("No transactions provided!");
    return;
  }

  for (const transaction of transactions) {
    if (transaction.status !== "OPEN") {
      console.log("Invalid transaction type!");
      continue;
    }
    if (transaction.type === "PAYMENT") {
      if (transaction.method === "CREDIT_CARD") {
        processCreditCardPayment(transaction);
      } else if (transaction.method === "PAYPAL") {
        processPayPalPayment(transaction);
      } else if (transaction.method === "PLAN") {
        processPlanPayment(transaction);
      }
    } else if (transaction.type === "REFUND") {
      if (transaction.method === "CREDIT_CARD") {
        processCreditCardRefund(transaction);
      } else if (transaction.method === "PAYPAL") {
        processPayPalRefund(transaction);
      } else if (transaction.method === "PLAN") {
        processPlanRefund(transaction);
      }
    } else {
      console.log("Invalid transaction type!", transaction);
    }
  }
}

function processCreditCardPayment(transaction: Transaction) {
  console.log("Processing credit card payment for amount: " + transaction.amount);
}

function processCreditCardRefund(transaction: Transaction) {
  console.log("Processing credit card refund for amount: " + transaction.amount);
}

function processPayPalPayment(transaction: Transaction) {
  console.log("Processing PayPal payment for amount: " + transaction.amount);
}

function processPayPalRefund(transaction: Transaction) {
  console.log("Processing PayPal refund for amount: " + transaction.amount);
}

function processPlanPayment(transaction: Transaction) {
  console.log("Processing plan payment for amount: " + transaction.amount);
}

function processPlanRefund(transaction: Transaction) {
  console.log("Processing plan refund for amount: " + transaction.amount);
}
