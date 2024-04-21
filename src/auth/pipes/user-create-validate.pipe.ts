import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class UserCreateValidationPipe implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {
        console.log(value);
        console.log(metadata);
        // try {
        //     if (!this.isEmailValidate(value.email)) {
        //         throw new BadRequestException(`${value.email} isn't valide email`);
        //     }
        //     return value;
        // } catch (e) {
        //     throw new BadRequestException(`${e}`);
        // }
        return value

    }

    private isEmailValidate(email: string) {
        return email.match(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/);
    }


}