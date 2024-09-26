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
  
  // function validateInputs(body) {
  //   const errors = []

  //   if (!body.username || !validator.isLength(body.username, {min: 3, max: 20}) || !validator.isAlphanumeric(body.username, 'en-US', {ignore: '_'})) {
  //     errors.push("Username must be 3-20 characters long and can only contain letters, numbers, and underscores")
  //   }

  //   if (!body.text || !validator.isLength(body.text, {min:1, max: 500})) {
  //     errors.push("Text must be between 1 and 500 characters")
  //   }

  //   return errors
  // }