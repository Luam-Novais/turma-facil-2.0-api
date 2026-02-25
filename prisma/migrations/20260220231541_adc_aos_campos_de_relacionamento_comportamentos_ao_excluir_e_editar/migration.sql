/*
  Warnings:

  - Made the column `date_birth` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_student_id_fkey";

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "date_birth" SET NOT NULL,
ALTER COLUMN "date_birth" SET DATA TYPE TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
