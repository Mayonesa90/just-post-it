# Just Post It - Individual Examination - Frontend


## Description

Just Post It is an application where you can post and edit notes, it's a single-page application (SPA) built with React/Vite and styled with Tailwind CSS. It is deployed on AWS in an S3 bucket and accessible via a URL.

## Functional information
- You can **post** a new message
- You can **edit** any posted message
- You can **view all** messages
- Messages can be **sorted** by **date** OR **user**

## Table of Contents

1. [Instructions](#instructions)
2. [React Hooks](#react-hooks)
3. [Installation and Running the Project](#installation-and-running-the-project)
4. [Error Handling](#error-handling)
5. [Live Demo](#live-demo)

## Instructions

- **Landing Page:** The entry point of the application where you initially see all notes sorted by date but you can switch to sort them by user
- **Add note Page:** Here you can add a new note if you provide a username with at least three characters and a text
- **Edit note Page:** If you click the edit button on a note from the Landing Page you go to the edit page where you can make edits to the selected note

## React Hooks
- **useEffect** is used synchronous operation (fetching data from the API) when the component mounts. It runs the fetch operation once, preventing unnecessary re-fetching and ensures the state is updated with the fetched data. It is used for fetching all the notes, the users notes and a single note when editing.
- **useState** is used to manage different states like Success- and Error-messages and the text they should contain, placeholders, notes and form data.

## Installation and Running the Project

Follow these steps to create a local copy and run the project:

1. **Clone the repository**:
   ```bash
   git clone git@github.com:Mayonesa90/just-post-it.git

2. Navigate to the project directory:
   ```bash
   cd just-post-it

3. Install dependencies:
   ```bash
   npm install

4. Start the development server:
   ```bash
   npm run dev

## Error handling

Most error handling is handled from the backend. The frontend gets the error messages from the backend (mostly) and is displayed to the user via the frontend.


## Live Demo
http://just-post-it.s3-website.eu-north-1.amazonaws.com