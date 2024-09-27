# Just Post It - Individual examination - Backend


## Description

Just Post It (backend) is the server that provides the frontend with the required API-endpoints that connects with the DynamoDB-database. 

- **Serverless framework**
- **API Gateway**
- **AWS Lambda**
- **DynamoDB**

## Table of Contents

1. [API Endpoints](#api-endpoints)
2. [Installation and Running the Project](#installation-and-running-the-project)
3. [Error Handling](#error-handling)
4. [Instructions](#instructions)

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

  ### Error handling
  **404 Not Found**: No notes in database
  Response:
    ```json
    {
      "errorMessage": "Nothing here yet.."
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

  ### Error handling
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


   ### Error handling

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


### Changings a reservation
Instructions: Here you need the `bookingId`and use it in the parapath parameter:
   ```http
   PUT /bookings/:id
   ```
Request syntax:
   ```json
   {
  "guests": 1,
  "numOfSingleRooms": 1,
  "numOfDoubleRooms": 0,
  "numOfSuiteRooms": 0,
  "checkIn": "2024-09-13", //date cannot be after check-in 
  "checkOut": "2024-09-19"
  }
   ```

Response if changes were successful:
   ```json
{
	"data": {
		"message": "Booking updated successfully.",
		"updatedAttributes": {
			"checkIn": "2024-09-13",
			"numOfDoubleRooms": 0,
			"totalPrice": 1000,
			"guests": 1,
			"checkOut": "2024-09-15",
			"numOfSingleRooms": 1,
			"rooms": [
				"101"
			],
			"numOfSuiteRooms": 0
		}
	}
}
```
### Error handling

   **404 Not found** - If bookingId does not exists in bookings table:
   ```json
   {
	"errorMessage": "Booking not found."
}
   ```
   **400 Bad request** - Too many guests per room: 
   ```json
   {
	"errorMessage": "Number of guests exceeds the available number of beds."
   }
   ```
   **400 Bad request** - Missing fields: 
   ```json
   {
	"errorMessage": "Missing required fields in the request body."
   }
   ```
   **500 Bad request** - Insufficient rooms:
   ```json
   {
	"errorMessage": "Not enough available Suite rooms."
   }
   ```

### Delete reservation:
Instructions: Here you need the `bookingId`and use it in the parapath parameter:
   ```http
   DELETE /bookings/:id
   ```

Response if something is in cart:
   ```json
   {
  "message": "Booking successfully deleted!"
  }
   ```

### Error handling

**400 Bad request** - If todays date is less than two days before check-in
   ```json
   {
	"errorMessage": {
		"message": "Booking can only be cancelled up to 2 days before check-in date"
	}
   }
   ```

**404 Bad request** - If bookingId is incorrect
   ```json
{
	"errorMessage": {
		"message": "Booking not found"
	}
}
   ```

