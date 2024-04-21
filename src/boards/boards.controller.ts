import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BoardEntity } from 'src/boards/entities/board.entity';
import { Board } from '@prisma/client';


@ApiTags('boards')
@ApiResponse({status: 200, description: "ok", type: BoardEntity})
@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) { }

    @Get()
    @ApiOkResponse({status: 200, description: "ok",  type: BoardEntity, isArray: true})
    async getAllBoard() {
        return await this.boardsService.getAllBoards();
    }


    @ApiOkResponse({description: '성공', type: BoardEntity})
    @Get('/:id')
    async getBoardById(@Param('id') id: string): Promise<Board> {
        return this.boardsService.getBoardById({id: String(id)});
    }

    @ApiBody({type: CreateBoardDto})
    @ApiCreatedResponse({description: '성공', type: BoardEntity})
    @Post()
    async createBoard(
        @Body() postData: CreateBoardDto
    ): Promise<Board>{
        return this.boardsService.createBoard(postData);
    }

    @Patch('/:id')
    @ApiOkResponse({description: '성공', type: BoardEntity})
    async updateBoardStatus(
        @Param('id') id: string,
        @Body('status', BoardStatusValidationPipe) status: string
    ): Promise<Board>{
        return this.boardsService.changeStatusBoard(id, status);
    }

    @Delete('/:id')
    async deleteBoard(
        @Param('id') id: string
    ): Promise<void> {
        return this.boardsService.deleteBoard(id);
    }

}
