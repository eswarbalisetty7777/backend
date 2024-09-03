// address.interface.ts
export interface CreateAddressDto {
    customer_id: number;
    address_type: string;
    address_line1: string;
    address_line2?: string;
    country_code: string;
  }
  
  export interface UpdateAddressDto extends Partial<CreateAddressDto> {}
  