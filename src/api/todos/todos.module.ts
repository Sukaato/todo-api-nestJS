import { Module } from '@nestjs/common';
import { UtilsModule } from 'src/common/utils/utils.module';
import { TodosService } from './todos.service';

@Module({
  imports: [ UtilsModule ],
  controllers: [  ],
  providers: [ TodosService ],
  exports: [ TodosService ]
})
export class TodosModule {}
