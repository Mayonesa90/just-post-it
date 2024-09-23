const {sendResponse, sendError} = require('../../responses/handler')
const {db} = require('../../services/db') 

exports.hello = async (event) => {

  try {
    const data = await db.scan({
      TableName: 'NoteManager',
    });

    if (data.Items.length === 0) {
      return sendError(404, "Nothing here yet..")
    }

    return sendResponse(data.Items)
  } catch (error) {
    return sendError(500, error.message)
  }

  };
  