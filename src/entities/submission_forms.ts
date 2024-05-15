import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '@entities/users';
import { Submission } from '@entities/submissions';

enum SubmissionStatusEnum {
  SUBMITTED = 'submitted',
  VALIDATED = 'validated',
  ERROR = 'error',
}

@Entity('submission_forms')
export class SubmissionForm {
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
  form_data: string;

  @Column({
    nullable: true,
    type: 'enum',
    enum: ['submitted', 'validated', 'error'],
    default: 'submitted',
  })
  submission_status: `${SubmissionStatusEnum}` = 'submitted';

  @Column({ nullable: true, type: 'timestamp' })
  submission_date: Date;

  @Column({ nullable: true, type: 'integer' })
  user_id: number;

  @Column({ nullable: true, type: 'varchar' })
  form_name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @ManyToOne(() => User, (user) => user.submission_forms, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Submission, (submission) => submission.submission_form, { cascade: true })
  @JoinColumn({ name: 'submission_form_id' })
  submissions: Submission[];
}

export { SubmissionStatusEnum };
