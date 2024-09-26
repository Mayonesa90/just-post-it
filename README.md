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

## Table of Contents

1. [API Endpoints](#api-endpoints)
2. [Installation and Running the Project](#installation-and-running-the-project)
3. [Error Handling](#error-handling)
4. [Instructions](#instructions)

## API Endpoints

### Public Endpoints

| Method | Endpoint | Description | 
| ------ | -------- | ----------- | 
| GET    | /notes   | Get all notes | 
| POST   | /notes/add-note | Add note | 
| GET    | /notes/:id   | Get note with id | 
| PUT    | /notes/:id   | Edit note with id | 
| DELETE | /notes/:id   | Delete note with id | 
| GET    | /notes/users/:user | Get all notes from user with id | 
| GET    | /notes/users  | Get all users | 


## Installation and Running the Project

Follow these steps to create a local copy and run the project:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Mayonesa90/Airbean-Individuell-examination.git

2. Navigate to the project directory:
   ```bash
   cd Airbean-Individuell-examination

3. Install dependencies:
   ```bash
   npm install

4. Start the development server:
   ```bash
   nodemon server.js



## Error handling

Common errors and their handling mechanisms are as follows:

- **400 Bad Request:** Invalid input format or missing parameters.
- **401 Unauthorized:** Invalid or missing authentication token.
- **403 Forbidden:** Insufficient privileges to access the resource.
- **404 Not Found:** Requested resource does not exist.
- **500 Internal Server Error:** General server error.

## Instructions
### About
   ```http
   GET /about
   ```
Response:
   ```
   Company: Airbean Coffee

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Coffee Production:

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
   ```


### Viewing the menu 
   ```http
   GET /order
   ```
 Response:
   ```
[
	{
		"itemId": "ebe43b87-6e1e-4d4e-ade6-59775fffd1f4",
		"title": "Bryggkaffe",
		"desc": "Bryggd på månadens bönor.",
		"price": 39,
		"createdAt": "2024-06-12 11:15:55",
		"_id": "17riXwRrm0X8i2JX"
	},
	{
		"itemId": "8fc394f3-f77c-41f6-9729-a41c738904d2",
		"title": "Cortado",
		"desc": "Bryggd på månadens bönor.",
		"price": 39,
		"createdAt": "2024-06-12 11:17:12",
		"_id": "3mgdjOvrwRv1NB65"
	},
	{
		"itemId": "3edc7d79-272d-4634-9a70-c443d884cf59",
		"title": "Cappuccino",
		"desc": "Bryggd på månadens bönor.",
		"price": 49,
		"createdAt": "2024-06-12 11:16:40",
		"_id": "QuMa7T5k1zBdtSPY"
	},
	{
		"itemId": "57dc10d2-825f-4459-8e67-82f8afefd3cd",
		"title": "Caffè Doppio",
		"desc": "Bryggd på månadens bönor.",
		"price": 49,
		"createdAt": "2024-06-12 11:16:33",
		"_id": "SVYrI2Z0sk9qlb0k"
	},
	{
		"itemId": "c6da1417-ed2f-4d18-804b-663369f68230",
		"title": "Latte Macchiato",
		"desc": "Bryggd på månadens bönor.",
		"price": 49,
		"createdAt": "2024-06-12 11:16:47",
		"_id": "V11mbtL34TIckABf"
	},
	{
		"itemId": "a60b8fbb-3f1b-45ca-b67d-2d66c8d59b98",
		"title": "Kaffe Latte",
		"desc": "Bryggd på månadens bönor.",
		"price": 54,
		"createdAt": "2024-06-12 11:17:02",
		"_id": "mqhyexrnHJ9AQXgS"
	},
	{
		"itemId": "f7c602c7-0e35-4769-a559-3c9fa24bbff1",
		"title": "Cortado",
		"desc": "Bryggd på månadens bönor.",
		"price": 39,
		"createdAt": "2024-06-12 14:36:59",
		"_id": "pK6rWtmhamtxldO7"
	}
]
   ```

## Cart
### Add item to cart
Instructions: Here you need the `itemId`from the menu and use it in the request
   ```http
   POST /cart
   ```
Request syntax:
   ```
   {
     "id": "3edc7d79-272d-4634-9a70-c443d884cf59"
   }
   ```

Response if item exists in menu:
   ```
   Cappucino (49 kr) was successfully added to cart
   ```
**404 Not found** Error handling: if item does not exists in menu:
   ```
   The requested product could not be found
   ```

### View cart:
   ```http
   GET /cart
   ```

Response if something is in cart:
   ```
   Cart:
   - 2024-06-13: Cappuccino, 49 kr
   - 2024-06-14: Bryggkaffe, 39 kr
   Total: 88kr
   ```

Error handling: **404 Not found**
   ```
   Cart is empty :/
   ```

### Delete item from cart
To delete an item from the cart you need to enter the itemId as path parameter
   ```http
   DEL /cart/:id
   ```

Response if item exists in cart:
   ```
   {
	"message": "Item with id: 3edc7d79-272d-4634-9a70-c443d884cf59 successfully deleted from cart"
   }
   ```

Error handling: **404 Not found**
   ```
   {
	"message": "Item not found in cart"
   }
   ```

## Order
### Place an order
   ```http
   POST /order
   ```

Response if items exist in cart:
   ```
   {
	"userId": "guest",
	"items": [
		{
			"userId": "guest",
			"productId": "ebe43b87-6e1e-4d4e-ade6-59775fffd1f4",
			"title": "Bryggkaffe",
			"price": 39,
			"date": "2024-06-14",
			"_id": "6Fq5Tpm8FVlXNlMu"
		}
	],
	"total": 39,
	"orderDate": "2024-06-14 11:38:53",
	"estimatedDeliveryTime": "2024-06-14T10:08:53.003Z",
	"orderId": "5a2fc9be-0bf5-45c5-abdf-d508bf8caf72"
   }
   ```

Error handling: **404 Not found**
   ```
   Cart is empty
   ```

## See order confirmation
   ```http
   GET /order/:orderid
   ```

Response if orderId is correct:
   ```
   Order confirmation

   Bryggkaffe 39 kr
   Bryggkaffe 39 kr
   Total: 78 kr

   Estimated delivery time: Fri Jun 14 2024 12:12:32 GMT+0200 (centraleuropeisk sommartid)
   Orderid: 700a3ea4-ef09-42c7-a58a-da15a06ebe3e
   ```

Error handling: **404 Not found**:
   ```
   Order not found
   ```

## User account
## Create account
   ```http
   POST /account/register
   ```

Request syntax:
   ```
   {
	   "username": "Ivy",
	   "password": "Poison"
   }
   ```

Respose if username and password input is valid:
   ```
   {
	"userId": "75cb8f18-0c45-4785-a513-7ae720c69cf4"
   }
   ```

Error handling: **400 Bad request**
   ```
   {
	   "error": "Invalid username" || "Invalid password"
   }
   ```

## Login
   ```http
   POST /account/login
   ```

Request syntax:
   ```
   {
	   "username": "Ivy",
	   "password": "Poison"
   }
   ```

Response if username and password is correct:
   ```
   User Ivy was successfully logged in. Login status is: true
   ```

Error handling: **401 Unauthorized** 
   ```
   Username or password was incorrect
   ```

## Get login status
   ```http
   GET /account/status
   ```

Response:
   ```
   Login status is: true || false
   ```

## Orderhistory - only accessible when logged in
   ```http
   GET /account/order/orders
   ```

Response if there are registered orders on user:
   ```
   [
	{
		"orderId": "586d27c6-66fb-47c1-a43f-f16efca0a5d4",
		"orderDate": "2024-06-13 14:32:54",
		"total": 147,
		"items": [
			{
				"title": "Caffè Doppio",
				"price": 49
			},
			{
				"title": "Caffè Doppio",
				"price": 49
			},
			{
				"title": "Caffè Doppio",
				"price": 49
			}
		]
	}
   ]
   ```

Error handling: **404 Not found**
   ```
   Orders not found
   ```
## Get account details
   ```http
   GET /account/users/account-details
   ```

Response if user is logged in:
   ```
   {
	"userId": "cc368198-8a3f-42ce-9b2e-ba8187b310f6",
	"username": "Pika",
	"password": "Chu",
	"_id": "Dp0mFRwrtEd3DtcA"
   }
   ```

## Logout and clear cart
   ```http
   POST /account/logout
   ```

Response if successful:
   ```
   User was successfully logged out and cart cleared. Login status is: false, Items removed from cart: 0
   ```

## Error handling when unauthorized
**401 Unauthorized**
   ```
   You need to log in first
   ```

## Admin account
## Create admin account
   ```http
   POST /admin/register
   ```

Request syntax:
   ```
   {
	   "username": "Bat",
	   "password": "Woman"
   }
   ```

Response if username and password is valid:
   ```
   {
	"userId": "427db4fe-a3c0-44e8-a335-641098b76eeb"
   }
   ```

Error handling: **400 Bad request**
   ```
   {
	"error": "Invalid username" || "Invalid password"
   }
   ```

## Admin login
   ```
   POST /admin/login
   ```

Request syntax:
   ```
   {
	   "username": "Bat",
	   "password": "Woman"
   }
   ```

Response if username and password is correct:
   ```
   Admin login: Bat was successfully logged in.
   ```

Error handling **401 Unauthorized**
   ```
   Username or password was incorrect
   ```

## Admin login status
   ```http
   GET /admin/status
   ```

Response if admin is logged in:
   ```
   Login status is: true
   ```

## Admin logout
   ```http
   POST /admin/logout
   ```

Response if successfull:
   ```
   Admin was successfully logged out. Login status is: false.
   ```

## Add item to menu
   ```http
   POST /admin/create-item
   ```

Request syntax:
   ```
   {
	   "title": "Mojito",
	   "desc": "Mynta och romdrink",
	   "price": 109
   }
   ```

Response if title, desc and price are valid:
   ```
   {
	   "itemId": "3b33c3e4-ca40-40e9-bf88-e674af26728c"
   }
   ```

Error handling: **400 Bad Request**
   ```
   {
	   "error": "Invalid or missing title" || "Invalid or missing desc" || "Invalid or missing price"
   }
   ```

## Get item in menu
Add the itemId as path parameter
   ```http
   GET /admin/:itemId
   ```

Response if itemId is valid:
   ```
   {
	"itemId": "f7c602c7-0e35-4769-a559-3c9fa24bbff1",
	"title": "Cortado",
	"desc": "Bryggd på månadens bönor.",
	"price": 39,
	"createdAt": "2024-06-12 14:36:59",
	"_id": "pK6rWtmhamtxldO7"
   }
   ```

Error handling: **404 Not Found**
   ```
   {
	"error": "Item not found"
   }
   ```

## Delete item from menu
Add the itemId as path parameter
   ```http
   DELETE /admin/:itemId
   ```

Response if itemId is valid:
   ```
   "Number of items removed: 1. Item with id 3b33c3e4-ca40-40e9-bf88-e674af26728c successfully deleted"
   ```

Error handling: **404 Not Found**
   ```
   {
	"error": "Item not found"
   }
   ```

## Edit item in menu
Add the itemId as path parameter
   ```http
   PUT /admin/:itemId
   ```

Request syntax (here you only add the field/fields of what you want to change):
   ```
   {
	   "desc": "Coffee beans from Colombias finest producers",
   }
   ```

Response if itemId is correct and input is valid:
   ```
   {
	"itemId": "f7c602c7-0e35-4769-a559-3c9fa24bbff1",
	"title": "Cortado",
	"desc": "Coffee beans from Colombias finest producers",
	"price": 39,
	"createdAt": "2024-06-12 14:36:59",
	"_id": "pK6rWtmhamtxldO7",
	"modifiedAt": "2024-06-14 12:43:17"
   }
   ```

Error handling if itemId is wrong: **404 Not Found**
   ```
   {
	"error": "Item not found"
   }
   ```

Error handling when input is not valid:
   ```
   {
	   "error": "Invalid or missing title" || "Invalid or missing desc" || "Invalid or missing price"
   }
   ```

## Create offers
   ```http
   POST /admin/special-offers
   ```

Request syntax:
   ```
   {
	   "item1": "3edc7d79-272d-4634-9a70-c443d884cf59",
	   "item2": "3edc7d79-272d-4634-9a70-c443d884cf59"
   }
   ```

Response if both items exists in menu:
   ```
   {
	"offerId": "3191e7ca-9463-4faf-a950-48187909b1ef",
	"item1": {
		"itemId": "3edc7d79-272d-4634-9a70-c443d884cf59",
		"title": "Cappuccino",
		"desc": "Bryggd på månadens bönor.",
		"price": 49,
		"createdAt": "2024-06-12 11:16:40",
		"_id": "QuMa7T5k1zBdtSPY"
	},
	"item2": {
		"itemId": "3edc7d79-272d-4634-9a70-c443d884cf59",
		"title": "Cappuccino",
		"desc": "Bryggd på månadens bönor.",
		"price": 49,
		"createdAt": "2024-06-12 11:16:40",
		"_id": "QuMa7T5k1zBdtSPY"
	},
	"priceForBoth": 78.4,
	"discount": 19.6,
	"createdAt": "2024-06-12 14:44:58",
	  "_id": "ksELIkXMXVVBPMrc"
   }
   ```

Error handling if items do not exist i menu:
   ```
   {
	"error": "Item1 not found" || "Item2 not found"
   }
   ```

## Error handling when unauthorized
**401 Unauthorized**
   ```
   You need to log in as admin first
   ```



