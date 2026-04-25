# TestFlow API

TestFlow API is a REST API for software testing management. The project is being developed in stages, with implemented endpoints documented separately from the endpoints that are still planned.

## Description

The API is designed to support common testing workflows such as project creation, test case management, test run tracking, bug registration, and execution reporting. At the current stage, authentication and protected project creation are already available.

## Technologies

- Node.js
- JavaScript
- Express
- JWT
- Swagger
- Nodemon

## Running the project

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file based on `.env.example`:

```env
PORT=3000
JWT_SECRET=your_jwt_secret_here
```

3. Start the API:

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```

## Swagger

Swagger is available at:

```text
http://localhost:3000/api-docs
```

Use Swagger to test the implemented endpoints interactively, including protected routes that require a Bearer token.

## Endpoints implemented

### Authentication

- `POST /login`

Test credentials:

- `user`: `samuel.aquino`
- `password`: `123456`

Example request:

```json
{
  "user": "samuel.aquino",
  "password": "123456"
}
```

Example success response:

```json
{
  "message": "Login successful",
  "token": "jwt-token-gerado"
}
```

The JWT is generated only after valid credentials and currently includes simple payload data such as `user` and `role`, with expiration set to `1h`.

### Projects

- `POST /projects`

This endpoint is protected by JWT and requires the header:

```http
Authorization: Bearer <token>
```

Example Bearer token usage:

```http
POST /projects HTTP/1.1
Host: localhost:3000
Authorization: Bearer <token>
Content-Type: application/json
```

Example request:

```json
{
  "name": "Website QA Project",
  "description": "Test project for website regression testing",
  "status": "active"
}
```

## Endpoints planned

- `GET /projects`
- `GET /projects/{projectId}`
- `POST /test-cases`
- `GET /test-cases`
- `PATCH /test-cases/{testCaseId}`
- `POST /test-runs`
- `GET /test-runs`
- `POST /bugs`
- `GET /reports/execution-summary`

As new endpoints are implemented, they should move from the "planned" section to the "implemented" section.

## JWT authentication flow

1. Send credentials to `POST /login`.
2. Copy the returned token.
3. Use the token in protected routes with:

```http
Authorization: Bearer <token>
```

## Project structure

```text
testflow-api/
+-- src/
|   +-- controllers/
|   |   +-- authController.js
|   |   +-- projectsController.js
|   +-- docs/
|   |   +-- swagger.js
|   +-- middlewares/
|   |   +-- authMiddleware.js
|   +-- routes/
|   |   +-- authRoutes.js
|   |   +-- projectsRoutes.js
|   +-- services/
|   |   +-- authService.js
|   |   +-- projectsService.js
|   +-- app.js
|   +-- server.js
+-- .env
+-- .env.example
+-- package.json
+-- README.md
```

## Future improvements

- Add automated tests for routes and services
- Introduce persistent database storage
- Add user management and authorization profiles
- Expand validation and error handling
- Add CI/CD pipeline
