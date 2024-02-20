-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('wearable', 'gym', 'featured');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category" "ProductCategory";
