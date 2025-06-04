const z = require('zod')

const CommentSchemaValidator = z.object({
    comment: z.string(),
})

module.exports = {
    CommentSchemaValidator
}