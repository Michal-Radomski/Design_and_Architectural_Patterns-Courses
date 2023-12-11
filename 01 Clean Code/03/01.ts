//@ Control Structures & Errors

interface Transaction {
  id: string;
  type: string;
  status: string;
  method: string;
  amount: string;
}

//* V1 - Original Code - dirty code
// main();

// function main() {
//   const transactions: Transaction[] = [
//     {
//       id: "t1",
//       type: "PAYMENT",
//       status: "OPEN",
//       method: "CREDIT_CARD",
//       amount: "23.99",
//     },
//     {
//       id: "t2",
//       type: "PAYMENT",
//       status: "OPEN",
//       method: "PAYPAL",
//       amount: "100.43",
//     },
//     {
//       id: "t3",
//       type: "REFUND",
//       status: "OPEN",
//       method: "CREDIT_CARD",
//       amount: "10.99",
//     },
//     {
//       id: "t4",
//       type: "PAYMENT",
//       status: "CLOSED",
//       method: "PLAN",
//       amount: "15.99",
//     },
//   ];

//   processTransactions(transactions);
// }

// function processTransactions(transactions: Transaction[]) {
//   if (transactions && transactions.length > 0) {
//     for (const transaction of transactions) {
//       if (transaction.type === "PAYMENT") {
//         if (transaction.status === "OPEN") {
//           if (transaction.method === "CREDIT_CARD") {
//             processCreditCardPayment(transaction);
//           } else if (transaction.method === "PAYPAL") {
//             processPayPalPayment(transaction);
//           } else if (transaction.method === "PLAN") {
//             processPlanPayment(transaction);
//           }
//         } else {
//           console.log("Invalid transaction type!");
//         }
//       } else if (transaction.type === "REFUND") {
//         if (transaction.status === "OPEN") {
//           if (transaction.method === "CREDIT_CARD") {
//             processCreditCardRefund(transaction);
//           } else if (transaction.method === "PAYPAL") {
//             processPayPalRefund(transaction);
//           } else if (transaction.method === "PLAN") {
//             processPlanRefund(transaction);
//           }
//         } else {
//           console.log("Invalid transaction type!", transaction);
//         }
//       } else {
//         console.log("Invalid transaction type!", transaction);
//       }
//     }
//   } else {
//     console.log("No transactions provided!");
//   }
// }

// function processCreditCardPayment(transaction: Transaction) {
//   console.log("Processing credit card payment for amount: " + transaction.amount);
// }

// function processCreditCardRefund(transaction: Transaction) {
//   console.log("Processing credit card refund for amount: " + transaction.amount);
// }

// function processPayPalPayment(transaction: Transaction) {
//   console.log("Processing PayPal payment for amount: " + transaction.amount);
// }

// function processPayPalRefund(transaction: Transaction) {
//   console.log("Processing PayPal refund for amount: " + transaction.amount);
// }

// function processPlanPayment(transaction: Transaction) {
//   console.log("Processing plan payment for amount: " + transaction.amount);
// }

// function processPlanRefund(transaction: Transaction) {
//   console.log("Processing plan refund for amount: " + transaction.amount);
// }

//* V2 - Guards
// main();

// function main() {
//   const transactions: Transaction[] = [
//     {
//       id: "t1",
//       type: "PAYMENT",
//       status: "OPEN",
//       method: "CREDIT_CARD",
//       amount: "23.99",
//     },
//     {
//       id: "t2",
//       type: "PAYMENT",
//       status: "OPEN",
//       method: "PAYPAL",
//       amount: "100.43",
//     },
//     {
//       id: "t3",
//       type: "REFUND",
//       status: "OPEN",
//       method: "CREDIT_CARD",
//       amount: "10.99",
//     },
//     {
//       id: "t4",
//       type: "PAYMENT",
//       status: "CLOSED",
//       method: "PLAN",
//       amount: "15.99",
//     },
//   ];

//   processTransactions(transactions);
// }

// function processTransactions(transactions: Transaction[]) {
//   if (!transactions || transactions.length === 0) {
//     console.log("No transactions provided!");
//     return;
//   }

