import { Injectable, Logger } from '@nestjs/common';
import { MongoError } from '../mongoError.dto';

@Injectable()
export class UtilsService {

    handleError<T = any>(err: T): T {
        Logger.error(err);
        return err;
    }
}
