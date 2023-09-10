# Recipe Books

Recipe Books is a web application that allows users to store cooking recipes. Users can add new recipes, view a list of existing recipes, update recipe details, and delete recipes if needed.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Postman Documentation](#postman-documentation)
- [Dependencies](#dependencies)

## Installation

To install and run this project, you need to have Node.js and npm installed on your machine. You also need to have a PostgreSQL database set up and configured.

1. Clone this repository to your local machine.
2. Navigate to the project folder and run `npm install` to install all the required dependencies.
3. Open the `knexfile.js` file in the root folder and modify the `connection` object with your PostgreSQL database information, such as host, user, password, and database name.
4. Run `npx knex migrate:latest` to create the tables in your database.
5. Run `npx knex seed:run` to insert some sample data in your tables.
6. Run `npm start` to start the server.

## Usage

Once the server is running, you can access the web application at http://localhost:7000/api/v1/cook-book/recipes.

You can use the following features:

- To add a new recipe, click on the "Create Recipe" button and fill in the form with the recipe name, ingredients, instructions, caption and category.
- A list of existing recipes, will be displayed in the page. You can see the recipe name, image, and caption for each recipe.
- To view or update the details of a specific recipe, click on the "View & Edit" button. You can see the recipe name, ingredients, instructions, and caption. You can also modify the form with the new information.
- To delete a recipe, click on the "Delete" button on the recipe detail page and confirm your action.

## Postman Documentation

If you want to test the API endpoints of this project using Postman, you can find the documentation here: [Recipe Books API Documentation](https://documenter.getpostman.com/view/28570357/2s9YC1WuWm)

## Dependencies

This project uses the following dependencies:

- [Express](https://expressjs.com/): a web framework for Node.js
- [Knex](https://knexjs.org/): a SQL query builder for Node.js
