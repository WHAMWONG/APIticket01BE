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
import { SubmissionForm } from '@entities/submission_forms';

enum SubmissionStatusEnum {
  PENDING = 'pending',
  PROCESSED = 'processed',
  ERROR = 'error',
}

@Entity('submissions')
export class Submission {
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
  submission_data: string;

  @Column({
    nullable: true,
    type: 'enum',
    enum: ['pending', 'processed', 'error'],
    default: 'pending',
  })
  submission_status: `${SubmissionStatusEnum}` = 'pending';

  @Column({ nullable: true, type: 'timestamp' })
  submission_date: Date;

  @Column({ nullable: true, type: 'integer' })
  user_id: number;

  @Column({ nullable: true, type: 'integer' })
  submission_form_id: number;

  @ManyToOne(() => User, (user) => user.submissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => SubmissionForm, (submissionForm) => submissionForm.submissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'submission_form_id' })
  submission_form: SubmissionForm;
}

export { SubmissionStatusEnum };
