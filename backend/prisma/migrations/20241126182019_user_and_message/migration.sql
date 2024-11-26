-- CreateTable
CREATE TABLE "message" (
    "id" TEXT NOT NULL,
    "chat" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "reciverId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
