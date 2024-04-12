-- CreateEnum
CREATE TYPE "BoardStatus" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateTable
CREATE TABLE "Board" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(20) NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "status" "BoardStatus" NOT NULL DEFAULT 'PUBLIC',

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);
