import { CreateOrderLineDto } from "src/order-line/order-line.interface";

// order.interface.ts
export interface CreateOrderDto {
    customer_id: number;
    address_id: number; // This is optional because of the 'SET NULL' option in the entity
  }
  
  export interface UpdateOrderDto extends Partial<CreateOrderDto> {}
  