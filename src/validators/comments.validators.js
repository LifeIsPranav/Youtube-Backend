const z = require('zod')

const CommentSchemaValidator = z.object({
    commentText: z.string(),
    videoId: z.array(z.string()),
    userId: z.array(z.string())
})

module.exports = {
    CommentSchemaValidator
}