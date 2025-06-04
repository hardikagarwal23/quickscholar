👨🏻‍🎓 QuickScholar:
QuickScholar is a platform that helps students to find the relevant scholarships based on their profile. It features authentication, smart filters, and personalized matching using pre-scraped and stored scholarship data.

Live Demo-(https://quickscholar.vercel.app/)


Features:
-Email & password login/signup
-Filters: Search by name, state, offered by
-Profile-based matching (State, GPA, Preferred Amount)
-Closing Soon filter (shows scholarships closing in next two weeks)

Tech Stack:
Frontend-
React.js
Tailwind CSS
Framer Motion(for animation)

Backend-
Nodejs
Expressjs
MongoDB

Authentication:
Email & Password (Passwords hashed with bcrypt and authenticated via JWT tokens)

Data Source:
Pre-scraped using BeautifulSoup
Stored in MongoDB


# Clone the repo
git clone https://github.com/hardikagarwal23/QuickScholar.git

# Frontend
cd client
npm install
npm run dev

# Backend
cd server
npm install
npm run dev
