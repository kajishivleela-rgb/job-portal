# Full-Stack Job Portal

A MERN stack job portal with JWT authentication, role-based access for employers & job seekers, and RESTful APIs for job listings + applications.

## Features
- **Authentication**: JWT-based login/register with bcrypt password hashing
- **Role-Based Access**: Separate dashboards for Employers and Job Seekers
- **Job Management**: Employers can post, edit, delete jobs. Job seekers can view + apply
- **Application Tracking**: Users track applied jobs, employers view applicants per job
- **Search & Filter**: Filter jobs by location, type, salary range
- **Responsive UI**: Mobile-first design using React.js + Tailwind CSS
- **RESTful API**: Node.js/Express.js backend with 15+ protected endpoints

## Tech Stack
| Frontend | Backend | Database | Auth & Tools |
| --- | --- | --- | --- |
| React.js, React Router, Axios, Tailwind CSS | Node.js, Express.js | MongoDB, Mongoose | JWT, bcrypt, Postman, Git |

## Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/your-username/job-portal.git
cd job-portal
2. Backend Setup
cd backend
npm install
cp .env.example .env
Update .env:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

Run backend
npm run dev
API runs on http://localhost:8000

3. Frontend Setup
cd ../frontend
npm install
cp .env.example .env
Update .env:
REACT_APP_API_URL=http://localhost:5173/api

Run frontend:
npm start
