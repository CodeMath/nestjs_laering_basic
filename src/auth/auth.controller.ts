import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDto } from './dto/create-user.dto';
import { UserCreateValidationPipe } from './pipes/user-create-validate.pipe';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authsService: AuthService) { }

    @ApiBody({type: UserDto})
    @ApiCreatedResponse({status:201, description:"new ok", type: UserEntity})
    @Post('/signup')
    async createUser(@Body() userDto: UserDto): Promise<UserEntity>{
        return await this.authsService.createUser(userDto);
    }
    
    @ApiBody({type: UserDto})
    @ApiOkResponse({status: 200, description: "ok"})
    @ApiUnauthorizedResponse({status: 401, description:"비밀번호 틀림"})
    @Post('/signin')
    async signInUser(@Body() userDto: UserDto): Promise<{accessToken: string}>{
        return await this.authsService.signInUser(userDto);
    }

}
