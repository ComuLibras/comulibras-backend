-- CreateTable
CREATE TABLE "sentences" (
    "id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "category_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sentences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_favorite_sentences" (
    "id" UUID NOT NULL,
    "account_id" UUID NOT NULL,
    "sentence_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_favorite_sentences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "sentences_category_id_idx" ON "sentences"("category_id");

-- CreateIndex
CREATE INDEX "user_favorite_sentences_account_id_idx" ON "user_favorite_sentences"("account_id");

-- AddForeignKey
ALTER TABLE "sentences" ADD CONSTRAINT "sentences_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorite_sentences" ADD CONSTRAINT "user_favorite_sentences_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorite_sentences" ADD CONSTRAINT "user_favorite_sentences_sentence_id_fkey" FOREIGN KEY ("sentence_id") REFERENCES "sentences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
