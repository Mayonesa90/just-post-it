# Just Post It - Individual Examination


## Instructions

You are to build a simple message board where users can post messages. It should be possible to view all messages and post a new message by providing a username. See below for what a message should contain. You need to build both a frontend in React (other frameworks are also acceptable) and a serverless API in AWS. Your frontend should be “hosted” in an S3 bucket on AWS, and you should use your API for API requests.

## Functional Requirements
- It should be possible to **post a new message**
- It should be possible to **edit any posted message**, and it should not be possible to edit a message that doesn’t exist
- It should be possible to **view all messages**
- A message should have the following properties: i**d, username, text, createdAt**
- It should be possible to **sort all messages by date**
- It should be possible to **retrieve all messages from a specific user** (this should be done in the backend, meaning that through an endpoint, you send a username and receive all messages associated with that user)

## Technical Requirements
### Frontend
- Built using a framework
- Deployed on AWS in an S3 bucket and accessible via a URL

### Backend
- Serverless framework
- API Gateway
- Lambda
- DynamoDB

### Installation and more information
Check out the README-files in each directory ("frontend/just-post-it-frontend" and "backend/just-post-it-backend") for further instructions and information.
