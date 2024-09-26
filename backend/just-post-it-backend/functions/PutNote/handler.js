const {sendResponse, sendError} = require('../../responses/handler')
const {db} = require('../../services/db')
const validator = require('validator')
const {validateInputs} = require('../../helpers/validateInput')

exports.hello = async (event) => {

  try {
    const id = event.pathParameters.id;
    const body = JSON.parse(event.body);

    //Validate input
    const validationErrors = validateInputs(body)
    if (validationErrors.length > 0) {
      return sendError(400, validationErrors)
    }
    
    const checkParams = {
      TableName: 'NotesManager',
      Key: {
        id: id
      }
    }

    const prevNote = await db.get(checkParams)

    if (!prevNote.Item) {
      return sendError(404, "Note not found")
    } else {
      const username = prevNote.Item.username
      const createdAt = prevNote.Item.createdAt
      const date = new Date().toISOString().replace('T', ' ').split('.')[0];
      const data = await db.put({
        TableName: 'NotesManager',
        Item: {
          id: id,
          username: validator.escape(body.username),
          text: validator.escape(body.text),
          createdAt: createdAt,
          updatedAt: date
        }
      })

    return sendResponse({message: "Updated!"})}
  } catch (error) {
    return sendError(500, error.message)
  }

  };
