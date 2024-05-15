import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { SubmissionForm } from '@entities/submission_forms';
import { Submission } from '@entities/submissions';
import { AddressUpdate } from '@entities/address_updates';
import { CustomerSearch } from '@entities/customer_searches';

@Entity('users')
export class User {
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
  username: string;

  @Column({ nullable: true, type: 'varchar' })
  password: string;

  @Column({ nullable: true, type: 'varchar' })
  email: string;

  @Column({ nullable: true, type: 'boolean', default: false })
  is_logged_in: boolean = false;

  @OneToMany(() => SubmissionForm, (submissionForm) => submissionForm.user, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  submission_forms: SubmissionForm[];

  @OneToMany(() => Submission, (submission) => submission.user, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  submissions: Submission[];

  @OneToMany(() => AddressUpdate, (addressUpdate) => addressUpdate.user, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  address_updates: AddressUpdate[];

  @OneToMany(() => CustomerSearch, (customerSearch) => customerSearch.user, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  customer_searches: CustomerSearch[];
}
