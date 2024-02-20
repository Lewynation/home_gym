/*
  Warnings:

  - The `subscriptionTierId` column on the `MpesaPaymentRequest` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "MpesaPaymentRequest" DROP COLUMN "subscriptionTierId",
ADD COLUMN     "subscriptionTierId" INTEGER;
