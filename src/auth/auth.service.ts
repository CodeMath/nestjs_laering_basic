import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService, 
        private jwtService: JwtService
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

    async signInUser(data: UserDto){
        const user = await this.prisma.user.findUniqueOrThrow({
            where: {
                email: data.email
            } 
        }).catch(error => {
            throw new NotFoundException(`${error}`); 
        });
        
        if(user && (await bcrypt.compare(data.password, user.password))){
            // 유저 토큰 생성(Secret + Payload )
            const payload = { email: user.email } ;
            const accessToken = await this.jwtService.sign(payload);

            return {accessToken: accessToken}
        }else{
            throw new UnauthorizedException("Invalid password");
        }

    }
}
