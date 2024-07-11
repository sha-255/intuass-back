import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/utils';

@Module({
  imports: [
    UsersModule, 
    DatabaseModule, 
    JwtModule.register({
      secret: JWT_SECRET,
      global: true,
      signOptions: {
        expiresIn: '30d'
      }
    })
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
