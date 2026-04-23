Live URl: https://crm-project-company.vercel.app/
# 🏠 Real Estate CRM — Full Stack Web Application

> A complete **Customer Relationship Management (CRM)** system built for real estate businesses to manage leads, properties, and agents — developed as a full-stack project using the MERN stack.

---

## 📌 Project Overview

This CRM application helps real estate companies streamline their sales pipeline by capturing leads from multiple sources, tracking lead status, managing property listings, and assigning leads to agents — all from a clean, responsive web interface.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🔐 **Authentication** | Login system with route protection |
| 📋 **Lead Management** | Add, edit, delete and track leads through the full sales pipeline |
| 🏡 **Property Listings** | View and manage available properties with location and pricing |
| 👥 **Agent Assignment** | Assign leads to specific agents |
| 📊 **Status Tracking** | Pipeline stages — New → Contacted → Qualified → Closed / Lost |
| 🔔 **Follow-up Reminders** | Date-based follow-up tracking with overdue alerts |
| 🔍 **Search & Filter** | Filter leads by status, source, and keyword search |
| 📱 **Responsive UI** | Works across desktop and mobile browsers |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React.js** | UI library for building component-based interfaces |
| **React Router DOM** | Client-side routing and navigation |
| **Vite** | Fast development build tool |
| **Plain CSS (Inline Styles)** | Styling without external CSS frameworks |
| **Axios** | HTTP client for API communication |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web framework for building REST APIs |
| **MongoDB** | NoSQL database for storing leads, properties, agents |
| **Mongoose** | ODM library for MongoDB schema modeling |
| **dotenv** | Environment variable management |

### Tools & Setup
| Tool | Purpose |
|---|---|
| **VS Code** | Code editor |
| **Postman** | API testing |
| **Git & GitHub** | Version control |
| **npm** | Package management |

---

## 📁 Project Structure

```
CRM Company Project/
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # MongoDB connection
│   │   ├── models/                # Mongoose schemas (Lead, Property, Agent)
│   │   ├── routes/                # Express route handlers
│   │   ├── controllers/           # Business logic
│   │   ├── app.js                 # Express app setup
│   │   └── server.js              # Server entry point
│   ├── .env                       # Environment variables
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Login.jsx          # Authentication page
    │   │   ├── Leads.jsx          # Lead management dashboard
    │   │   └── Properties.jsx     # Property listings
    │   ├── services/
    │   │   └── api.js             # Axios API configuration
    │   ├── App.jsx                # Root component with routing
    │   └── main.jsx               # React entry point
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or MongoDB Atlas)
- npm

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/crm-company-project.git
cd crm-company-project
```

### 2. Setup Backend
```bash
cd Backend
npm install
```

Create a `.env` file in the Backend folder:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/crm_db
```

Start the backend server:
```bash
npm run dev
```
> ✅ Server running on port 3000 — MongoDB connected

### 3. Setup Frontend
```bash
cd Frontend
npm install
npm run dev
```
> ✅ Frontend running at http://localhost:5173

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/leads` | Fetch all leads |
| `POST` | `/api/leads` | Create a new lead |
| `PUT` | `/api/leads/:id` | Update a lead |
| `DELETE` | `/api/leads/:id` | Delete a lead |
| `GET` | `/api/properties` | Fetch all properties |

---

## 📸 Screenshots

### Login Page
- Clean authentication form with email and password
- Redirects to the Leads dashboard on successful login

### Leads Dashboard
- Summary metric cards (Total, New, Contacted, Qualified, Lost)
- Searchable and filterable lead table
- Lead source tracking (Website, Ads, Call, Referral)
- Color-coded status badges and follow-up reminders
- Add / Edit / Delete leads via modal form

### Properties Page
- Property cards with title, location, and price
- Navigable via the top navbar

---

## 💡 What I Learned

- Building a complete full-stack MERN application from scratch
- Designing REST APIs with Express and connecting to MongoDB using Mongoose
- Managing React state, component lifecycle, and client-side routing
- Structuring a real-world project with clean separation of concerns
- Handling environment variables and database connection gracefully

---

## 👨‍💻 Developer

**Ujjwal Saini**
📧 ujjwalsaini00@gmail.com

---

> *This project was built as part of a hands-on learning journey into full-stack web development. All features are functional and the codebase is clean, well-structured, and ready for further development.*
<img width="1920" height="838" alt="Screenshot (728)" src="https://github.com/user-attachments/assets/666a360d-c470-41c9-ac46-e14d2e0bc6ad" />
<img width="1920" height="1031" alt="Screenshot (731)" src="https://github.com/user-attachments/assets/a25544ec-75a4-4770-aa34-086b4b00ad38" />
<img width="1920" height="798" alt="Screenshot (730)" src="https://github.com/user-attachments/assets/8f5de1e2-6a87-4096-93e6-80a94714c94a" />
<img width="1920" height="841" alt="Screenshot (729)" src="https://github.com/user-attachments/assets/305654db-6414-4996-9348-86ff3d891918" />

