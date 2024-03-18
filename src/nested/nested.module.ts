import { Module } from '@nestjs/common';
import { NestedController } from './controllers/nested/nested.controller';

@Module({
  controllers: [NestedController]
})
export class NestedModule {}
