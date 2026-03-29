
A full-stack disaster monitoring system that simulates real-time satellite tracking of disasters across India. It features an interactive map, analytics dashboard, and resource deployment system. Built with React, Node.js, and MongoDB, it visualizes severity, tracks alerts, and stores deployment data for efficient disaster management.

Features-
. 📡 Real-time disaster simulation (auto-updated every 15 seconds)
. 🗺️ Interactive India map with critical alert visualization
. 🔴 Dynamic alert markers that disappear after deployment
. 📊 Analytics dashboard for disaster trends and intensity
. 🚨 Critical alerts filtering system
. 🚑 Resource deployment tracking
. 💾 MongoDB database for persistent storage
. 📄 CSV logging + downloadable reports
. 🎨 Modern dark-themed UI
. 🛠️ Tech Stack

Frontend-
React.js
CSS (Custom dark UI)
Axios

Backend-
Node.js
Express.js

Database-
MongoDB (Mongoose)

Installation setup-

Step 1:
Clone the repository-
git clone https://github.com/krishiv23-alt/India-Satellite-Disaster-Management-Portal-Simulator
cd project-name

Step 2:
cd backend
npm install
node server.js

Step 3:
Start MongoDB
mongod

Step 4:
Frontend Setup
cd frontend
npm install
npm start


Folder Structure-

frontend/
  src/
    components/
    images/
    App.js

backend/
  models/
  server.js

How It Works-
. Backend generates disaster data every 15 seconds
. Data is stored in MongoDB
. Frontend fetches and displays real-time updates
. Users can deploy resources to affected regions
. Deployed disasters are removed from the map
. Deployment data is stored in database + CSV

Sample Features in Action-
. Map shows only active critical disasters
. Hover over dots → view affected region
. Deploy resources → dot disappears instantly
. Right panel shows live statistics

Future Enhancements-
. 🌍 Real satellite/weather API integration
. 🛰 Interactive GIS-based maps
. 📊 Advanced analytics & prediction models
. 🔐 User authentication system

Authors-
Developed as a B.Tech Computer Science Project showcasing full-stack development, real-time systems, and data visualization.
Krishiv Chopra
Anshika Kumar
