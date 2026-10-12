# College Student Management System

This workspace contains the React dashboard in `student-frontend` and its Express REST API in `student-backend`.

## Run the backend

```sh
cd student-backend
npm install
npm start
```

The API listens on `http://localhost:5000` by default. Student records are held in memory and reset to the sample students whenever the server restarts.

## Run the frontend

In another terminal:

```sh
cd student-frontend
npm install
npm run dev
```

Open the local URL printed by Vite. Its development server forwards `/api` requests to `http://localhost:5000`.

## API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/students` | List students |
| GET | `/api/students/:id` | Read one student |
| POST | `/api/students` | Add a student |
| PUT | `/api/students/:id` | Replace a student's details |
| DELETE | `/api/students/:id` | Delete a student |

The dashboard includes loading and error states, add/edit/delete operations, delete confirmation, success messages, student search, branch filtering, a total count, and a student details dialog.
