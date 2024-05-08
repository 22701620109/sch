/*
  Warnings:

  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `authenticator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verification_token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_userId_fkey";

-- DropForeignKey
ALTER TABLE "authenticator" DROP CONSTRAINT "authenticator_userId_fkey";

-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_userId_fkey";

-- DropTable
DROP TABLE "account";

-- DropTable
DROP TABLE "authenticator";

-- DropTable
DROP TABLE "session";

-- DropTable
DROP TABLE "user";

-- DropTable
DROP TABLE "verification_token";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "idNumber" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "internetDetail" (
    "id" TEXT NOT NULL,
    "onlineTime" TIMESTAMP(3) NOT NULL,
    "offlineTime" TIMESTAMP(3) NOT NULL,
    "macAddress" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "curentTraffic" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "internetDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billingStatement" (
    "id" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "totalTraffic" DOUBLE PRECISION NOT NULL,
    "totalOnlineTime" INTEGER NOT NULL,
    "billingTime" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "billingStatement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "log" (
    "id" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "macAddress" TEXT NOT NULL,
    "errorMessage" TEXT NOT NULL,
    "recordTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usersId" TEXT,

    CONSTRAINT "log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "internetDetail" ADD CONSTRAINT "internetDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billingStatement" ADD CONSTRAINT "billingStatement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log" ADD CONSTRAINT "log_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
