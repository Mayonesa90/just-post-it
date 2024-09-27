const {sendResponse, sendError} = require('../../responses/handler')
const {db} = require('../../services/db') 
const validator = require('validator')

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
        
        console.log(data.Items[0].text);
        
        //Unescape the escaped characters before returning the response
    const unescapedData = {
        ...data.Items[0],
        username: validator.unescape(data.Items[0].username),
        text: validator.unescape(data.Items[0].text),
      };
      console.log('unescapedData', unescapedData);
      console.log('data.Items[0]', data.Items[0]);
      
    //   return sendResponse(data.Items)

  
      return sendResponse(unescapedData);
  } catch (error) {
        return sendError(500, error.message)
  }

  };
  