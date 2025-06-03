const express = require('express')

const errorMiddleware = (err, req, res, next) => {
  if(err){ 
    console.log(err)
    res.json({
      msg: "From Error middleware!", 
      error: err.message
    })

    return;
  }

  res.json({msg: "Something Unusual (it's error middleware 🙄)!!"})
}

module.exports = {
  errorMiddleware
}
