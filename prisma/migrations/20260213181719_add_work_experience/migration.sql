-- AlterTable
ALTER TABLE `User` ADD COLUMN `workExperienceSummary` TEXT NULL;

-- CreateTable
CREATE TABLE `UserWorkExperience` (
    `userId` INTEGER NOT NULL,
    `jobOptionId` VARCHAR(191) NOT NULL,
    `yearsRange` ENUM('YEARS_0_1', 'YEARS_1_2', 'YEARS_3_5', 'YEARS_6_10', 'YEARS_10_PLUS') NOT NULL,

    PRIMARY KEY (`userId`, `jobOptionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserWorkExperience` ADD CONSTRAINT `UserWorkExperience_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserWorkExperience` ADD CONSTRAINT `UserWorkExperience_jobOptionId_fkey` FOREIGN KEY (`jobOptionId`) REFERENCES `JobOption`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
