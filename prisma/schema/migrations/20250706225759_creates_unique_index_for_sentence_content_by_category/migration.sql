/*
  Warnings:

  - A unique constraint covering the columns `[content,category_id]` on the table `sentences` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "sentences_content_category_id_key" ON "sentences"("content", "category_id");
