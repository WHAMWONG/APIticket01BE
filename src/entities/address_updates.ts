import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { StorageFile } from '@entities/storage_files';
import { User } from '@entities/users';

enum UpdateStatusEnum {
  PENDING = 'pending',
  SUCCESSFUL = 'successful',
  FAILED = 'failed',
}

@Entity('address_updates')
export class AddressUpdate {
  @Column({ type: 'integer', primary: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'timestamp' })
  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true, type: 'timestamp' })
  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, type: 'text' })
  address_data: string;

  @Column({
    nullable: true,
    type: 'enum',
    enum: ['pending', 'successful', 'failed'],
    default: 'pending',
  })
  update_status: `${UpdateStatusEnum}` = 'pending';

  @Column({ nullable: true, type: 'timestamp' })
  update_date: Date;

  @OneToOne(() => StorageFile, { cascade: true })
  @JoinColumn()
  file_upload: StorageFile;

  @Column({ nullable: true, type: 'date' })
  update_period_start: Date;

  @Column({ nullable: true, type: 'date' })
  update_period_end: Date;

  @Column({ nullable: true, type: 'integer' })
  user_id: number;

  @ManyToOne(() => User, (user) => user.address_updates, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export { UpdateStatusEnum };
