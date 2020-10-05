import { Request } from 'express';
import { User } from 'src/api/users/schema/user.schemas';
 
export interface ConnexionRequest extends Request {
  user: User;
  ip: string;
}