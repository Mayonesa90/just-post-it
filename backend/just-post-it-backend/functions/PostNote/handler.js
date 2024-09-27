const {sendResponse, sendError} = require('../../responses/handler')
const {db} = require('../../services/db') 
const {v4: uuidv4} = require('uuid')
const validator = require('validator')
const {validateInputs} = require('../../helpers/validateInput')

exports.hello = async (event) => {

  try {
    const body = JSON.parse(event.body)

    //Validate input
    const validationErrors = validateInputs(body)
    if (validationErrors.length > 0) {
      return sendError(400, validationErrors)
    }
    console.log(validationErrors);
    

    //Generate unique id and timestamp
    const id = uuidv4() 
    const date = new Date().toISOString().replace('T', ' ').split('.')[0];

    //Post data to database
    const data = await db.put({
      TableName: 'NotesManager',
      Item: {
        id: id,
        username: validator.escape(body.username), //escapes potential harmful characters
        text: validator.escape(body.text),
        createdAt: date
      }
    })

    return sendResponse({message: "Posted!"})

  } catch (error) {
    console.log(error);
    
    return sendError(500, error.message)

  }
  };