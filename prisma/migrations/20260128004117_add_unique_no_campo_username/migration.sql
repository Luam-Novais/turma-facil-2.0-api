/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Professor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Professor_username_key" ON "Professor"("username");
