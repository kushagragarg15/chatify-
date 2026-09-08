# Chatify 💬

A modern, real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) featuring Socket.IO for instant messaging, JWT authentication, and a beautiful UI powered by TailwindCSS and DaisyUI.

![Chatify](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based auth with bcrypt password hashing
- 💬 **Real-time Messaging** - Instant message delivery using Socket.IO
- 👥 **User Management** - Browse and chat with registered users
- 🖼️ **Image Sharing** - Upload and share images via Cloudinary integration
- 📧 **Email Notifications** - Email verification using Resend
- 🛡️ **Rate Limiting & Security** - Protected with Arcjet security middleware
- 🎨 **Modern UI** - Sleek interface with TailwindCSS and DaisyUI
- 🔔 **Message Notifications** - Real-time notification sounds
- ⌨️ **Keyboard Sound Effects** - Optional typing sound feedback
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🌙 **Dark Theme** - Eye-friendly dark mode interface

## 🚀 Tech Stack

### Frontend
- **React 19** - Latest React with modern hooks
- **Vite** - Lightning-fast build tool
- **Zustand** - Lightweight state management
- **Socket.IO Client** - Real-time bidirectional communication
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **DaisyUI** - Beautiful component library
- **Lucide React** - Icon library
- **React Hot Toast** - Elegant notifications

### Backend
- **Node.js & Express 5** - Server framework
- **MongoDB & Mongoose** - Database and ODM
- **Socket.IO** - WebSocket server for real-time features
- **JWT** - Secure token-based authentication
- **Bcrypt.js** - Password hashing
- **Cloudinary** - Image upload and management
- **Resend** - Transactional email service
- **Arcjet** - Security and rate limiting
- **Cookie Parser** - HTTP cookie parsing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/kushagragarg15/chatify-.git
cd chatify-
```

### 2. Install Dependencies

#### Backend Setup
```bash
cd backend
npm install
```

#### Frontend Setup
```bash
cd frontend
npm install
```

### 3. Environment Configuration

Create a `.env` file in the **backend** directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Resend Email Configuration
RESEND_API_KEY=your_resend_api_key
RESEND_EMAIL_FROM=your_verified_email@domain.com

# Arcjet Security
ARCJET_KEY=your_arcjet_key

# Client URL (for CORS)
CLIENT_URL=http://localhost:5173
```

Create a `.env` file in the **frontend** directory:

```env
VITE_API_URL=http://localhost:3000
```

### 4. Start the Application

#### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

#### Production Mode

```bash
# Build frontend
cd frontend
npm run build

# Start backend (serves frontend build)
cd backend
NODE_ENV=production npm start
```

## 📁 Project Structure

```
chatify/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   │   ├── auth.controller.js
│   │   │   └── message.controller.js
│   │   ├── emails/           # Email templates and handlers
│   │   │   ├── emailHandlers.js
│   │   │   └── emailTemplates.js
│   │   ├── lib/              # Utility libraries
│   │   │   ├── db.js         # Database connection
│   │   │   ├── cloudinary.js # Image upload config
│   │   │   ├── socket.js     # Socket.IO setup
│   │   │   ├── resend.js     # Email service
│   │   │   └── arcjet.js     # Security config
│   │   ├── middleware/       # Express middleware
│   │   │   ├── auth.middleware.js
│   │   │   ├── arcjet.middleware.js
│   │   │   └── socket.auth.middleware.js
│   │   ├── models/           # Mongoose schemas
│   │   │   ├── User.js
│   │   │   └── Message.js
│   │   ├── routes/           # API routes
│   │   │   ├── auth.route.js
│   │   │   └── message.route.js
│   │   └── server.js         # Application entry point
│   └── package.json
│
├── frontend/
│   ├── public/               # Static assets
│   │   ├── sounds/           # Notification and keyboard sounds
│   │   └── *.png             # Images
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── ChatHeader.jsx
│   │   │   ├── ChatsList.jsx
│   │   │   ├── ContactList.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   └── ...
│   │   ├── hooks/            # Custom React hooks
│   │   │   └── useKeyboardSound.js
│   │   ├── lib/              # Utilities
│   │   │   └── axios.js
│   │   ├── pages/            # Page components
│   │   │   ├── ChatPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── SignupPage.jsx
│   │   ├── store/            # Zustand state management
│   │   │   ├── useAuthStore.js
│   │   │   └── useChatStore.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
└── README.md
```

## 🔧 Available Scripts

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/check` - Check authentication status
- `PUT /api/auth/update-profile` - Update user profile

### Messages
- `GET /api/message/users` - Get all users for chat
- `GET /api/message/:id` - Get messages with specific user
- `POST /api/message/send/:id` - Send message to user

### WebSocket Events
- `connect` - Client connection
- `disconnect` - Client disconnection
- `sendMessage` - Send real-time message
- `receiveMessage` - Receive real-time message
- `getOnlineUsers` - Get list of online users

## 🎨 Features in Detail

### Real-time Communication
Messages are delivered instantly using Socket.IO WebSockets. Users can see who's online in real-time.

### Image Sharing
Users can upload and share images directly in chat. Images are stored on Cloudinary for fast delivery.

### Security Features
- Password hashing with bcrypt
- JWT token authentication
- HTTP-only cookies
- Rate limiting with Arcjet
- CORS protection

### User Experience
- Loading skeletons for better perceived performance
- Toast notifications for user feedback
- Keyboard sound effects (toggleable)
- Message notification sounds
- Responsive grid layout

## 🚢 Deployment

### Backend Deployment (Railway/Render/Heroku)

1. Set environment variables in your hosting platform
2. Ensure `NODE_ENV=production`
3. Deploy backend code

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables

### Full-Stack Deployment

The backend can serve the frontend in production. Build the frontend and the backend will automatically serve it from the `dist` folder.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Socket.IO for real-time communication
- MongoDB for database
- Cloudinary for image hosting
- Resend for email services
- Arcjet for security features

## 📧 Contact

Kushagra Garg - [@kushagragarg15](https://github.com/kushagragarg15)

Project Link: [https://github.com/kushagragarg15/chatify-](https://github.com/kushagragarg15/chatify-)

---

⭐ If you find this project useful, please consider giving it a star!
