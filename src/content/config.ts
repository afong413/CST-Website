import { defineCollection, z } from "astro:content"

export const collections = {
  meetings: defineCollection({
    type: "content",
    schema: z.object({}),
  }),
}
