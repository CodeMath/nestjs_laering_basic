import { ApiProperty } from "@nestjs/swagger";
import { Board } from "@prisma/client";


export abstract class BoardEntity implements Board {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    status: string;

    @ApiProperty()
    author_id: number | null;
}

