# **Job API**

The **Job API** is a backend application built with **Node.js**, **Express**, **TypeScript**, **Typegoose** (for MongoDB models), and **Zod** (for validation). It provides functionality for managing **users**, **jobs**, **applications**, and **employer reviews**. The project follows a modular and scalable structure, ensuring clean separation of concerns and maintainability.

---

## **Features**

1. **User Management**:

   - Register, login, and manage user profiles.
   - JWT-based authentication for protected routes.

2. **Job Management**:

   - Create, read, update, and delete job postings.
   - Fetch jobs by ID or other filters.

3. **Application Management**:

   - Apply for jobs and manage job applications.

4. **Employer Reviews**:
   - Create, read, update, and delete reviews for employers.
   - Fetch reviews for a specific employer.

---

## **Technologies Used**

- **Node.js**: Runtime environment.
- **Express**: Web framework for building the API.
- **TypeScript**: Adds type safety and improves developer productivity.
- **Typegoose**: Simplifies MongoDB schema and model definitions.
- **Zod**: Schema validation for request data.
- **JWT**: JSON Web Tokens for authentication.
- **MongoDB**: Database for storing application data.

---

## **Project Structure**

```
src/
├── controllers/                # Handles request logic
│   ├── auth.controller.ts       # Authentication logic
│   ├── job.controller.ts        # Job-related logic
│   ├── user.controller.ts       # User-related logic
│   ├── application.controller.ts # Application logic
│   └── review.controller.ts     # Employer review logic
├── models/                     # MongoDB models (Typegoose)
│   ├── user.model.ts            # User schema
│   ├── job.model.ts             # Job schema
│   ├── application.model.ts     # Application schema
│   └── review.model.ts          # Review schema
├── routes/                     # API routes
│   ├── auth.routes.ts           # Authentication routes
│   ├── job.routes.ts            # Job routes
│   ├── user.routes.ts           # User routes
│   ├── application.routes.ts    # Application routes
│   └── review.routes.ts         # Review routes
├── middlewares/                # Middleware functions
│   ├── verifyToken.ts           # JWT authentication
│   ├── validation.middleware.ts # Request validation
│   └── error.middleware.ts      # Global error handling
├── validators/                 # Zod validation schemas
│   ├── user.validation.ts       # User validation
│   ├── job.validation.ts        # Job validation
│   ├── application.validation.ts # Application validation
│   └── review.validation.ts     # Review validation
├── utils/                      # Utility functions
│   ├── generateToken.ts         # JWT token generation
│   └── customError.ts           # Custom error handling
├── app.ts                      # Express app setup
└── db.ts                       # MongoDB connection
```

---

## **API Endpoints**

### **1. User Management**

| **Method** | **Endpoint**          | **Description**                          |
| ---------- | --------------------- | ---------------------------------------- |
| POST       | `/api/users/register` | Register a new user.                     |
| POST       | `/api/users/login`    | Log in and receive a JWT token.          |
| GET        | `/api/users/profile`  | Fetch the authenticated user's profile.  |
| PUT        | `/api/users/profile`  | Update the authenticated user's profile. |
| DELETE     | `/api/users/profile`  | Delete the authenticated user's profile. |

---

### **2. Job Management**

| **Method** | **Endpoint**    | **Description**             |
| ---------- | --------------- | --------------------------- |
| POST       | `/api/jobs`     | Create a new job posting.   |
| GET        | `/api/jobs`     | Fetch all job postings.     |
| GET        | `/api/jobs/:id` | Fetch a specific job by ID. |
| PUT        | `/api/jobs/:id` | Update a job posting.       |
| DELETE     | `/api/jobs/:id` | Delete a job posting.       |

---

### **3. Application Management**

| **Method** | **Endpoint**            | **Description**                     |
| ---------- | ----------------------- | ----------------------------------- |
| POST       | `/api/applications`     | Apply for a job.                    |
| GET        | `/api/applications`     | Fetch all job applications.         |
| GET        | `/api/applications/:id` | Fetch a specific application by ID. |
| PUT        | `/api/applications/:id` | Update a job application.           |
| DELETE     | `/api/applications/:id` | Delete a job application.           |

---

### **4. Employer Reviews**

| **Method** | **Endpoint**                | **Description**                        |
| ---------- | --------------------------- | -------------------------------------- |
| POST       | `/api/reviews`              | Create a new review for an employer.   |
| GET        | `/api/reviews`              | Fetch all reviews.                     |
| GET        | `/api/reviews/employer/:id` | Fetch reviews for a specific employer. |
| PUT        | `/api/reviews/:id`          | Update a review.                       |
| DELETE     | `/api/reviews/:id`          | Delete a review.                       |

---

## **Getting Started**

### **Prerequisites**

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

---

### **Installation**

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   PORT=3000
   ```

4. Run the application:

   ```bash
   npm start
   ```

5. Test the API:
   Use tools like **Postman** or **cURL** to test the endpoints.

---

## **Example Requests and Responses**

### **1. Register a User**

**Request**:

```json
POST /api/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response**:

```json
{
  "_id": "64f1c9e8e4b0f5a2d8e4f1c9",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2023-09-05T12:00:00.000Z"
}
```

---

### **2. Create a Job Posting**

**Request**:

```json
POST /api/jobs
{
  "title": "Software Engineer",
  "description": "Work on cutting-edge technologies.",
  "location": "Remote",
  "employerId": "64f1c9e8e4b0f5a2d8e4f1d0"
}
```

**Response**:

```json
{
  "_id": "64f1c9e8e4b0f5a2d8e4f1d1",
  "title": "Software Engineer",
  "description": "Work on cutting-edge technologies.",
  "location": "Remote",
  "employerId": "64f1c9e8e4b0f5a2d8e4f1d0",
  "createdAt": "2023-09-05T12:00:00.000Z"
}
```

---

### **3. Create an Employer Review**

**Request**:

```json
POST /api/reviews
{
  "reviewerId": "64f1c9e8e4b0f5a2d8e4f1c9",
  "employerId": "64f1c9e8e4b0f5a2d8e4f1d0",
  "rating": 5,
  "comment": "Great employer to work with!"
}
```

**Response**:

```json
{
  "_id": "64f1c9e8e4b0f5a2d8e4f1d2",
  "reviewerId": "64f1c9e8e4b0f5a2d8e4f1c9",
  "employerId": "64f1c9e8e4b0f5a2d8e4f1d0",
  "rating": 5,
  "comment": "Great employer to work with!",
  "createdAt": "2023-09-05T12:00:00.000Z"
}
```

---

## **Contributing**

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push to the branch.
4. Submit a pull request.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **Contact**

For questions or feedback, please contact:

### **Haidy Yasser**

- **Email**: haidyasser3@gmail.com
- **GitHub**: [Haidyasser](https://github.com/Haidyasser)

### **Amira Walid**

- **Email**: amirawaleed012@gmail.com
- **GitHub**: [AmiraWalid1](https://github.com/AmiraWalid1)
