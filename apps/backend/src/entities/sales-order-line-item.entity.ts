import { SalesOrder } from 'src/entities/sales-order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Index(['salesOrderId'])
@Index(['itemId'])
@Index(['tenantId'])
@Index(['organizationId'])
@Index(['branchId'])
export class SalesOrderLineItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  salesOrderId!: string;

  @ManyToOne(() => SalesOrder, (salesOrder) => salesOrder.lines, {
    onDelete: 'RESTRICT',
    nullable: false,
    eager: false,
  })
  salesOrder?: SalesOrder;

  @Column({ type: 'uuid' })
  itemId!: string;

  @Column({ type: 'integer' })
  quantity!: number;

  @Column({ type: 'numeric', precision: 14, scale: 2 })
  unitPrice!: number;

  @Column({ type: 'numeric', precision: 14, scale: 2 })
  lineTotal!: number;

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
