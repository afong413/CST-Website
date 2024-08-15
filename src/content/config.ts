import { defineCollection } from "astro:content"

import { meetingSchema } from "../schemas"

const meetingCollection = defineCollection({
  type: "content",
  schema: meetingSchema,
})

export const collections = {
  meetings: meetingCollection,
}
