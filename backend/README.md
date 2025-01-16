# Task Manager Application - Backend

## Overview
This is the backend for the Task Manager application, built using GoLang. It follows clean architecture principles and provides a RESTful API for managing tasks.

## Project Structure
- **cmd/**: Contains the entry point of the application.
- **internal/**: Contains the core business logic.
  - **tasks/**: Contains the task management domain.
    - **application/**: Contains application services for task management.
    - **domain/**: Contains the task entity and related business logic.
    - **infrastructure/**: Contains the implementation details for data storage.
- **go.mod**: Go module definition file.
- **go.sum**: Dependency checksums for consistent builds.

## Setup Instructions

### Prerequisites
- Go 1.23 or higher
- PostgreSQL database

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd task-manager-app/backend
   ```

2. Install dependencies:
   ```
   go mod tidy
   ```

3. Set up the PostgreSQL database:
   - Create a database named `tasks`.
   - Update the database connection string in `cmd/main.go` if necessary.

### Running the Application
To run the application, execute the following command:
```
go run cmd/main.go
```
The application will start on `http://localhost:8080`.

### API Endpoints
- `GET /tasks`: Retrieve all tasks.
- `POST /tasks`: Create a new task.

## Testing
To run tests, use the following command:
```
go test ./...
```

## CI/CD
This project includes a CI/CD pipeline configured with Jenkins and Kubernetes. Refer to the `ci-cd/README.md` for detailed instructions on setting up the pipeline and deploying the application.

## License
This project is licensed under the MIT License. See the LICENSE file for details.