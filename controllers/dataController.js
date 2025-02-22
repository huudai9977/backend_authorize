// Handle POST request for /api/data
const postData = (req, res) => {
  const data = req.body;
  console.log("Received data:", data);
  res.json({
    message: "Data received successfully",
    receivedData: data,
  });
};

// Handle GET request for /api/data
const getData = (req, res) => {
  res.json({
    message: "GET request successful",
    data: { exampleKey: "exampleValue" },
  });
};

export { postData, getData };
