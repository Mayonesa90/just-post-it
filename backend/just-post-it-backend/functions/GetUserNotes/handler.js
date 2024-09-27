const {sendResponse, sendError} = require('../../responses/handler')
const {db} = require('../../services/db') 
const validator = require('validator')

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

    //Unescape the escaped characters before returning the response
    const unescapedData = userNotes.Items.map((item) => ({
      ...item,
      username: validator.unescape(item.username),
      text: validator.unescape(item.text),
    }));

    console.log('unescapedData', unescapedData);
    

    const sortedData = unescapedData.Items.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;  
    })

    return sendResponse(sortedData)

  } catch (error) {
    return sendError(500, error.message)
  }

  };
