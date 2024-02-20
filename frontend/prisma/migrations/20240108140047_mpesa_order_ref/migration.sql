/*
  Warnings:

  - A unique constraint covering the columns `[ref]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "ref" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Order_ref_key" ON "Order"("ref");
