-- CreateEnum
CREATE TYPE "tipo_vinculo" AS ENUM ('EXPERIMENTAL', 'MENSAL');

-- CreateTable
CREATE TABLE "Aluno" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vinculo" (
    "id" SERIAL NOT NULL,
    "aluno_id" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "tipo_vinculo" "tipo_vinculo" NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_fim" TIMESTAMP(3),

    CONSTRAINT "Vinculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evento_financeiro" (
    "id" SERIAL NOT NULL,
    "tipo_evento" TEXT NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "aluno_id" INTEGER NOT NULL,
    "pago_em" TIMESTAMP(3) NOT NULL,
    "data_aula" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Evento_financeiro_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vinculo_aluno_id_key" ON "Vinculo"("aluno_id");

-- AddForeignKey
ALTER TABLE "Vinculo" ADD CONSTRAINT "Vinculo_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento_financeiro" ADD CONSTRAINT "Evento_financeiro_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
