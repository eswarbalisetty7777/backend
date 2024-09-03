export interface CreateCustomerDto {
    customer_code: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
  }

  export interface UpdateCustomerDto extends Partial<CreateCustomerDto> {}

  