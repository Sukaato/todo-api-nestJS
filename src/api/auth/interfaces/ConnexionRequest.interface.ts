import { Request } from 'express';
import { UserEntity } from '../../../entities/user.entity';
 
export interface ConnexionRequest extends Request {
  user: UserEntity;
  ip: string;
}