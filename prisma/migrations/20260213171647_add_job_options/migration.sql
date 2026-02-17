-- CreateTable
CREATE TABLE `JobOption` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `JobOption_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserJobOption` (
    `userId` INTEGER NOT NULL,
    `jobOptionId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`, `jobOptionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CompanyJobOption` (
    `companyId` VARCHAR(191) NOT NULL,
    `jobOptionId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`companyId`, `jobOptionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VacancyJobOption` (
    `jobId` VARCHAR(191) NOT NULL,
    `jobOptionId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`jobId`, `jobOptionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserOpportunity` (
    `userId` INTEGER NOT NULL,
    `type` ENUM('COURSES', 'ENGLISH_CLASSES', 'INTERNSHIPS', 'PAID_WORK_ONLY') NOT NULL,

    PRIMARY KEY (`userId`, `type`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserEmploymentType` (
    `userId` INTEGER NOT NULL,
    `type` ENUM('FULL_TIME', 'PART_TIME', 'BOTH_FLEXIBLE') NOT NULL,

    PRIMARY KEY (`userId`, `type`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserJobOption` ADD CONSTRAINT `UserJobOption_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserJobOption` ADD CONSTRAINT `UserJobOption_jobOptionId_fkey` FOREIGN KEY (`jobOptionId`) REFERENCES `JobOption`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompanyJobOption` ADD CONSTRAINT `CompanyJobOption_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompanyJobOption` ADD CONSTRAINT `CompanyJobOption_jobOptionId_fkey` FOREIGN KEY (`jobOptionId`) REFERENCES `JobOption`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VacancyJobOption` ADD CONSTRAINT `VacancyJobOption_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Job`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VacancyJobOption` ADD CONSTRAINT `VacancyJobOption_jobOptionId_fkey` FOREIGN KEY (`jobOptionId`) REFERENCES `JobOption`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserOpportunity` ADD CONSTRAINT `UserOpportunity_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEmploymentType` ADD CONSTRAINT `UserEmploymentType_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
