const { ExpressionType } = require('@aws-sdk/client-s3');
const {sendResponse, sendError} = require('../../responses/handler')
const {db} = require('../../services/db') 
const validator = require('validator')

exports.hello = async (event) => {

  try {

    const data = await db.scan({
      TableName: 'NotesManager',
    });

    if (data.Items.length === 0) {
      return sendError(404, "Nothing here yet..")
    }
    console.log(data.Items);
    
    //Unescape the escaped characters before returning the response
    const unescapedData = data.Items.map((item) => ({
      ...item,
      username: validator.unescape(item.username),
      text: validator.unescape(item.text),
    }));

    console.log('unescaped:', unescapedData);
    
    const sortedData = unescapedData.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;  
    })

    console.log('sortedData', sortedData);
    

    return sendResponse(sortedData)
  } catch (error) {
    return sendError(500, error.message)
  }

  };
  