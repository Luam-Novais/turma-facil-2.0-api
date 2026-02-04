/*
  Warnings:

  - You are about to drop the column `payment_type` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `payment_method` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_reason` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "payment_type",
ADD COLUMN     "payment_method" TEXT NOT NULL,
ADD COLUMN     "payment_reason" VARCHAR(50) NOT NULL,
ALTER COLUMN "payment_date" SET DATA TYPE TIMESTAMP(3);
