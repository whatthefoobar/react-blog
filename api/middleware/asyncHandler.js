// uses a try catch block in the async code and passes them to Express. If the try catch were omitted Express would not catch the error since it's not part of the synchronous handler code
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
