import { Customer } from 'src/entities/customer.entity';
import { SalesOrderLineItem } from 'src/entities/sales-order-line-item.entity';
import { SalesOrderStatus } from 'src/enums/sales-order-status.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Index(['customerId'])
@Index(['tenantId'])
@Index(['organizationId'])
@Index(['branchId'])
export class SalesOrder {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  customerId!: string;

  @ManyToOne(() => Customer, (customer) => customer.salesOrders, {
    onDelete: 'RESTRICT',
    nullable: false,
    eager: false,
  })
  customer?: Customer;

  @Column({ type: 'date' })
  orderDate!: Date;

  @Column({
    type: 'enum',
    enum: SalesOrderStatus,
    default: SalesOrderStatus.DRAFT,
  })
  status!: SalesOrderStatus;

  @Column({ type: 'numeric', precision: 14, scale: 2, default: 0 })
  totalAmount!: number;

  @OneToMany(() => SalesOrderLineItem, (lineItem) => lineItem.salesOrder, {
    eager: true,
  })
  lines?: SalesOrderLineItem[];

  @Column({ type: 'uuid' })
  tenantId!: string;

  @Column({ type: 'uuid' })
  organizationId!: string;

  @Column({ type: 'uuid' })
  branchId!: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt!: Date;

  @Column({ type: 'uuid' })
  createdBy!: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt!: Date;

  @Column({ type: 'uuid' })
  updatedBy!: string;
}
