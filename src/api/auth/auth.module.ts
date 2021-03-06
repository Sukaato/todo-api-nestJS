import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/api/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.stategy';

@Module({
    imports: [ UsersModule, PassportModule, ConfigModule, JwtModule.registerAsync({
        imports: [ ConfigModule ],
        inject: [ ConfigService ],
        useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: {
                expiresIn: `${configService.get<string>('JWT_EXPIRATION_TIME')}`
            }
        })
    }) ],
    controllers: [ AuthController ],
    providers: [ AuthService, LocalStrategy, JwtStrategy ],
})
export class AuthModule {}
