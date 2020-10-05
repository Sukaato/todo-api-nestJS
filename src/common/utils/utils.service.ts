import { Injectable, Logger } from '@nestjs/common';
import { MongoError } from '../mongoError.dto';

@Injectable()
export class UtilsService {

    handleError(err: any) {
        Logger.error(err);
        return err as MongoError;
    }
}
