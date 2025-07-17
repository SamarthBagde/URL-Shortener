//this takes function and return a function that take three parameters (req, res, next)

export const asyncHandler = (asyncFunction) => {
  return (req, res, next) => {
    asyncFunction(req, res, next).catch((err) => next(err));
  };
};
