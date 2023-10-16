import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Assuming you have a Prisma service
import { CreateUserDTO } from './dto/create-user.dto';

import { Role, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public async createUser(createUserDto: CreateUserDTO): Promise<User> {
    const {
      dui,
      firstName,
      lastName,
      position,
      startDate,
      email,
      password,
      role,
    } = createUserDto;

    //check if email already exists
    const userExists = await this.prisma.client.user.findFirst({
      where: {
        OR: [
          {
            employee: {
              dui,
            },
          },
          {
            email,
          },
        ],
      },
    });

    if (userExists) {
      throw new ConflictException('Email or DUI already exists');
    }

    const employee = await this.prisma.client.employee.create({
      data: {
        dui,
        firstName,
        lastName,
        position,
        startDate,
      },
    });

    const user = await this.prisma.client.user.create({
      data: {
        email,
        password,
        role: Role[role as keyof typeof Role] || Role.Employee, // Map role from DTO to enum
        employee: {
          connect: {
            id: employee.id,
          },
        },
      },
    });

    return user;
  }

  public async getUsers(): Promise<User[]> {
    return this.prisma.client.user.findMany();
  }

  public async getUser(userId: number): Promise<User> {
    const user = await this.prisma.client.user.findUnique({
      where: {
        id: userId,
      },
      include: { employee: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  public async editUser(
    userId: number,
    createUserDto: CreateUserDTO,
  ): Promise<User> {
    const user = await this.prisma.client.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Map the DTO properties to the fields that can be updated
    const { email, password, role } = createUserDto;

    const updatedUser = await this.prisma.client.user.update({
      where: {
        id: userId,
      },
      data: {
        email,
        password,
        role: Role[role as keyof typeof Role] || Role.Employee,
      },
    });

    return updatedUser;
  }

  public async deleteUser(userId: number): Promise<void> {
    const user = await this.prisma.client.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.client.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
