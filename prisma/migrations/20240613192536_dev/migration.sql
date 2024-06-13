/*
  Warnings:

  - Added the required column `imageUri` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "poolId" INTEGER NOT NULL,
    "reloadTime" DATETIME NOT NULL,
    "imageUri" TEXT NOT NULL
);
INSERT INTO "new_Card" ("id", "poolId", "reloadTime") SELECT "id", "poolId", "reloadTime" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
