const z = require('zod')

const UserSchemaValidator = z.object({
    channelName: z.string(),
    email: z.string().email(),
    password: z.string().min(3).max(10),
    logo: z.string().optional(),
    phone: z.string().length(10).optional(),
})

const UpdationSchemaValidator = z.object({
    channelName: z.string().optional(),
    password: z.string().min(3).max(10).optional(),
    logo: z.string().optional().optional(),
    phone: z.string().length(10).optional(),
})

const UserLoginValidator = z.object({
    email: z.string().email(),
    password: z.string().min(3).max(10)
})

module.exports = {
    UserSchemaValidator,
    UserLoginValidator,
    UpdationSchemaValidator
}