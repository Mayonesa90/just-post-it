# Just Post It - Individual examination - Backend


## Description

Just Post It (backend) is the server that provides the frontend with the required API-endpoints that connects with the DynamoDB-database. 

The **Serverless Framework** is used to simplify the deployment and management of the backend services. **AWS API Gateway** handles the HTTP requests and routes them to **AWS Lambda functions**, which perform the logic and interact with the **DynamoDB database**. 

## Table of Contents

1. [API Endpoints](#api-endpoints)
2. [Installation and Running the Project](#installation-and-running-the-project)
3. [Error Handling](#error-handling)
4. [Instructions](#instructions)
5. [Security and Data Validation](#security-and-data-validation)

## API Endpoints

### Endpoints

| Method | Endpoint | Description | 
| ------ | -------- | ----------- | 
| GET    | /notes | Get all notes |
| GET    | /notes/:id | Get a note | 
| GET    | /notes/users | Get users | 
| GET    | /notes/users/:user | Get specific user | 
| POST   | /notes | Post a note | 
| PUT    | /notes/:id | Update a note | 
| DELETE | /notes/:id | Delete a note | 


## Installation and Running the Project

Follow these steps to create a local copy and run the project:

1. **Clone the repository**:
   ```bash
   git clone git@github.com:Mayonesa90/just-post-it.git

2. Navigate to the project directory:
   ```bash
   cd just-post-it/backend/just-post-it-backend

3. Install dependencies:
   ```bash
   npm install

4. Change the yml-file so that it connects to your AWS development service:
   ```bash
   org: *name-of-your-org*

5. In order to deploy the project you need to open the terminal and enter the following command:
   ```bash
   sls deploy

5. After deployment you should se similar endpoints
```bash
  GET - https://XXXXXXXXXX.execute-api.eu-north-1.amazonaws.com/notes
  POST - https://XXXXXXXXXX.execute-api.eu-north-1.amazonaws.com/notes/add-note
  GET - https://XXXXXXXXXX.execute-api.eu-north-1.amazonaws.com/notes/{id}
  PUT - https://XXXXXXXXXX.execute-api.eu-north-1.amazonaws.com/notes/{id}
  DELETE - https://XXXXXXXXXX.execute-api.eu-north-1.amazonaws.com/notes/{id}
  GET - https://XXXXXXXXXX.execute-api.eu-north-1.amazonaws.com/notes/users/{user}
  GET - https://XXXXXXXXXX.execute-api.eu-north-1.amazonaws.com/notes/users
functions:
  GetNotes: just-post-it-backend-dev-GetNotes (4.8 MB)
  PostNote: just-post-it-backend-dev-PostNote (4.8 MB)
  GetNote: just-post-it-backend-dev-GetNote (4.8 MB)
  PutNote: just-post-it-backend-dev-PutNote (4.8 MB)
  Delete: just-post-it-backend-dev-Delete (4.8 MB)
  GetUserNotes: just-post-it-backend-dev-GetUserNotes (4.8 MB)
  GetUsers: just-post-it-backend-dev-GetUsers (4.8 MB)
```

## Error handling

Common errors and their handling mechanisms are as follows:

- **400 Bad Request:** Invalid input format or missing parameters.
- **404 Not Found:** Requested resource does not exist.
- **500 Internal Server Error:** General server error.

## Instructions
### Get all notes
```http
GET /notes
```

  Response:
   ```json
   {
	"data": [
		{
			"createdAt": "2024-09-27 08:28:49",
			"text": "WHAAAAA",
			"username": "ScoobyDoo",
			"id": "60fcf2d6-c292-4f8e-a2a9-f898e6f357ce"
		},
		{
			"createdAt": "2024-09-27 08:28:28",
			"text": "THEYRE EATING THE DOGS",
			"username": "Trump",
			"id": "8146d137-ab34-4dc5-8fc9-ab1033bcac48"
		}
	]
  }
   ```

  #### Error handling
  **404 Not Found**: No notes in database
  Response:
  ```json
      {
        "errorMessage": "Nothing here yet.."
      }
  ```

  ### Get a specific note with dynamic url
  ```http
  GET /notes/:id
  ```

  Response:
   ```json
   {
	"data": [
		{
			"createdAt": "2024-09-27 09:33:18",
			"text": "THEYRE EATING THE DOGS",
			"username": "Trump",
			"id": "d4a415c5-91e0-4528-b060-5a2acac97d76"
		}
	]
}
   ```

  #### Error handling
  **404 Not Found**: No note with that id
  Response:
  ```json
{
	"errorMessage": "Can't find any note with that id"
}
  ```

  ### Get a specific user with dynamic url
```http
GET /notes/:user
```

  Response:
   ```json
   {
	"data": [
		{
			"createdAt": "2024-09-27 09:37:43",
			"text": "THEYRE EATING THE CATS",
			"username": "Trump",
			"id": "2fc46b97-a475-4c85-9f36-35b72983491b"
		},
		{
			"createdAt": "2024-09-27 09:36:53",
			"text": "THEYRE EATING THE DOGS",
			"username": "Trump",
			"id": "fe8ace1e-de5c-456e-a12d-3a49f64eb116"
		}
	]
}
   ```

  #### Error handling
  **404 Not Found**: No user with that id
  Response:
  ```json
{
	"errorMessage": "User not found"
}
  ```

  ### Get all users
  ```http
  GET /notes/users
  ```

  Response:
  ```json
   {
	"data": [
		"Trump",
		"ScoobyDoo"
	]
  }
  ```

  #### Error handling
  **404 Not found**: No users in database
  Response:
  ```json
    {
      "errorMessage": "No users found"
    }
  ```

  ### Posting a note 
  ```http
  POST /notes
  ```

  Request syntax:
  ```json
    {
      "username": "ScoobyDoo",
      "text": "WHAAAAA"
    }
   ```

  Response:
   ```json
  {
	"data": {
		"message": "Posted!"
	}
  }
   ```


   #### Error handling
   **400 Bad request**: Username too short
   Request syntax:
  ```json
    {
      "username": "Sc",
      "text": "WHAAAAA"
    }
  ```

   Response:
   ```json
   {
    "errorMessage": [
      "Username must be 3-20 characters long and can only contain letters, numbers, and underscores"
    ]
  }
  ```
 **400 Bad request**: No text
  Request syntax:
  ```json
  {
	"username": "ScoobyDoo",
	"text": ""
  }
   ```
   
   Response:
   ```json
   {
    "errorMessage": [
    "Text must be between 1 and 500 characters"
    ]
  }
  ```


### Updating a note
```http
PUT /notes/:id
```

Request syntax:
   ```json
   {
	"username": "Trump",
	"text": "Kamala is not black she's indian"
}
   ```

Response if changes were successful:
   ```json
{
	"data": {
		"message": "Updated!"
	}
}
```
### Error handling
See error handling for input malfunctions under #posting-a-note

   **404 Not found**: If id does not exists in database
   ```json
{
	"errorMessage": "Note not found"
}
   ```
  

### Delete note:
```http
DELETE /note/:id
```

Response:
   ```json
{
	"data": {
		"message": "Note deleted!"
	}
}
   ```

### Error handling
**404 Bad request**: if id is not in database
   ```json
{
	"errorMessage": "Note not found"
}
   ```

## Security and Data Validation

To ensure the integrity and security of the data being stored, the server implements several validation and sanitization mechanisms using the validator package. These mechanisms prevent harmful data from being submitted to the database and ensure that the input conforms to expected formats.

### Input Validation

When users submit data (e.g., notes or usernames), the server runs a validation function before the data is processed or stored in the database. The following validation rules are enforced:

- Username Validation: The username must be between 3 and 20 characters long and can only contain letters, numbers, and underscores.
- Text Validation: The note text must be between 1 and 500 characters long.

If the input fails validation, the request will be rejected with an appropriate error message, and the data will not be processed.

### Input Sanitization

To protect the system from harmful characters (such as those used in SQL injection, XSS, etc.), the server uses validator to escape any potentially dangerous content before it is posted to the database. Specifically:

- Escaping Dangerous Characters: Any special characters that could be used for malicious purposes are sanitized to prevent attacks.
For example, if the input contains special HTML characters such as <, >, &, they will be safely encoded.

### Unescaping for Output

When retrieving data from the database, the server applies a function to unescape the sanitized characters, ensuring that the content is displayed in its original form without exposing the system to vulnerabilities. This allows users to view their data exactly as they entered it, without introducing any risks.

By implementing these validation and sanitization mechanisms, we ensure that the data being stored is both secure and reliable while preventing common web vulnerabilities.