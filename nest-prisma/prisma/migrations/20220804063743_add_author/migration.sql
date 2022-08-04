-- CreateTable
CREATE TABLE "Author" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Books" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "authorId" INTEGER,
    CONSTRAINT "Books_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Books" ("id", "title") SELECT "id", "title" FROM "Books";
DROP TABLE "Books";
ALTER TABLE "new_Books" RENAME TO "Books";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
