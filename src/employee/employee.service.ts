import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  // search employees by first name, last name or dui
  async searchEmployees() {
    return this.prisma.client.employee.findMany();

    // console.log(search);

    // // trim search
    // const trimmedSearch = search.trim();

    // const splittedSearch = trimmedSearch.split(' ');
    // // split full name into first name and last name

    // if (splittedSearch.length > 2) {
    //   return [];
    // }

    // const [firstName, lastName] =
    //   splittedSearch.length == 2
    //     ? trimmedSearch.split(' ')
    //     : [undefined, undefined];

    // console.log({ firstName, lastName });

    // console.log({ trimmedSearch });

    // return this.prisma.client.employee.findMany({
    //   where: {
    //     OR: [
    //       {
    //         firstName: {
    //           contains: firstName,
    //         },
    //       },
    //       {
    //         lastName: {
    //           contains: lastName,
    //         },
    //       },
    //       {
    //         dui: {
    //           contains: trimmedSearch,
    //         },
    //       },
    //       {
    //         lastName: {
    //           contains: trimmedSearch,
    //         },
    //       },
    //       {
    //         firstName: {
    //           contains: trimmedSearch,
    //         },
    //       },
    //     ],
    //   },
    // });
  }

  async findMany() {
    // with pagination and sort
    // return this.prisma.client.application.findMany({
    //   skip: 0,
    //   take: 10,
    //   orderBy: {
    //     createdAt: 'desc',
    //   },
    // });

    return this.prisma.client.application.findMany({
      include: {
        employee: true,
      },
    });
  }
}
