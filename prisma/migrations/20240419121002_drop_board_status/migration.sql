/*
  Warnings:

  - The `status` column on the `Board` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "status",
ADD COLUMN     "status" VARCHAR(20) NOT NULL DEFAULT 'PUBLIC';

-- DropEnum
DROP TYPE "BoardStatus";
