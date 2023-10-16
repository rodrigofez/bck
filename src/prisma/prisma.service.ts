import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  private prisma: PrismaClient;

  // Provide access to the Prisma client
  get client() {
    return this.prisma;
  }

  async onModuleDestroy() {
    // Close the Prisma client when the application is shutting down
    await this.prisma.$disconnect();
  }
}
