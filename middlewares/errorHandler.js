const errorHandler = (err, req, res, next) => {
  console.error("Error Details:", err.message); 
  console.error("Stack Trace:", err.stack);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};


export default errorHandler;
  