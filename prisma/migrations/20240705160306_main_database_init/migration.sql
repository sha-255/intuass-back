/*
  Warnings:

  - You are about to drop the column `login` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `poolId` on the `Card` table. All the data in the column will be lost.
  - Added the required column `cost` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pool` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Wallet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "address" TEXT,
    "inas" INTEGER NOT NULL,
    "reward" INTEGER NOT NULL,
    CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Stake" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "walletAddress" TEXT NOT NULL,
    "time" DATETIME NOT NULL,
    "pool" INTEGER NOT NULL,
    "reward" INTEGER NOT NULL,
    "percent" INTEGER NOT NULL,
    CONSTRAINT "Stake_walletAddress_fkey" FOREIGN KEY ("walletAddress") REFERENCES "Wallet" ("address") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);
INSERT INTO "new_User" ("id") SELECT "id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
CREATE TABLE "new_Card" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "pool" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "reloadTime" DATETIME NOT NULL,
    "cost" INTEGER NOT NULL,
    "imageUri" TEXT NOT NULL,
    CONSTRAINT "Card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Card" ("id", "imageUri", "reloadTime") SELECT "id", "imageUri", "reloadTime" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
CREATE UNIQUE INDEX "Card_id_key" ON "Card"("id");
CREATE UNIQUE INDEX "Card_userId_key" ON "Card"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_id_key" ON "Wallet"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_userId_key" ON "Wallet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_address_key" ON "Wallet"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Stake_id_key" ON "Stake"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Stake_walletAddress_key" ON "Stake"("walletAddress");
