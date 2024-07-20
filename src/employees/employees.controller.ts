import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  Ip,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { EmployeesService } from './employees.service';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

//skiping rate limiting
@ApiTags('employees')
@SkipThrottle()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  private readonly logger = new MyLoggerService(EmployeesController.name);

  @Post()
  create(@Body(ValidationPipe) createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @SkipThrottle({ default: false })
  @Get()
  findAll(
    @Ip() ip: string,
    @Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN',
  ) {
    this.logger.log(`Request for All Employees ${ip}`);
    return this.employeesService.findAll(role);
  }

  //rate limiting an endpoint
  @Throttle({ short: { ttl: 1000, limit: 1 } })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
