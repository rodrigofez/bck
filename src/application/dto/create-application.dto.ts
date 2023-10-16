import { MedicalUnit } from '@prisma/client';
import { IsDateString, IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateApplicationDTO {
  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsString()
  doctorName: string;

  @IsEnum(MedicalUnit)
  medicalUnit: MedicalUnit;

  @IsString()
  medicalDiagnostic: string;

  @IsNumber()
  coverageDays: number;
}
