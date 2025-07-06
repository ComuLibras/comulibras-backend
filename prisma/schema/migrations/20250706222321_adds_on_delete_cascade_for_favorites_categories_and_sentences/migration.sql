-- DropForeignKey
ALTER TABLE "user_favorite_categories" DROP CONSTRAINT "user_favorite_categories_account_id_fkey";

-- DropForeignKey
ALTER TABLE "user_favorite_categories" DROP CONSTRAINT "user_favorite_categories_category_id_fkey";

-- DropForeignKey
ALTER TABLE "user_favorite_sentences" DROP CONSTRAINT "user_favorite_sentences_account_id_fkey";

-- DropForeignKey
ALTER TABLE "user_favorite_sentences" DROP CONSTRAINT "user_favorite_sentences_sentence_id_fkey";

-- AddForeignKey
ALTER TABLE "user_favorite_categories" ADD CONSTRAINT "user_favorite_categories_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorite_categories" ADD CONSTRAINT "user_favorite_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorite_sentences" ADD CONSTRAINT "user_favorite_sentences_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorite_sentences" ADD CONSTRAINT "user_favorite_sentences_sentence_id_fkey" FOREIGN KEY ("sentence_id") REFERENCES "sentences"("id") ON DELETE CASCADE ON UPDATE CASCADE;
