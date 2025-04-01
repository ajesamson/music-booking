/*
  Warnings:

  - A unique constraint covering the columns `[title,date,venue]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Event_title_date_venue_key" ON "Event"("title", "date", "venue");
