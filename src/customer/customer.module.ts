import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer } from './customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])], // Register the Customer entity
  providers: [CustomerService],
  controllers: [CustomerController],
  exports: [TypeOrmModule,CustomerService], // Export TypeOrmModule to make CustomerRepository available elsewhere if needed
})
export class CustomerModule {}
