const validator = require('validator')

function validateInputs(body) {
    const errors = []

    if (!body.username || !validator.isLength(body.username, {min: 3, max: 20}) || !validator.isAlphanumeric(body.username, 'en-US', {ignore: '_'})) {
      errors.push("Username must be 3-20 characters long and can only contain letters, numbers, and underscores")
    }

    if (!body.text || !validator.isLength(body.text, {min:1, max: 500})) {
      errors.push("Text must be between 1 and 500 characters")
    }

    return errors
  }

  module.exports = { validateInputs };