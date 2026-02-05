Job Rashpi 🚀
Job Rashpi is a full-stack career development platform designed to empower developers and job seekers.
From sharpening technical skills in the "Arena" to building professional resumes and gaining company-specific
insights, Job Rashpi is a one-stop-shop for career growth.

🌟 Key Features
Smart Authentication: Secure access using Standard JWT (JSON Web Tokens) or seamless Google OAuth integration.

Dynamic Resume Builder: Create, edit, and manage professional resumes with a live interactive interface.

Coding Arena: Integration with external APIs (like Codeforces) to track upcoming contests and practice coding problems.

Company Insights & Experiences: Dedicated pages to explore company cultures and read interview/work experiences from other users.

Resource Center: A curated hub of learning materials and career-related documents.

Responsive Design: Optimized for a smooth experience across desktop, tablet, and mobile devices.

🛠️ Tech Stack
Frontend: React.js, Vite, React Router DOM, CSS3 (BEM methodology).

Backend: Node.js, Express.js.

Database: MongoDB (using Mongoose ODM).

Security: Bcrypt.js (Password Hashing), Passport.js (OAuth), JWT (State Management).

State Management: React Context API (AuthContext).

📂 Project Structure
Plaintext

job_rashpi/
├── backend/                # Express server and MongoDB logic
│   ├── controller/         # Request handling logic (Auth, User)
│   ├── models/             # Mongoose Schemas (User, Resume, Experience)
│   ├── middleware/         # Auth verification and error handling
│   ├── database/           # MongoDB connection config
│   └── passport.js         # Google OAuth strategy
├── frontend/               # React client application
│   ├── src/
│   │   ├── components/     # UI Components (Pages, Shared, Auth)
│   │   ├── context/        # Global state (AuthContext)
│   │   └── routes.jsx      # Navigation logic
│   └── Setgooglelogin.jsx  # OAuth frontend handler
└── package.json            # Root configuration
🚀 Getting Started
Prerequisites
Node.js installed

MongoDB URI (Local or Atlas)

Google Cloud Console credentials (for OAuth)

Installation
Clone the repository:

Bash

git clone https://github.com/YOUR_USERNAME/job_rashpi.git
cd job_rashpi
Setup the Backend:

Bash

cd backend
npm install
Create a .env file in the backend/ folder:

Code snippet

PORT=4000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret
Start the server:

Bash

npm start
Setup the Frontend:

Bash

cd ../frontend
npm install
Start the development server:

Bash

npm run dev
🛡️ Security Best Practices
Environment Safety: All sensitive keys (Database URLs, API Secrets) are managed via .env files which are ignored by Git.

Password Protection: User passwords are never stored in plain text; they are hashed using a salt-round approach with bcryptjs.

Protected Routes: Frontend routes (like /resume) are guarded by a custom PrivateRoute component that verifies user tokens before rendering.

🤝 Contributing
Contributions are welcome! If you'd like to improve the Resume Builder or add a new platform to the Arena:

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
Distributed under the MIT License. See LICENSE for more information.

Project Link: https://github.com/piyushag12345/job_rashpi
