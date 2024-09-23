const {sendResponse, sendError} = require('../../responses/handler')
const {db} = require('../../services/db') 

exports.hello = async (event) => {

  try {
    const username = event.pathParameters.user;
    console.log(username);
    
    const checkParams = {
      TableName: 'NoteManager',
      FilterExpression: "username = :username",
      ExpressionAttributeValues: {
        ":username": username
      }
    }

    const userNotes = await db.scan(checkParams)

    if (!userNotes) {
      return sendError(404, "User not found")
    } 
   
    return sendResponse(userNotes.Items)
    
    

  } catch (error) {
    return sendError(500, error.message)
  }

  };
