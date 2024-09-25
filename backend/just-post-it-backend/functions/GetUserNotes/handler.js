const {sendResponse, sendError} = require('../../responses/handler')
const {db} = require('../../services/db') 

exports.hello = async (event) => {

  try {
    const username = event.pathParameters.user;
    
    const checkParams = {
      TableName: 'NotesManager',
      FilterExpression: "username = :username",
      ExpressionAttributeValues: {
        ":username": username
      }
    }

    const userNotes = await db.scan(checkParams)
    
    if (userNotes.Items.length === 0 ) {
      return sendError(404, "User not found")
    } 
    const sortedData = userNotes.Items.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;  
    })

    return sendResponse(sortedData)

  } catch (error) {
    return sendError(500, error.message)
  }

  };
