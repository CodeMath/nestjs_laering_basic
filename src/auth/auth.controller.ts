import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDto } from './dto/create-user.dto';
import { UserCreateValidationPipe } from './pipes/user-create-validate.pipe';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authsService: AuthService) { }

    @ApiBody({type: UserDto})
    @ApiCreatedResponse({status:201, description:"new ok", type: UserEntity})
    @Post()
    async createUser(@Body() userDto: UserDto){
        return await this.authsService.createUser(userDto);
    }
    


}
