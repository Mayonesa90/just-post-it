function sendResponse(data) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        data,
      }),
    };
  }
  
  function sendError(statusCode, errorMessage) {
    return {
      statusCode: statusCode,
      body: JSON.stringify({ errorMessage }),
    };
  }
  
  module.exports = { sendResponse, sendError };
  