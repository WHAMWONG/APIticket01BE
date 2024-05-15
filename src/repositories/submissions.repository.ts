import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/base.repository';
import { Submission } from '@entities/submissions';

@Injectable()
export class SubmissionRepository extends BaseRepository<Submission> {}
