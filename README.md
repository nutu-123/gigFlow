# 🚀 GigFlow - Freelance Marketplace Platform

A modern, full-stack freelance marketplace platform where clients can post gigs and freelancers can bid on them. Built with React, Node.js, Express, and MongoDB.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [How It Works](#how-it-works)
- [Database Schema](#database-schema)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 Overview

GigFlow is a mini-freelance marketplace platform designed to connect clients with talented freelancers. The platform enables:
- **Clients** to post job opportunities (Gigs)
- **Freelancers** to browse and bid on available projects
- **Secure hiring process** with atomic transactions
- **Real-time bid management** and status tracking

This project demonstrates proficiency in:
- Complex database relationships and schema design
- Secure JWT authentication with HttpOnly cookies
- State management using React Context API
- RESTful API architecture
- Transaction-safe operations using MongoDB transactions

---

## ✨ Features

### 🔐 **Authentication & Authorization**
- Secure user registration and login
- JWT-based authentication with HttpOnly cookies
- Fluid user roles (any user can be both client and freelancer)
- Admin role support with special privileges
- Protected routes and API endpoints

### 💼 **Gig Management**
- Browse all available open gigs
- Search and filter gigs by title
- Create new gig posts with title, description, and budget
- View your posted gigs with bid statistics
- Automatic status management (open/assigned)

### 🎯 **Bidding System**
- Submit bids on open gigs with custom price and proposal
- View all received bids for your gigs
- Track bid status (pending/hired/rejected)
- Prevent duplicate bids from same freelancer
- Prevent bidding on own gigs

### 👔 **Hiring Logic** (Core Feature)
- Review all bids for your gigs
- One-click hiring process
- **Atomic transaction implementation** for race condition prevention
- Automatic gig status update to "assigned"
- Automatic rejection of all other bids
- Prevents hiring on already assigned gigs

### 📊 **Dashboard**
- Personal dashboard for freelancers
- Track all submitted bids
- View bid status with color-coded indicators
- Statistics on pending, hired, and rejected bids
- Detailed bid history with gig information

### 🎨 **User Interface**
- Modern, responsive design with Tailwind CSS
- Gradient backgrounds and smooth animations
- Mobile-friendly interface
- Intuitive navigation
- Professional color scheme
- Loading states and error handling

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18.2** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - State management

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **cookie-parser** - Cookie handling
- **CORS** - Cross-origin resource sharing

### **DevOps & Tools**
- **Git** - Version control
- **MongoDB Compass** - Database GUI
- **Postman** - API testing (optional)
- **VS Code** - Code editor

---

## 📁 Project Structure

```
gigflow/
│
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── middleware/
│   │   └── auth.js               # JWT authentication middleware
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Gig.js                # Gig schema
│   │   └── Bid.js                # Bid schema
│   ├── routes/
│   │   ├── auth.js               # Authentication routes
│   │   ├── gigs.js               # Gig management routes
│   │   └── bids.js               # Bid management routes
│   ├── .env                      # Environment variables
│   ├── .env.example              # Environment template
│   ├── server.js                 # Express server
│   └── package.json              # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation bar
│   │   │   ├── GigCard.jsx       # Gig display card
│   │   │   ├── BidModal.jsx      # Bid submission modal
│   │   │   └── ProtectedRoute.jsx # Route protection
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Browse gigs page
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Register.jsx      # Registration page
│   │   │   ├── CreateGig.jsx     # Create gig form
│   │   │   ├── MyGigs.jsx        # View posted gigs & bids
│   │   │   └── Dashboard.jsx     # Freelancer dashboard
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Authentication context
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # React entry point
│   │   └── index.css             # Global styles
│   ├── index.html                # HTML template
│   ├── vite.config.js            # Vite configuration
│   ├── tailwind.config.js        # Tailwind configuration
│   └── package.json              # Frontend dependencies
│
├── .gitignore                    # Git ignore file
└── README.md                     # Project documentation
```

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)

### Clone the Repository

```bash
git clone https://github.com/nutu-123/gigflow.git
cd gigflow
```

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (see Environment Variables section)
# Copy .env.example to .env and update values
cp .env.example .env

# Start the development server
npm run dev
```

The backend server will start on `http://localhost:5000`

### Frontend Setup

```bash
# Navigate to frontend directory (open new terminal)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start on `http://localhost:5173`

---

## 🔐 Environment Variables

### Backend (.env)

Create a `.env` file in the `backend` directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/

# JWT Secret (use a strong, random string in production)
JWT_SECRET=your_super_secret_jwt_key_change_in_production_12345

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development
```

### Backend (.env.example)

```env
MONGODB_URI=mongodb://localhost:27017/
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
```

---

## 🎮 Running the Application

### Step 1: Start MongoDB

```bash
# Windows (if MongoDB is installed as a service)
# MongoDB should start automatically

# Mac (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Verify MongoDB is running
mongosh
```

### Step 2: Start Backend Server

```bash
cd backend
npm run dev
```

Expected output:
```
🚀 Server is running on port 5000
✅ MongoDB Connected: localhost
```

### Step 3: Start Frontend

```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 4: Access the Application

Open your browser and navigate to: **http://localhost:5173**

---

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response: 201 Created
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user"
}
```

#### Get Current User
```http
GET /api/auth/me
Cookie: token=jwt_token

