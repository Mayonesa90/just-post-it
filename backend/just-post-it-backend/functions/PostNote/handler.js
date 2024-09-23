const {sendResponse, sendError} = require('../../responses/handler')
const {db} = require('../../services/db') 
const {v4: uuidv4} = require('uuid')

exports.hello = async (event) => {

  try {
    const body = JSON.parse(event.body)
    const id = uuidv4()
    const date = new Date().toISOString().split('T')[0];
    const data = await db.put({
      TableName: 'NoteManager',
      Item: {
        id: id,
        username: body.username,
        text: body.text,
        createdAt: date
      }
    })
    return sendResponse({message: "Posted!"})
  } catch (error) {
    return sendError(500, error.message)
  }
  };
  