import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Use the @Global() decorator to make the module global
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
