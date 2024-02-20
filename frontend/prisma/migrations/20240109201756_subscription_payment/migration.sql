/*
  Warnings:

  - A unique constraint covering the columns `[ref]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "MpesaPaymentRequest" ADD COLUMN     "subscriptionTierId" TEXT;

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "amountPaid" DOUBLE PRECISION,
ADD COLUMN     "ref" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_ref_key" ON "Subscription"("ref");
