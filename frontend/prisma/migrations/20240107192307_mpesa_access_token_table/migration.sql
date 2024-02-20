-- CreateTable
CREATE TABLE "MpesaAccessToken" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "accessToken" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MpesaAccessToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MpesaAccessToken_accessToken_key" ON "MpesaAccessToken"("accessToken");
