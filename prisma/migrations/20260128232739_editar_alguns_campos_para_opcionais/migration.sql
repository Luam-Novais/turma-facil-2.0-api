-- DropForeignKey
ALTER TABLE "Vinculo" DROP CONSTRAINT "Vinculo_aluno_id_fkey";

-- AlterTable
ALTER TABLE "Aluno" ALTER COLUMN "criado_em" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Pagamento" ALTER COLUMN "pago_em" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Vinculo" ALTER COLUMN "aluno_id" DROP NOT NULL,
ALTER COLUMN "data_inicio" SET DATA TYPE DATE;

-- AddForeignKey
ALTER TABLE "Vinculo" ADD CONSTRAINT "Vinculo_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "Aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;
