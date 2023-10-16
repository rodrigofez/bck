import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateApplicationDTO } from './dto/create-application.dto';
import { UpdateApplicationDTO } from './dto/update-application.dto';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  async findMany() {
    return this.prisma.client.application.findMany({
      include: {
        employee: true,
      },
    });
  }

  async createApplication(
    employeeId: number,
    createApplicationDTO: CreateApplicationDTO,
  ) {
    const employee = await this.prisma.client.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return this.prisma.client.application.create({
      data: {
        ...createApplicationDTO,
        employee: {
          connect: {
            id: employeeId,
          },
        },
      },
    });
  }

  async getApplicationsForEmployee(employeeId: number) {
    const applications = await this.prisma.client.application.findMany({
      where: { employeeId },
      include: {
        employee: true,
      },
    });

    return applications;
  }

  async getApplication(applicationId: number) {
    const application = await this.prisma.client.application.findUnique({
      where: { id: applicationId },
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    return application;
  }

  async updateApplication(
    applicationId: number,
    updateApplicationDTO: UpdateApplicationDTO,
  ) {
    const existingApplication = await this.prisma.client.application.findUnique(
      {
        where: { id: applicationId },
      },
    );

    if (!existingApplication) {
      throw new NotFoundException('Application not found');
    }

    return this.prisma.client.application.update({
      where: { id: applicationId },
      data: updateApplicationDTO,
    });
  }

  async deleteApplication(applicationId: number) {
    const existingApplication = await this.prisma.client.application.findUnique(
      {
        where: { id: applicationId },
      },
    );

    if (!existingApplication) {
      throw new NotFoundException('Application not found');
    }

    return this.prisma.client.application.delete({
      where: { id: applicationId },
    });
  }
}
