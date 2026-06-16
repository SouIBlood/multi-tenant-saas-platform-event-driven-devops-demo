import { DeliveryOrderStatus } from 'src/enums/delivery-order-status.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Index(['salesOrderId'])
@Index(['driverUserId'])
@Index(['tenantId'])
@Index(['organizationId'])
@Index(['branchId'])
export class DeliveryOrder {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  salesOrderId!: string;

  @Column({ type: 'uuid', nullable: true })
  driverUserId!: string | null;

  @Column({
    type: 'enum',
    enum: DeliveryOrderStatus,
    default: DeliveryOrderStatus.PENDING,
  })
  status!: DeliveryOrderStatus;

  @Column({ type: 'date', nullable: true })
  expectedDeliveryDate!: Date | null;

  @Column({ type: 'timestamp with time zone', nullable: true })
  deliveredAt!: Date | null;

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
