import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/base.repository';
import { SubmissionForm } from '@entities/submission_forms';

@Injectable()
export class SubmissionFormRepository extends BaseRepository<SubmissionForm> {}
