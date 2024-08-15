import { z } from "astro:content"

export const meetingSchema = z.object({
  date: z.date(),
})
