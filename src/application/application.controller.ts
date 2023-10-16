import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDTO } from './dto/create-application.dto';
import { UpdateApplicationDTO } from './dto/update-application.dto';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  // get all applications
  @Get()
  async getApplications() {
    return this.applicationService.findMany();
  }

  @Post(':employeeId')
  async createApplication(
    @Param('employeeId') employeeId: number,
    @Body() createApplicationDTO: CreateApplicationDTO,
  ) {
    return this.applicationService.createApplication(
      employeeId,
      createApplicationDTO,
    );
  }

  @Get(':applicationId')
  async getApplication(@Param('applicationId') applicationId: number) {
    try {
      return this.applicationService.getApplication(applicationId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Application not found');
      }
      throw error;
    }
  }

  @Get('employee/:employeeId')
  async getApplicationsForEmployee(@Param('employeeId') employeeId: number) {
    return this.applicationService.getApplicationsForEmployee(employeeId);
  }

  @Patch(':applicationId')
  async updateApplication(
    @Param('applicationId') applicationId: number,
    @Body() updateApplicationDTO: UpdateApplicationDTO,
  ) {
    return this.applicationService.updateApplication(
      applicationId,
      updateApplicationDTO,
    );
  }

  @Delete(':applicationId')
  async deleteApplication(@Param('applicationId') applicationId: number) {
    return this.applicationService.deleteApplication(applicationId);
  }
}
