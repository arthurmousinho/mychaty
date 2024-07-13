-- CreateTable
CREATE TABLE "Invite" (
    "id" TEXT NOT NULL,
    "userFromId" TEXT NOT NULL,
    "userToId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invite_userFromId_userToId_key" ON "Invite"("userFromId", "userToId");

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_userFromId_fkey" FOREIGN KEY ("userFromId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_userToId_fkey" FOREIGN KEY ("userToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
