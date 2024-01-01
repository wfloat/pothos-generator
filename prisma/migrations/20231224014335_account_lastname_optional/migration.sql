/*
  Warnings:

  - You are about to drop the column `modifiedById` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_modifiedById_fkey";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "lastName" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "modifiedById",
ADD COLUMN     "editorId" UUID;

-- CreateTable
CREATE TABLE "Quality" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "score" INTEGER NOT NULL,
    "commentId" UUID NOT NULL,

    CONSTRAINT "Quality_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Quality_commentId_key" ON "Quality"("commentId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_editorId_fkey" FOREIGN KEY ("editorId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quality" ADD CONSTRAINT "Quality_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
