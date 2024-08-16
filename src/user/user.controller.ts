import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get user by id.' })
  findOne(@Param('id') id: string) {
    return this.userService.findUserById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  @ApiResponse({ status: 200, description: 'Update user.' })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: { email?: string; password?: string },
  ) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete user.' })
  remove(@Param('id') id: string) {
    return this.userService.deleteUser(+id);
  }
}
