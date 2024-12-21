# Blogs Project API

The goal of this project is to develop a backend for a blogging platform where users can write, update, and delete their blogs. This system includes two roles: Admin and User.

## Live Deployment Link

[Bike-Store-Server](https://blog-project-lilac.vercel.app/)

## Features

## 1. User Roles

**Admin:**

- Manually created in the database with predefined credentials.
- Manually created in the database with predefined credentials.
- Can delete any blog.
- Cannot update blogs.

**User:**

- Can register and log in.
- Can create, update, and delete their own blogs.
- Cannot perform admin actions.

## 2. Authentication & Authorization

- **Authentication:** Users must log in to perform write, update, and delete operations.

- **Authorization:** Role-based access control to differentiate between Admin and User roles.

## 3. Blog API

- Public API for reading blogs.

- Supports search, sorting, and filtering.

- Includes blog title, content, author details, and metadata

- Development Tools:
  - Live reload with ts-node-dev.
  - Build with tsc.
  - Lint and format code using Prettier and ESLint.

## Tech Stack

**Dependencies:** Node, Express, mongoose, dotenv, cors, JWT

**Dependencies:** typescript, ts-node-dev, prettier, eslint-config-prettier, @typescript-eslint/_, @types/_, bcrypt, cookie parser, zod, http-code-status.

## Prerequisites

Ensure you have the following installed:

- Node.js (>=16.x)
- npm or yarn
- MongoDB (running locally or a hosted instance)

## Getting Started

## 1 Clone the Repository

```bash
git clone https://github.com/gopalbasak1/Blog-Project.git
cd Blog-Project
```

## 2 Install Dependencies

```bash
npm install
```

## 3 Environment Setup

Create a .env file in the root directory and configure the following variables:

```bash
(DATABASE_URL) MONGO_URI=<your-mongodb-connection-string>
PORT=<port-number>
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET=<your-jwt-access-secret>
JWT_ACCESS_EXPIRES_IN=<your-jwt-access-expires-in>
```

## 4 Run the Project

- Development: Start the server with hot reloading:

```bash
npm run dev
```

- Production: Build and start the server: Start the server with hot reloading:

```bash
npm run build
npm start:prod
```

## 5 API Endpoints

**1. Authentication**

- . Authentication

  - POST /api/auth/register: Add a a new user.
  - POST /api/auth/login: Authenticates a user with their email and password and generates a JWT token.

  **2. Blog Management**

  - POST /api/blogs: Allows a logged-in user to create a blog by providing a title and content.

- Request Header:

```bash
Authorization: Bearer <token>
```

- PATCH /api/blogs/:id: Update Update Blog.

  - Request Header:

  ```bash
  Authorization: Bearer <token>
  ```

- DELETE /api/blogs/:id: Delete a blog.

- Request Header:

```bash
 Authorization: Bearer <token>
```

**2. Admin Actions**

- PATCH /api/admin/users/:userId/block: Admin Blocked a user.

- Request Header:

```bash
Authorization: Bearer <token>
```

- DELETE /api/admin/blogs/:id: Admin delete a blog.
- Request Header:

```bash
Authorization: Bearer <token>
```

## Common Errors:

- **Validation Errors:** Invalid input data.
- **Authentication Errors:** Invalid credentials or missing tokens.

- **Authorization Errors:** Insufficient permissions.

- **Resource Not Found:** Requested resources do not exist.

- **Internal Server Errors:** Unexpected server issues.

## Scripts

- `npm run dev`: Run the server in development mode with hot reload.
- `npm run build`: Build the project using TypeScript.
- `npm run start:prod`: Run the production build.
- `npm run lint`: Run ESLint for linting TypeScript files.
- `npm run lint:fix`: Automatically fix linting issues.
- `npm run prettier`: Format files using Prettier.
- `npm run prettier:fix`: Fix and format files with Prettier.

## Project Structure

```bash
plaintext

src/
├── controllers/   # Request handlers
├── interfaces/    # TypeScript interfaces
├── models/        # Mongoose schemas
├── routes/        # API route definitions
├── server.ts      # Application entry point

```

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License. See the LICENSE file for details.
