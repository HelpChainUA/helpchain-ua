-- AlterTable
ALTER TABLE `User` ADD COLUMN `housingAssistancePreference` ENUM('NO', 'JOB_WITH_HOUSING_ONLY', 'NEED_HELP_MOVING', 'CONSIDERING_OPTIONS') NULL;

-- CreateTable
CREATE TABLE `UserJobLocation` (
    `userId` INTEGER NOT NULL,
    `locationId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`, `locationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserJobLocation` ADD CONSTRAINT `UserJobLocation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserJobLocation` ADD CONSTRAINT `UserJobLocation_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
