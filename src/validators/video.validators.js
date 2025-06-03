const z = require('zod')

const VideoSchemaValidator = z.object({
    userId: z.string(),
    videoUrl: z.string(),
    thumbnail_url: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string).optional()
})

module.exports = {
    VideoSchemaValidator
}