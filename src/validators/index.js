const { CommentSchemaValidator } = require("./comments.validators");
const { UserSchemaValidator, UserLoginValidator, UpdationSchemaValidator } = require("./user.validators");
const { VideoSchemaValidator } = require("./video.validators");


module.exports = {
  UserSchemaValidator,
  UserLoginValidator,
  UpdationSchemaValidator,

  CommentSchemaValidator,
  
  VideoSchemaValidator
}