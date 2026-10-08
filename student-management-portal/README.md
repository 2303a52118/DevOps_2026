# Student Management Portal

A responsive React dashboard for student and course records at Northstar College. Navigation is handled with React Router, and student/course details use URL parameters.

## Run locally

```bash
npm install
npm run dev
```

## Routes

- `/` — college overview
- `/students` — searchable student directory
- `/students/:id` — student profile with lifecycle-based loading and missing-record handling
- `/courses` — course catalog
- `/courses/:id` — course details and class roster
- `/about` — college information
- Unknown paths — 404 page

The project uses sample in-memory records; replace the arrays in `src/App.jsx` with an API service when connecting a backend.