//   for (const transaction of transactions) {
//     if (transaction.status !== "OPEN") {
//       console.log("Invalid transaction type!");
//       continue;
//     }
//     if (transaction.type === "PAYMENT") {
//       if (transaction.method === "CREDIT_CARD") {
//         processCreditCardPayment(transaction);
//       } else if (transaction.method === "PAYPAL") {
//         processPayPalPayment(transaction);
//       } else if (transaction.method === "PLAN") {
//         processPlanPayment(transaction);
//       }
//     } else if (transaction.type === "REFUND") {
//       if (transaction.method === "CREDIT_CARD") {
//         processCreditCardRefund(transaction);
//       } else if (transaction.method === "PAYPAL") {
//         processPayPalRefund(transaction);
//       } else if (transaction.method === "PLAN") {
//         processPlanRefund(transaction);
//       }
//     } else {
//       console.log("Invalid transaction type!", transaction);
//     }
//   }
// }

// function processCreditCardPayment(transaction: Transaction) {
//   console.log("Processing credit card payment for amount: " + transaction.amount);
// }

// function processCreditCardRefund(transaction: Transaction) {
//   console.log("Processing credit card refund for amount: " + transaction.amount);
// }

// function processPayPalPayment(transaction: Transaction) {
//   console.log("Processing PayPal payment for amount: " + transaction.amount);
// }

// function processPayPalRefund(transaction: Transaction) {
//   console.log("Processing PayPal refund for amount: " + transaction.amount);
// }

// function processPlanPayment(transaction: Transaction) {
//   console.log("Processing plan payment for amount: " + transaction.amount);
// }

// function processPlanRefund(transaction: Transaction) {
//   console.log("Processing plan refund for amount: " + transaction.amount);
// }

//* V3 - Final Code
interface CustomError extends Error {
  item(message: string, item: {}): void;
  message: string;
  code: number;
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

  try {
    processTransactions(transactions);
  } catch (error) {
    showErrorMessage((error as CustomError).message);
  }
}

function processTransactions(transactions: Transaction[]) {
  validateTransactions(transactions);

  for (const transaction of transactions) {
    processTransaction(transaction);
  }
}

function validateTransactions(transactions: Transaction[]) {
  //* Prefer Positive Check (don't use if(isNotEmpty) {} !!!)
  if (isEmpty(transactions)) {
    const error = new Error("No transactions provided!");
    (error as CustomError).code = 1;
    throw error;
  }
}

function isEmpty(transactions: Transaction[]) {
  return !transactions || transactions.length === 0;
}

function showErrorMessage(message: string, item = {}) {
  console.log({ message });
  console.log({ item });
}

function processTransaction(transaction: Transaction) {
  try {
    validateTransaction(transaction);
    processWithProcessor(transaction);
  } catch (error) {
    showErrorMessage((error as CustomError).message, (error as CustomError).item);
  }
}

function isOpen(transaction: Transaction) {
  return transaction.status === "OPEN";
}

function validateTransaction(transaction: Transaction) {
  if (!isOpen(transaction)) {
    const error = new Error("Invalid transaction type.");
    throw error;
  }

  if (!isPayment(transaction) && !isRefund(transaction)) {
    const error = new Error("Invalid transaction type!");
    (error as any).item = transaction;
    throw error;
  }
}

function processWithProcessor(transaction: Transaction) {
  const processors = getTransactionProcessors(transaction);

  if (isPayment(transaction)) {
    processors.processPayment?.(transaction);
  } else {
    processors.processRefund?.(transaction);
  }
}

function getTransactionProcessors(transaction: Transaction) {
  let processors = {
    processPayment: null as any,
    processRefund: null as any,
  };
  if (usesTransactionMethod(transaction, "CREDIT_CARD")) {
    processors.processPayment = processCreditCardPayment;
    processors.processRefund = processCreditCardRefund;
  } else if (usesTransactionMethod(transaction, "PAYPAL")) {
    processors.processPayment = processPayPalPayment;
    processors.processRefund = processPayPalRefund;
  } else if (usesTransactionMethod(transaction, "PLAN")) {
    processors.processPayment = processPlanPayment;
    processors.processRefund = processPlanRefund;
  }
  return processors;
}

function usesTransactionMethod(transaction: Transaction, method: string) {
  return transaction.method === method;
}

function isPayment(transaction: Transaction) {
  return transaction.type === "PAYMENT";
}

function isRefund(transaction: Transaction) {
  return transaction.type === "REFUND";
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