Response: 200 OK
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user"
}
```

#### Logout
```http
POST /api/auth/logout

Response: 200 OK
{
  "message": "Logged out successfully"
}
```

---

### Gig Endpoints

#### Get All Gigs
```http
GET /api/gigs?search=react

Response: 200 OK
[
  {
    "_id": "gig_id",
    "title": "Build React Website",
    "description": "Need a React developer...",
    "budget": 1000,
    "ownerId": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "status": "open",
    "createdAt": "2024-01-13T10:00:00.000Z"
  }
]
```

#### Create Gig
```http
POST /api/gigs
Authorization: Bearer token
Content-Type: application/json

{
  "title": "Build React Website",
  "description": "Need a React developer for my project",
  "budget": 1000
}

Response: 201 Created
{
  "_id": "gig_id",
  "title": "Build React Website",
  "description": "Need a React developer...",
  "budget": 1000,
  "ownerId": "user_id",
  "status": "open",
  "createdAt": "2024-01-13T10:00:00.000Z"
}
```

#### Get My Gigs
```http
GET /api/gigs/my-gigs
Authorization: Bearer token

Response: 200 OK
[gigs_array]
```

---

### Bid Endpoints

#### Submit Bid
```http
POST /api/bids
Authorization: Bearer token
Content-Type: application/json

{
  "gigId": "gig_id",
  "message": "I can complete this project...",
  "price": 800
}

Response: 201 Created
{
  "_id": "bid_id",
  "gigId": "gig_id",
  "freelancerId": "user_id",
  "message": "I can complete this project...",
  "price": 800,
  "status": "pending"
}
```

#### Get Bids for Gig
```http
GET /api/bids/:gigId
Authorization: Bearer token (must be gig owner)

Response: 200 OK
[
  {
    "_id": "bid_id",
    "gigId": "gig_id",
    "freelancerId": {
      "_id": "user_id",
      "name": "Jane Smith",
      "email": "jane@example.com"
    },
    "message": "I can complete...",
    "price": 800,
    "status": "pending"
  }
]
```

#### Hire Freelancer
```http
PATCH /api/bids/:bidId/hire
Authorization: Bearer token (must be gig owner)

Response: 200 OK
{
  "message": "Freelancer hired successfully",
  "bid": {bid_object}
}
```

#### Get My Bids
```http
GET /api/bids/my/bids
Authorization: Bearer token

