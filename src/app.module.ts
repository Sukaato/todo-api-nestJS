import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({envFilePath: './.env', isGlobal: true}),
        TypeOrmModule.forRoot(),
        UsersModule,
        AuthModule,
    ]
})
export class AppModule {
    constructor(private connnection: Connection) {}
}
