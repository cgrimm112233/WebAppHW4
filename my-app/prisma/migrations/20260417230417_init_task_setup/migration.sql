/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "TaskList" (
    "isS1" BOOLEAN NOT NULL,

    CONSTRAINT "TaskList_pkey" PRIMARY KEY ("isS1")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pageIsS1" BOOLEAN NOT NULL,
    "isComplete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_pageIsS1_fkey" FOREIGN KEY ("pageIsS1") REFERENCES "TaskList"("isS1") ON DELETE RESTRICT ON UPDATE CASCADE;
