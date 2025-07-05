const asyncHandler = ((handlerRequest)=>{
    return (req,res ,next)=>{
        Promise.resolve(handlerRequest(req,res,next)).catch(error =>{next(error)})}
})
export default asyncHandler;