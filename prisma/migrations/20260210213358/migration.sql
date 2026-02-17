/*
  Warnings:

  - The values [MENSAL] on the enum `subscriptionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `username` on the `Teacher` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[identifier]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identifier` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "subscriptionType_new" AS ENUM ('EXPERIMENTAL', 'MENSAL_1X', 'MENSAL_2X');
ALTER TABLE "Subscription" ALTER COLUMN "subscription_type" TYPE "subscriptionType_new" USING ("subscription_type"::text::"subscriptionType_new");
ALTER TYPE "subscriptionType" RENAME TO "subscriptionType_old";
ALTER TYPE "subscriptionType_new" RENAME TO "subscriptionType";
DROP TYPE "public"."subscriptionType_old";
COMMIT;

-- DropIndex
DROP INDEX "Teacher_username_key";

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "username",
ADD COLUMN     "identifier" VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_identifier_key" ON "Teacher"("identifier");
