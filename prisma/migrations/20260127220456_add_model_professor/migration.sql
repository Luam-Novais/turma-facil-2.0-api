-- CreateTable
CREATE TABLE "Professor" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "password" TEXT NOT NULL,
    "username" VARCHAR(50) NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);
