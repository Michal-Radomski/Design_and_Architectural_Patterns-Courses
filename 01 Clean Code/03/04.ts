//* Classes & Polymorphism
// type Purchase = any;
// let Logistics: any;

// interface Delivery {
//   deliverProduct(): void;
//   trackProduct(): void;
// }

// class DeliveryImplementation {
//   protected purchase: Purchase;

//   constructor(purchase: Purchase) {
//     this.purchase = purchase;
//   }
// }

// class ExpressDelivery extends DeliveryImplementation implements Delivery {
//   deliverProduct() {
//     Logistics.issueExpressDelivery(this.purchase.product);
//   }

//   trackProduct() {
//     Logistics.trackExpressDelivery(this.purchase.product);
//   }
// }

// class InsuredDelivery extends DeliveryImplementation implements Delivery {
//   deliverProduct() {
//     Logistics.issueInsuredDelivery(this.purchase.product);
//   }

//   trackProduct() {
//     Logistics.trackInsuredDelivery(this.purchase.product);
//   }
// }

// class StandardDelivery extends DeliveryImplementation implements Delivery {
//   deliverProduct() {
//     Logistics?.issueStandardDelivery(this?.purchase?.product);
//   }

//   trackProduct() {
//     Logistics.trackStandardDelivery(this.purchase.product);
//   }
// }

// function createDelivery(purchase: { deliveryType?: string }) {
//   if (purchase.deliveryType === "express") {
//     return new ExpressDelivery(purchase);
//   } else if (purchase.deliveryType === "insured") {
//     return new InsuredDelivery(purchase);
//   } else {
//     return new StandardDelivery(purchase);
//   }
// }

// const delivery: Delivery = createDelivery({});
// delivery.deliverProduct();
// console.log("delivery:", delivery);

//* Clean Classes Should Be Small -> Single-Responsibility Principle
// class Order {
//   public refund() {}
// }

// class Customer {
//   private orders: Order[];

//   constructor(email: string, password: string, orders: Order[]) {
//     this.orders = orders;
//   }

//   public login(email: string, password: string) {}

//   public updateProfile(name: string) {}

//   public makePurchase(productId: string) {}
// }

// class Product {
//   constructor(title: string, price: number) {}

//   public update(Id: string, title: string, price: number) {}

//   public remove(Id: string) {}
// }

// class Inventory {
//   private products: Product;
//   constructor(products: Product) {
//     this.products = products;
//   }

//   public getAvailableItems(productId: string) {}

//   public restockProduct(productId: string) {}
// }

//* Cohesion
// High cohesion means that the class is focused on what it should be doing, i.e. only methods relating to the intention of the class.

//* The "Law Of Demeter"
class Customer {
  lastPurchase: any;

  getLastPurchaseDate() {
    return this.lastPurchase.date;
  }
}

class DeliveryJob {
  customer: any;
  warehouse: any;

  constructor(customer: any, warehouse: any) {
    this.customer = customer;
    this.warehouse = warehouse;
  }

  deliverLastPurchase() {
    this.warehouse.deliverPurchase(this.customer.lastPurchase);
  }
}
