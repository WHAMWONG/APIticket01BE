import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
+import { SubmissionsModule } from '../submissions/submissions.module';

@Module({
  imports: [
+   SubmissionsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}