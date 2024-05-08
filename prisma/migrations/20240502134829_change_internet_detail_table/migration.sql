/*
  Warnings:

  - You are about to drop the column `curentTraffic` on the `internetDetail` table. All the data in the column will be lost.
  - You are about to drop the column `offlineTime` on the `internetDetail` table. All the data in the column will be lost.
  - You are about to drop the column `onlineTime` on the `internetDetail` table. All the data in the column will be lost.
  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invoices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `revenue` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "internetDetail" DROP COLUMN "curentTraffic",
DROP COLUMN "offlineTime",
DROP COLUMN "onlineTime",
ADD COLUMN     "currentTraffic" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "signInTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "signOutTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "duration" SET DEFAULT 0;

-- DropTable
DROP TABLE "customers";

-- DropTable
DROP TABLE "invoices";

-- DropTable
DROP TABLE "revenue";
