import { defineCollection, z } from "astro:content"

export const collections = {
  meetings: defineCollection({
    type: "content",
    schema: z.object({}),
  }),

  problems: defineCollection({
    type: "content",
    schema: z.object({
      functionName: z.string(),
      params: z.array(z.string()),
      tests: z.array(z.tuple([z.number(), z.array(z.number())])),
    }),
  }),
}
