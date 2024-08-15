-- CreateEnum
CREATE TYPE "InviteStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DENIED');

-- AlterTable
ALTER TABLE "Invite" ADD COLUMN     "status" "InviteStatus" NOT NULL DEFAULT 'PENDING';
