# CI/CD Documentation for Task Manager Application

This README file provides an overview of the CI/CD setup for the Task Manager application, detailing the processes involved in building, testing, and deploying the application using Jenkins and Kubernetes.

## Overview

The CI/CD pipeline automates the process of integrating code changes, running tests, and deploying the application to a Kubernetes cluster. This ensures that the application is always in a deployable state and reduces the risk of errors during deployment.

## Jenkins Pipeline

The Jenkins pipeline is defined in the `Jenkinsfile` located in the `ci-cd` directory. It includes the following stages:

1. **Install Dependencies**: This stage installs the necessary dependencies for both the backend and frontend applications.
2. **Run Tests**: Automated tests are executed to ensure that the application behaves as expected.
3. **Build Application**: The application is built for both the backend and frontend.
4. **Deploy to Kubernetes**: The built application is deployed to the Kubernetes cluster using the configurations specified in the `kubernetes` directory.

## Kubernetes Configuration

The Kubernetes deployment and service configurations are located in the `kubernetes` directory. The following files are included:

- **deployment.yaml**: This file defines the deployment settings for the backend and frontend applications, including replicas, container images, and environment variables.
- **service.yaml**: This file exposes the applications to the network, allowing them to be accessed externally.

## Running the Pipeline

To run the CI/CD pipeline:

1. Ensure that Jenkins is set up and configured to access your Git repository.
2. Create a new pipeline job in Jenkins and point it to the repository containing the Task Manager application.
3. Trigger the pipeline manually or set up webhooks to trigger it on code changes.

## Conclusion

This CI/CD setup streamlines the development process for the Task Manager application, enabling rapid iterations and reliable deployments. For further details on each component, refer to the respective files in the `ci-cd` directory.