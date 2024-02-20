-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('subscriptionPayment', 'productPurchase');

-- AlterTable
ALTER TABLE "MpesaPaymentRequest" ADD COLUMN     "type" "PaymentType" NOT NULL DEFAULT 'productPurchase',
ALTER COLUMN "cartId" DROP NOT NULL;
