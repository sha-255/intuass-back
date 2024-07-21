/*
  Warnings:

  - Added the required column `reloadStartTime` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "pool" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "reloadTime" DATETIME NOT NULL,
    "reloadStartTime" DATETIME NOT NULL,
    "cost" INTEGER NOT NULL,
    "imageUri" TEXT NOT NULL,
    CONSTRAINT "Card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Card" ("cost", "id", "imageUri", "number", "pool", "reloadTime", "userId") SELECT "cost", "id", "imageUri", "number", "pool", "reloadTime", "userId" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
CREATE UNIQUE INDEX "Card_id_key" ON "Card"("id");
CREATE UNIQUE INDEX "Card_userId_key" ON "Card"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
