/*
  Warnings:

  - You are about to drop the `Evento_financeiro` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cpf` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_nascimento` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `Aluno` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Evento_financeiro" DROP CONSTRAINT "Evento_financeiro_aluno_id_fkey";

-- AlterTable
ALTER TABLE "Aluno" ADD COLUMN     "cpf" VARCHAR(20) NOT NULL,
ADD COLUMN     "data_nascimento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "observacoes" TEXT,
ADD COLUMN     "telefone" VARCHAR(20) NOT NULL;

-- DropTable
DROP TABLE "Evento_financeiro";

-- CreateTable
CREATE TABLE "Pagamento" (
    "id" SERIAL NOT NULL,
    "tipo_pag" TEXT NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "aluno_id" INTEGER NOT NULL,
    "pago_em" TIMESTAMP(3) NOT NULL,
    "data_aula" TIMESTAMP(3),

    CONSTRAINT "Pagamento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pagamento" ADD CONSTRAINT "Pagamento_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
