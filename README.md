📌 KIIT Placement Portal (MERN Stack)

A full-stack web application for KIIT University students to stay updated about on-campus placement drives, recruiting companies, important dates, and real-time reminders.
Built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).

🚀 Features
🎯 Student Features

View upcoming on-campus placement drives

See company details (roles, CTC, eligibility, branches allowed, etc.)

Get real-time notifications & reminders

Save/Bookmark companies of interest

Mobile responsive UI

🎓 Admin / University Features

Add New Company Drive

Update/Delete Company details

Schedule notifications & reminders

Role-based secure authentication

Dashboard to track student interest

🛠️ Tech Stack
Frontend

React.js

React Router

Axios

TailwindCSS / Material UI (your choice)

Backend

Node.js

Express.js

JWT Authentication

Nodemailer / Push Notifications

Database

MongoDB (Mongoose ORM)

📂 Project Structure
KIIT-Placement-Portal/
│
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── utils/
│ └── server.js
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ ├── hooks/
│ │ └── App.jsx
│ └── package.json
│
├── README.md
└── package.json

⚙️ Setup Instructions
1️⃣ Clone the repo
git clone https://github.com/yourusername/kiit-placement-portal.git
cd kiit-placement-portal

2️⃣ Install dependencies
Backend
cd backend
npm install

Frontend
cd frontend
npm install

🔑 Environment Variables

Create a .env file inside /backend/:

PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_password
CLIENT_URL=http://localhost:5173

▶️ Run the project
Run Backend
cd backend
npm start

Run Frontend (Vite)
cd frontend
npm run dev

📡 API Endpoints (Sample)
Auth
Method Endpoint Description
POST /api/auth/register Register student/admin
POST /api/auth/login Login
Companies
Method Endpoint Description
GET /api/companies Get all companies
POST /api/companies Add new company (Admin)
PUT /api/companies/:id Update company
DELETE /api/companies/:id Delete company
🔔 Notifications / Reminders

Automatic reminder emails

Scheduled push notifications for upcoming drive dates

Cron jobs for automation

🔐 Security Features

JWT Auth

Password hashing (bcrypt)

Admin-only protected routes

CORS enabled

🤝 Contribution Guidelines

Fork the repo

Create a feature branch

Commit changes

Make a PR

📄 License

MIT License © 2025