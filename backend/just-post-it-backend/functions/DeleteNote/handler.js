const {sendResponse, sendError} = require('../../responses/handler')
const {db} = require('../../services/db') 

exports.hello = async (event) => {

  try {
    const id = event.pathParameters.id;
    
    const checkParams = {
      TableName: 'NoteManager',
      Key: {
        id: id
      }
    }

    const prevNote = await db.get(checkParams)

    if (!prevNote.Item) {
      return sendError(404, "Note not found")
    } else {
      await db.delete({
        TableName: 'NoteManager',
        Key: {
          id
        }
      })

    return sendResponse({message: "Note deleted!"})}
  } catch (error) {
    return sendError(500, error.message)
  }

  };
