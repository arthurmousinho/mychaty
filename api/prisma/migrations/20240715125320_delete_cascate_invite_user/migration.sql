-- DropForeignKey
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_userFromId_fkey";

-- DropForeignKey
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_userToId_fkey";

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_userFromId_fkey" FOREIGN KEY ("userFromId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_userToId_fkey" FOREIGN KEY ("userToId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
