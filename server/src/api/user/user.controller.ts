import { Body, Controller, Get, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/core/decorators/auth.decoractor';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@Auth('_id') userId: string) {
    return await this.userService.getUser(userId);
  }

  @Put('profile-picture')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
        },
      },
    },
  })
  async updateProfilePicture(
    @Auth('_id') userId: string,
    @Body('image') profilePicture: string,
  ) {
    return await this.userService.updateProfilePicture(profilePicture, userId);
  }
}
