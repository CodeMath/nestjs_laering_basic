import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './boards.models';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { pipe } from 'rxjs';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) { }

    @Get()
    async getAllBoard(): Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }

    @Get('/:id')
    async getBoardById(@Param('id') id: string): Promise<Board> {
        return this.boardsService.getBoardById({id: String(id)});
    }

    @Post()
    async createBoard(
        @Body() postData: CreateBoardDto
    ): Promise<Board>{
        return this.boardsService.createBoard(postData);
    }

    @Patch('/:id')
    async updateBoardStatus(
        @Param('id') id: string,
        @Body('status', BoardStatusValidationPipe) status: string
    ): Promise<Board>{
        return this.boardsService.changeStatusBoard(id, status);
    }

}
