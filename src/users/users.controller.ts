import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  /**
   * GET /users
   * GET /users/:id
   * POST /users
   * PATCH /users/:id
   * DELETE /users/:id
   */

  @Get() // /users
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.userService.findAll(role);
  }

  @Get('interns') //GET /users/intern
  findAllInterns() {
    return [];
  }

  @Get(':id') //GET /users/:id
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Post() //POST /users
  create(
    @Body()
    user: {
      name: string;
      email: string;
      role: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    return this.userService.create(user);
  }

  @Patch(':id') //PATCH /users/:id
  update(
    @Param('id') id: string,
    @Body()
    userUpdate: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    return this.userService.update(+id, userUpdate);
  }

  @Delete(':id') //GET /users/:id
  delete(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}
