const {sendResponse, sendError} = require('../../responses/handler')
const {db} = require('../../services/db') 

exports.hello = async (event) => {

  try {
    
    const checkParams = {
      TableName: 'NoteManager',
    }

    const data = await db.scan(checkParams)
    
    if (data.Items.length === 0 ) {
      return sendError(404, "No users found")
    } 

    const users = [...new Set(data.Items.map((user) => user.username))];

  return sendResponse(users)

  } catch (error) {
    return sendError(500, error.message)
  }

  };
