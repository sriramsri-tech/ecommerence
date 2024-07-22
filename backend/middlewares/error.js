module.exports=(err,req,res,next)=>{
    err.statusCode= err.statusCode|| 500

    if (process.env.NODE_ENV == "development"){

        res.status(err.statusCode).json({
          success: false,
          message: err.message,
          stack: err.stack,
          error:err
        });
    }

     if (process.env.NODE_ENV == "production") {
      let message=err.message;
      let error={...err}

      if(err.name=='ValidationError'){
        message=Object.values(err.errors).map(value=>value.message)
        error=new Error(message)
        err.statusCode=400
      }
      if(err.name=='CastError'){
        message='Resource not found $(err.path)'
      }

      if(err.code== 1100){
        let message= 'Duplicate Key ${Object.keys(err.keyValue)}'
        error= new Error(message)
      }

      if(err.name== 'JSONWebTokenError'){
        let message = 'JSON web Token is invalid'
        error = new Error(message);
      }

      if (err.name == "TokenExpiredError") {
        let message = "JSON web Token is expired";
        error = new Error(message);
      }
       res.status(err.statusCode).json({
         success: false,
         message: error.message || 'Internal server Error'
         
       });
     }
      
}