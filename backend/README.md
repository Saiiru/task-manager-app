# Task Manager Application - Backend

## Description

The backend for the Task Manager application is built using GoLang and follows clean architecture principles. It provides both RESTful and GraphQL APIs for managing tasks efficiently. This project was developed with the motivation to create a robust and scalable task management system. The primary problem it solves is the organization and management of tasks in a structured manner. Through this project, I learned about clean architecture implementation in GoLang, handling RESTful APIs, and integrating GraphQL.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Credits](#credits)
- [License](#license)
- [Badges](#badges)
- [Features](#features)
- [How to Contribute](#how-to-contribute)
- [Tests](#tests)

## Installation

Follow these steps to install the project:

1. Clone the repository:

   ```bash
   git clone https://github.com/Saiiru/task-manager-app.git
   cd task-manager-app/backend
   ```

2. Install dependencies:

   ```bash
   go mod tidy
   ```

3. Set up the PostgreSQL database:
   - Create a database named `tasks`.
   - Update the database connection string in `cmd/main.go` if necessary.

## Usage

To run the application, execute the following command:

```bash
go run cmd/main.go
```

The application will start on [http://localhost:8080](http://localhost:8080).

## API Endpoints

### RESTful API

- `GET /tasks`: Retrieve all tasks.
- `POST /tasks`: Create a new task.

### GraphQL API

- `POST /query`: Execute GraphQL queries and mutations.

Example GraphQL query to retrieve tasks:

```graphql
query {
  tasks(filter: { search: "", page: 1, limit: 10 }) {
    edges {
      node {
        id
        title
        description
        isCompleted
        userId
        createdAt
        updatedAt
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      totalCount
    }
  }
}
```

## Credits

This project was developed by [Saiiru](https://github.com/Saiiru). Contributions and collaborations are welcome.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Badges

![Go](https://img.shields.io/github/go-mod/go-version/Saiiru/task-manager-app)
![License](https://img.shields.io/github/license/Saiiru/task-manager-app)

## Features

- Clean architecture implementation.
- RESTful and GraphQL APIs for task management.
- PostgreSQL database integration.

## How to Contribute

Contributions are welcome! Please follow the [Contributor Covenant](https://www.contributor-covenant.org/) for guidelines on how to contribute.

## Tests

To run tests, use the following command:

```bash
go test ./...
```

Feel free to fork and contribute to this project. Your contributions will help improve the project and make it more robust.