Response: 200 OK
[bids_array]
```

---

## 🔄 How It Works

### User Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    USER REGISTRATION/LOGIN                   │
│                                                              │
│  1. User visits website                                      │
│  2. Registers with name, email, password                     │
│  3. System creates user account with hashed password         │
│  4. JWT token generated and stored in HttpOnly cookie        │
│  5. User redirected to home page                             │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT WORKFLOW                         │
│                                                              │
│  1. Client clicks "Post a Gig"                              │
│  2. Fills form: Title, Description, Budget                   │
│  3. System creates gig with status "open"                    │
│  4. Gig appears on home page for all users                   │
│  5. Client can view gig in "My Gigs" section                │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   FREELANCER WORKFLOW                        │
│                                                              │
│  1. Freelancer browses available gigs on home page          │
│  2. Uses search to filter by keywords                        │
│  3. Clicks "Place Bid" on interesting gig                    │
│  4. Submits bid with custom price and proposal message       │
│  5. Bid status set to "pending"                             │
│  6. Freelancer can track bid in "Dashboard"                  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      HIRING PROCESS                          │
│                                                              │
│  1. Client goes to "My Gigs"                                │
│  2. Clicks "View Bids" on their gig                         │
│  3. Reviews all received bids                                │
│  4. Clicks "Hire" on chosen freelancer                       │
│                                                              │
│  ⚡ ATOMIC TRANSACTION BEGINS:                               │
│     a. Check if gig is still "open"                         │
│     b. Update gig status to "assigned"                       │
│     c. Update chosen bid to "hired"                          │
│     d. Update all other bids to "rejected"                   │
│  ⚡ TRANSACTION COMMITS                                       │
│                                                              │
│  5. Hired freelancer sees "HIRED" status in dashboard        │
│  6. Other freelancers see "REJECTED" status                  │
└─────────────────────────────────────────────────────────────┘
```

### Detailed Step-by-Step Process

#### **Phase 1: User Authentication**

1. **Registration**
   - User fills registration form (name, email, password)
   - Frontend sends POST request to `/api/auth/register`
   - Backend validates data
   - Password is hashed using bcrypt (10 salt rounds)
   - User document created in MongoDB
   - JWT token generated with user ID
   - Token stored in HttpOnly cookie (expires in 30 days)
   - User object returned to frontend
   - Context API updates global auth state
   - User redirected to home page

2. **Login**
   - User enters email and password
   - Frontend sends POST request to `/api/auth/login`
   - Backend finds user by email
   - Password compared with hashed password
   - If valid, JWT token generated and stored in cookie
   - User object returned and stored in Context
   - User redirected to home page

3. **Authentication Persistence**
   - On app load, frontend calls `/api/auth/me`
   - Backend verifies JWT token from cookie
   - Returns user data if token valid
   - Frontend updates auth state
   - Protected routes become accessible

#### **Phase 2: Gig Creation (Client Side)**

1. Client clicks "Post a Gig" in navbar
2. Navigated to `/create-gig` (protected route)
3. Fills form with:
   - Title (e.g., "Build React Website")
   - Description (detailed requirements)
   - Budget (e.g., 1000)
4. Frontend validates form data
5. POST request sent to `/api/gigs` with auth token
6. Backend middleware verifies JWT token
7. Backend creates gig document:
   ```javascript
   {
     title: "Build React Website",
     description: "...",
     budget: 1000,
     ownerId: current_user_id,
     status: "open",
     createdAt: timestamp
   }
   ```
8. Gig saved to MongoDB
9. Client redirected to "My Gigs" page
10. New gig appears in list

#### **Phase 3: Browsing and Bidding (Freelancer Side)**

1. **Browse Gigs**
   - Freelancer visits home page
   - GET request to `/api/gigs`
   - Backend returns all gigs with status "open"
   - Gigs displayed in card grid with:
     - Title, description preview
     - Budget amount
     - Client name
     - Post date
     - "Place Bid" button

2. **Search Gigs**
   - Freelancer types keyword in search bar
   - On form submit, GET `/api/gigs?search=keyword`
   - Backend filters gigs using MongoDB regex
   - Results update on page

3. **Place Bid**
   - Freelancer clicks "Place Bid" on gig card
   - Modal opens with bid form
   - Freelancer enters:
     - Bid amount (e.g., 800)
     - Proposal message
   - Frontend validates:
     - User is logged in
     - User is not gig owner
     - User hasn't already bid
   - POST request to `/api/bids` with:
     ```javascript
     {
       gigId: "gig_id",
       message: "I can complete...",
       price: 800
     }
     ```
   - Backend creates bid document:
     ```javascript
     {
       gigId: "gig_id",
       freelancerId: current_user_id,
       message: "...",
       price: 800,
       status: "pending",
       createdAt: timestamp
     }
     ```
   - Modal closes with success message
   - Bid appears in freelancer's dashboard

#### **Phase 4: The Hiring Process (Critical Logic)**

