import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '@entities/users';

enum SearchTypeEnum {
  NAME = 'name',
  KATAKANA_NAME = 'katakana_name',
  EMAIL = 'email',
}

@Entity('customer_searches')
export class CustomerSearch {
  @Column({ type: 'integer', primary: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'timestamp' })
  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true, type: 'timestamp' })
  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, type: 'varchar' })
  search_criteria: string;

  @Column({
    nullable: true,
    type: 'enum',
    enum: ['name', 'katakana_name', 'email'],
    default: 'name',
  })
  search_type: `${SearchTypeEnum}` = 'name';

  @Column({ nullable: true, type: 'integer' })
  user_id: number;

  @ManyToOne(() => User, (user) => user.customer_searches, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export { SearchTypeEnum };
