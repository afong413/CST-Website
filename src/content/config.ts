// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content"

import { meetingSchema } from "../schemas"
// 2. Define your collection(s)
const meetingCollection = defineCollection({
  type: "content",
  schema: meetingSchema
})
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  meetings: meetingCollection,
}
