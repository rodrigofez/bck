// Import necessary modules
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seedDatabase() {
  // Create 100 employees
  for (let i = 0; i < 100; i++) {
    await prisma.employee.create({
      data: {
        dui: faker.string.numeric(9),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        position: faker.name.jobTitle(),
        startDate: faker.date.past(),
      },
    });
  }

  // Create 60 applications for the last year
  for (let i = 0; i < 60; i++) {
    const employeeId = faker.datatype.number({ min: 1, max: 100 });
    const startDate = faker.date.between('2022-01-01', '2022-12-31');
    const endDate = faker.date.between(startDate, '2022-12-31');

    await prisma.application.create({
      data: {
        employeeId,
        startDate,
        endDate,
        doctorName: faker.name.firstName() + ' ' + faker.name.lastName(),
        medicalUnit: faker.helpers.arrayElement(['MINSAL', 'ISSS']) as
          | 'MINSAL'
          | 'ISSS',
        medicalDiagnostic: faker.lorem.words(3),
        coverageDays: faker.datatype.number({ min: 1, max: 30 }),
      },
    });
  }

  // Close the Prisma client
  await prisma.$disconnect();
}

seedDatabase()
  .then(() => {
    console.log('Database seeded successfully.');
  })
  .catch((error) => {
    console.error('Error seeding database:', error);
  });
