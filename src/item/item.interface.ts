// item.interface.ts
export interface CreateItemDto {
    item_num: string;
    item_description: string;
  }
  
  export interface UpdateItemDto extends Partial<CreateItemDto> {}
  