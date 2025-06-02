# 🛍️ Shopora - Full Stack E-commerce Store

## About the Project

**Shopora** is a full-stack MERN-based e-commerce platform designed to simulate a complete online shopping experience. It is built with a focus on modern development practices and clean architecture. This project is currently under active development and is being built from scratch.

---

## 🚀 Features Implemented So Far

- User Registration API (with bcrypt password hashing)  
- Input Validation  
- Error Handling using Custom `asyncHandler` Middleware  
- MongoDB Integration using Mongoose  
- Express.js Server Setup with Routing  
- Environment Variable Configuration using `dotenv`  
- JSON and Cookie Parsing Middleware  

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database to store users and products
- **Mongoose** - ODM to interact with MongoDB
- **bcryptjs** - For hashing user passwords securely
- **dotenv** - To manage environment variables
- **cookie-parser** - To handle cookies in requests
- **nodemon** - Dev tool to automatically restart server on file changes

### Frontend
- **React.js** - Library for building user interfaces
- **React Router** - For client-side routing
- **Tailwind CSS** (or whichever CSS framework you use) - For styling UI components
- **Thunder Client / Postman** - For API testing during development

### Tools
- **Visual Studio Code** - Code editor
- **Git & GitHub** - Version control and remote repository hosting
- **Postman / Thunder Client** - API testing tools

---

## 📁 Project Structure

backend/
│
├── config/ # DB config and connections
│
├── controllers/ # Route controller logic
│
├── middlewares/ # Error handling and async utilities
│
├── models/ # Mongoose models
│
├── routes/ # Express route files
│
└── index.js # Main server file


### Frontend
frontend/
│
├── public/          # Static files (index.html, favicon, etc.)
│
├── src/
│   ├── assets/      # Images, fonts, icons, etc.
│   ├── components/  # Reusable React components (Navbar, Footer, etc.)
│   ├── pages/       # React page components (Home, Product, Cart, etc.)
│   ├── services/    # API calls and data fetching logic
│   ├── styles/      # CSS or Tailwind config files
│   ├── App.js       # Main app component
│   ├── index.js     # React entry point
│
└── package.json     # Frontend dependencies and scripts


yaml
Copy code

---

## ⚙️ Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/SIMRAN-202/mern-ecommerce.git
   cd mern-ecommerce

2. Install backend dependencies:

bash
Copy code
npm install

3. Create a .env file in backend/ and add your environment variables:

ini
Copy code
PORT=5000
MONGO_URI=your_mongodb_uri

4. Start the server:

bash
Copy code
nodemon backend/index.js


## Contact

For any inquiries or feedback, please contact:

- **Name**: Simran  
- **GitHub**: [SIMRAN-202](https://github.com/SIMRAN-202)  
- **Email**: kaursimrankaur2003@gmail.com