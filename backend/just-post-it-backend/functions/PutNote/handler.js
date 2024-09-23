const {sendResponse, sendError} = require('../../responses/handler')
const {db} = require('../../services/db') 

exports.hello = async (event) => {

  const id = event.pathParameters.id;
  const body = JSON.parse(event.body);
  
  const checkParams = {
    TableName: 'NoteManager',
    Key: {
      id: id
    }
  }

  const prevNote = await db.get(checkParams)
  const username = prevNote.Item.username
  const createdAt = prevNote.Item.createdAt
  const date = new Date().toISOString().split('T')[0];

  if (!prevNote.Item) {
    return sendError(404, "Note not found")
  } else {
    const data = await db.put({
      TableName: 'NoteManager',
      Item: {
        id: id,
        username: username,
        text: body.text,
        createdAt: createdAt,
        updatedAt: date
      }
    })

    return sendResponse({message: "Updated!"})}

  };
