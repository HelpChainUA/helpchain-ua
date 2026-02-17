/*
  Warnings:

  - You are about to drop the column `age` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `age`,
    ADD COLUMN `ageRange` ENUM('AGE_18_24', 'AGE_25_29', 'AGE_30_34', 'AGE_35_39', 'AGE_40_44', 'AGE_45_54', 'AGE_55_PLUS') NULL;
