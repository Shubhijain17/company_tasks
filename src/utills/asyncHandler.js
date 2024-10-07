//with promise
function asyncHandler(requestHandler) {
    return (req, res, next) =>{
        Promise.resolve(requestHandler(req, res, next))
        .catch(next); 
    };
}
export {asyncHandler}



