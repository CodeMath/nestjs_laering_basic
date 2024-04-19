import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class BoardStatusValidationPipe implements PipeTransform {
    // 읽기 전용, 외부 접속 가능하나 값 변경 불가
    readonly StatusOptions = [
        "PRIVATE",
        "PUBLIC"
    ]

    transform(value: any) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value)){
            throw new BadRequestException(`${value} isn't int the status options`);
        }
        return value;
    }

    private isStatusValid(status: any){
        const index = this.StatusOptions.indexOf(status);
        return index !== -1; // -1이면 없음
    }

}