1. **View Bids**
   - Client goes to "My Gigs" page
   - Clicks "View Bids" on a gig
   - GET request to `/api/bids/:gigId`
   - Backend verifies user is gig owner
   - Returns all bids for that gig, populated with freelancer info
   - Bids displayed with:
     - Freelancer name and email
     - Bid amount
     - Proposal message
     - Current status
     - "Hire" button (if pending)

2. **Hire Freelancer (Atomic Transaction)**
   - Client clicks "Hire" button on chosen bid
   - Confirmation dialog appears
   - PATCH request to `/api/bids/:bidId/hire`
   - Backend starts MongoDB transaction:
   
   ```javascript
   // Step 1: Find bid and verify ownership
   const bid = await Bid.findById(bidId);
   const gig = await Gig.findById(bid.gigId);
   
   if (gig.ownerId !== currentUserId) {
     return error("Not authorized");
   }
   
   // Step 2: Check if gig is still open
   if (gig.status !== "open") {
     return error("Already assigned");
   }
   
   // Step 3: Update gig status
   gig.status = "assigned";
   await gig.save();
   
   // Step 4: Update hired bid
   bid.status = "hired";
   await bid.save();
   
   // Step 5: Reject all other bids
   await Bid.updateMany(
     { gigId: gig._id, _id: { $ne: bid._id } },
     { status: "rejected" }
   );
   ```

3. **Post-Hire Updates**
   - Success response sent to client
   - Frontend updates UI:
     - Gig status badge changes to "Assigned"
     - Hired bid shows "HIRED" status
     - Other bids show "REJECTED" status
   - Hired freelancer's dashboard updates:
     - Bid card shows green "HIRED" badge
   - Other freelancers see red "REJECTED" badge

#### **Phase 5: Dashboard & Tracking**

1. **Freelancer Dashboard**
   - GET request to `/api/bids/my/bids`
   - Returns all bids by current user
   - Statistics calculated:
     - Pending bids count
     - Hired bids count
     - Rejected bids count
   - Each bid card shows:
     - Gig title and description
     - Bid amount vs gig budget
     - Proposal message
     - Status with color coding
     - Submission date

2. **Client Dashboard (My Gigs)**
   - GET request to `/api/gigs/my-gigs`
   - Returns all gigs posted by current user
   - Each gig shows:
     - Current status
     - Number of bids received
     - Budget amount
     - "View Bids" button

---

## 🗄️ Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed, min: 6 chars),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date,
  updatedAt: Date
}
```

### Gig Collection
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String (required),
  budget: Number (required, min: 0),
  ownerId: ObjectId (ref: 'User', required),
  status: String (enum: ['open', 'assigned'], default: 'open'),
  createdAt: Date,
  updatedAt: Date
}
```

### Bid Collection
```javascript
{
  _id: ObjectId,
  gigId: ObjectId (ref: 'Gig', required),
  freelancerId: ObjectId (ref: 'User', required),
  message: String (required),
  price: Number (required, min: 0),
  status: String (enum: ['pending', 'hired', 'rejected'], default: 'pending'),
  createdAt: Date,
  updatedAt: Date
}
```

### Relationships
- User → Gig (one-to-many): A user can post multiple gigs
- User → Bid (one-to-many): A user can place multiple bids
- Gig → Bid (one-to-many): A gig can have multiple bids
- Gig → User (many-to-one): Multiple gigs can belong to one user

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Contact

**Your Name** - Nutan Phadtare  
**Email** - nutanphadtare7@gmail.com  
**GitHub** - [@nutu-123](https://github.com/nutu-123)  
**LinkedIn** - [Nutan Phadtare](https://www.linkedin.com/in/nutan-phadtare-30a929282/)

**Project Link** - [https://github.com/nutu-123/gigFlow](https://github.com/nutu-123/gigFlow)

---

## 🙏 Acknowledgments

- Assignment provided by ServiceHive
- React and Node.js communities
- MongoDB documentation
- Tailwind CSS team
- Open source contributors

---

## 📊 Project Status

✅ **Completed Features:**
- User authentication
- Gig CRUD operations
- Bidding system
- Atomic hiring logic with transactions
- Search and filter
- Responsive UI
- Dashboard tracking

🚧 **In Progress:**
- N/A

📋 **Planned:**
- See Future Enhancements section

---

## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack development proficiency
- RESTful API design
- Database schema design
- Authentication and authorization
- State management
- Responsive web design
- Git version control
- Problem-solving skills

