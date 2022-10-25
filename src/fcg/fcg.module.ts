import { Module } from '@nestjs/common';
import { FcgService } from "./fcg.service"


@Module({
  providers: [FcgService],
})
export class FcgModule {}
