/*
  Warnings:

  - You are about to drop the `Aluno` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pagamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Professor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vinculo` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "subscriptionType" AS ENUM ('EXPERIMENTAL', 'MENSAL');

-- DropForeignKey
ALTER TABLE "Pagamento" DROP CONSTRAINT "Pagamento_aluno_id_fkey";

-- DropForeignKey
ALTER TABLE "Vinculo" DROP CONSTRAINT "Vinculo_aluno_id_fkey";

-- DropTable
DROP TABLE "Aluno";

-- DropTable
DROP TABLE "Pagamento";

-- DropTable
DROP TABLE "Professor";

-- DropTable
DROP TABLE "Vinculo";

-- DropEnum
DROP TYPE "tipo_vinculo";

-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "password" TEXT NOT NULL,
    "username" VARCHAR(50) NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "cpf" VARCHAR(20) NOT NULL,
    "date_birth" TIMESTAMP(3) NOT NULL,
    "observations" TEXT,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "subscription_type" "subscriptionType" NOT NULL,
    "start_date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3),

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "payment_type" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "student_id" INTEGER NOT NULL,
    "payment_date" DATE NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_username_key" ON "Teacher"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_student_id_key" ON "Subscription"("student_id");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
