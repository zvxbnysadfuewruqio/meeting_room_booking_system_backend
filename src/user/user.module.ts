import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User.entity';
import { Role } from './entities/Role.entity';
import { Permission } from './entities/Permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Permission])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
