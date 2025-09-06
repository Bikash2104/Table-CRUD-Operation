## MERN User Management App

A user management system built with React (TypeScript), Redux Toolkit, Formik, Yup, and Material UI.
It provides CRUD functionality with pagination, search, validation, and dynamic form fields for skills and available time slots.

## Features

1.User CRUD: Create, Read, Update, Delete users.
2.ormik + Yup: Form handling with validation
3.Material UI: Modern and responsive UI
4.Redux Toolkit: State management with async thunks
5.Dynamic Fields: Add/remove multiple skills & available slots
6.Pagination + Search: Efficient data fetching with server-side pagination
7.Active/Inactive toggle for users
8.Company & Address details

## Tech Stack

1.Frontend: React (TypeScript), Redux Toolkit, Formik, Yup, Material UI
2.Backend: JSON Server (mock API @ http://localhost:4000/users)
3.State Management: Redux Toolkit with async thunks
4.Validation: Yup schema

## API Endpoints (JSON Server)

Base URL: http://localhost:4000/users
GET /users?\_page=1&\_limit=5&q=search → Get paginated users
GET /users/:id → Get user by ID
POST /users → Create new user
PUT /users/:id → Update user
PATCH /users/:id → Partial update
DELETE /users/:id → Delete user

## Getting Started

1.Clone repo
git clone <your-repo-url>
cd <project-folder>

2. Install dependencies
   npm install

3. Run JSON Server (mock backend)
   npx json-server --watch db.json --port 4000

4. Start frontend
   npm run dev
