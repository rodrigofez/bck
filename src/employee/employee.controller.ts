import { Controller, Get } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  // search employees by name or dui
  @Get()
  async searchEmployees() {
    return this.employeeService.searchEmployees();
  }
}
