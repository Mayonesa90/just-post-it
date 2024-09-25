const {sendResponse, sendError} = require('../../responses/handler')
const {db} = require('../../services/db') 

exports.hello = async (event) => {

    const {id} = event.pathParameters;
    
    try {
        const data = await db.scan({
        TableName: 'NotesManager',
        FilterExpression: "id = :id",
        ExpressionAttributeValues: {
            ":id": id
        }
        });

        if (data.Items.length === 0) {
        return sendError(404, "Can't find any note with that id")
        }
        
        return sendResponse(data.Items)

  } catch (error) {
        return sendError(500, error.message)
  }

  };
  