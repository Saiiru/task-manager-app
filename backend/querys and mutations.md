# Queries and Mutations for Task Manager App

## Server Information

- **Port**: 8080
- **GraphQL Endpoint**: `http://localhost:8080/graphql`

## Queries

### Get All Tasks

```graphql
query GetTasks($filter: TaskFilter) {
  tasks(filter: $filter) {
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

### Get Task by ID

```graphql
query GetTask($id: ID!) {
  task(id: $id) {
    id
    title
    description
    isCompleted
    userId
    createdAt
    updatedAt
  }
}
```

### Get Current User

```graphql
query Me {
  me {
    id
    email
    name
    lastName
    createdAt
    updatedAt
  }
}
```

### Get User by ID

```graphql
query GetUser($id: ID!) {
  user(id: $id) {
    id
    email
    name
    lastName
    createdAt
    updatedAt
  }
}
```

### Get User by Email

```graphql
query GetUserByEmail($email: String!) {
  userByEmail(email: $email) {
    id
    email
    name
    lastName
    createdAt
    updatedAt
  }
}
```

### Get All Users

```graphql
query GetUsers {
  users {
    id
    email
    name
    lastName
    createdAt
    updatedAt
  }
}
```

## Mutations

### Create Task

```graphql
mutation CreateTask($input: NewTask!) {
  createTask(input: $input) {
    id
    title
    description
    isCompleted
    userId
    createdAt
    updatedAt
  }
}
```

### Update Task

```graphql
mutation UpdateTask($input: UpdateTask!) {
  updateTask(input: $input) {
    id
    title
    description
    isCompleted
    userId
    createdAt
    updatedAt
  }
}
```

### Delete Task

```graphql
mutation DeleteTask($id: ID!) {
  deleteTask(id: $id)
}
```

### Register User

```graphql
mutation Register($input: UserRegister!) {
  register(input: $input) {
    id
    email
    name
    lastName
    createdAt
    updatedAt
  }
}
```

### Login User

```graphql
mutation Login($input: UserLogin!) {
  login(input: $input) {
    user {
      id
      email
      name
      lastName
      createdAt
      updatedAt
    }
    token
  }
}
```

## Tutorial: Using GraphQL with Postman

### Step 1: Set Up Postman

1. Open Postman and create a new request.
2. Set the request type to `POST`.
3. Enter the GraphQL endpoint URL: `http://localhost:8080/graphql`.

### Step 2: Configure Headers

1. Go to the `Headers` tab.
2. Add a new header with the key `Content-Type` and value `application/json`.

### Step 3: Write Your Query or Mutation

1. Go to the `Body` tab.
2. Select the `GraphQL` option.
3. Copy and paste your desired query or mutation into the editor.

### Example: Get All Tasks

```json
{
  "query": "query GetTasks($filter: TaskFilter) { tasks(filter: $filter) { edges { node { id title description isCompleted userId createdAt updatedAt } } pageInfo { hasNextPage hasPreviousPage totalCount } } }",
  "variables": {
    "filter": {
      "search": "",
      "page": 1,
      "limit": 10
    }
  }
}
```

### Step 4: Send the Request

1. Click the `Send` button.
2. View the response in the `Body` tab.

Repeat these steps for other queries and mutations by replacing the query or mutation in the `Body` tab with the desired one from the list above.
