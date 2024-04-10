import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './boards.models';
import { CreateBoardDto } from './dto/create-board.dto';
import { stat } from 'fs';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) { }

    @Get('/')
    getAllBoard(): Board[] {
        return this.boardsService.getAllBoards();
    }

    @Post('') // 요청을 보낼 때, 정보를 받고 처리해야하므로,
    createBoard(
        @Body() CreateBoardDto: CreateBoardDto
    ): Board {

        return this.boardsService.createBoard(CreateBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: string): Board{
        return this.boardsService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id: string){
        return this.boardsService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id') id: string, 
        @Body('status') status: BoardStatus): Board{
        return this.boardsService.updateBoardStatus(id, status);
    }


}
