# Express-and-Server-Application
# Data Management App

## Overview
This is a simple data management application built using Node.js, Express.js, and EJS (Embedded JavaScript) as the template engine. The application allows users to perform CRUD (Create, Read, Update, Delete) operations on users, posts, and comments.

## Features
- **Fetch Data**: Users can fetch users, posts, comments, and comments for a specific post from the server.
- **Filter Data**: Users can filter posts by title and comments by content using query parameters.
- **Create Data**: Users can create new users, posts, and comments via forms.
- **Update Data**: Users can update a user's name via a form.
- **Delete Data**: Users can delete a user via a form.
- **View Rendering**: The server renders a view using EJS to display dynamic content to the client.

## Installation
1. Clone the repository: `git clone <repository_url>`
2. Install dependencies: `npm install`
3. Start the server: `node server.js`

## Usage
1. Navigate to `http://localhost:3000` in your web browser.
2. Use the provided buttons and forms to interact with the application:
   - Fetch data: Click on the buttons to fetch users, posts, comments, or comments for a specific post.
   - Filter data: Enter search criteria in the input fields and click on the filter buttons to filter posts by title or comments by content.
   - Create data: Fill out the forms to create new users, posts, or comments.
   - Update data: Enter the user ID and new name in the update user form to update a user's name.
   - Delete data: Enter the user ID in the delete user form to delete a user.

## Dependencies
- Express.js: Web application framework for Node.js
- EJS: Embedded JavaScript templating engine
- Body-parser: Middleware for handling JSON bodies
