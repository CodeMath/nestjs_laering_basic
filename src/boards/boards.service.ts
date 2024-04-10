import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './boards.models';
import { v1 as uuid } from 'uuid'; // v1 버전을 사용한다
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    // 다른 모듈에서 수정하지 못하도록 private
    private boards: Board[] = [];

    // 전체 게시글 가져오기
    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(CreateBoardDto: CreateBoardDto){
        const {title, description} = CreateBoardDto;

        const board: Board = {
            id: uuid(), // DB에서는 알아서 처리하지만, 로컬 메모리에서는 uuid 쓰자
            title,
            description,
            status: BoardStatus.PUBLIC
        }
        this.boards.push(board);
        return board;
    };

    getBoardById(id: string): Board{
        const found = this.boards.find((board) => board.id === id );

        if(!found){
            throw new NotFoundException(`can't find Board with id ${id}`); // 404 
        }

        return found;
    }

    deleteBoard(id: string){
        const found = this.getBoardById(id);
        this.boards = this.boards.filter(board => board.id !== found.id);
    }

    updateBoardStatus(id:string, status:BoardStatus): Board{
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}
