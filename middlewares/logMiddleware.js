// Middleware to log request details
const logRequest = (req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next(); // Pass control to the next middleware or route handler
};

export default logRequest;
  