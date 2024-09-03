import { OrderLine } from "./order-line.entity";

// order-line.interface.ts
export interface CreateOrderLineDto {
  
    order_id: number;
    item_id: number;
    quantity: number;
  }
  
// order-line.interface.ts
export interface UpdateOrderLineDto {
    order_id?: number;  // Optional field for updating the order
    item_id?: number;   // Optional field for updating the item
    quantity?: number;  // Optional field for updating the quantity
  }
    