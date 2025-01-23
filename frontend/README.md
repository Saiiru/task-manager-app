# Task Management App

This is a task management web application built with Next.js, React, TypeScript, and Apollo Client. The application follows clean architecture principles and provides features for user authentication and task management.

## Features

- User authentication (sign-in and sign-up)
- CRUD operations for tasks
- Responsive design
- Clean architecture structure

## Project Structure

```
task-management-app
├── src
│   ├── components
│   │   ├── Auth
│   │   │   ├── SignIn.tsx
│   │   │   ├── SignUp.tsx
│   │   │   └── AuthContext.tsx
│   │   ├── Layout
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── Task
│   │       ├── TaskList.tsx
│   │       ├── TaskItem.tsx
│   │       └── TaskForm.tsx
│   ├── pages
│   │   ├── api
│   │   │   └── graphql.ts
│   │   ├── _app.tsx
│   │   ├── index.tsx
│   │   ├── sign-in.tsx
│   │   └── sign-up.tsx
│   ├── services
│   │   ├── apolloClient.ts
│   │   ├── authService.ts
│   │   └── taskService.ts
│   ├── domain
│   │   ├── entities
│   │   │   ├── Task.ts
│   │   │   └── User.ts
│   │   ├── repositories
│   │   │   ├── ITaskRepository.ts
│   │   │   └── IUserRepository.ts
│   │   └── usecases
│   │       ├── CreateTask.ts
│   │       ├── DeleteTask.ts
│   │       ├── GetTasks.ts
│   │       ├── SignInUser.ts
│   │       └── SignUpUser.ts
│   ├── infrastructure
│   │   ├── graphql
│   │   │   ├── mutations
│   │   │   │   ├── createTask.ts
│   │   │   │   ├── deleteTask.ts
│   │   │   │   └── signUpUser.ts
│   │   │   └── queries
│   │   │       └── getTasks.ts
│   │   └── repositories
│   │       ├── TaskRepository.ts
│   │       └── UserRepository.ts
│   └── styles
│       ├── globals.css
│       └── Home.module.css
├── public
│   └── favicon.ico
├── .eslintrc.json
├── .prettierrc
├── apollo.config.js
├── next-env.d.ts
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd task-management-app
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Technologies Used

- Next.js
- React
- TypeScript
- Apollo Client
- GraphQL

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.