//this is the catchAsync from the tutorial Udemy

module.exports = func => {
    return(req, res, next) => {
        func(req, res, next).catch(next);
    }
}