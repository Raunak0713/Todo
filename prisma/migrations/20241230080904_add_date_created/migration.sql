-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "isActive" SET DEFAULT false;
