import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/Todo-app', {dbName: 'Todo-app', useCreateIndex: true}), 
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({envFilePath: './.env', isGlobal: true})
  ]
})
export class AppModule {}
