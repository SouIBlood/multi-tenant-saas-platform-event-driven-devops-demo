import { Organization } from 'src/entities/organization.entity';
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
@Index(['organizationId'])
@Index(['tenantId'])
export class Branch {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  address!: string | null;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ type: 'uuid' })
  organizationId!: string;

  @ManyToOne(() => Organization, (organization) => organization.branches, {
    onDelete: 'RESTRICT',
    nullable: false,
    eager: false,
  })
  organization?: Organization;

  @Column({ type: 'uuid' })
  tenantId!: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt!: Date;

  @Column({ type: 'uuid' })
  createdBy!: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt!: Date;

  @Column({ type: 'uuid' })
  updatedBy!: string;
}
