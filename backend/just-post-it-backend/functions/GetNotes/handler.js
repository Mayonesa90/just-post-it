const { ExpressionType } = require('@aws-sdk/client-s3');
const {sendResponse, sendError} = require('../../responses/handler')
const {db} = require('../../services/db') 

exports.hello = async (event) => {

  try {

    const data = await db.scan({
      TableName: 'NotesManager',
    });

    if (data.Items.length === 0) {
      return sendError(404, "Nothing here yet..")
    }

    const sortedData = data.Items.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;  
    })

    return sendResponse(sortedData)
  } catch (error) {
    return sendError(500, error.message)
  }

  };
  