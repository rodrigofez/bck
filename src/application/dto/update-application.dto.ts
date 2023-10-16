import { PartialType } from '@nestjs/mapped-types';
import { CreateApplicationDTO } from './create-application.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateApplicationDTO extends PartialType(CreateApplicationDTO) {
  constructor(partial: Partial<CreateApplicationDTO>) {
    super();
    Object.assign(this, partial);
  }

  @IsNumber()
  @IsOptional()
  employeeId: number;
}
