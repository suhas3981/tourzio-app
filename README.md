# 🌍 Tourzio - Adventure Travel Booking Platform  LIVE:https://tourzio-app.onrender.com

A full-stack web application for browsing and booking adventure travel packages. Built with Node.js, Express, MongoDB, and EJS templating engine following MVC architecture.

![Tourzio Banner](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=300&fit=crop)

## 🚀 Features

### User Features
- 🔐 **User Authentication** - Secure signup/login with encrypted passwords
- 🎯 **Advanced Filtering** - Filter packages by type, location, price, difficulty, season, and weather
- 📦 **Package Browsing** - Explore diverse adventure packages with detailed information
- 💳 **Booking System** - Book packages with automatic discount calculations
- 👤 **User Dashboard** - Manage bookings and view travel history
- 🎫 **Special Offers** - Early bird, group, and student discounts

### Admin Features
- 📊 **Package Management** - CRUD operations for travel packages
- 💰 **Offer Management** - Create and manage promotional offers
- 📈 **Booking Tracking** - Monitor all bookings and their status

### Technical Features
- 🏗️ **MVC Architecture** - Clean separation of concerns
- 🔒 **Session Management** - Secure user sessions with MongoDB store
- ✅ **Input Validation** - Server-side validation with express-validator
- 📱 **Responsive Design** - Mobile-friendly interface
- 🎨 **Dynamic Content** - EJS templating for server-side rendering

## 🛠️ Tech Stack

**Backend:**
- Node.js
- Express.js v5.x
- MongoDB with Mongoose
- EJS (Embedded JavaScript Templates)

**Authentication & Security:**
- bcryptjs - Password hashing
- express-session - Session management
- connect-mongo - MongoDB session store

**Validation:**
- express-validator

**Development:**
- nodemon - Auto-restart server
- dotenv - Environment variables

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## 🔧 Installation

### 1. Clone the repository
# 🌍 Tourzio - Adventure Travel Booking Platform

A full-stack web application for browsing and booking adventure travel packages. Built with Node.js, Express, MongoDB, and EJS templating engine following MVC architecture.

![Tourzio Banner](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=300&fit=crop)

## 🚀 Features

### User Features
- 🔐 **User Authentication** - Secure signup/login with encrypted passwords
- 🎯 **Advanced Filtering** - Filter packages by type, location, price, difficulty, season, and weather
- 📦 **Package Browsing** - Explore diverse adventure packages with detailed information
- 💳 **Booking System** - Book packages with automatic discount calculations
- 👤 **User Dashboard** - Manage bookings and view travel history
- 🎫 **Special Offers** - Early bird, group, and student discounts

### Admin Features
- 📊 **Package Management** - CRUD operations for travel packages
- 💰 **Offer Management** - Create and manage promotional offers
- 📈 **Booking Tracking** - Monitor all bookings and their status

### Technical Features
- 🏗️ **MVC Architecture** - Clean separation of concerns
- 🔒 **Session Management** - Secure user sessions with MongoDB store
- ✅ **Input Validation** - Server-side validation with express-validator
- 📱 **Responsive Design** - Mobile-friendly interface
- 🎨 **Dynamic Content** - EJS templating for server-side rendering

## 🛠️ Tech Stack

**Backend:**
- Node.js
- Express.js v5.x
- MongoDB with Mongoose
- EJS (Embedded JavaScript Templates)

**Authentication & Security:**
- bcryptjs - Password hashing
- express-session - Session management
- connect-mongo - MongoDB session store

**Validation:**
- express-validator

**Development:**
- nodemon - Auto-restart server
- dotenv - Environment variables

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## 🔧 Installation

### 1. Clone the repository

git clone https://github.com/yourusername/tourzio-app.git
cd tourzio-app

### 2. Install dependencies

npm install

### 3. Set up environment variables

Create a `.env` file in the root directory:

PORT=3000
MONGODB_URI=mongodb://localhost:27017/tourzio
SESSION_SECRET=your_secret_key_change_in_production
NODE_ENV=development

**For MongoDB Atlas (Cloud):**
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/tourzio?retryWrites=true&w=majority


### 5. Seed the database


This will create:
- 6 sample adventure packages
- 4 promotional offers
- 1 demo user account

### 6. Start the application

**Development mode:**
npm run dev

## 📁 Project Structure

tourzio-app/
├── config/
│ └── database.js # MongoDB connection configuration
├── controllers/
│ ├── authController.js # Authentication logic
│ ├── packageController.js # Package CRUD operations
│ ├── bookingController.js # Booking management
│ └── offerController.js # Offers management
├── models/
│ ├── User.js # User schema
│ ├── Package.js # Package schema
│ ├── Booking.js # Booking schema
│ └── Offer.js # Offer schema
├── routes/
│ ├── authRoutes.js # Authentication routes
│ ├── packageRoutes.js # Package routes
│ ├── bookingRoutes.js # Booking routes
│ └── offerRoutes.js # Offer routes
├── middleware/
│ └── auth.js # Authentication middleware
├── public/
│ ├── css/
│ │ └── style.css # Application styles
│ ├── js/
│ │ └── main.js # Client-side JavaScript
│ └── images/ # Static images
├── views/
│ ├── partials/
│ │ ├── header.ejs # Header partial
│ │ ├── footer.ejs # Footer partial
│ │ └── navbar.ejs # Navigation partial
│ ├── home.ejs # Homepage
│ ├── packages.ejs # Package listing
│ ├── package-detail.ejs # Package details
│ ├── login.ejs # Login page
│ ├── signup.ejs # Signup page
│ ├── dashboard.ejs # User dashboard
│ └── offers.ejs # Offers page
├── .env # Environment variables (not in repo)
├── .gitignore # Git ignore file
├── app.js # Application entry point
├── seed.js # Database seeding script
├── package.json # Project dependencies
└── README.md # Project documentation
