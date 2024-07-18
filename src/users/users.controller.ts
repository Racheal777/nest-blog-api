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

@Controller('users')
export class UsersController {
  /**
   * GET /users
   * GET /users/:id
   * POST /users
   * PATCH /users/:id
   * DELETE /users/:id
   */

  @Get() // /users
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return [];
  }

  @Get('interns') //GET /users/intern
  findAllInterns() {
    return [];
  }

  @Get(':id') //GET /users/:id
  findOne(@Param('id') id: string) {
    return { id };
  }

  @Post() //POST /users
  create(@Body() user: {}) {
    return user;
  }

  @Patch(':id') //PATCH /users/:id
  update(@Param('id') id: string, @Body() userUpdate: {}) {
    return { id, ...userUpdate };
  }

  @Delete(':id') //GET /users/:id
  delete(@Param('id') id: string) {
    return { id };
  }
}
