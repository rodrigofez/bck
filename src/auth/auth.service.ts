import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

function generateMockJWT(payload) {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  const signature = 'FKd03dk03fjK39'; // Replace with a real signature if needed

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  //   sign in method with email and password

  async signIn(email: string, password: string) {
    const user = await this.prisma.client.user.findFirst({
      where: {
        email,
      },
      include: {
        employee: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = password === user.password;

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      firstName: user.employee.firstName,
      lastName: user.employee.lastName,
      email: user.email,
      role: user.role,
      employeeId: user.employeeId,
      userId: user.id,
      startDate: user.employee.startDate,
      dui: user.employee.dui,
      accessToken: generateMockJWT({
        sub: user.role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
      }),
    };
  }
}
