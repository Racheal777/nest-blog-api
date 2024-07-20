import { Injectable, NotFoundException } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    return this.databaseService.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role)
      return this.databaseService.employee.findMany({
        where: {
          role,
        },
      });
    return this.databaseService.employee.findMany();
  }

  async findOne(id: number) {
    const employee = await this.databaseService.employee.findUnique({
      where: {
        id,
      },
    });
    if (!employee) {
      throw new NotFoundException(`No employee for this id ${id}`);
    }
    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.findOne(id);
    return this.databaseService.employee.update({
      where: {
        id: employee.id,
      },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    const employee = this.findOne(id);
    return this.databaseService.employee.delete({
      where: {
        id: (await employee).id,
      },
    });
  }
}
