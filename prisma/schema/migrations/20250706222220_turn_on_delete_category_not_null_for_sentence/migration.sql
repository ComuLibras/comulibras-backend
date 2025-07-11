-- DropForeignKey
ALTER TABLE "sentences" DROP CONSTRAINT "sentences_category_id_fkey";

-- AlterTable
ALTER TABLE "sentences" ALTER COLUMN "category_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "sentences" ADD CONSTRAINT "sentences_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
