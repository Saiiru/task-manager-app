# Project Overview

This task management application is designed to provide a full-stack solution for managing tasks. It consists of three main components: a backend built with Go, a frontend developed using React with Next.js and TypeScript, and a mobile application created with Flutter. The application follows clean architecture principles and implements CI/CD using Jenkins and Kubernetes.

## Architecture

- **Backend**: The backend is responsible for handling business logic and data persistence. It exposes a RESTful API for the frontend and mobile applications to interact with. The backend is structured into several packages:
  - `cmd`: Contains the entry point of the application.
  - `internal/tasks`: Contains the core functionality related to task management, including application logic, domain models, and infrastructure for data storage.

- **Frontend**: The frontend is a React application built with Next.js, providing server-side rendering and a seamless user experience. It interacts with the backend API to fetch and display tasks.
  - `pages`: Contains the main pages of the application, including the homepage and task list.
  - `components`: Contains reusable React components, such as the task list component.

- **Mobile**: The mobile application is built with Flutter, allowing users to manage tasks on their mobile devices. It provides a user-friendly interface for task management.

- **CI/CD**: The CI/CD setup uses Jenkins to automate the build, test, and deployment processes. Kubernetes is used for container orchestration, ensuring that the application is scalable and resilient.

## Getting Started

### Prerequisites

- Go (1.23.4 or later)
- Node.js (for the frontend)
- Flutter (for the mobile app)
- PostgreSQL (for the backend database)
- Jenkins (for CI/CD)
- Kubernetes (for deployment)

### Backend Setup

1. Navigate to the `backend` directory.
2. Run `go mod tidy` to install dependencies.
3. Set up the PostgreSQL database and update the connection string in `cmd/main.go`.
4. Run the backend application using `go run cmd/main.go`.

### Frontend Setup

1. Navigate to the `frontend` directory.
2. Run `npm install` to install dependencies.
3. Start the development server using `npm run dev`.

### Mobile Setup

1. Navigate to the `mobile` directory.
2. Run `flutter pub get` to install dependencies.
3. Launch the mobile application using `flutter run`.

### CI/CD Setup

1. Configure Jenkins with the provided `Jenkinsfile`.
2. Set up Kubernetes with the deployment and service configurations in the `ci-cd/kubernetes` directory.

## Usage

- Access the frontend application at `http://localhost:3000` to manage tasks.
- Use the mobile application to manage tasks on the go.

## Conclusion

This task management application provides a comprehensive solution for managing tasks across different platforms. By following clean architecture principles and implementing CI/CD, the application is designed to be maintainable, scalable, and easy to deploy.