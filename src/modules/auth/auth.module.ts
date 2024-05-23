import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PermissionsService } from 'src/shared/permissions/permissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, PermissionsService],
  exports: [AuthService],
})
export class AuthModule {}