import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService
    ) { };


    async createUser(data: UserDto): Promise<User | never> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(data.password, salt);

        const user = this.prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword
            }
        }).catch(error=>{
            throw new BadRequestException(`${error}`); 
        });
        
        return user;
    }
}
