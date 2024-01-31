/*
  Warnings:

  - A unique constraint covering the columns `[query]` on the table `search` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `search_query_key` ON `search`(`query`);
