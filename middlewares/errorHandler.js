const errorHandler = (err, req, res, next) => {
  console.error("Error Details:", err.message); // Ghi log lỗi ra console
  console.error("Stack Trace:", err.stack); // Log stack trace để debug

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};


export default errorHandler;
  