import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';


@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService
    ) { };


    async createUser(data: UserDto): Promise<User | never> {
        return await this.prisma.user.create({
            data: data
        }).catch(error=>{
            throw new BadRequestException(`${error}`); 
        })
    }
}
