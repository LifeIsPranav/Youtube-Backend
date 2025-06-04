const { addNewComment } = require("../repository/comments.repository")
const { CommentSchemaValidator } = require("../validators/comments.validators");

const addCommentController = async (req, res) => {

  const { _, error } =  CommentSchemaValidator.safeParse(req.body)
  if(error) throw new Error("Invalid Parsing comment!")
  
  await addNewComment(req.email, req.params.videoUrl, req.body.comment)
  console.log("Successfuly added a Comment!")

  res.json({
    msg: "Comment Added!"
  })
}


module.exports = {
  addCommentController
}